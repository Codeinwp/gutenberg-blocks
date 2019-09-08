<?php

namespace ThemeIsle\BlockCSS;

use ThemeIsle\BlockCSS;

/**
 * Class Block_Frontend
 */
class Block_Frontend extends BlockCSS {

	/**
	 * The main instance var.
	 *
	 * @var Block_Frontend
	 */
	public static $instance = null;

	private $has_excerpt = false;

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
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_google_fonts' ), 19 );
		add_filter( 'get_the_excerpt', array( $this, 'get_excerpt_start' ), 1 );
		add_action( 'wp_head', array( $this, 'render_post_css' ), 10 );
		add_filter( 'get_the_excerpt', array( $this, 'get_excerpt_end' ), 19 );
	}

	public function get_excerpt_start( $excerpt ) {
		$this->has_excerpt = true;
		return $excerpt;
	}

	public function get_excerpt_end( $excerpt ) {
		$this->has_excerpt = false;
		return $excerpt;
	}

	/**
	 * Method to define hooks needed.
	 * 
	 * @since   1.2.5
	 * @access  public
	 */
	public function enqueue_google_fonts( $post_id = '' ) {
		$post_id = $post_id ? $post_id : get_the_ID();

		$fonts_list = get_post_meta( $post_id, '_themeisle_gutenberg_block_fonts', true );

		if ( empty( $fonts_list ) ) {
			$fonts_list = self::$google_fonts;
		}

		$fonts = array();

		if ( sizeof( $fonts_list ) > 0 ) {
			foreach( $fonts_list as $font ) {
				$item = str_replace( ' ', '+', $font['fontfamily'] );
				if ( sizeof( $font['fontvariant'] ) > 0 ) {
					$item .= ':' . implode( ',', $font['fontvariant'] );
				}
				array_push( $fonts, $item );
			}

			wp_enqueue_style( 'themeisle-gutenberg-google-fonts', '//fonts.googleapis.com/css?family=' . implode( '|', $fonts ) );
		}
	}

	/**
	 * Render server-side CSS
	 * 
	 * @since   1.2.5
	 * @access  public
	 */
	public function render_post_css() {
		global $wp_query;

		if ( $this->has_excerpt ) {
			return;
		}

		if ( is_singular() ) {
			$this->get_post_css();
		}

		$posts = wp_list_pluck( $wp_query->posts, 'ID' );

		foreach( $posts as $post ) {
			$this->get_post_css( $post );
		}
	}

	/**
	 * Get Post CSS
	 * 
	 * @since   1.2.5
	 * @access  public
	 */
	public function get_post_css( $post_id = '' ) {
		$post_id = $post_id ? $post_id : get_the_ID();
		if ( function_exists( 'has_blocks' ) && has_blocks( $post_id ) ) {
			$css = $this->get_page_css_meta( $post_id );

			if ( empty( $css ) || is_preview() ) {
				$css = $this->get_page_css_inline( $post_id );
			}

			if ( empty( $css ) ) {
				return;
			}

			$style = "\n" . '<style type="text/css" media="all">' . "\n";
			$style .= $css;
			$style .= "\n" . '</style>' . "\n";

			echo $style;
		}
	}

	/**
	 * Get Blocks CSS Inline
	 * 
	 * @since   1.2.5
	 * @access  public
	 */
	public function get_page_css_inline( $post_id ) {
		global $post;

		if ( function_exists( 'has_blocks' ) && has_blocks( $post_id ) ) {
			if ( is_preview() && ( $post_id === $post->ID ) ) {
				$content = $post->post_content;
			} else {
				$content = get_post_field( 'post_content', $post_id );
			}

			$blocks = $this->parse_blocks( $content );

			if ( ! is_array( $blocks ) || empty( $blocks ) ) {
				return;
			}

			$css = $this->cycle_through_blocks( $blocks );
		}
		return $css;
	}

	/**
	 * Cycle thorugh Blocks
	 * 
	 * @since   1.2.5
	 * @access  public
	 */
	public function cycle_through_blocks( $blocks ) {
		$style = '';
		$style .= $this->cycle_through_static_blocks( $blocks );
		$style .= $this->cycle_through_reusable_blocks( $blocks );
		return $style;
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.2.5
	 * @access public
	 * @return Block_Frontend
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
