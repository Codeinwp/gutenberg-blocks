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

		public static $google_fonts = array();

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
			add_action( 'wp_head', array( $this, 'render_server_side_css' ) );
			add_action( 'wp_head', array( $this, 'enqueue_google_fonts' ) );
		}

		/**
		 * Load Gutenberg blocks.
		 *
		 * @since   1.0.0
		 * @access  public
		 */
		public function enqueue_block_editor_assets() {
			if ( THEMEISLE_GUTENBERG_BLOCKS_DEV ) {
				$version = time();
			} else {
				$version = THEMEISLE_GUTENBERG_BLOCKS_VERSION;
			}

			wp_enqueue_script(
				'themeisle-gutenberg-blocks-vendor',
				plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/vendor.js',
				'',
				$version,
				true
			);

			wp_enqueue_script(
				'themeisle-gutenberg-blocks',
				plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/block.js',
				array( 'wp-api', 'themeisle-gutenberg-blocks-vendor' ),
				$version,
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
				plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/style.css'
			);

			if ( has_block( 'themeisle-blocks/chart-pie' ) ) {
				wp_enqueue_script( 'google-charts', 'https://www.gstatic.com/charts/loader.js' );
			}
		}
		/**
		 * Method to define hooks needed.
		 *
		 * @since   1.1.0
		 * @access  public
		 */
		public function enqueue_google_fonts() {
			$fonts = array();

			if ( sizeof( self::$google_fonts ) > 0 ) {
				foreach( self::$google_fonts as $font ) {
					$item = str_replace( ' ', '+', $font['fontfamily'] );
					if ( sizeof( $font['fontvariant'] ) > 0 ) {
						$item .= ':' . implode( ',', $font['fontvariant'] );
					}
					array_push( $fonts, $item );
				}
		
				echo '<link href="//fonts.googleapis.com/css?family=' . implode( '|', $fonts ) . '" rel="stylesheet">';
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
			$blocks = glob( $this->get_dir() . '/blocks/*/*.php' );
			$components = glob( $this->get_dir() . '/components/*/*.php' );
			$paths = array_merge( $blocks, $components );

			foreach ( $paths as $path ) {
				require_once $path;

				// remove the class prefix and the extension
				$classname = str_replace( array( 'class-', '.php' ), '', basename( $path ) );
				// get an array of words from class names and we'll make them capitalized.
				$classname = explode( '-', $classname );
				$classname = array_map( 'ucfirst', $classname );
				// rebuild the classname string as capitalized and separated by underscores.
				$classname = 'ThemeIsle\GutenbergBlocks\\' . implode( '_', $classname );

				if ( ! class_exists( $classname ) ) {
					continue;
				}

				if ( strpos( $path, '-block.php' ) ) {
					// we need to init these blocks on a hook later than "init". See `load_server_side_blocks`
					$this->blocks_classes[] = $classname;
					continue;
				}

				$path = new $classname();

				if ( method_exists( $path, 'instance' ) ) {
					$path->instance();
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
		 * Parse Blocks for Gutenberg and WordPress 5.0
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function parse_blocks( $content ) {
			if ( function_exists( 'gutenberg_parse_blocks' ) ) {
				return gutenberg_parse_blocks( $content );
			} else {
				return parse_blocks( $content );
			}
		}

		/**
		 * Get block attribute value with default
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function get_attr_value( $attr, $default = 'unset' ) {
			if ( isset( $attr ) ) {
				return $attr;
			} else {
				return $default;
			}
		}

		/**
		 * Get Google Fonts
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function get_google_fonts( $attr ) {
			if ( isset( $attr['fontFamily'] ) ) {
				if ( ! array_key_exists( $attr['fontFamily'], self::$google_fonts ) ) {
					self::$google_fonts[ $attr['fontFamily'] ] = array(
						'fontfamily' => $attr['fontFamily'],
						'fontvariant' => ( isset( $attr['fontVariant'] ) && ! empty( $attr['fontVariant'] ) ? array( $attr['fontVariant'] ) : array() )
					);
				} else {
					if ( ! in_array( $attr['fontVariant'], self::$google_fonts[ $attr['fontFamily'] ]['fontvariant'], true ) ) {
						array_push( self::$google_fonts[ $attr['fontFamily'] ]['fontvariant'], ( isset( $attr['fontStyle'] ) && $attr['fontStyle'] === 'italic' ) ? $attr['fontVariant'] . ':i' : $attr['fontVariant'] );
					}
				}
			}
		}

		/**
		 * Convert HEX to RGBA
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function hex2rgba( $color, $opacity = false ) {
			$default = 'rgb(0,0,0)';

			if ( empty( $color ) ) {
				return $default; 
			}

				if ( $color[0] == '#' ) {
					$color = substr( $color, 1 );
				}

				if ( strlen( $color ) == 6 ) {
					$hex = array( $color[0] . $color[1], $color[2] . $color[3], $color[4] . $color[5] );
				} elseif ( strlen( $color ) == 3 ) {
					$hex = array( $color[0] . $color[0], $color[1] . $color[1], $color[2] . $color[2] );
				} else {
					return $default;
				}
		 
				$rgb = array_map( 'hexdec', $hex );
		 
				if( $opacity ) {
					if( abs( $opacity ) > 1 ) {
						$opacity = 1.0;
					}
					$output = 'rgba( '.implode( ',', $rgb ) . ',' . $opacity . ' )';
				} else {
					$output = 'rgb( ' .implode( ',', $rgb ) . ' )';
				}
		 
				return $output;
		}

		/**
		 * Render server-side CSS
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function render_server_side_css() {
			if ( function_exists( 'has_blocks' ) && has_blocks( get_the_ID() ) ) {
				global $post;

				if ( ! is_object( $post ) ) {
					return;
				}

				$blocks = $this->parse_blocks( $post->post_content );

				if ( ! is_array( $blocks ) || empty( $blocks ) ) {
					return;
				}

				$style = "\n" . '<style type="text/css" media="all">' . "\n";
				$style .= $this->cycle_through_blocks( $blocks );
				$style .= "\n" . '</style>' . "\n";

				echo $style;
			}
		}

		/**
		 * Cycle thorugh innerBlocks
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function cycle_through_blocks( $innerBlocks ) {
			$style = '';
			foreach ( $innerBlocks as $block ) {
				if ( 'themeisle-blocks/advanced-columns' === $block['blockName'] ) {
					$style .= $this->generate_advanced_columns_css( $block );
				}

				if ( 'themeisle-blocks/advanced-column' === $block['blockName'] ) {
					$style .= $this->generate_advanced_column_css( $block );
				}

				if ( 'themeisle-blocks/advanced-heading' === $block['blockName'] ) {
					$style .= $this->generate_advanced_heading_css( $block );
				}

				if ( 'themeisle-blocks/button-group' === $block['blockName'] ) {
					$style .= $this->generate_button_group_css( $block );
				}

				if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
					$style .= $this->cycle_through_blocks( $block['innerBlocks'] );
				}
			}
			return $style;
		}

		/**
		 * Generate Advanced Columns CSS
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function generate_advanced_columns_css( $block ) {
			$attr = $block['attrs'];
			$style = '';

			if ( isset( $attr['id'] ) ) {
				$style .= '#' . $attr['id'] . ' {' . "\n";
				if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
					$style .= '	padding: ' . $this->get_attr_value( ( isset( $attr['padding'] ) ? $attr['padding'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
					$style .= '	padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTop'] ) ? $attr['paddingTop'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRight'] ) ? $attr['paddingRight'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottom'] ) ? $attr['paddingBottom'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeft'] ) ? $attr['paddingLeft'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'linked' ) ) {
					$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'linked' ) ) {
					$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTop'] ) ? $attr['marginTop'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottom'] ) ? $attr['marginBottom'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'custom' !== $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) {
					$style .= '	min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) . ';' . "\n";
				}

				if ( ( 'custom' === $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) && isset( $attr['columnsHeightCustom'] ) ) {
					$style .= '	min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeightCustom'] ) ? $attr['columnsHeightCustom'] : null ) ) . 'px;' . "\n";
				}
				$style .= '}' . "\n \n";

				if ( isset( $attr['dividerTopWidth'] ) ) {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
						$style .= '	transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidth'] ) ? $attr['dividerTopWidth'] : null ) ) / 100 . ' );' . "\n";
					$style .= '}' . "\n \n";
				}

				if ( isset( $attr['dividerTopHeight'] ) ) {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg {' . "\n";
						$style .= '	height: ' . $this->get_attr_value( ( isset( $attr['dividerTopHeight'] ) ? $attr['dividerTopHeight'] : null ) ) . 'px;' . "\n";
					$style .= '}' . "\n \n";
				}

				if ( isset( $attr['dividerBottomWidth'] ) ) {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
						$style .= '	transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidth'] ) ? $attr['dividerBottomWidth'] : null ) ) / 100 . ' );' . "\n";
					$style .= '}' . "\n \n";
				}

				if ( isset( $attr['dividerBottomHeight'] ) ) {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg {' . "\n";
						$style .= '	height: ' . $this->get_attr_value( ( isset( $attr['dividerBottomHeight'] ) ? $attr['dividerBottomHeight'] : null ) ) . 'px;' . "\n";
					$style .= '}' . "\n \n";
				}

				$style .= '@media ( min-width: 600px ) and ( max-width: 960px )  {' . "\n";
	
					$style .= '	#' . $attr['id'] . ' {' . "\n";
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingTablet'] ) ? $attr['paddingTablet'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopTablet'] ) ? $attr['paddingTopTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightTablet'] ) ? $attr['paddingRightTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomTablet'] ) ? $attr['paddingBottomTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftTablet'] ) ? $attr['paddingLeftTablet'] : null ), 20 ) . 'px;' . "\n";
					}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopTablet'] ) ? $attr['marginTopTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomTablet'] ) ? $attr['marginBottomTablet'] : null ), 20 ) . 'px;' . "\n";
					}
	
					if ( ( 'custom' === $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) && isset( $attr['columnsHeightCustomTablet'] ) ) {
						$style .= '		min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeightCustomTablet'] ) ? $attr['columnsHeightCustomTablet'] : null ) ) . 'px;' . "\n";
					}
					$style .= '	}' . "\n \n";
	
					if ( isset( $attr['dividerTopWidthTablet'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
							$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidthTablet'] ) ? $attr['dividerTopWidthTablet'] : null ) ) / 100 . ' );' . "\n";
						$style .= '	}' . "\n \n";
					}
		
					if ( isset( $attr['dividerTopHeightTablet'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg {' . "\n";
							$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerTopHeightTablet'] ) ? $attr['dividerTopHeightTablet'] : null ) ) . 'px;' . "\n";
						$style .= '	}' . "\n \n";
					}
		
					if ( isset( $attr['dividerBottomWidthTablet'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
							$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidthTablet'] ) ? $attr['dividerBottomWidthTablet'] : null ) ) / 100 . ' );' . "\n";
						$style .= '	}' . "\n \n";
					}
		
					if ( isset( $attr['dividerBottomHeightTablet'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg {' . "\n";
							$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerBottomHeightTablet'] ) ? $attr['dividerBottomHeightTablet'] : null ) ) . 'px;' . "\n";
						$style .= '	}' . "\n \n";
					}
	
				$style .= '}' . "\n \n";

				$style .= '@media ( max-width: 600px )  {' . "\n";
	
					$style .= '	#' . $attr['id'] . ' {' . "\n";
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingMobile'] ) ? $attr['paddingMobile'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopMobile'] ) ? $attr['paddingTopMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightMobile'] ) ? $attr['paddingRightMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomMobile'] ) ? $attr['paddingBottomMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftMobile'] ) ? $attr['paddingLeftMobile'] : null ), 20 ) . 'px;' . "\n";
					}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopMobile'] ) ? $attr['marginTopMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomMobile'] ) ? $attr['marginBottomMobile'] : null ), 20 ) . 'px;' . "\n";
					}
	
					if ( ( 'custom' === $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) && isset( $attr['columnsHeightCustomMobile'] ) ) {
						$style .= '		min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeightCustomMobile'] ) ? $attr['columnsHeightCustomMobile'] : null ) ) . 'px;' . "\n";
					}
					$style .= '	}' . "\n \n";
	
					if ( isset( $attr['dividerTopWidthMobile'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
							$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidthMobile'] ) ? $attr['dividerTopWidthMobile'] : null ) ) / 100 . ' );' . "\n";
						$style .= '	}' . "\n \n";
					}
		
					if ( isset( $attr['dividerTopHeightMobile'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg {' . "\n";
							$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerTopHeightMobile'] ) ? $attr['dividerTopHeightMobile'] : null ) ) . 'px;' . "\n";
						$style .= '	}' . "\n \n";
					}
		
					if ( isset( $attr['dividerBottomWidthMobile'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
							$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidthMobile'] ) ? $attr['dividerBottomWidthMobile'] : null ) ) / 100 . ' );' . "\n";
						$style .= '	}' . "\n \n";
					}
		
					if ( isset( $attr['dividerBottomHeightMobile'] ) ) {
						$style .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg {' . "\n";
							$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerBottomHeightMobile'] ) ? $attr['dividerBottomHeightMobile'] : null ) ) . 'px;' . "\n";
						$style .= '	}' . "\n \n";
					}
	
				$style .= '}' . "\n \n";
			}

			return $style;
		}

		/**
		 * Generate Advanced Column CSS
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function generate_advanced_column_css( $block ) {
			$attr = $block['attrs'];
			$style = '';

			if ( isset( $attr['id'] ) ) {
				$style .= '#' . $attr['id'] . ' {' . "\n";
				if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
					$style .= '	padding: ' . $this->get_attr_value( ( isset( $attr['padding'] ) ? $attr['padding'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
					$style .= '	padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTop'] ) ? $attr['paddingTop'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRight'] ) ? $attr['paddingRight'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottom'] ) ? $attr['paddingBottom'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeft'] ) ? $attr['paddingLeft'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'linked' ) ) {
					$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'linked' ) ) {
					$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTop'] ) ? $attr['marginTop'] : null ), 20 ) . 'px;' . "\n";
					$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottom'] ) ? $attr['marginBottom'] : null ), 20 ) . 'px;' . "\n";
				}
				$style .= '}' . "\n \n";

				$style .= '@media ( min-width: 600px ) and ( max-width: 960px )  {' . "\n";
	
					$style .= '	#' . $attr['id'] . ' {' . "\n";
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingTablet'] ) ? $attr['paddingTablet'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopTablet'] ) ? $attr['paddingTopTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightTablet'] ) ? $attr['paddingRightTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomTablet'] ) ? $attr['paddingBottomTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftTablet'] ) ? $attr['paddingLeftTablet'] : null ), 20 ) . 'px;' . "\n";
					}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopTablet'] ) ? $attr['marginTopTablet'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomTablet'] ) ? $attr['marginBottomTablet'] : null ), 20 ) . 'px;' . "\n";
					}
					$style .= '	}' . "\n \n";
	
				$style .= '}' . "\n \n";

				$style .= '@media ( max-width: 600px )  {' . "\n";
	
					$style .= '	#' . $attr['id'] . ' {' . "\n";
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingMobile'] ) ? $attr['paddingMobile'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopMobile'] ) ? $attr['paddingTopMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightMobile'] ) ? $attr['paddingRightMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomMobile'] ) ? $attr['paddingBottomMobile'] : null ), 20 ) . 'px;' . "\n";
							$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftMobile'] ) ? $attr['paddingLeftMobile'] : null ), 20 ) . 'px;' . "\n";
						}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 20 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopMobile'] ) ? $attr['marginTopMobile'] : null ), 20 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomMobile'] ) ? $attr['marginBottomMobile'] : null ), 20 ) . 'px;' . "\n";
					}
					$style .= '	}' . "\n \n";
	
				$style .= '}' . "\n \n";
			}

			return $style;
		}

		/**
		 * Generate Advanced Heading CSS
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function generate_advanced_heading_css( $block ) {
			$attr = $block['attrs'];
			$style = '';

			if ( isset( $attr['id'] ) ) {

				$this->get_google_fonts( $attr );

				$style .= '#' . $attr['id'] . ' {' . "\n";
				if ( isset( $attr['fontSize'] ) ) {
					$style .= '	font-size: ' . $this->get_attr_value( ( isset( $attr['fontSize'] ) ? $attr['fontSize'] : null ) ) . 'px;' . "\n";
				}

				if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
					$style .= '	padding: ' . $this->get_attr_value( ( isset( $attr['padding'] ) ? $attr['padding'] : null ), 0 ) . 'px;' . "\n";
				}

				if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
					$style .= '	padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTop'] ) ? $attr['paddingTop'] : null ), 0 ) . 'px;' . "\n";
					$style .= '	padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRight'] ) ? $attr['paddingRight'] : null ), 0 ) . 'px;' . "\n";
					$style .= '	padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottom'] ) ? $attr['paddingBottom'] : null ), 0 ) . 'px;' . "\n";
					$style .= '	padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeft'] ) ? $attr['paddingLeft'] : null ), 20 ) . 'px;' . "\n";
				}

				if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'unlinked' ) ) {
					$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 0 ) . 'px;' . "\n";
					$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 0 ) . 'px;' . "\n";
				}

				if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'unlinked' ) ) {
					$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTop'] ) ? $attr['marginTop'] : null ), 0 ) . 'px;' . "\n";
					$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottom'] ) ? $attr['marginBottom'] : null ), 25 ) . 'px;' . "\n";
				}
				$style .= '}' . "\n \n";


				$style .= '#' . $attr['id'] . ' mark {' . "\n";
					if ( isset( $attr['highlightColor'] ) ) {
						$style .= '		color: ' . $this->get_attr_value( ( isset( $attr['highlightColor'] ) ? $attr['highlightColor'] : null ) ) . ';' . "\n";
					}

					if ( isset( $attr['highlightBackground'] ) ) {
						$style .= '		background: ' . $this->get_attr_value( ( isset( $attr['highlightBackground'] ) ? $attr['highlightBackground'] : null ) ) . ';' . "\n";
					}
				$style .= '}' . "\n \n";

				$style .= '@media ( min-width: 600px ) and ( max-width: 960px )  {' . "\n";
	
					$style .= '	#' . $attr['id'] . ' {' . "\n";
					if ( isset( $attr['fontSizeTablet'] ) ) {
						$style .= '		font-size: ' . $this->get_attr_value( ( isset( $attr['fontSizeTablet'] ) ? $attr['fontSizeTablet'] : null ) ) . 'px;' . "\n";
					}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingTablet'] ) ? $attr['paddingTablet'] : null ), 0 ) . 'px;' . "\n";
					}
	
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
						$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopTablet'] ) ? $attr['paddingTopTablet'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightTablet'] ) ? $attr['paddingRightTablet'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomTablet'] ) ? $attr['paddingBottomTablet'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftTablet'] ) ? $attr['paddingLeftTablet'] : null ), 0 ) . 'px;' . "\n";
					}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 0 ) . 'px;' . "\n";
					}
		
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopTablet'] ) ? $attr['marginTopTablet'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomTablet'] ) ? $attr['marginBottomTablet'] : null ), 20 ) . 'px;' . "\n";
					}
					$style .= '	}' . "\n \n";
	
				$style .= '}' . "\n \n";

				$style .= '@media ( max-width: 600px )  {' . "\n";
	
					$style .= '	#' . $attr['id'] . ' {' . "\n";
					if ( isset( $attr['fontSizeMobile'] ) ) {
						$style .= '		font-size: ' . $this->get_attr_value( ( isset( $attr['fontSizeMobile'] ) ? $attr['fontSizeMobile'] : null ) ) . 'px;' . "\n";
					}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingMobile'] ) ? $attr['paddingMobile'] : null ), 0 ) . 'px;' . "\n";
					}
	
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
						$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopMobile'] ) ? $attr['paddingTopMobile'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightMobile'] ) ? $attr['paddingRightMobile'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomMobile'] ) ? $attr['paddingBottomMobile'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftMobile'] ) ? $attr['paddingLeftMobile'] : null ), 0 ) . 'px;' . "\n";
					}
	
					if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 0 ) . 'px;' . "\n";
					}
	
					if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
						$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopMobile'] ) ? $attr['marginTopMobile'] : null ), 0 ) . 'px;' . "\n";
						$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomMobile'] ) ? $attr['marginBottomMobile'] : null ), 20 ) . 'px;' . "\n";
					}
					$style .= '	}' . "\n \n";
	
				$style .= '}' . "\n \n";
			}

			return $style;
		}

		/**
		 * Generate Button Group CSS
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function generate_button_group_css( $block ) {
			$attr = $block['attrs'];
			$style = '';

			if ( isset( $attr['id'] ) ) {
				$this->get_google_fonts( $attr );

				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button {' . "\n";
					$style .= '	margin-left: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";
					$style .= '	margin-right: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";
				$style .= '}' . "\n \n";

				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:first-child {' . "\n";
					$style .= '	margin-left: 0;' . "\n";
				$style .= '}' . "\n \n";

				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:last-child {' . "\n";
					$style .= '	margin-right: 0;' . "\n";
				$style .= '}' . "\n \n";

				$i = 0;

				foreach ( $attr['data'] as $button ) {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button-' . $i . ' {' . "\n";
						if ( isset( $button['color'] ) ) {
							$style .= '	color: ' . $button['color'] . ';' . "\n";
						}

						if ( isset( $button['background'] ) && '' !== $button['background'] ) {
							$style .= '	background: ' . $button['background'] . ';' . "\n";
						}

						if ( isset( $button['border'] ) && '' !== $button['border'] ) {
							$style .= '	border-color: ' . $button['border'] . ';' . "\n";
							$style .= '	border-style: solid;' . "\n";
						}

						if ( isset( $button['boxShadow'] ) && true === $button['boxShadow'] ) {
							$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $button['boxShadowHorizontal'] ) ? $button['boxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowVertical'] ) ? $button['boxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowBlur'] ) ? $button['boxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowSpread'] ) ? $button['boxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $button['boxShadowColor'] ) ? $button['boxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $button['boxShadowColorOpacity'] ) ? $button['boxShadowColorOpacity'] : null ), '0.5' ) / 100 ) . ';' . "\n";
						}
					$style .= '}' . "\n \n";

					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button-' . $i . ':hover {' . "\n";
						if ( isset( $button['hoverColor'] ) ) {
							$style .= '	color: ' . $button['hoverColor'] . ';' . "\n";
						}

						if ( isset( $button['hoverBackground'] ) && '' !== $button['hoverBackground'] ) {
							$style .= '	background: ' . $button['hoverBackground'] . ';' . "\n";
						}

						if ( isset( $button['hoverBorder'] ) && '' !== $button['hoverBorder'] ) {
							$style .= '	border-color: ' . $button['hoverBorder'] . ';' . "\n";
						}

						if ( isset( $button['boxShadow'] ) && true === $button['boxShadow'] ) {
							$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowHorizontal'] ) ? $button['hoverBoxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowVertical'] ) ? $button['hoverBoxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowBlur'] ) ? $button['hoverBoxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowSpread'] ) ? $button['hoverBoxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $button['hoverBoxShadowColor'] ) ? $button['hoverBoxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $button['hoverBoxShadowColorOpacity'] ) ? $button['hoverBoxShadowColorOpacity'] : null ), '0.5' ) / 100 ) . ';' . "\n";
						}
					$style .= '}' . "\n \n";
					$i++;
				}
			}

			return $style;
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