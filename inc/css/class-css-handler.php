<?php
/**
 * Css handler.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS
 */

namespace ThemeIsle\GutenbergBlocks\CSS;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use tubalmartin\CssMin\Minifier as CSSmin;

/**
 * Class CSS_Handler
 */
class CSS_Handler extends Base_CSS {

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
	 * Initialize the class
	 */
	public function init() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'rest_api_init', array( $this, 'autoload_block_classes' ) );
		add_action( 'before_delete_post', array( $this, 'delete_css_file' ) );
	}

	/**
	 * Register REST API route
	 *
	 * @since   1.3.0
	 * @access  public
	 */
	public function register_routes() {
		$namespace = $this->namespace . $this->version;

		register_rest_route(
			$namespace,
			'/save_post_meta/(?P<id>\d+)',
			array(
				array(
					'methods'  => \WP_REST_Server::EDITABLE,
					'callback' => array( $this, 'save_post_meta' ),
					'args'     => array(
						'id' => array(
							'type'              => 'intval',
							'required'          => true,
							'description'       => __( 'ID of the Post.', 'textdomain' ),
							'validate_callback' => function ( $param, $request, $key ) {
								return is_numeric( $param );
							},
						),
					),
				),
			)
		);

		register_rest_route(
			$namespace,
			'/save_block_meta/(?P<id>\d+)',
			array(
				array(
					'methods'  => \WP_REST_Server::EDITABLE,
					'callback' => array( $this, 'save_block_meta' ),
					'args'     => array(
						'id' => array(
							'type'              => 'intval',
							'required'          => true,
							'description'       => __( 'ID of the Reusable Block.', 'textdomain' ),
							'validate_callback' => function ( $param, $request, $key ) {
								return is_numeric( $param );
							},
						),
					),
				),
			)
		);
	}

	/**
	 * Function to save post CSS.
	 *
	 * @param \WP_REST_Request $request Rest request.
	 *
	 * @return mixed
	 * @since   1.3.0
	 * @access  public
	 */
	public function save_post_meta( \WP_REST_Request $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		$post_id = $request->get_param( 'id' );
		$css     = $this->get_blocks_css( $post_id );
		$css     = wp_filter_nohtml_kses( $css );

		if ( ! empty( $css ) ) {
			$css = $this->compress( $css );

			update_post_meta( $post_id, '_themeisle_gutenberg_block_styles', $css );
			$this->save_css_file( $post_id, $css );
		} else {
			if ( get_post_meta( $post_id, '_themeisle_gutenberg_block_styles', true ) ) {
				delete_post_meta( $post_id, '_themeisle_gutenberg_block_styles' );
				$this->delete_css_file( $post_id );
			}
		}

		if ( count( self::$google_fonts ) > 0 ) {
			update_post_meta( $post_id, '_themeisle_gutenberg_block_fonts', self::$google_fonts );
		} else {
			if ( get_post_meta( $post_id, '_themeisle_gutenberg_block_fonts', true ) ) {
				delete_post_meta( $post_id, '_themeisle_gutenberg_block_fonts' );
			}
		}

		return rest_ensure_response( array( 'message' => __( 'CSS updated.', 'textdomain' ) ) );
	}

	/**
	 * Function to save reusable block CSS.
	 *
	 * @param \WP_REST_Request $request Rest request.
	 *
	 * @return mixed
	 * @since   1.3.0
	 * @access  public
	 */
	public function save_block_meta( \WP_REST_Request $request ) {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		$post_id = $request->get_param( 'id' );
		$css     = $this->get_reusable_block_css( $post_id );
		$css     = wp_filter_nohtml_kses( $css );

		if ( ! empty( $css ) ) {
			$css = $this->compress( $css );

			update_post_meta( $post_id, '_themeisle_gutenberg_block_styles', $css );
			$this->save_css_file( $post_id, $css );
		} else {
			if ( get_post_meta( $post_id, '_themeisle_gutenberg_block_styles', true ) ) {
				delete_post_meta( $post_id, '_themeisle_gutenberg_block_styles' );
				$this->delete_css_file( $post_id );
			}
		}

		if ( count( self::$google_fonts ) > 0 ) {
			update_post_meta( $post_id, '_themeisle_gutenberg_block_fonts', self::$google_fonts );
		} else {
			if ( get_post_meta( $post_id, '_themeisle_gutenberg_block_fonts', true ) ) {
				delete_post_meta( $post_id, '_themeisle_gutenberg_block_fonts' );
			}
		}

		return rest_ensure_response( array( 'message' => __( 'CSS updated.', 'textdomain' ) ) );
	}

	/**
	 * Function to save CSS into WordPress Filesystem.
	 *
	 * @param int    $post_id Post id.
	 * @param string $css CSS string.
	 *
	 * @return bool
	 * @since   1.3.0
	 * @access  public
	 */
	public function save_css_file( $post_id, $css ) {
		global $wp_filesystem;

		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		require_once ABSPATH . '/wp-admin/includes/file.php';
		WP_Filesystem();

		$file_name     = 'post-' . $post_id;
		$wp_upload_dir = wp_upload_dir( null, false );
		$upload_dir    = $wp_upload_dir['basedir'] . '/themeisle-gutenberg/';
		$file_path     = $upload_dir . $file_name . '.css';
		$target_dir    = $wp_filesystem->is_dir( $upload_dir );

		if ( ! $wp_filesystem->is_writable( $wp_upload_dir['basedir'] ) ) {
			return;
		}

		if ( ! $target_dir ) {
			wp_mkdir_p( $upload_dir );
		}

		$wp_filesystem->put_contents( $file_path, $css, FS_CHMOD_FILE );

		if ( file_exists( $file_path ) ) {
			update_post_meta( $post_id, '_themeisle_gutenberg_block_stylesheet', $file_name );
		}

		return true;
	}

	/**
	 * Function to delete CSS from WordPress Filesystem.
	 *
	 * @param int $post_id Post id.
	 * @return bool
	 * @since   1.3.0
	 * @access  public
	 */
	public function delete_css_file( $post_id ) {
		global $wp_filesystem;

		if ( ! current_user_can( 'edit_posts' ) ) {
			return false;
		}

		require_once ABSPATH . '/wp-admin/includes/file.php';
		WP_Filesystem();

		$wp_upload_dir = wp_upload_dir( null, false );

		if ( ! $wp_filesystem->is_writable( $wp_upload_dir['basedir'] ) ) {
			return;
		}

		$file_name = get_post_meta( $post_id, '_themeisle_gutenberg_block_stylesheet', true );

		if ( $file_name ) {
			delete_post_meta( $post_id, '_themeisle_gutenberg_block_stylesheet' );
		}

		$upload_dir = $wp_upload_dir['basedir'] . '/themeisle-gutenberg/';
		$file_path  = $upload_dir . $file_name . '.css';

		if ( ! file_exists( $file_path ) ) {
			return;
		}

		$wp_filesystem->delete( $file_path, true );

		return true;
	}

	/**
	 * Compress CSS
	 *
	 * @param string $css Compress css.
	 * @return string Compressed css.
	 * @since   1.3.0
	 * @access  public
	 */
	public function compress( $css ) {
		$compressor = new CSSmin();

		// Override any PHP configuration options before calling run().
		$compressor->setMemoryLimit( '256M' );
		$compressor->setMaxExecutionTime( 120 );
		$compressor->setPcreBacktrackLimit( 3000000 );
		$compressor->setPcreRecursionLimit( 150000 );

		$css = htmlspecialchars_decode( $css );
		$css = $compressor->run( $css );

		return $css;
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @return CSS_Handler
	 * @since 1.3.0
	 * @access public
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
	 * @return void
	 * @since 1.3.0
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access public
	 * @return void
	 * @since 1.3.0
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}
