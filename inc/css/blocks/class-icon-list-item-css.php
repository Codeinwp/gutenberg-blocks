<?php
/**
 * Css handling logic for icons.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Icon_List_CSS
 */
class Icon_List_Item_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'icon-list-item';

	/**
	 * Generate Icon List Item CSS
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

			// Title.
			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-icon-list-item-title-custom {' . "\n";
			if ( isset( $attr['titleColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['titleColor'] ) . ';' . "\n";
			}
			
			$style .= '}' . "\n \n";

			
			// Icon
			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-icon-list-item-icon-custom {' . "\n";
			if ( isset( $attr['iconColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['iconColor'] ) . ';' . "\n";
			}
			
			$style .= '}' . "\n \n";
			
		}
			
		return $style;
	}
}