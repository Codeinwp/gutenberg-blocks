<?php
/**
 * Loader.
 *
 * @package ThemeIsle
 */

namespace ThemeIsle\GutenbergBlocks;

use Masterminds\HTML5;

/**
 * Class Main
 */
class Main {
	/**
	 * Flag to mark that the  FA has been loaded.
	 *
	 * @var bool $is_fa_loaded Is FA loaded?
	 */
	public static $is_fa_loaded = false;
	/**
	 * Flag to mark that the Glide related scripts has been loaded.
	 *
	 * @var bool $is_glide_loaded Is FA loaded?
	 */
	public static $is_glide_loaded = false;
	/**
	 * Flag to mark that maps scripts has been loaded.
	 *
	 * @var bool $is_map_loaded Is Map loaded?
	 */
	public static $is_map_loaded = false;

	/**
	 * Define assets version.
	 *
	 * @var string $assets_version Holds assets version.
	 */
	public static $assets_version = null;
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
	 *
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
			define( 'THEMEISLE_BLOCKS_VERSION', '1.5.3' );
			define( 'THEMEISLE_BLOCKS_DEV', false );
		}

		if ( THEMEISLE_BLOCKS_DEV ) {
			self::$assets_version = time();
		} else {
			self::$assets_version = THEMEISLE_BLOCKS_VERSION;
		}

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_frontend_assets' ) );
		add_action( 'init', array( $this, 'autoload_classes' ), 11 );
		add_action( 'init', array( $this, 'load_server_side_blocks' ), 11 );
		add_action( 'block_categories', array( $this, 'block_categories' ) );
		add_filter( 'render_block', array( $this, 'render_amp' ), 10, 3 );
	}

	/**
	 * Load Gutenberg blocks.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function enqueue_block_editor_assets() {
		if ( defined( 'THEMEISLE_GUTENBERG_GOOGLE_MAPS_API' ) ) {
			$api = THEMEISLE_GUTENBERG_GOOGLE_MAPS_API;
		} else {
			$api = false;
		}

		wp_enqueue_script(
			'themeisle-gutenberg-blocks-vendor',
			plugin_dir_url( $this->get_dir() ) . 'build/chunk-vendor.js',
			array( 'react', 'react-dom' ),
			self::$assets_version,
			true
		);

		wp_enqueue_script(
			'themeisle-gutenberg-blocks',
			plugin_dir_url( $this->get_dir() ) . 'build/blocks.js',
			array( 'lodash', 'wp-api', 'wp-i18n', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-editor', 'wp-edit-post', 'wp-element', 'wp-keycodes', 'wp-plugins', 'wp-rich-text', 'wp-server-side-render', 'wp-url', 'wp-viewport', 'themeisle-gutenberg-blocks-vendor', 'glidejs' ),
			self::$assets_version,
			true
		);

		wp_enqueue_script(
			'glidejs',
			plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.min.js',
			array(),
			self::$assets_version,
			true
		);

		wp_set_script_translations( 'themeisle-gutenberg-blocks', 'textdomain' );

		wp_localize_script(
			'themeisle-gutenberg-blocks',
			'themeisleGutenberg',
			array(
				'isCompatible'  => $this->is_compatible(),
				'packagePath'   => plugin_dir_url( $this->get_dir() ) . 'build/',
				'assetsPath'    => plugin_dir_url( $this->get_dir() ) . 'assets',
				'updatePath'    => admin_url( 'update-core.php' ),
				'mapsAPI'       => $api,
				'themeDefaults' => $this->get_global_defaults(),
			)
		);

		wp_enqueue_style(
			'themeisle-gutenberg-blocks-editor',
			plugin_dir_url( $this->get_dir() ) . 'build/editor.css',
			array( 'wp-edit-blocks' ),
			self::$assets_version
		);

		wp_enqueue_style(
			'glidejs-core',
			plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.core.min.css',
			[],
			self::$assets_version
		);

		wp_enqueue_style(
			'glidejs-theme',
			plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.theme.min.css',
			[],
			self::$assets_version
		);
	}

	/**
	 * Handler which checks the blocks used and enqueue the assets which needs.
	 *
	 * @param null $post Current post.
	 */
	public function enqueue_dependencies( $post = null ) {
		if ( ! self::$is_fa_loaded && ( has_block( 'themeisle-blocks/button-group', $post ) || has_block( 'themeisle-blocks/font-awesome-icons', $post ) || has_block( 'themeisle-blocks/sharing-icons', $post ) || has_block( 'themeisle-blocks/plugin-cards', $post ) || has_block( 'block', $post ) ) ) {
			wp_enqueue_style( 'font-awesome-5' );
			wp_enqueue_style( 'font-awesome-4-shims' );

			self::$is_fa_loaded = true;
		}

		// On AMP context, we don't load JS files.
		if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
			return;
		}

		if ( ! self::$is_map_loaded && has_block( 'themeisle-blocks/google-map', $post ) ) {
			$apikey = get_option( 'themeisle_google_map_block_api_key' );

			// Don't output anything if there is no API key.
			if ( null === $apikey || empty( $apikey ) ) {
				return;
			}

			wp_enqueue_script(
				'themeisle-gutenberg-google-maps',
				plugin_dir_url( $this->get_dir() ) . 'build/maps.js',
				'',
				self::$assets_version,
				true
			);

			wp_enqueue_script( //phpcs:ignore WordPress.WP.EnqueuedResourceParameters.NoExplicitVersion
				'google-maps',
				'https://maps.googleapis.com/maps/api/js?key=' . esc_attr( $apikey ) . '&libraries=places&callback=initMapScript',
				array( 'themeisle-gutenberg-google-maps' ),
				'',
				true
			);

			self::$is_map_loaded = true;
		}

		if ( ! self::$is_glide_loaded && has_block( 'themeisle-blocks/slider', $post ) ) {
			wp_enqueue_script(
				'glidejs',
				plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.min.js',
				array(),
				self::$assets_version,
				true
			);

			wp_enqueue_script(
				'themeisle-gutenberg-slider',
				plugin_dir_url( $this->get_dir() ) . 'build/slider.js',
				array( 'glidejs', 'wp-dom-ready', 'lodash' ),
				self::$assets_version,
				true
			);

			wp_enqueue_style(
				'glidejs-core',
				plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.core.min.css',
				[],
				self::$assets_version
			);

			wp_enqueue_style(
				'glidejs-theme',
				plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.theme.min.css',
				[],
				self::$assets_version
			);

			self::$is_glide_loaded = true;
		}
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

		wp_enqueue_style(
			'themeisle-block_styles',
			plugin_dir_url( $this->get_dir() ) . 'build/style.css',
			[],
			self::$assets_version
		);

		if ( is_singular() ) {
			$this->enqueue_dependencies();
		} else {
			$posts = wp_list_pluck( $wp_query->posts, 'ID' );

			foreach ( $posts as $post ) {
				$this->enqueue_dependencies( $post );
			}
		}

		add_filter(
			'the_content',
			function ( $content ) {
				$this->enqueue_dependencies();

				return $content;
			}
		);
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
	 * Get global defaults.
	 *
	 * @since   1.4.0
	 * @access  public
	 */
	public function get_global_defaults() {
		$defaults = get_theme_support( 'otter_global_defaults' );
		if ( ! is_array( $defaults ) ) {
			return false;
		}

		return current( $defaults );
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
	 * @param array $categories All categories.
	 *
	 * @return mixed
	 * @since   1.0.0
	 * @access public
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
	 * Render Blocks for AMP
	 *
	 * @param string $block_content Content of block.
	 * @param array  $block Block Attributes.
	 *
	 * @return mixed
	 *
	 * @since  1.5.2
	 * @access public
	 */
	public function render_amp( $block_content, $block ) {
		if ( 'themeisle-blocks/slider' !== $block['blockName'] || ! ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) ) {
			return $block_content;
		}

		$html5  = new HTML5();
		$dom    = $html5->loadHTML( $block['innerHTML'] );
		$id     = $block['attrs']['id'];
		$images = $dom->getElementsByTagName( 'figure' );
		$output = '<amp-carousel id="' . $id . '" class="wp-block-themeisle-blocks-slider" width="400" height="300" layout="responsive" type="slides" autoplay delay="2000">';
		foreach ( $images as $image ) {
			$output .= $html5->saveHTML( $image );
		}
		$output .= '</amp-carousel>';

		return $output;
	}

	/**
	 * Method to return path to child class in a Reflective Way.
	 *
	 * @return  string
	 * @since   1.0.0
	 * @access  protected
	 */
	protected function get_dir() {
		return dirname( __FILE__ );
	}

	/**
	 * Singleton method.
	 *
	 * @static
	 *
	 * @param array $name Category Name.
	 *
	 * @return  GutenbergBlocks
	 * @since   1.0.0
	 * @access  public
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
	 * @return  void
	 * @since   1.0.0
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access  public
	 * @return  void
	 * @since   1.0.0
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}
