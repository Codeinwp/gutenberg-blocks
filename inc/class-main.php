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
	 * Flag to mark that progress bar scripts has been loaded.
	 *
	 * @var bool $is_progress_bar_loaded Is Map loaded?
	 */
	public static $is_progress_bar_loaded = false;
	/**
	 * Flag to mark that circulat progress bar scripts has been loaded.
	 *
	 * @var bool $is_circular_progress_bar_loaded Is Map loaded?
	 */
	public static $is_circle_counter_loaded = false;

	/**
	 * Flag to mark that lottie scripts has been loaded.
	 *
	 * @var bool $is_lottie_loaded Is Lottie loaded?
	 */
	public static $is_lottie_loaded = false;

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
			define( 'THEMEISLE_BLOCKS_VERSION', '1.6.0' );
			define( 'THEMEISLE_BLOCKS_DEV', false );
		}

		if ( THEMEISLE_BLOCKS_DEV ) {
			self::$assets_version = time();
		} else {
			self::$assets_version = THEMEISLE_BLOCKS_VERSION;
		}

		$allow_json = get_option( 'themeisle_allow_json_upload' );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_frontend_assets' ) );
		add_action( 'init', array( $this, 'autoload_classes' ), 11 );
		add_action( 'init', array( $this, 'load_server_side_blocks' ), 11 );
		add_action( 'block_categories', array( $this, 'block_categories' ) );
		add_filter( 'render_block', array( $this, 'render_amp' ), 10, 3 );

		if ( isset( $allow_json ) && true === (bool) $allow_json && ! function_exists( 'is_wpcom_vip' ) ) {
			add_filter( 'upload_mimes', array( $this, 'allow_json' ) ); //phpcs:ignore WordPressVIPMinimum.Filters.RestrictedHook.UploadMimes
			add_filter( 'wp_check_filetype_and_ext', array( $this, 'fix_mime_type_json' ), 75, 4 );
		}
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
			array( 'lodash', 'wp-api', 'wp-i18n', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-editor', 'wp-edit-post', 'wp-element', 'wp-keycodes', 'wp-plugins', 'wp-primitives', 'wp-rich-text', 'wp-server-side-render', 'wp-url', 'wp-viewport', 'themeisle-gutenberg-blocks-vendor', 'glidejs', 'lottie-player' ),
			self::$assets_version,
			true
		);

		wp_enqueue_script(
			'glidejs',
			plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.min.js',
			[],
			self::$assets_version,
			true
		);

		wp_enqueue_script(
			'lottie-player',
			plugin_dir_url( $this->get_dir() ) . 'assets/lottie/lottie-player.min.js',
			[],
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
				'optionsPath'   => admin_url( 'options-general.php?page=otter' ),
				'mapsAPI'       => $api,
				'themeDefaults' => $this->get_global_defaults(),
				'isWPVIP'       => function_exists( 'is_wpcom_vip' ),
				'canTrack'      => 'yes' === get_option( 'otter_blocks_logger_flag', false ) ? true : false,
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
	 * Loop through block content to find specified blocks.
	 *
	 * @param array  $blocks Parsed array of blocks.
	 * @param string $block_name name of the block.
	 * @param array  $target Target variable.
	 */
	public function loop_blocks( $blocks, $block_name, $target = array() ) {
		if ( is_array( $block_name ) ) {
			foreach ( $block_name as $name ) {
				$target = $this->loop_blocks( $blocks, $name, $target );
			}
		} else {
			foreach ( $blocks as $block ) {
				if ( $block_name === $block['blockName'] ) {
					array_push( $target, $block );
				}

				if ( count( $block['innerBlocks'] ) ) {
					$target = $this->loop_blocks( $block['innerBlocks'], $block_name, $target );
				}
			}
		}

		return $target;
	}

	/**
	 * Handler which checks the blocks used and enqueue the assets which needs.
	 *
	 * @param null $post Current post.
	 */
	public function enqueue_dependencies( $post = null ) {
		$content = get_the_content( $post );

		if ( strpos( $content, '<!-- wp:' ) === false ) {
			return false;
		}

		wp_enqueue_style(
			'themeisle-block_styles',
			plugin_dir_url( $this->get_dir() ) . 'build/style.css',
			[],
			self::$assets_version
		);

		if ( ! self::$is_fa_loaded && ( has_block( 'themeisle-blocks/button-group', $post ) || has_block( 'themeisle-blocks/button', $post ) || has_block( 'themeisle-blocks/font-awesome-icons', $post ) || has_block( 'themeisle-blocks/icon-list-item', $post ) || has_block( 'themeisle-blocks/sharing-icons', $post ) || has_block( 'themeisle-blocks/plugin-cards', $post ) || has_block( 'block', $post ) ) ) {
			$has_fa = false;

			if ( ( ! has_block( 'themeisle-blocks/sharing-icons', $post ) && ! has_block( 'themeisle-blocks/plugin-cards', $post ) && ! has_block( 'block', $post ) ) && ( has_block( 'themeisle-blocks/button', $post ) || has_block( 'themeisle-blocks/font-awesome-icons', $post ) || has_block( 'themeisle-blocks/icon-list-item', $post ) ) ) {
				if ( empty( $post ) ) {
					$post = get_the_ID();
				}

				$blocks = parse_blocks( $content );

				$used_blocks = $this->loop_blocks(
					$blocks,
					array(
						'themeisle-blocks/button',
						'themeisle-blocks/font-awesome-icons',
						'themeisle-blocks/icon-list',
						'themeisle-blocks/icon-list-item',
					)
				);

				foreach ( $used_blocks as $block ) {
					if ( ! $has_fa && isset( $block['attrs']['library'] ) && 'themeisle-icons' === $block['attrs']['library'] ) {
						continue;
					}

					if ( ! $has_fa && 'themeisle-blocks/button' === $block['blockName'] && ! isset( $block['attrs']['iconType'] ) ) {
						continue;
					}

					if ( ! $has_fa && 'themeisle-blocks/icon-list' === $block['blockName'] && isset( $block['attrs']['defaultLibrary'] ) && 'themeisle-icons' === $block['attrs']['defaultLibrary'] ) {
						continue;
					}

					$has_fa = true;
				}
			} else {
				$has_fa = true;
			}

			if ( $has_fa ) {
				wp_enqueue_style( 'font-awesome-5' );
				wp_enqueue_style( 'font-awesome-4-shims' );

				self::$is_fa_loaded = true;
			}
		}

		// On AMP context, we don't load JS files.
		if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
			return;
		}

		if ( ! self::$is_map_loaded && has_block( 'themeisle-blocks/google-map', $post ) ) {
			$apikey = get_option( 'themeisle_google_map_block_api_key' );

			// Don't output anything if there is no API key.
			if ( null !== $apikey && ! empty( $apikey ) ) {
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
		}

		if ( ! self::$is_glide_loaded && has_block( 'themeisle-blocks/slider', $post ) ) {
			wp_enqueue_script(
				'glidejs',
				plugin_dir_url( $this->get_dir() ) . 'assets/glide/glide.min.js',
				[],
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

		if ( ! self::$is_progress_bar_loaded && has_block( 'themeisle-blocks/progress-bar', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-progress-bar',
				plugin_dir_url( $this->get_dir() ) . 'build/progress-bar.js',
				array( 'wp-dom-ready' ),
				self::$assets_version,
				true
			);

			self::$is_progress_bar_loaded = true;
		}

		if ( ! self::$is_circle_counter_loaded && has_block( 'themeisle-blocks/circle-counter', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-circle-counter',
				plugin_dir_url( $this->get_dir() ) . 'build/circle-counter.js',
				array( 'wp-dom-ready' ),
				self::$assets_version,
				true
			);

			self::$is_circle_counter_loaded = true;
		}

		if ( ! self::$is_lottie_loaded && has_block( 'themeisle-blocks/lottie', $post ) ) {
			wp_enqueue_script(
				'lottie-player',
				plugin_dir_url( $this->get_dir() ) . 'assets/lottie/lottie-player.min.js',
				[],
				self::$assets_version,
				true
			);

			wp_enqueue_script(
				'lottie-interactivity',
				plugin_dir_url( $this->get_dir() ) . 'assets/lottie/lottie-interactivity.min.js',
				array( 'lottie-player' ),
				self::$assets_version,
				true
			);

			wp_enqueue_script(
				'themeisle-gutenberg-lottie',
				plugin_dir_url( $this->get_dir() ) . 'build/lottie.js',
				array( 'wp-dom-ready', 'lottie-player', 'lottie-interactivity' ),
				self::$assets_version,
				true
			);

			self::$is_lottie_loaded = true;
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
		if ( 'themeisle-blocks/slider' === $block['blockName'] && function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
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

		if ( 'themeisle-blocks/lottie' === $block['blockName'] && function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
			if ( ! isset( $block['attrs']['file'] ) ) {
				return $block_content;
			}

			$file = $block['attrs']['file'];
			$size = isset( $block['attrs']['width'] ) ? $block['attrs']['width'] : 400;
			$loop = ( isset( $block['attrs']['loop'] ) && true === $block['attrs']['loop'] ) ? 'true' : 'false';
			if ( isset( $block['attrs']['count'] ) ) {
				$loop = intval( $block['attrs']['count'] );
			}

			$output = '<amp-bodymovin-animation layout="responsive" width="' . intval( $size ) . '" height="' . intval( $size ) . '" loop="' . $loop . '" src="' . esc_url( $file['url'] ) . '"></amp-bodymovin-animation>';
			return $output;
		}

		return $block_content;
	}

	/**
	 * Allow JSON uploads
	 *
	 * @param array $mimes Supported mimes.
	 *
	 * @return array
	 *
	 * @since  1.5.7
	 * @access public
	 */
	public function allow_json( $mimes ) {
		$mimes['json'] = 'application/json';
		return $mimes;
	}

	/**
	 * Allow JSON uploads
	 *
	 * @param null $data File data.
	 * @param null $file File object.
	 * @param null $filename File name.
	 * @param null $mimes Supported mimes.
	 *
	 * @return array
	 *
	 * @since  1.5.7
	 * @access public
	 */
	public function fix_mime_type_json( $data = null, $file = null, $filename = null, $mimes = null ) {
		$ext = isset( $data['ext'] ) ? $data['ext'] : '';
		if ( 1 > strlen( $ext ) ) {
			$exploded = explode( '.', $filename );
			$ext      = strtolower( end( $exploded ) );
		}
		if ( 'json' === $ext ) {
			$data['type'] = 'application/json';
			$data['ext']  = 'json';
		}
		return $data;
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
