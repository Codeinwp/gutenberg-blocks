<?php
/**
 * Css handling logic for icons.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Circular_Counter_CSS
 */
class Circle_Counter_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'circle-counter';

	/**
	 * Generate Circle Counter CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.3.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$attr  = $block['attrs'];
		$style = '';
		

		if ( isset( $attr['id'] ) ) {

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-circle-counter-title__area .wp-block-themeisle-blocks-circle-counter-title__value {' . "\n";
			if ( isset( $attr['titleColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['titleColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['fontSizeTitle'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['fontSizeTitle'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

		}

		return $style;
	}
}
