<?php

namespace ThemeIsle\BlockCSS;

use ThemeIsle\BlockCSS;

/**
 * Class CSS_Handler
 */
class CSS_Handler extends BlockCSS {

	/**
	 * The main instance var.
	 *
	 * @var CSS_Handler
	 */
	public static $instance = null;

	/**
	 * Rest route namespace.
	 *
	 * @var CSS_Handler
	 */
	public $namespace = 'themeisle-gutenberg-blocks/';

	/**
	 * Rest route version.
	 *
	 * @var CSS_Handler
	 */
	public $version = 'v1';

	/**
	 * Constructor function for the module.
	 *
	 * @method __construct
	 */
	public function __construct() {
		parent::__construct();
	}

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
			'/save_metabox',
			array(
				array(
					'methods'	=> \WP_REST_Server::READABLE,
					'callback'	=> array( $this, 'save_metabox' ),
					'args'		=> array(
						'id'	=> array(
							'type'        => 'intval',
							'required'    => true,
							'description' => __( 'ID of the Post.', 'textdomain' ),
						),
					),
				),
			)
		);
	}

	/**
	 * Function to fetch templates.
	 *
	 * @return array|bool|\WP_Error
	 */
	public function save_metabox( \WP_REST_Request $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		$post_id = $request->get_param( 'id' );

		$css = $this->get_blocks_css( $post_id );
		update_post_meta( $post_id, '_themeisle_gutenberg_block_styles', $css );

		// if ( ! empty( $css ) ) {
		// 	return 'WORKS';
		// }

		return $css;

		// return rest_ensure_response( array( 'message' => __( 'CSS updated.', 'textdomain' ) ) );
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.2.5
	 * @access public
	 * @return CSS_Handler
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
	 * @since 1.2.5
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
	 * @since 1.2.5
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}
