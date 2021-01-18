<?php

/**
 * Css handling logic for icons.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

/**
 * Class Progress_Bar_CSS
 */
class Accordion_Tab_CSS extends Base_CSS
{

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'accordion-tab';

	/**
	 * Generate Accordion Tab CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.3.0
	 * @access  public
	 */
	public function render_css($block)
	{
		$attr  = $block['attrs'];
		// $style = '';

		// if ( isset( $attr['id'] ) ) {

		// 	$style .= '#' . $attr['id'] . '  .wp-block-themeisle-blocks-accordion-block-tab-title {' . "\n";
		// 	if ( isset( $attr['titleBackgroundColor'] ) ) {
		// 		$style .= '	background-color: ' . $this->get_attr_value( $attr['titleBackgroundColor'] ) . ';' . "\n";
		// 	}
		// 	$style .= '}' . "\n \n";

		// 	$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-accordion-block-tab-title .wp-block-themeisle-blocks-accordion-block-tab-label {' . "\n";
		// 	if ( isset( $attr['titleBackgroundColor'] ) ) {
		// 		$style .= '	background-color: ' . $this->get_attr_value( $attr['titleBackgroundColor'] ) . ';' . "\n";
		// 	}
		// 	$style .= '}' . "\n \n";

		// 	$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-accordion-block-tab-toggle:checked + .wp-block-themeisle-blocks-accordion-block-tab-title + .wp-block-themeisle-blocks-accordion-block-tab-content {' . "\n";
		// 	if ( isset( $attr['contentBackgroundColor'] ) ) {
		// 		$style .= '	background-color: ' . $this->get_attr_value( $attr['contentBackgroundColor'] ) . ';' . "\n";
		// 	}
		// 	$style .= '}' . "\n \n";
		// }

		$css = new CSS_Utility($block);

		$css->add_item(
			array(
				'selector' => ' .wp-block-themeisle-blocks-accordion-block-tab-title',
				'properties' => array(
					'property' => 'background-color',
					'value' => 'titleBackgroundColor'
				)
			)
		);

		$css->add_item(
			array(
				'selector' => ' .wp-block-themeisle-blocks-accordion-block-tab-title .wp-block-themeisle-blocks-accordion-block-tab-label',
				'properties' => array(
					'property' => 'background-color',
					'value' => 'titleBackgroundColor'
				)
			)
		);

		$css->add_item(
			array(
				'selector' => ' .wp-block-themeisle-blocks-accordion-block-tab-toggle:checked + .wp-block-themeisle-blocks-accordion-block-tab-title + .wp-block-themeisle-blocks-accordion-block-tab-content',
				'properties' => array(
					'property' => 'background-color',
					'value' => 'contentBackgroundColor'
				)
			)
		);

		$style = $css->generate();

		return $style;
	}
}
