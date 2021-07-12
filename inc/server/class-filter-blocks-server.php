<?php
/**
 * Filter blocks server logic.
 *
 * @package ThemeIsle\GutenbergBlocks\Server
 */

namespace ThemeIsle\GutenbergBlocks\Server;

/**
 * Class Filter_Blocks_Server
 */
class Filter_Blocks_Server {

	/**
	 * The main instance var.
	 *
	 * @var Filter_Blocks_Server
	 */
	public static $instance = null;

	/**
	 * Rest route namespace.
	 *
	 * @var Filter_Blocks_Server
	 */
	public $namespace = 'themeisle-gutenberg-blocks/';

	/**
	 * Rest route version.
	 *
	 * @var Filter_Blocks_Server
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
			'/filter_blocks',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'filter_blocks' ),
					'args'                => array(
						'block' => array(
							'type'        => 'string',
							'required'    => true,
							'description' => __( 'Block namespace.', 'otter-blocks' ),
						),
					),
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				),
			)
		);
	}

	/**
	 * Filter Blocks
	 *
	 * Search WordPress posts for requested block type.
	 *
	 * @param mixed $request REST request.
	 * @since 1.7.0
	 * @return mixed|\WP_REST_Response
	 */
	public function filter_blocks( $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		$block  = $request->get_param( 'block' );
		$blocks = array();

		$post_types = get_post_types(
			array(
				'public'  => true,
				'show_ui' => true,
			)
		);

		unset( $post_types['attachment'] );
		array_push( $post_types, 'wp_block' );

		$post_ids = array();

		foreach ( $post_types as $key => $post_type ) {
			$posts = get_posts(
				array(
					'posts_per_page' => -1,
					'post_type'      => $post_type,
				)
			);

			foreach ( $posts as $post ) {
				if ( ! has_blocks( $post->post_content ) ) {
					$response = new \WP_REST_Response( $blocks, 200 );
				}
	
				$post_blocks = parse_blocks( $post->post_content );
	
				foreach ( $post_blocks as $post_block ) {
					if ( $block === $post_block['blockName'] ) {
						$blocks[] = $post_block;
					}
				}
			}
		}

		$response = new \WP_REST_Response( $blocks, 200 );

		return $response;
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.7.0
	 * @access public
	 * @return Filter_Blocks_Server
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
	 * @since 1.7.0
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
	 * @since 1.7.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'otter-blocks' ), '1.0.0' );
	}
}
