<?php
/**
 * About_Author_Block
 *
 * @package ThemeIsle\GutenbergBlocks\Render
 */

namespace ThemeIsle\GutenbergBlocks\Render;

use ThemeIsle\GutenbergBlocks\Base_Block;

/**
 * Class Form_Block
 */
class Form_Block extends Base_Block {

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	protected function set_block_slug() {
		$this->block_slug = 'form';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	protected function set_attributes() {
		$this->attributes = array( array() );
	}

	/**
	 * Block render function for server-side.
	 *
	 * This method will pe passed to the render_callback parameter and it will output
	 * the server side output of the block.
	 *
	 * @param array $attributes Block attrs.
	 *
	 * @return mixed|string
	 */
	protected function render( $attributes, $content = null ) {
		$output = $content;

		if ( isset( $attributes['emailTo'] ) ) {
			$output .= '<script type="text/javascript">' . "\n";
			$output .= '	/* <![CDATA[ */' . "\n";
			$output .= '		if ( ! window.themeisleOptions ) window.themeisleOptions = {};' . "\n";
			$output .= '		window.themeisleOptions.formTo = "' . base64_encode( $attributes['emailTo'] ) . '" ;' . "\n";
			$output .= '	/* ]]> */' . "\n";
			$output .= '</script>' . "\n";
		}


		return $output;
	}
}
