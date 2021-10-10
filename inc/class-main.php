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
	 * Flag to mark that Leaflet scripts has been loaded.
	 *
	 * @var bool $is_lottie_loaded Is Lottie loaded?
	 */
	public static $is_leaflet_loaded = false;

	/**
	 * Flag to mark that Tabs script has been loaded.
	 *
	 * @var bool $is_tabs_loaded Is Tabs loaded?
	 */
	public static $is_tabs_loaded = false;

	/**
	 * Flag to mark that Form script has been loaded.
	 *
	 * @var bool $is_form_loaded Is Form loaded?
	 */
	public static $is_form_loaded = false;

	/**
	 * Flag to mark that Countdown script has been loaded.
	 *
	 * @var bool $is_countdown_loaded Is Tabs loaded?
	 */
	public static $is_countdown_loaded = false;

	/**
	 * Flag to mark that Popup script has been loaded.
	 *
	 * @var bool $is_popup_loaded Is Tabs loaded?
	 */
	public static $is_popup_loaded = false;

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
		$this->description = __( 'A set of awesome Gutenberg Blocks!', 'otter-blocks' );
	}

	/**
	 * Method to define hooks needed.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function init() {
		if ( ! defined( 'THEMEISLE_BLOCKS_VERSION' ) ) {
			define( 'THEMEISLE_BLOCKS_VERSION', '1.7.0' );
			define( 'THEMEISLE_BLOCKS_DEV', false );
		}

		if ( THEMEISLE_BLOCKS_DEV ) {
			self::$assets_version = time();
		} else {
			self::$assets_version = THEMEISLE_BLOCKS_VERSION;
		}

		$allow_json = get_option( 'themeisle_allow_json_upload' );

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ), 1 );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_frontend_assets' ) );
		add_action( 'init', array( $this, 'autoload_classes' ), 11 );
		add_action( 'init', array( $this, 'load_server_side_blocks' ), 11 );
		add_action( 'init', array( $this, 'register_meta' ), 11 );

		add_action(
			'get_footer',
			static function () {
				if ( Main::$is_fa_loaded ) {
					wp_enqueue_style( 'font-awesome-5' );
					wp_enqueue_style( 'font-awesome-4-shims' );
				}
			}
		);
		if ( version_compare( floatval( get_bloginfo( 'version' ) ), '5.8', '>=' ) ) {
			add_filter( 'block_categories_all', array( $this, 'block_categories' ) );
		} else {
			add_filter( 'block_categories', array( $this, 'block_categories' ) );
		}

		add_filter( 'render_block', array( $this, 'render_amp' ), 10, 3 );
		add_filter( 'render_block', array( $this, 'render_blocks' ), 10, 3 );

		if ( isset( $allow_json ) && true === (bool) $allow_json && ! function_exists( 'is_wpcom_vip' ) ) {
			add_filter( 'upload_mimes', array( $this, 'allow_json' ) ); //phpcs:ignore WordPressVIPMinimum.Filters.RestrictedHook.UploadMimes
			add_filter( 'wp_check_filetype_and_ext', array( $this, 'fix_mime_type_json' ), 75, 4 );
		}
	}

	/**
	 * Subscribe to FA enqueue.
	 *
	 * @param string $block_content Block content parsed.
	 * @param array  $block Block details.
	 *
	 * @return mixed
	 */
	public function subscribe_fa( $block_content, $block ) {
		if ( ! isset( $block['blockName'] ) ) {
			return $block_content;
		}

		if ( self::$is_fa_loaded ) {
			return $block_content;
		}

		// always load for those.
		static $always_load = [
			'themeisle-blocks/sharing-icons' => true,
			'themeisle-blocks/plugin-cards'  => true,
		];

		if ( isset( $always_load[ $block['blockName'] ] ) ) {
			self::$is_fa_loaded = true;

			return $block_content;
		}

		if ( 'themeisle-blocks/button' === $block['blockName'] ) {
			if ( isset( $block['attrs']['library'] ) && 'themeisle-icons' === $block['attrs']['library'] ) {
				return $block_content;
			}

			if ( isset( $block['attrs']['iconType'] ) ) {
				self::$is_fa_loaded = true;

				return $block_content;
			}
		}

		if ( 'themeisle-blocks/font-awesome-icons' === $block['blockName'] ) {
			if ( ! isset( $block['attrs']['library'] ) ) {
				self::$is_fa_loaded = true;

				return $block_content;
			}
		}

		if ( 'themeisle-blocks/icon-list-item' === $block['blockName'] ) {
			if ( ! isset( $block['attrs']['library'] ) ) {
				self::$is_fa_loaded = true;

				return $block_content;
			}

			if ( 'fontawesome' === $block['attrs']['library'] ) {
				self::$is_fa_loaded = true;

				return $block_content;
			}
		}

		return $block_content;
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

		$deps = array( 'lodash', 'wp-api', 'wp-i18n', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-date', 'wp-element', 'wp-html-entities', 'wp-keycodes', 'wp-plugins', 'wp-primitives', 'wp-rich-text', 'wp-server-side-render', 'wp-url', 'wp-viewport', 'wp-polyfill', 'themeisle-gutenberg-blocks-vendor', 'glidejs', 'lottie-player', 'macy' );

		$current_screen = get_current_screen();

		if ( ! 'widgets' === $current_screen->base ) {
			array_push( $deps, 'wp-editor', 'wp-edit-post' );
		}

		wp_enqueue_script(
			'themeisle-gutenberg-blocks',
			plugin_dir_url( $this->get_dir() ) . 'build/blocks.js',
			$deps,
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

		wp_set_script_translations( 'themeisle-gutenberg-blocks', 'otter-blocks' );

		global $wp_roles;

		$default_fields = array();

		if ( class_exists( '\Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\Fields' ) ) {
			$fields         = new \Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\Fields();
			$default_fields = wp_json_encode( array_keys( ( $fields->get_fields() ) ) );
		}

		wp_localize_script(
			'themeisle-gutenberg-blocks',
			'themeisleGutenberg',
			array(
				'isCompatible'   => $this->is_compatible(),
				'packagePath'    => plugin_dir_url( $this->get_dir() ) . 'build/',
				'assetsPath'     => plugin_dir_url( $this->get_dir() ) . 'assets',
				'updatePath'     => admin_url( 'update-core.php' ),
				'optionsPath'    => admin_url( 'options-general.php?page=otter' ),
				'mapsAPI'        => $api,
				'themeDefaults'  => $this->get_global_defaults(),
				'imageSizes'     => function_exists( 'is_wpcom_vip' ) ? array( 'thumbnail', 'medium', 'medium_large', 'large' ) : get_intermediate_image_sizes(), //phpcs:ignore WordPressVIPMinimum.VIP.RestrictedFunctions.get_intermediate_image_sizes_get_intermediate_image_sizes
				'themeMods'      => array(
					'listingType'   => get_theme_mod( 'neve_comparison_table_product_listing_type', 'column' ),
					'altRow'        => get_theme_mod( 'neve_comparison_table_enable_alternating_row_bg_color', false ),
					'fields'        => get_theme_mod( 'neve_comparison_table_fields', $default_fields ),
					'rowColor'      => get_theme_mod( 'neve_comparison_table_rows_background_color', 'var(--nv-site-bg)' ),
					'headerColor'   => get_theme_mod( 'neve_comparison_table_header_text_color', 'var(--nv-text-color)' ),
					'textColor'     => get_theme_mod( 'neve_comparison_table_text_color', 'var(--nv-text-color)' ),
					'borderColor'   => get_theme_mod( 'neve_comparison_table_borders_color', '#BDC7CB' ),
					'altRowColor'   => get_theme_mod( 'neve_comparison_table_alternate_row_bg_color', 'var(--nv-light-bg)' ),
					'defaultFields' => $default_fields,
				),
				'isWPVIP'        => function_exists( 'is_wpcom_vip' ),
				'canTrack'       => 'yes' === get_option( 'otter_blocks_logger_flag', false ) ? true : false,
				'userRoles'      => $wp_roles->roles,
				'hasWooCommerce' => class_exists( 'WooCommerce' ),
				'hasNeveSupport' => array(
					'hasNeve'         => defined( 'NEVE_VERSION' ),
					'hasNevePro'      => defined( 'NEVE_VERSION' ) && 'valid' === apply_filters( 'product_neve_license_status', false ),
					'isBoosterActive' => 'valid' === apply_filters( 'product_neve_license_status', false ) && true === apply_filters( 'neve_has_block_editor_module', false ),
					'wooComparison'   => class_exists( '\Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\Options' ) ? \Neve_Pro\Modules\Woocommerce_Booster\Comparison_Table\Options::is_module_activated() : false,
				),
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

		wp_enqueue_script(
			'themeisle-gutenberg-map-block',
			plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet.js',
			array( 'wp-dom-ready' ),
			self::$assets_version,
			true
		);

		wp_enqueue_style(
			'leaflet-theme',
			plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet.css',
			[],
			self::$assets_version
		);

		wp_enqueue_script(
			'themeisle-gutenberg-map-block-gesture',
			plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet-gesture-handling.min.js',
			array( 'wp-dom-ready' ),
			self::$assets_version,
			true
		);

		wp_enqueue_style(
			'leaflet-theme-gesture',
			plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet-gesture-handling.min.css',
			[],
			self::$assets_version
		);

		wp_enqueue_script(
			'macy',
			plugin_dir_url( $this->get_dir() ) . 'assets/macy/macy.js',
			[],
			self::$assets_version,
			true
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
		$content = '';

		if ( 'widgets' === $post ) {
			$widgets = get_option( 'widget_block', array() );

			foreach ( $widgets as $widget ) {
				if ( is_array( $widget ) && isset( $widget['content'] ) ) {
					$content .= $widget['content'];
				}
			}

			$post = $content;
		} else {
			$content = get_the_content( $post );
		}

		if ( strpos( $content, '<!-- wp:' ) === false ) {
			return false;
		}

		wp_enqueue_style(
			'themeisle-block_styles',
			plugin_dir_url( $this->get_dir() ) . 'build/style.css',
			[],
			self::$assets_version
		);


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
				array( 'wp-dom-ready', 'lodash' ),
				self::$assets_version,
				true
			);

			self::$is_progress_bar_loaded = true;
		}

		if ( ! self::$is_circle_counter_loaded && has_block( 'themeisle-blocks/circle-counter', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-circle-counter',
				plugin_dir_url( $this->get_dir() ) . 'build/circle-counter.js',
				array( 'wp-dom-ready', 'lodash' ),
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

		if ( ! self::$is_leaflet_loaded && has_block( 'themeisle-blocks/leaflet-map', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-map-leaflet',
				plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet.js',
				array( 'wp-dom-ready' ),
				self::$assets_version,
				true
			);

			wp_enqueue_style(
				'leaflet-css',
				plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet.css',
				[],
				self::$assets_version
			);

			wp_enqueue_script(
				'themeisle-gutenberg-map-leaflet-gesture',
				plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet-gesture-handling.min.js',
				array( 'wp-dom-ready' ),
				self::$assets_version,
				true
			);

			wp_enqueue_style(
				'leaflet-theme-gesture',
				plugin_dir_url( $this->get_dir() ) . 'assets/leaflet/leaflet-gesture-handling.min.css',
				[],
				self::$assets_version
			);

			wp_enqueue_script(
				'themeisle-gutenberg-leaflet-block',
				plugin_dir_url( $this->get_dir() ) . 'build/leaflet-map.js',
				array( 'wp-dom-ready', 'themeisle-gutenberg-map-leaflet', 'themeisle-gutenberg-map-leaflet-gesture', 'wp-i18n' ),
				self::$assets_version,
				true
			);

			self::$is_leaflet_loaded = true;
		}

		if ( ! self::$is_tabs_loaded && has_block( 'themeisle-blocks/tabs', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-tabs',
				plugin_dir_url( $this->get_dir() ) . 'build/tabs.js',
				array( 'wp-i18n', 'wp-dom-ready' ),
				self::$assets_version,
				true
			);

			self::$is_tabs_loaded = true;
		}

		if ( ! self::$is_form_loaded && has_block( 'themeisle-blocks/form', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-form',
				plugin_dir_url( $this->get_dir() ) . 'build/form.js',
				array( 'wp-i18n', 'wp-dom-ready', 'wp-api-fetch' ),
				self::$assets_version,
				true
			);

			wp_localize_script(
				'themeisle-gutenberg-form',
				'themeisleGutenbergForm',
				array(
					'reRecaptchaSitekey' => get_option( 'themeisle_google_captcha_api_site_key' ),
				)
			);

			self::$is_form_loaded = true;
		}

		if ( ! self::$is_countdown_loaded && has_block( 'themeisle-blocks/countdown', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-countdown',
				plugin_dir_url( $this->get_dir() ) . 'build/countdown.js',
				array( 'wp-i18n', 'wp-date', 'wp-dom-ready', 'lodash', 'moment' ),
				self::$assets_version,
				true
			);

			self::$is_countdown_loaded = true;
		}

		if ( ! self::$is_popup_loaded && has_block( 'themeisle-blocks/popup', $post ) ) {
			wp_enqueue_script(
				'themeisle-gutenberg-popup',
				plugin_dir_url( $this->get_dir() ) . 'build/popup.js',
				array( 'wp-dom-ready' ),
				self::$assets_version,
				true
			);

			wp_localize_script(
				'themeisle-gutenberg-popup',
				'themeisleGutenberg',
				array(
					'isPreview' => is_preview(),
				)
			);

			self::$is_popup_loaded = true;
		}

	}

	/**
	 * Load assets for our blocks.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function enqueue_block_frontend_assets() {
		global $wp_query, $wp_registered_sidebars;

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

		add_filter( 'render_block', [ $this, 'subscribe_fa' ], 10, 2 );

		add_filter(
			'the_content',
			function ( $content ) {
				$this->enqueue_dependencies();

				return $content;
			}
		);

		$has_widgets = false;

		foreach ( $wp_registered_sidebars as $key => $sidebar ) {
			if ( is_active_sidebar( $key ) ) {
				$has_widgets = true;
				break;
			}
		}

		if ( $has_widgets ) {
			$this->enqueue_dependencies( 'widgets' );
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
			'\ThemeIsle\GutenbergBlocks\Render\Add_To_Cart_Button_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Google_Map_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Leaflet_Map_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Plugin_Card_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Posts_Grid_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Review_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Review_Comparison_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Sharing_Icons_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Form_Nonce_Block',
			'\ThemeIsle\GutenbergBlocks\Render\Woo_Comparison_Block',

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
			'\ThemeIsle\GutenbergBlocks\Plugins\Block_Conditions',
			'\ThemeIsle\GutenbergBlocks\Plugins\Options_Settings',
			'\ThemeIsle\GutenbergBlocks\Server\Filter_Blocks_Server',
			'\ThemeIsle\GutenbergBlocks\Server\Plugin_Card_Server',
			'\ThemeIsle\GutenbergBlocks\Server\Template_Library_Server',
			'\ThemeIsle\GutenbergBlocks\Server\Form_Server',
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
	 * Register post meta.
	 *
	 * @return mixed
	 * @since  1.7.0
	 * @access public
	 * @link   https://developer.wordpress.org/reference/functions/register_meta/
	 */
	public function register_meta() {
		register_post_meta(
			'',
			'_themeisle_gutenberg_block_has_review',
			array(
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Render Blocks
	 *
	 * @param string $block_content Content of block.
	 * @param array  $block Block Attributes.
	 *
	 * @return mixed
	 * @since  1.7.0
	 * @access public
	 */
	public function render_blocks( $block_content, $block ) {
		if ( ! is_admin() && 'core/gallery' === $block['blockName'] && isset( $block['attrs']['isMasonry'] ) ) {
			wp_enqueue_script(
				'macy',
				plugin_dir_url( $this->get_dir() ) . 'assets/macy/macy.js',
				[],
				self::$assets_version,
				true
			);

			wp_enqueue_script(
				'themeisle-gutenberg-masonry',
				plugin_dir_url( $this->get_dir() ) . 'build/masonry.js',
				array( 'wp-dom-ready', 'macy' ),
				self::$assets_version,
				true
			);

			$margin = isset( $block['attrs']['margin'] ) ? $block['attrs']['margin'] : 0;

			$output = '<div class="otter-masonry" data-margin="' . $margin . '">' . $block_content . '</div>';

			return $output;
		}

		return $block_content;
	}

	/**
	 * Render Blocks for AMP
	 *
	 * @param string $block_content Content of block.
	 * @param array  $block Block Attributes.
	 *
	 * @return mixed
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

		if ( 'themeisle-blocks/circle-counter' === $block['blockName'] && function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
			$id     = $block['attrs']['id'];
			$output = '<div id="' . $id . '" class="wp-block-themeisle-blocks-circle-counter">';

			if ( 'default' === ( isset( $block['attrs']['titleStyle'] ) ? $block['attrs']['titleStyle'] : 'default' ) ) {
				$output .= '<div class="wp-block-themeisle-blocks-circle-counter-title__area">';
				$output .= '<span class="wp-block-themeisle-blocks-circle-counter-title__value">';
				$output .= esc_html( isset( $block['attrs']['title'] ) ? $block['attrs']['title'] : __( 'Skill', 'otter-blocks' ) );
				$output .= '</span>';
				$output .= '</div>';
			}

			$output .= '<div class="wp-block-themeisle-blocks-circle-counter__bar">';
			$output .= '<div class="wp-block-themeisle-blocks-circle-counter-container">';
			$output .= '<span class="wp-block-themeisle-blocks-circle-counter-text">' . intval( isset( $block['attrs']['percentage'] ) ? $block['attrs']['percentage'] : 50 ) . '%</span>';
			$output .= '<div class="wp-block-themeisle-blocks-circle-counter-overlay"></div>';
			$output .= '<div class="wp-block-themeisle-blocks-circle-counter-status"></div>';
			$output .= '<div class="wp-block-themeisle-blocks-circle-counter-status"></div>';
			$output .= '</div>';
			$output .= '</div>';

			if ( 'bottom' === ( isset( $block['attrs']['titleStyle'] ) ? $block['attrs']['titleStyle'] : 'default' ) ) {
				$output .= '<div class="wp-block-themeisle-blocks-circle-counter-title__area">';
				$output .= '<span class="wp-block-themeisle-blocks-circle-counter-title__value">';
				$output .= esc_html( isset( $block['attrs']['title'] ) ? $block['attrs']['title'] : __( 'Skill', 'otter-blocks' ) );
				$output .= '</span>';
				$output .= '</div>';
			}

			$output .= '</div>';
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
	 * Get currency symbol
	 *
	 * @param string $currency Currency.
	 *
	 * @return string
	 */
	public static function get_currency( $currency = 'USD' ) {
		$symbols = apply_filters(
			'themeisle_gutenberg_currency_symbols',
			array(
				'AED' => '&#x62f;.&#x625;',
				'AFN' => '&#x60b;',
				'ALL' => 'L',
				'AMD' => 'AMD',
				'ANG' => '&fnof;',
				'AOA' => 'Kz',
				'ARS' => '&#36;',
				'AUD' => '&#36;',
				'AWG' => 'Afl.',
				'AZN' => 'AZN',
				'BAM' => 'KM',
				'BBD' => '&#36;',
				'BDT' => '&#2547;&nbsp;',
				'BGN' => '&#1083;&#1074;.',
				'BHD' => '.&#x62f;.&#x628;',
				'BIF' => 'Fr',
				'BMD' => '&#36;',
				'BND' => '&#36;',
				'BOB' => 'Bs.',
				'BRL' => '&#82;&#36;',
				'BSD' => '&#36;',
				'BTC' => '&#3647;',
				'BTN' => 'Nu.',
				'BWP' => 'P',
				'BYR' => 'Br',
				'BYN' => 'Br',
				'BZD' => '&#36;',
				'CAD' => '&#36;',
				'CDF' => 'Fr',
				'CHF' => '&#67;&#72;&#70;',
				'CLP' => '&#36;',
				'CNY' => '&yen;',
				'COP' => '&#36;',
				'CRC' => '&#x20a1;',
				'CUC' => '&#36;',
				'CUP' => '&#36;',
				'CVE' => '&#36;',
				'CZK' => '&#75;&#269;',
				'DJF' => 'Fr',
				'DKK' => 'DKK',
				'DOP' => 'RD&#36;',
				'DZD' => '&#x62f;.&#x62c;',
				'EGP' => 'EGP',
				'ERN' => 'Nfk',
				'ETB' => 'Br',
				'EUR' => '&euro;',
				'FJD' => '&#36;',
				'FKP' => '&pound;',
				'GBP' => '&pound;',
				'GEL' => '&#x20be;',
				'GGP' => '&pound;',
				'GHS' => '&#x20b5;',
				'GIP' => '&pound;',
				'GMD' => 'D',
				'GNF' => 'Fr',
				'GTQ' => 'Q',
				'GYD' => '&#36;',
				'HKD' => '&#36;',
				'HNL' => 'L',
				'HRK' => 'kn',
				'HTG' => 'G',
				'HUF' => '&#70;&#116;',
				'IDR' => 'Rp',
				'ILS' => '&#8362;',
				'IMP' => '&pound;',
				'INR' => '&#8377;',
				'IQD' => '&#x639;.&#x62f;',
				'IRR' => '&#xfdfc;',
				'IRT' => '&#x062A;&#x0648;&#x0645;&#x0627;&#x0646;',
				'ISK' => 'kr.',
				'JEP' => '&pound;',
				'JMD' => '&#36;',
				'JOD' => '&#x62f;.&#x627;',
				'JPY' => '&yen;',
				'KES' => 'KSh',
				'KGS' => '&#x441;&#x43e;&#x43c;',
				'KHR' => '&#x17db;',
				'KMF' => 'Fr',
				'KPW' => '&#x20a9;',
				'KRW' => '&#8361;',
				'KWD' => '&#x62f;.&#x643;',
				'KYD' => '&#36;',
				'KZT' => '&#8376;',
				'LAK' => '&#8365;',
				'LBP' => '&#x644;.&#x644;',
				'LKR' => '&#xdbb;&#xdd4;',
				'LRD' => '&#36;',
				'LSL' => 'L',
				'LYD' => '&#x644;.&#x62f;',
				'MAD' => '&#x62f;.&#x645;.',
				'MDL' => 'MDL',
				'MGA' => 'Ar',
				'MKD' => '&#x434;&#x435;&#x43d;',
				'MMK' => 'Ks',
				'MNT' => '&#x20ae;',
				'MOP' => 'P',
				'MRU' => 'UM',
				'MUR' => '&#x20a8;',
				'MVR' => '.&#x783;',
				'MWK' => 'MK',
				'MXN' => '&#36;',
				'MYR' => '&#82;&#77;',
				'MZN' => 'MT',
				'NAD' => 'N&#36;',
				'NGN' => '&#8358;',
				'NIO' => 'C&#36;',
				'NOK' => '&#107;&#114;',
				'NPR' => '&#8360;',
				'NZD' => '&#36;',
				'OMR' => '&#x631;.&#x639;.',
				'PAB' => 'B/.',
				'PEN' => 'S/',
				'PGK' => 'K',
				'PHP' => '&#8369;',
				'PKR' => '&#8360;',
				'PLN' => '&#122;&#322;',
				'PRB' => '&#x440;.',
				'PYG' => '&#8370;',
				'QAR' => '&#x631;.&#x642;',
				'RMB' => '&yen;',
				'RON' => 'lei',
				'RSD' => '&#1088;&#1089;&#1076;',
				'RUB' => '&#8381;',
				'RWF' => 'Fr',
				'SAR' => '&#x631;.&#x633;',
				'SBD' => '&#36;',
				'SCR' => '&#x20a8;',
				'SDG' => '&#x62c;.&#x633;.',
				'SEK' => '&#107;&#114;',
				'SGD' => '&#36;',
				'SHP' => '&pound;',
				'SLL' => 'Le',
				'SOS' => 'Sh',
				'SRD' => '&#36;',
				'SSP' => '&pound;',
				'STN' => 'Db',
				'SYP' => '&#x644;.&#x633;',
				'SZL' => 'L',
				'THB' => '&#3647;',
				'TJS' => '&#x405;&#x41c;',
				'TMT' => 'm',
				'TND' => '&#x62f;.&#x62a;',
				'TOP' => 'T&#36;',
				'TRY' => '&#8378;',
				'TTD' => '&#36;',
				'TWD' => '&#78;&#84;&#36;',
				'TZS' => 'Sh',
				'UAH' => '&#8372;',
				'UGX' => 'UGX',
				'USD' => '&#36;',
				'UYU' => '&#36;',
				'UZS' => 'UZS',
				'VEF' => 'Bs F',
				'VES' => 'Bs.S',
				'VND' => '&#8363;',
				'VUV' => 'Vt',
				'WST' => 'T',
				'XAF' => 'CFA',
				'XCD' => '&#36;',
				'XOF' => 'CFA',
				'XPF' => 'Fr',
				'YER' => '&#xfdfc;',
				'ZAR' => '&#82;',
				'ZMW' => 'ZK',
			)
		);

		$symbol = isset( $symbols[ $currency ] ) ? $symbols[ $currency ] : '&#36;';

		return $symbol;
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
		_doing_it_wrong( __FUNCTION__, 'Cheatin&#8217; huh?', '1.0.0' );
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
		_doing_it_wrong( __FUNCTION__, 'Cheatin&#8217; huh?', '1.0.0' );
	}
}
