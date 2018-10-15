<?php

namespace ThemeIsle\GutenbergBlocks;

/**
 * Class Font_Awesome_Icons_Server
 */
class Font_Awesome_Icons_Server extends \WP_Rest_Controller {

	/**
	 * The main instance var.
	 *
	 * @var Font_Awesome_Icons_Server
	 */
	public static $instance = null;

	/**
	 * Rest route namespace.
	 *
	 * @var Font_Awesome_Icons_Server
	 */
	public $namespace = 'themeisle-gutenberg-blocks/';


	/**
	 * Rest route version.
	 *
	 * @var Font_Awesome_Icons_Server
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
			'/get_icons_list',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_icons_list' ),
				),
			)
		);
	}

	/**
	 * Get Icons List
	 *
	 * Get list of all Font Awesome icons.
	 *
	 * @return mixed|\WP_REST_Response
	 */
	public function get_icons_list( $request ) {
		$content = file_get_contents( dirname( __FILE__ ) . '/icons.json', FILE_USE_INCLUDE_PATH );

		$parsed_content = json_decode( $content, true );

		$icons = array();

		foreach ( $parsed_content as $icon_key => $icon_args ) {

			foreach ( $icon_args['styles'] as $style ) {

				$prefix = '';

				switch ( $style ) {
					case 'brands':
						$prefix = 'fab';
						break;
					case 'solid':
						$prefix = 'fas';
						break;
					case 'regular':
						$prefix = 'far';
						break;
					default:
						$prefix = 'fas';
				}

				$icons[] = array(
					'name' => $icon_key,
					'unicode' => $icon_args['unicode'],
					'prefix' => $prefix,
				);
			}
		}
		return rest_ensure_response( $icons );
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.0.0
	 * @access public
	 * @return Font_Awesome_Icons_Server
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
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
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
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}