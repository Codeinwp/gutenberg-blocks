<?php
/**
 * Css handling logic for icons.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Progress_Bar_CSS
 */
class Accordion_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'accordion';

	/**
	 * Generate Accordion CSS
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

			// Label

			$style .= '#' . $attr['id'] . '  .wp-block-themeisle-blocks-accordion-block-tabs .wp-block-themeisle-blocks-accordion-tab .wp-block-themeisle-blocks-accordion-block-tab-title .wp-block-themeisle-blocks-accordion-block-tab-label {' . "\n";
			if ( isset( $attr['tabsTitleColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['tabsTitleColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['tabsTitleFontSize'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['tabsTitleFontSize'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

			// Border

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-accordion-block-tabs .wp-block-themeisle-blocks-accordion-tab {' . "\n";
			if ( isset( $attr['tabsBorderSize'] ) ) {
				$style .= '	border: solid ' . $this->get_attr_value( $attr['tabsBorderSize'] ) . 'px;' . "\n";
			}
			if ( isset( $attr['tabsBorderColor'] ) ) {
				$style .= '	border-color: ' . $this->get_attr_value( $attr['tabsBorderColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['tabsGap'] ) ) {
				$style .= '	margin-bottom: ' . $this->get_attr_value( $attr['tabsGap'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";
			
		}
			
		return $style;
	}
}
