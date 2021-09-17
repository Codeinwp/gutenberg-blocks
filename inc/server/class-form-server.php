<?php
/**
 * Card server logic.
 *
 * @package ThemeIsle\GutenbergBlocks\Server
 */

namespace ThemeIsle\GutenbergBlocks\Server;

/**
 * Class Plugin_Card_Server
 */
class Form_Server {

	/**
	 * The main instance var.
	 *
	 * @var Form_Server
	 */
	public static $instance = null;

	/**
	 * Rest route namespace.
	 *
	 * @var Form_Server
	 */
	public $namespace = 'themeisle-gutenberg-blocks/';

	/**
	 * Rest route version.
	 *
	 * @var Form_Server
	 */
	public $version = 'v1';

	/**
	 * Initialize the class
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		$namespace = $this->namespace . $this->version;
		register_rest_route(
			$namespace,
			'/forms',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'submit_form' ),
					'permission_callback' => function () {
						return __return_true();
					},
				),
			)
		);

	}

	/**
	 * Send email
	 *
	 * @param mixed $request Search request.
	 *
	 * @return mixed|\WP_REST_Response
	 */
	public function submit_form( $request ) {

		$return = array(
			'success' => false,
		);

		$data = json_decode( $request->get_body(), true );

		if ( ! $this->has_requiered_data( $data ) ) {
			$return['error'] = __( 'Invalid request!', 'otter-blocks' );
			return $return;
		}

		$reasons = $this->check_form_conditions( $data );

		if ( 0 < count( $reasons ) ) {
			$return['error']   = __( 'Invalid request!', 'otter-blocks' );
			$return['reasons'] = wp_json_encode( $reasons );
			return $return;
		}

		if ( isset( $data['token'] ) ) {
			$secret = get_option( 'themeisle_google_captcha_api_secret_key' );
			$resp   = wp_remote_post(
				'https://www.google.com/recaptcha/api/siteverify',
				array(
					'body'    => 'secret=' . $secret . '&response=' . $data['token'],
					'headers' => [
						'Content-Type' => 'application/x-www-form-urlencoded',
					],
				)
			);
			$result = json_decode( $resp['body'], true );
			if ( false == $result['success'] ) {
				$return['error'] = __( 'The reCaptha was invalid!', 'otter-blocks' );
				return rest_ensure_response( $return );
			}
		}

		$email_subject = ( isset( $data['emailSubject'] ) ? $data['emailSubject'] : ( __( 'A new form submission on ', 'otter-blocks' ) . get_bloginfo( 'name' ) ) );
		$email_body    = $this->prepare_body( $data['data'] );

		// Sent the form date to the admin site as a default behaviour.
		$to = sanitize_email( get_site_option( 'admin_email' ) );
		// Check if we need to send it to another user email.
		if ( isset( $data['formOption'] ) ) {
			$option_name = sanitize_text_field( $data['formOption'] );
			$form_emails = get_option( 'themeisle_blocks_form_emails' );

			foreach ( $form_emails as $form ) {
				if ( $form['form'] === $option_name ) {
					$to = $form['email'];
				}
			}
		}

		$headers = array( 'Content-Type: text/html; charset=UTF-8', 'From: ' . esc_url( get_site_url() ) );

		try {
			// phpcs:ignore
			wp_mail( $to, $email_subject, $email_body, $headers );
			$return['success'] = true;
		} catch ( \Exception $e ) {
			$return['error'] = $e->getMessage();
		} finally {
			return rest_ensure_response( $return );
		}
	}

	/**
	 * Body template preparation
	 *
	 * @param array $data Data from the forms.
	 *
	 * @return string
	 */
	private function prepare_body( $data ) {
		ob_start(); ?>
		<!doctype html>
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html;" charset="utf-8"/>
			<!-- view port meta tag -->
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			<title><?php esc_html__( 'Mail From: ', 'otter-blocks' ) . sanitize_email( get_site_option( 'admin_email' ) ); ?></title>
		</head>
		<body>
		<table>
			<thead>
			<tr>
				<th colspan="2">
					<h3>
						<?php esc_html_e( 'Content Form submission from ', 'otter-blocks' ); ?>
						<a href="<?php echo esc_url( get_site_url() ); ?>"><?php bloginfo( 'name' ); ?></a>
					</h3>
					<hr/>
				</th>
			</tr>
			</thead>
			<tbody>
			<?php
			foreach ( $data as $input ) {
				?>
				<tr>
					<td>
						<strong><?php echo esc_html( $input['label'] ); ?>: </strong>
						<?php echo esc_html( $input['value'] ); ?>
					</td>

				</tr>
				<?php
			}

			?>
			</tbody>
			<tfoot>
			<tr>
				<td>
					<hr/>
					<?php esc_html_e( 'You received this email because your email address is set in the content form settings on ', 'otter-blocks' ); ?>
					<a href="<?php echo esc_url( get_site_url() ); ?>"><?php bloginfo( 'name' ); ?></a>
				</td>
			</tr>
			</tfoot>
		</table>
		</body>
		</html>
		<?php
		return ob_get_clean();
	}

	/**
	 * Check for requiered data.
	 *
	 * @access private
	 * @param array $data Data from the request.
	 *
	 * @return boolean
	 */
	private function has_requiered_data( $data ) {
		$has_csrf_protection = isset( $data['nonceValue'] ) && wp_verify_nonce( $data['nonceValue'], 'form-verification' );
		return isset( $data['postUrl'] ) && isset( $data['formId'] ) && isset( $data['formOption'] ) && $has_csrf_protection;
	}

	/**
	 * Check if the data request has the data needed by form: captha, integrations.
	 *
	 * @access private
	 * @param array $data Data from the request.
	 *
	 * @return array
	 */
	private function check_form_conditions( $data ) {
		$reasons     = array();
		$has_captcha = false;

		if ( isset( $data['formOption'] ) ) {
			$option_name = sanitize_text_field( $data['formOption'] );
			$form_emails = get_option( 'themeisle_blocks_form_emails' );

			foreach ( $form_emails as $form ) {
				if ( $form['form'] === $option_name ) {
					$has_captcha = $form['hasCaptcha'];
				}
			}
		}

		if ( $has_captcha && ( ! isset( $data['token'] ) || '' === $data['token'] ) ) {
			$reasons += array(
				__( 'Token is missing!', 'otter-blocks' ),
			);
		}
		// TODO: Add form integration validation here.
		return $reasons;
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.0.0
	 * @access public
	 * @return Plugin_Card_Server
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->init();
		}

		return self::$instance;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'otter-blocks' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'otter-blocks' ), '1.0.0' );
	}
}
