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
 * Class Business_Hours_CSS
 */
class Business_Hours_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'business-hours';

	/**
	 * Generate Business Hours CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.7.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$css = new CSS_Utility( $block );

		$css->add_item(
			array(
				'properties' => array(
					array(
						'property' => 'background-color',
						'value'    => 'backgroundColor',
					),
					array(
						'property' => 'border-radius',
						'value'    => 'borderRadius',
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
					array(
						'property'  => 'border-style',
						'default'   => 'solid',
						'condition' => function( $attrs ) {
							return isset( $attrs['borderWidth'] ) && ! empty( $attrs['borderWidth'] );
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-business-hours__container .wp-block-themeisle-blocks-business-hours__container__title',
				'properties' => array(
					array(
						'property' => 'text-align',
						'value'    => 'titleAlignment',
					),
					array(
						'property' => 'font-size',
						'value'    => 'titleFontSize',
                        'unit'     => 'px',
					),
					array(
						'property' => 'color',
						'value'    => 'titleColor',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-business-hours__container .wp-block-themeisle-blocks-business-hours__container__content .wp-block-themeisle-blocks-business-hours-item',
				'properties' => array(
					array(
						'property' => 'padding-top',
						'value'    => 'gap',
                        'unit'     => 'px',
					),
					array(
						'property' => 'padding-bottom',
						'value'    => 'gap',
                        'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-business-hours__container .wp-block-themeisle-blocks-business-hours__container__content .wp-block-themeisle-blocks-business-hours-item:last-child',
				'properties' => array(
					array(
						'property'       => 'border-radius',
						'pattern'        => '0 0 borderRadius borderRadius',
						'pattern_values' => array(
							'borderRadius' => array(
								'value'   => 'borderRadius',
                                'unit'    => 'px',
                                'default' => 0
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['borderRadius'] ) && ! empty( $attrs['borderRadius'] );
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-business-hours__container .wp-block-themeisle-blocks-business-hours__container__content .wp-block-themeisle-blocks-business-hours-item .wp-block-themeisle-blocks-business-hours-item__label',
				'properties' => array(
					array(
						'property' => 'font-size',
						'value'    => 'itemsFontSize',
                        'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-business-hours__container .wp-block-themeisle-blocks-business-hours__container__content .wp-block-themeisle-blocks-business-hours-item .wp-block-themeisle-blocks-business-hours-item__time',
				'properties' => array(
					array(
						'property' => 'font-size',
						'value'    => 'itemsFontSize',
                        'unit'     => 'px',
					),
				),
			)
		);

		$style = $css->generate();

		return $style;
	}
}