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
class Icon_List_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'icon-list';

	/**
	 * Generate Icon List CSS
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
			$style .= '#' . $attr['id'] . '.is-style-vertical > * {' . "\n";
			if ( isset( $attr['gap'] ) ) {
				$style .= '	margin-bottom: ' . $this->get_attr_value( $attr['gap'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n"; 
 
			$style .= '#' . $attr['id'] . '.is-style-horizontal > * {' . "\n";
			if ( isset( $attr['gap'] ) ) {
				$style .= '	margin-right: ' . $this->get_attr_value( $attr['gap'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n"; 

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-icon-list-item .wp-block-themeisle-blocks-icon-list-item-content {' . "\n";
			if ( isset( $attr['defaultContentColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['defaultContentColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['defaultSize'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['defaultSize'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-icon-list-item .wp-block-themeisle-blocks-icon-list-item-content-custom {' . "\n";
			if ( isset( $attr['defaultSize'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['defaultSize'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

			if ( isset( $attr['defaultIconColor'] ) ) {
				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-icon-list-item .wp-block-themeisle-blocks-icon-list-item-icon {' . "\n";
					$style .= '	color: ' . $this->get_attr_value( $attr['defaultIconColor'] ) . ';' . "\n";
					$style .= '	fill: ' . $this->get_attr_value( $attr['defaultIconColor'] ) . ';' . "\n";
				$style .= '}' . "\n \n";
			}

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-icon-list-item i {' . "\n";
			if ( isset( $attr['defaultSize'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['defaultSize'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-icon-list-item svg {' . "\n";
			if ( isset( $attr['defaultSize'] ) ) {
				$style .= '	width: ' . $this->get_attr_value( $attr['defaultSize'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";
		}
			
		return $style;
	}
}
