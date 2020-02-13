<?php
/**
 * Loader.
 *
 * @package ThemeIsle
 */

namespace ThemeIsle\GutenbergBlocks;

/**
 * Class Main
 */
class Main {

	/**
	 * Singleton.
	 *
	 * @var Main Class object.
	 */
	protected static $instance = null;

	/**
	 * Holds the module slug.
	 *
	 * @since   1.0.0
	 * @access  protected
	 * @var     string $slug The module slug.
	 */
	protected $slug = 'gutenberg-blocks';

	/**
	 * GutenbergBlocks constructor.
	 *
	 * @param string $name Colection name.
	 * @since   1.0.0
	 * @access  public
	 */
	public function __construct( $name ) {
		$this->name        = $name;
		$this->description = __( 'A set of awesome Gutenberg Blocks!', 'textdomain' );
	}

	/**
	 * Method to define hooks needed.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function init() {
		if ( ! defined( 'THEMEISLE_BLOCKS_VERSION' ) ) {
			define( 'THEMEISLE_BLOCKS_VERSION', '1.3.6' );
			define( 'THEMEISLE_BLOCKS_DEV', false );
		}
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_frontend_assets' ) );
		add_action( 'init', array( $this, 'autoload_classes' ), 11 );
		add_action( 'wp', array( $this, 'load_server_side_blocks' ), 11 );
		add_action( 'block_categories', array( $this, 'block_categories' ) );
	}

	/**
	 * Load Gutenberg blocks.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function enqueue_block_editor_assets() {
		if ( THEMEISLE_BLOCKS_DEV ) {
			$version = time();
		} else {
			$version = THEMEISLE_BLOCKS_VERSION;
		}

		if ( defined( 'THEMEISLE_GUTENBERG_GOOGLE_MAPS_API' ) ) {
			$api = THEMEISLE_GUTENBERG_GOOGLE_MAPS_API;
		} else {
			$api = false;
		}

		wp_enqueue_script(
			'themeisle-gutenberg-blocks-vendor',
			plugin_dir_url( $this->get_dir() ) . 'build/chunk-vendor.js',
			array( 'react', 'react-dom' ),
			$version,
			true
		);

		wp_enqueue_script(
			'themeisle-gutenberg-blocks',
			plugin_dir_url( $this->get_dir() ) . 'build/blocks.js',
			array( 'lodash', 'wp-api', 'wp-i18n', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-editor', 'wp-edit-post', 'wp-element', 'wp-keycodes', 'wp-plugins', 'wp-rich-text', 'wp-url', 'wp-viewport', 'themeisle-gutenberg-blocks-vendor', 'glidejs' ),
			$version,
			true
		);

		wp_enqueue_script(
			'glidejs',
			plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.min.js',
			array(),
			$version,
			true
		);

		wp_set_script_translations( 'themeisle-gutenberg-blocks', 'textdomain' );

		wp_localize_script(
			'themeisle-gutenberg-blocks',
			'themeisleGutenberg',
			array(
				'isCompatible' => $this->is_compatible(),
				'packagePath'  => plugin_dir_url( $this->get_dir() ) . 'build/',
				'assetsPath'   => plugin_dir_url( $this->get_dir() ) . 'assets',
				'updatePath'   => admin_url( 'update-core.php' ),
				'mapsAPI'      => $api,
			) 
		);

		wp_enqueue_style(
			'themeisle-gutenberg-blocks-editor',
			plugin_dir_url( $this->get_dir() ) . 'build/edit-blocks.css',
			array( 'wp-edit-blocks' ),
			$version
		);

		wp_enqueue_style(
			'glidejs-core',
			plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.core.min.css',
			[],
			$version
		);

		wp_enqueue_style(
			'glidejs-theme',
			plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.theme.min.css',
			[],
			$version
		);
	}

	/**
	 * Load assets for our blocks.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function enqueue_block_frontend_assets() {
		global $wp_query;

		if ( is_admin() ) {
			return;
		}

		if ( THEMEISLE_BLOCKS_DEV ) {
			$version = time();
		} else {
			$version = THEMEISLE_BLOCKS_VERSION;
		}

		wp_enqueue_style(
			'themeisle-block_styles',
			plugin_dir_url( $this->get_dir() ) . 'build/style.css',
			[],
			$version
		);

		$has_map    = false;
		$has_slider = false;

		if ( is_singular() ) {
			if ( has_block( 'themeisle-blocks/google-map' ) ) {
				$has_map = true;
			}

			if ( has_block( 'themeisle-blocks/slider' ) ) {
				$has_slider = true;
			}
		} else {
			$posts = wp_list_pluck( $wp_query->posts, 'ID' );

			foreach ( $posts as $post ) {
				if ( has_block( 'themeisle-blocks/google-map', $post ) ) {
					$has_map = true;
				}

				if ( has_block( 'themeisle-blocks/slider' ) ) {
					$has_slider = true;
				}
			}
		}

		if ( $has_map ) {
			// Get the API key.
			$apikey = get_option( 'themeisle_google_map_block_api_key' );

			// Don't output anything if there is no API key.
			if ( null === $apikey || empty( $apikey ) || ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) ) {
				return;
			}

			wp_enqueue_script(
				'themeisle-gutenberg-google-maps',
				plugin_dir_url( $this->get_dir() ) . 'build/maps.js',
				'',
				$version,
				true
			);

			wp_enqueue_script( //phpcs:ignore WordPress.WP.EnqueuedResourceParameters.NoExplicitVersion
				'google-maps',
				'https://maps.googleapis.com/maps/api/js?key=' . esc_attr( $apikey ) . '&libraries=places&callback=initMapScript',
				array( 'themeisle-gutenberg-google-maps' ),
				'',
				true
			);
		}

		if ( $has_slider ) {
			wp_enqueue_script(
				'glidejs',
				plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.min.js',
				array(),
				$version,
				true
			);
	
			wp_enqueue_script(
				'themeisle-gutenberg-slider',
				plugin_dir_url( $this->get_dir() ) . 'build/slider.js',
				array( 'glidejs', 'wp-dom-ready', 'lodash' ),
				$version,
				true
			);
	
			wp_enqueue_style(
				'glidejs-core',
				plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.core.min.css',
				[],
				$version
			);
	
			wp_enqueue_style(
				'glidejs-theme',
				plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.theme.min.css',
				[],
				$version
			);
		}
	}

	/**
	 * Get if the version of plugin in latest.
	 *
	 * @since   1.2.0
	 * @access  public
	 */
	public function is_compatible() {
		if ( ! function_exists( 'plugins_api' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
		}

		if ( ! defined( 'OTTER_BLOCKS_VERSION' ) ) {
			return true;
		}

		$current = OTTER_BLOCKS_VERSION;

		$args = array(
			'slug'   => 'otter-blocks',
			'fields' => array(
				'version' => true,
			),
		);

		$call_api = plugins_api( 'plugin_information', $args );

		if ( is_wp_error( $call_api ) ) {
			return true;    
		} else {
			if ( ! empty( $call_api->version ) ) {
				$latest = $call_api->version;
			}
		}

		return version_compare( $current, $latest, '>=' );
	}

	/**
	 * Autoload server side blocks.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function load_server_side_blocks() {
		$classnames = array(
			'\ThemeIsle\GutenbergBlocks\Render\About_Author_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Google_Map_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Plugin_Card_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Posts_Grid_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Sharing_Icons_Block',
		);

		foreach ( $classnames as $classname ) {
			$block = new $classname();

			if ( method_exists( $block, 'register_block' ) ) {
				$block->register_block();
			}
		}
	}

	/**
	 * Autoload classes for each block.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function autoload_classes() {
		$classnames = array(
			'\ThemeIsle\GutenbergBlocks\CSS\Block_Frontend',
			'\ThemeIsle\GutenbergBlocks\CSS\CSS_Handler',
			'\ThemeIsle\GutenbergBlocks\Plugins\Options_Settings',
			'\ThemeIsle\GutenbergBlocks\Server\Plugin_Card_Server',
			'\ThemeIsle\GutenbergBlocks\Server\Template_Library_Server',
		);

		foreach ( $classnames as $classname ) {
			$classname = new $classname();

			if ( method_exists( $classname, 'instance' ) ) {
				$classname->instance();
			}
		}
	}

	/**
	 * Render server-side CSS
	 *
	 * @param string $post_id Post id.
	 *
	 * @since   1.1.0
	 * @access  public
	 */
	public function render_server_side_css( $post_id = '' ) {
		$post = $post_id ? $post_id : get_the_ID();
		if ( function_exists( 'has_blocks' ) && has_blocks( $post ) ) {
			if ( class_exists( '\ThemeIsle\GutenbergBlocks\CSS\Block_Frontend' ) ) {
				$class = '\ThemeIsle\GutenbergBlocks\CSS\Block_Frontend';
				$path  = new $class();
				return $path->enqueue_styles( $post, true );
			}
		}
	}

	/**
	 * Register our custom block category.
	 *
	 * @since   1.0.0
	 * @access public
	 * @return mixed
	 * @param array $categories All categories.
	 * @link   https://wordpress.org/gutenberg/handbook/extensibility/extending-blocks/#managing-block-categories
	 */
	public function block_categories( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'themeisle-blocks',
					'title' => $this->name,
				),
			)
		);
	}

	/**
	 * Method to return path to child class in a Reflective Way.
	 *
	 * @since   1.0.0
	 * @access  protected
	 * @return  string
	 */
	protected function get_dir() {
		return dirname( __FILE__ );
	}

	/**
	 * Singleton method.
	 *
	 * @static
	 * @since   1.0.0
	 * @access  public
	 * @param   array $name Category Name.
	 * @return  GutenbergBlocks
	 */
	public static function instance( $name ) {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self( $name );
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
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access  public
	 * @since   1.0.0
	 * @return  void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}
