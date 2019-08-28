<?php

namespace ThemeIsle;

if ( ! class_exists( '\ThemeIsle\BlockCSS' ) ) {
	/**
	 * Class BlockCSS
	 *
	 * @package BlockCSS
	 */
	class BlockCSS {

		/**
		 * @var BlockCSS
		 */
		protected static $instance = null;

		/**
		 * The namespace under which the blocks are registered.
		 *
		 * @var string
		 */
		private $library_prefix = 'themeisle-blocks';

		/**
		 * The namespace under which the fonts are saved.
		 *
		 * @var string
		 */
		private static $google_fonts = array();

		/**
		 * BlockCSS constructor.
		 */
		public function __construct() {
			add_action( 'wp_head', array( $this, 'render_server_side_css' ) );
			add_action( 'wp_head', array( $this, 'enqueue_google_fonts' ) );
			add_filter( 'safe_style_css', array( $this, 'used_css_properties' ), 99 );
		}

		/**
		 * Parse Blocks for Gutenberg and WordPress 5.0
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function parse_blocks( $content ) {
			if ( ! function_exists( 'parse_blocks' ) ) {
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
		 * Used CSS properties
		 * 
		 * @since   1.2.0
		 * @access  public
		 */
		public function used_css_properties( $attr ) {
			$props = array(
				'background-attachment',
				'background-position',
				'background-repeat',
				'background-size',
				'border-radius',
				'border-top-left-radius',
				'border-top-right-radius',
				'border-bottom-right-radius',
				'border-bottom-left-radius',
				'box-shadow',
				'display',
				'justify-content',
				'mix-blend-mode',
				'opacity',
				'text-shadow',
				'text-transform',
				'transform'
			);

			$list = array_merge( $props, $attr );

			return $list;
		}

		/**
		 * Render server-side CSS
		 * 
		 * @since   1.1.0
		 * @access  public
		 */
		public function render_server_side_css( $post_id = '' ) {
			$post = $post_id ? $post_id : get_the_ID();

			if ( function_exists( 'has_blocks' ) && has_blocks( $post ) ) {
				$content = get_post_field( 'post_content', $post );
				$blocks = $this->parse_blocks( $content );

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
		public function cycle_through_blocks( $blocks ) {
			$style = '';
			$paths = glob( $this->get_dir() . '/src/*/*/*-css.php' );
			foreach ( $blocks as $block ) {
				foreach ( $paths as $path ) {
					require_once $path;
					// remove the class prefix and the extension
					$classname = str_replace( array( 'class-', '.php' ), '', basename( $path ) );
					// get an array of words from class names and we'll make them capitalized.
					$classname = explode( '-', $classname );
					$classname = array_map( 'ucfirst', $classname );
					// rebuild the classname string as capitalized and separated by underscores.
					$classname = implode( '_', $classname );
					$classname = str_replace( 'Css', 'CSS', $classname );
					$classname = 'ThemeIsle\BlockCSS\\' . $classname;

					if ( ! class_exists( $classname ) ) {
						continue;
					}

					$path = new $classname();

					if ( method_exists( $path, 'render_css' ) ) {
						if ( $this->library_prefix . '/' . $path->block_prefix === $block['blockName'] ) {
							$style .= $path->render_css( $block );
						}
					}
				}

				if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
					$style .= $this->cycle_through_blocks( $block['innerBlocks'] );
				}

				if ( $block['blockName'] === 'core/block' && ! empty( $block['attrs']['ref'] ) ) {
					$reusable_block = get_post( $block['attrs']['ref'] );

					if ( ! $reusable_block || 'wp_block' !== $reusable_block->post_type ) {
						return;
					}

					if ( 'publish' !== $reusable_block->post_status || ! empty( $reusable_block->post_password ) ) {
						return;
					}

					$blocks = $this->parse_blocks( $reusable_block->post_content );
					$style .= $this->cycle_through_blocks( $blocks );
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
		 * @return  BlockCSS
		 */
		public static function instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
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
