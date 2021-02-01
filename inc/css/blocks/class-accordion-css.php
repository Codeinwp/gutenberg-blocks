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
 * Class Progress_Bar_CSS.
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
		$css = new CSS_Utility( $block );
		// LABEL.
		$css->add_item( 
			array(
				'selector'   => ' .wp-block-themeisle-blocks-accordion-block-tabs .wp-block-themeisle-blocks-accordion-tab .wp-block-themeisle-blocks-accordion-block-tab-title .wp-block-themeisle-blocks-accordion-block-tab-label ',
				'properties' => array(
					array(
						'property' => 'color',
						'value'    => 'tabsTitleColor',
					),
					array(
						'property' => 'font-size',
						'value'    => 'tabsTitleFontSize',
						'unit'     => 'px',
					),
				),
			)
		);
		// CONTENT.
		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-accordion-block-tabs .wp-block-themeisle-blocks-accordion-tab .wp-block-themeisle-blocks-accordion-block-tab-content',
				'properties' => array(
					array(
						'property' => 'color',
						'value'    => 'tabsContentColor',
					),
					array(
						'property' => 'font-size',
						'value'    => 'tabsContentFontSize',
						'unit'     => 'px',
					),
				),
			)
		);
		// BORDER.
		$css->add_item( 
			array( 
				'selector'   => ' .wp-block-themeisle-blocks-accordion-block-tabs .wp-block-themeisle-blocks-accordion-tab ',
				'properties' => array(
					array(
						'property'       => 'border',
						'pattern'        => 'solid size',
						'pattern_values' => array(
							'size' => array(
								'value'   => 'tabsBorderSize',
								'unit'    => 'px',
								'default' => 2,
							),
						),
					),
					array(
						'property' => 'border-color',
						'value'    => 'tabsBorderColor',
					),
					array(
						'property' => 'border-radius',
						'value'    => 'tabsBorderRadius',
						'unit'     => 'px',
					),
					array(
						'property' => 'border-bottom',
						'value'    => 'tabsBorderBottom',
						'unit'     => 'px',
					),
					array(
						'property' => 'margin-bottom',
						'value'    => 'tabsGap',
						'unit'     => 'px',
					),
					array(
						'property'  => 'box-shadow',
						'default'   => '3px 3px 6px #ddd, -3px 3px 6px #ddd',
						'condition' => function ( $attrs ) {
							return isset( $attrs['hasShadows'] ) && true === $attrs['hasShadows'];
						},
					), 
				), 
			)
		);

		$style = $css->generate();

		return $style;
	}
}
