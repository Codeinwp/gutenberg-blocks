<?php
/**
 * Css handling logic for blocks.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

/**
 * Class Circular_Counter_CSS
 */
class Countdown_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'countdown';

	/**
	 * Generate Circle Counter CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.3.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$css = new CSS_Utility( $block );

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component:not([name="separator"])',
				'properties' => array(
					array(
						'property' => 'background-color',
						'value'    => 'backgroundColor',
					),
					array(
						'property' => 'width',
						'value'    => 'width',
						'unit'     => 'px',
					),
					array(
						'property' => 'border-width',
						'value'    => 'borderWidth',
						'unit'     => 'px',
					),
					array(
						'property' => 'border-color',
						'value'    => 'borderColor',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component:not([name="separator"])',
				'properties' => array(
					array(
						'property' => 'width',
						'value'    => 'widthTablet',
						'unit'     => 'px',
					),
					array(
						'property' => 'border-width',
						'value'    => 'borderWidthTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component:not([name="separator"])',
				'properties' => array(
					array(
						'property' => 'width',
						'value'    => 'widthMobile',
						'unit'     => 'px',
					),
					array(
						'property' => 'border-width',
						'value'    => 'borderWidthMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component:not([name="separator"]).is-custom-style',
				'properties' => array(
					array(
						'property' => 'border-radius',
						'value'    => 'borderRadius',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component:not([name="separator"]).is-custom-style',
				'properties' => array(
					array(
						'property' => 'border-radius',
						'value'    => 'borderRadiusTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component:not([name="separator"]).is-custom-style',
				'properties' => array(
					array(
						'property' => 'border-radius',
						'value'    => 'borderRadiusMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'height',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'heightTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'heightMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display',
				'properties' => array(
					array(
						'property' => 'gap',
						'value'    => 'gap',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display',
				'properties' => array(
					array(
						'property' => 'gap',
						'value'    => 'gapTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display',
				'properties' => array(
					array(
						'property' => 'gap',
						'value'    => 'gapMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_value',
				'properties' => array(
					array(
						'property' => 'color',
						'value'    => 'valueColor',
					),
					array(
						'property' => 'font-size',
						'value'    => 'valueFontSize',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_value',
				'properties' => array(
					array(
						'property' => 'font-size',
						'value'    => 'valueFontSizeTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_value',
				'properties' => array(
					array(
						'property' => 'font-size',
						'value'    => 'valueFontSizeMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_label',
				'properties' => array(
					array(
						'property' => 'color',
						'value'    => 'labelColor',
					),
					array(
						'property' => 'font-size',
						'value'    => 'labelFontSize',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_label',
				'properties' => array(
					array(
						'property' => 'font-size',
						'value'    => 'labelFontSizeTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_label',
				'properties' => array(
					array(
						'property' => 'font-size',
						'value'    => 'labelFontSizeMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$style = $css->generate();

		return $style;
	}
}
