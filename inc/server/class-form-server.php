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
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_form_data' ),
					'permission_callback' => function () {
						return __return_true();
					},
				),
			)
		);

		register_rest_route(
			$namespace,
			'/forms',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'get_form_data' ),
					'permission_callback' => function () {
						return __return_true();
					},
				),
			)
		);
	}

	/**
	 * Search WordPress Plugin
	 *
	 * Search WordPress plugin using WordPress.org API.
	 *
	 * @param mixed $request Search request.
	 *
	 * @return mixed|\WP_REST_Response
	 */
	public function get_form_data( $request ) {

		$return = array(
			'success' => false,
		);


		//var_dump( $request->get_body() );

		$return['success'] = true;

		$data = json_decode( $request->get_body() );

		$email_title = "[Otter]" . __( 'Someone has completed a form', 'otter-blocks' );
		$email_body = array_reduce( $data, function( $text, $input ) {
			$text .= $input->{'label'} . ': ' .$input->{'value'} . "\n";
			return $text;
		} , "[Otter]" . __( 'Data from users', 'otter-blocks' ) . "\n\n" );

		// TODO: Send email
		$to = get_site_option( 'admin_email' );
		$headers = array('Content-Type: text/html; charset=UTF-8');
		wp_mail($to, $email_title, $email_body, $headers);

		// Check the result
		$return['email_body'] = $email_body;
		return rest_ensure_response( $return );
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
