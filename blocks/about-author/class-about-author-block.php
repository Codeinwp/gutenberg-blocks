<?php

namespace ThemeIsle\GutenbergBlocks;

/**
 * Class About_Author_Block
 */
class About_Author_Block extends Base_Block {

	/**
	 * Constructor function for the module.
	 *
	 * @method __construct
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	function set_block_slug() {
		$this->block_slug = 'about-author';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	function set_attributes() {
		$this->attributes = array();
	}

	/**
	 * Block render function for server-side.
	 *
	 * This method will pe passed to the render_callback parameter and it will output
	 * the server side output of the block.
	 *
	 * @return mixed|string
	 */
	function render( $attributes ) {
		$img_markup = sprintf(
			'<a href="%1$s"><img src="%2$s" class="author-image" /></a>',
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			esc_attr( get_avatar_url( get_the_author_meta( 'ID' ), array( 'size' => 130 ) ) )
		);

		$title_markup = sprintf(
			'<h4>%1$s</h4>',
			esc_html( get_the_author_meta( 'display_name' ) )
		);

		$content_markup = sprintf(
			'<p>%1$s</p>',
			esc_html( strip_tags( get_the_author_meta( 'description' ) ) )
		);

		$class = 'wp-block-themeisle-blocks-about-author';
		return sprintf(
			'<section class="%1$s"><div class="themeisle-author-image">%2$s</div><div class="themeisle-author-data">%3$s%4$s</div></section>',
			esc_attr( $class ),
			$img_markup,
			$title_markup,
			$content_markup
		);

	}
}
