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

		register_rest_route(
			$namespace,
			'/integration',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_integration_data' ),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
			)
		);
	}


	/**
	 * Handle the request from the form block
	 *
	 * @param mixed $request Form request.
	 *
	 * @return mixed|\WP_REST_Response
	 */
	public function submit_form( $request ) {

		$data = json_decode( $request->get_body(), true );

		if ( ! $this->has_requiered_data( $data ) ) {
			$return['error'] = __( 'Invalid request!', 'otter-blocks' );
			return $return;
		}

		$reasons = $this->check_form_conditions( $data );

		if ( 0 < count( $reasons ) ) {
			$return['error']   = __( 'Invalid request!', 'otter-blocks' );
			$return['reasons'] = $reasons;
			return $return;
		}

		$integration = $this->get_form_option_settings( $data['formOption'] );

		// TODO: Add reCaptcha token verification
		if ( isset( $integration['provider'] ) && isset( $integration['action'] ) ) {
			switch ( $integration['provider'] ) {
				case 'mailchimp':
					return $this->subscribe_to_mailchimp( $data );
				case 'sendinblue':
					return $this->subscribe_to_sendinblue( $data );
			}
		}

		return $this->send_email( $data );
	}

	/**
	 * Send Email using SMTP
	 *
	 * @param mixed $data Data from request body.
	 *
	 * @return mixed|\WP_REST_Response
	 */
	private function send_email( $data ) {
		$return = array(
			'success' => false,
		);

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

	public function get_integration_data( $request ) {
		$return = array(
			'success' => false,
		);

		$data = json_decode( $request->get_body(), true );
		if ( isset( $data['provider'] ) ) {
			switch ( $data['provider'] ) {
				case 'mailchimp':
					return $this->get_mailchimp_data( $request );
				case 'sendinblue':
					return $this->get_sendinblue_data( $request );
			}
		}

		$return['error'] = __( 'Invalid request! Provider is missing.', 'otter-blocks' );
		return rest_ensure_response( $return );
	}

	/**
	 * Get general information from Mailchimp
	 *
	 * @param \WP_REST_Request $request Search request.
	 *
	 * @return mixed|\WP_REST_Response
	 *
	 * @see https://mailchimp.com/developer/marketing/api/list-members/
	 */
	public function get_mailchimp_data( $request ) {
		$return = array(
			'success' => false,
		);
		$data   = json_decode( $request->get_body(), true );

		if ( isset( $data['apiKey'] ) && ! empty( $data['apiKey'] ) ) {
			$api_key = $data['apiKey'];
			$info    = explode( '-', $api_key );
			if ( 2 == count( $info ) ) {
				$server_name = $info[1];
				$url         = 'https://' . $server_name . '.api.mailchimp.com/3.0/lists';
				$args        = array(
					'method'  => 'GET',
					'headers' => array(
						'Authorization' => 'Basic ' . base64_encode( 'user:' . $api_key ),
					),
				);

				$response = wp_remote_post( $url, $args );
				$body     = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
					$return['error']      = ! empty( $body['detail'] ) && 'null' !== $body['detail'] ? $body['detail'] : __( 'Invalid request!', 'otter-blocks' );
					$return['error_code'] = 3;
				} else {
					$return['success'] = true;
					$return['list_id'] = array_map(
						function( $item ) {
							return array(
								'id'   => $item['id'],
								'name' => $item['name'],
							);
						},
						$body['lists']
					);
				}
			} else {
				$return['error']      = __( 'Invalid key api format!', 'otter-blocks' );
				$return['error_code'] = 2;
			}
		} else {
			$return['error']      = __( 'No key api found!', 'otter-blocks' );
			$return['error_code'] = 1;
		}

		return rest_ensure_response( $return );
	}

	/**
	 * Get general information from Mailchimp
	 *
	 * @param \WP_REST_Request $request Search request.
	 *
	 * @return mixed|\WP_REST_Response
	 *
	 * @see https://mailchimp.com/developer/marketing/api/list-members/
	 */
	public function get_sendinblue_data( $request ) {
		$return = array(
			'success' => false,
		);
		$data   = json_decode( $request->get_body(), true );

		if ( isset( $data['apiKey'] ) && ! empty( $data['apiKey'] ) ) {
			$api_key = $data['apiKey'];

			$url  = 'https://api.sendinblue.com/v3/contacts/lists';
			$args = array(
				'method'  => 'GET',
				'headers' => array(
					'api-key' => $api_key,
				),
			);

			$response = wp_remote_post( $url, $args );
			$body     = json_decode( wp_remote_retrieve_body( $response ), true );

			if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
				$return['error']      = ! empty( $body['detail'] ) && 'null' !== $body['detail'] ? $body['detail'] : 'Invalid request!';
				$return['error_code'] = 3;
			} else {
				$return['success'] = true;
				$return['list_id'] = array_map(
					function( $item ) {
						return array(
							'id'   => $item['id'],
							'name' => $item['name'],
						);
					},
					$body['lists']
				);
			}
		} else {
			$return['error']      = __( 'No key api found!', 'otter-blocks' );
			$return['error_code'] = 1;
		}

		return rest_ensure_response( $return );
	}

	/**
	 * Add a new subscriber to Mailchimp
	 *
	 * @param mixed $data Data from request body.
	 *
	 * @return mixed|\WP_REST_Response
	 */
	private function subscribe_to_mailchimp( $data ) {

		$return = array(
			'success' => false,
		);

		// Get the first email from form.
		$email = '';
		foreach ( $data['data'] as $input_field ) {
			if ( 'email' == $input_field['type'] ) {
				$email = $input_field['value'];
				break;
			}
		}

		if ( '' === $email ) {
			return rest_ensure_response( $return );
		}

		$integration = $this->get_form_option_settings( $data['formOption'] );

		if( isset( $integration['apiKey'] ) && '' !== $integration['apiKey'] &&
			isset( $integration['listId'] ) && '' !== $integration['listId']
		) {
			$api_key = $integration['apiKey'];
			$list_id = $integration['listId'];
		}

		if ( '' === $api_key && '' === $list_id ) {
			return rest_ensure_response( $return );
		}

		$info = explode( '-', $api_key );
		if ( 2 == count( $info ) ) {
			$server_name = $info[1];
			$user_status = $this->get_new_user_status_mailchimp( $api_key, $list_id );

			$url       = 'https://' . $server_name . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members/' . md5( strtolower( $email ) );
			$form_data = array(
				'email_address' => $email,
				'status'        => $user_status,
			);
			$args      = array(
				'method'  => 'PUT',
				'headers' => array(
					'Authorization' => 'Basic ' . base64_encode( 'user:' . $api_key ),
				),
				'body'    => wp_json_encode( $form_data ),
			);

			$response = wp_remote_post( $url, $args );
			$body     = json_decode( wp_remote_retrieve_body( $response ), true );

			if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
				$return['error']      = ! empty( $body['detail'] ) && 'null' !== $body['detail'] ? $body['detail'] : 'Invalid request!';
				$return['error_code'] = 3;
			} else {
				$return['success'] = true;
			}
		} else {
			$return['error']      = 'Invalid api key format!';
			$return['error_code'] = 2;
		}

		return rest_ensure_response( $return );
	}

	/**
	 * Add a new subscriber to Sendinblue
	 *
	 * @param mixed $data Data from request body.
	 *
	 * @return mixed|\WP_REST_Response
	 */
	private function subscribe_to_sendinblue( $data ) {

		$return = array(
			'success' => false,
		);

		// Get the first email from form.
		$email = '';
		foreach ( $data['data'] as $input_field ) {
			if ( 'email' == $input_field['type'] ) {
				$email = $input_field['value'];
				break;
			}
		}

		if ( '' === $email ) {
			return rest_ensure_response( $return );
		}


		// Get the api credentials from the Form block.
		$api_key             = '';
		$list_id             = '';

		$integration = $this->get_form_option_settings( $data['formOption'] );

		if( isset( $integration['apiKey'] ) && '' !== $integration['apiKey'] &&
			isset( $integration['listId'] ) && '' !== $integration['listId']
		) {
			$api_key = $integration['apiKey'];
			$list_id = $integration['listId'];
		}

		if ( '' === $api_key && '' === $list_id ) {
			return rest_ensure_response( $return );
		}

		$url       = 'https://api.sendinblue.com/v3/contacts';
		$form_data = array(
			'email'            => $email,
			'listIds'          => array( (int) $list_id ),
			'emailBlacklisted' => false,
			'smsBlacklisted'   => false,
		);
		$args      = array(
			'method'  => 'POST',
			'headers' => array(
				'Accept'       => 'application/json',
				'Content-Type' => 'application/json',
				'api-key'      => $api_key,
			),
			'body'    => wp_json_encode( $form_data ),
		);

		$response = wp_remote_post( $url, $args );
		$body     = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( is_wp_error( $response ) || 400 === wp_remote_retrieve_response_code( $response ) ) {
			$return['error']      = ! empty( $body['detail'] ) && 'null' !== $body['detail'] ? $body['detail'] : 'Invalid request!';
			$return['error_code'] = 3;
		} else {
			$return['success'] = true;
		}

		return rest_ensure_response( $return );
	}

	/**
	 * Check if the subscribing list has double opt-in.
	 * If the option is activated, return pending status for new users, else return subscribed.
	 *
	 * @param string $api_key Api key.
	 * @param string $list_id List id.
	 *
	 * @return string
	 *
	 * @see https://github.com/Codeinwp/themeisle-content-forms/blob/master/includes/widgets-public/newsletter_public.php#L181
	 */
	private function get_new_user_status_mailchimp( $api_key, $list_id ) {
		$url  = 'https://' . substr( $api_key, strpos( $api_key, '-' ) + 1 ) . '.api.mailchimp.com/3.0/lists/' . $list_id;
		$args = array(
			'method'  => 'GET',
			'headers' => array(
				'Authorization' => 'Basic ' . base64_encode( 'user:' . $api_key ),
			),
		);

		$response = wp_remote_post( $url, $args );

		$body = json_decode( wp_remote_retrieve_body( $response ), true );
		if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {
			return 'pending';
		}

		return array_key_exists( 'double_optin', $body ) && true === $body['double_optin'] ? 'pending' : 'subscribed';
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
		return isset( $data['postUrl'] ) && isset( $data['formId']) && isset( $data['formOption']);
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
		$reasons = array();

		$has_provider = false;
		$has_creditentials = false;

		$integration = $this->get_form_option_settings( $data['formOption'] );

		if( isset( $integration['provider'] ) && '' !== $integration['provider'] ) {
			$has_provider = true;
		}
		if( isset( $integration['apiKey'] ) && '' !== $integration['apiKey'] &&
			isset( $integration['listId'] ) && '' !== $integration['listId']
		) {
			$has_creditentials = true;
		}


		// TODO: Add form captcha validation here.

		if ( ! $has_provider )  {
			$reasons += array(
				__( 'Provider is missing!', 'otter-blocks' ),
			);
		}

		if( ! $has_creditentials ) {
			$reasons += array(
				__( 'Provider settings are missing!', 'otter-blocks' ),
			);
		}
		return $reasons;
	}

	/**
	 * Get form settings from options.
	 *
	 * @param string $formOption The name of the option.
	 * @return array Form settings
	 */
	private function get_form_option_settings( $formOption ) {
		$option_name = sanitize_text_field( $formOption );
		$form_emails = get_option( 'themeisle_blocks_form_emails' );

		foreach ( $form_emails as $form ) {
			if ( $form['form'] === $option_name ) {
				if( isset( $form['integration'])) {
					return $form['integration'];
				}
			}
		}
		return array();
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
