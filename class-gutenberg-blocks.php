<?php

namespace ThemeIsle;

if ( ! class_exists( '\ThemeIsle\GutenbergBlocks' ) ) {
	/**
	 * Class GutenbergBlocks
	 */
	class GutenbergBlocks {

		/**
		 * @var GutenbergBlocks
		 */
		protected static $instance = null;

		protected $blocks_classes = array();

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
		 * @since   1.0.0
		 * @access  public
		 */
		public function __construct( $name ) {
			$this->name           = $name;
			$this->description    = __( 'A set of awesome Gutenberg Blocks!', 'textdomain' );
		}

		/**
		 * Method to define hooks needed.
		 *
		 * @since   1.0.0
		 * @access  public
		 */
		public function init() {
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
			add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_frontend_assets' ) );
			add_action( 'init', array( $this, 'autoload_block_classes' ), 11 );
			add_action( 'wp', array( $this, 'load_server_side_blocks' ), 11 );
			add_action( 'init', array( $this, 'register_settings' ), 99 );
			add_action( 'block_categories', array( $this, 'block_categories' ) );
		}

		/**
		 * Load Gutenberg blocks.
		 *
		 * @since   1.0.0
		 * @access  public
		 */
		public function enqueue_block_editor_assets() {
			wp_enqueue_script(
				'themeisle-gutenberg-blocks-vendor',
				plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/vendor.js',
				'',
				'',
				true
			);

			wp_enqueue_script(
				'themeisle-gutenberg-blocks',
				plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/block.js',
				array( 'wp-api', 'themeisle-gutenberg-blocks-vendor' ),
				'',
				true
			);

			wp_enqueue_style(
				'themeisle-gutenberg-blocks-editor',
				plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/edit-blocks.css',
				array( 'wp-edit-blocks' )
			);
		}

		/**
		 * Load assets for our blocks.
		 *
		 * @since   1.0.0
		 * @access  public
		 */
		public function enqueue_block_frontend_assets() {
			if ( is_admin() ) {
				return;
			}

			wp_enqueue_style(
				'themeisle-block_styles',
				plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/style.css',
				array( 'wp-blocks' )
			);

			if ( has_block( 'themeisle-blocks/chart-pie' ) ) {
				wp_enqueue_script( 'google-charts', 'https://www.gstatic.com/charts/loader.js' );
			}
		}

		/**
		 * Autoload server side blocks.
		 *
		 * @since   1.0.0
		 * @access  public
		 */
		public function load_server_side_blocks() {
			foreach ( $this->blocks_classes as $classname ) {
				if ( ! class_exists( $classname ) ) {
					continue;
				}

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
		public function autoload_block_classes() {
			// load the base class
			require_once $this->get_dir() .  '/class-base-block.php';
			$ss_blocks = glob( $this->get_dir() .  '/blocks/*/*.php' );

			foreach ( $ss_blocks as $block ) {
				require_once $block;

				// remove the class prefix and the extension
				$classname = str_replace( array( 'class-', '.php' ), '', basename( $block ) );
				// get an array of words from class names and we'll make them capitalized.
				$classname = explode( '-', $classname );
				$classname = array_map( 'ucfirst', $classname );
				// rebuild the classname string as capitalized and separated by underscores.
				$classname = 'ThemeIsle\GutenbergBlocks\\' . implode( '_', $classname );

				if ( ! class_exists( $classname ) ) {
					continue;
				}

				if ( strpos( $block, '-block.php' ) ) {
					// we need to init these blocks on a hook later than "init". See `load_server_side_blocks`
					$this->blocks_classes[] = $classname;
					continue;
				}

				$block = new $classname();

				if ( method_exists( $block, 'instance' ) ) {
					$block->instance();
				}
			}
		}

		/**
		 * Register our custom block category.
		 *
		 * @since   1.0.0
		 * @access public
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
		 * Register Settings for Google Maps Block
		 * 
		 * @since   1.0.0
		 * @access  public
		 */
		public function register_settings() {
			register_setting(
				'themeisle_google_map_block_api_key',
				'themeisle_google_map_block_api_key',
				array(
					'type'              => 'string',
					'description'       => __( 'Google Map API key for the Google Maps Gutenberg Block.', 'textdomain' ),
					'sanitize_callback' => 'sanitize_text_field',
					'show_in_rest'      => true,
					'default'           => ''
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
}