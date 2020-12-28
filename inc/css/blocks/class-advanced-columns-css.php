<?php
/**
 * Css handling logic for columns.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

/**
 * Class Advanced_Columns_CSS
 */
class Advanced_Columns_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'advanced-columns';

	/**
	 * Generate Advanced Columns CSS
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
				'properties' => array(
					array(
						'property'  => 'padding',
						'value'     => 'padding',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['paddingType'] ) && 'unlinked' === $attrs['paddingType'] );
						},
					),
					array(
						'property'  => 'padding-top',
						'value'     => 'paddingTop',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingType'] ) && 'unlinked' === $attrs['paddingType'];
						},
					),
					array(
						'property'  => 'padding-right',
						'value'     => 'paddingRight',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingType'] ) && 'unlinked' === $attrs['paddingType'];
						},
					),
					array(
						'property'  => 'padding-bottom',
						'value'     => 'paddingBottom',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingType'] ) && 'unlinked' === $attrs['paddingType'];
						},
					),
					array(
						'property'  => 'padding-left',
						'value'     => 'paddingLeft',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingType'] ) && 'unlinked' === $attrs['paddingType'];
						},
					),
					array(
						'property'  => 'margin-top',
						'value'     => 'margin',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'];
						},
					),
					array(
						'property'  => 'margin-bottom',
						'value'     => 'margin',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'];
						},
					),
					array(
						'property'  => 'margin-top',
						'value'     => 'marginTop',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'] );
						},
					),
					array(
						'property'  => 'margin-bottom',
						'value'     => 'marginBottom',
						'unit'      => 'px',
						'default'   => 20,
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'] );
						},
					),
					array(
						'property' => 'justify-content',
						'value'    => 'horizontalAlign',
						'default'  => 'unset',
					),
					array(
						'property'  => 'min-height',
						'value'     => 'columnsHeight',
						'default'   => 'auto',
						'condition' => function( $attrs ) {
							return ! isset( $attrs['columnsHeight'] ) || 'custom' !== $attrs['columnsHeight'];
						},
					),
					array(
						'property'  => 'min-height',
						'value'     => 'columnsHeightCustom',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['columnsHeight'] ) && 'custom' === $attrs['columnsHeight'];
						},
					),
					array(
						'property'  => 'background',
						'value'     => 'backgroundColor',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['backgroundType'] ) && 'color' !== $attrs['backgroundType'] );
						},
					),
					array(
						'property'       => 'background',
						'pattern'        => 'url( \'imageURL\' ) repeat attachment position/size',
						'pattern_values' => array(
							'imageURL'   => array(
								'value' => 'backgroundImageURL',
							),
							'repeat'     => array(
								'value'   => 'backgroundRepeat',
								'default' => 'repeat',
							),
							'attachment' => array(
								'value'   => 'backgroundAttachment',
								'default' => 'scroll',
							),
							'position'   => array(
								'value'   => 'backgroundPosition',
								'default' => 'top left',
							),
							'size'       => array(
								'value'   => 'backgroundSize',
								'default' => 'auto',
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'image' === $attrs['backgroundType'] && isset( $attrs['backgroundImageURL'] );
						},
					),
					array(
						'property'  => 'background',
						'value'     => 'backgroundGradient',
						'default'   => 'linear-gradient(90deg,rgba(54,209,220,1) 0%,rgba(91,134,229,1) 100%)',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'gradient' === $attrs['backgroundType'] && isset( $attrs['backgroundGradient'] );
						},
					),
					array(
						'property'       => 'background',
						'pattern'        => 'linear-gradient( angle, firstColor firstLocation, secondColor secondLocation )',
						'pattern_values' => array(
							'angle'          => array(
								'value'   => 'backgroundGradientAngle',
								'unit'    => 'deg',
								'default' => 90,
							),
							'firstColor'     => array(
								'value'   => 'backgroundGradientFirstColor',
								'default' => '#36d1dc',
							),
							'firstLocation'  => array(
								'value'   => 'backgroundGradientFirstLocation',
								'unit'    => '%',
								'default' => 0,
							),
							'secondColor'    => array(
								'value'   => 'backgroundGradientSecondColor',
								'default' => '#5b86e5',
							),
							'secondLocation' => array(
								'value'   => 'backgroundGradientSecondLocation',
								'unit'    => '%',
								'default' => 1000,
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'gradient' === $attrs['backgroundType'] && ! isset( $attrs['backgroundGradient'] );
						},
					),
					array(
						'property'       => 'background',
						'pattern'        => 'radial-gradient( at position, firstColor firstLocation, secondColor secondLocation )',
						'pattern_values' => array(
							'position'       => array(
								'value'   => 'backgroundGradientPosition',
								'default' => 'center center',
							),
							'firstColor'     => array(
								'value'   => 'backgroundGradientFirstColor',
								'default' => '#36d1dc',
							),
							'firstLocation'  => array(
								'value'   => 'backgroundGradientFirstLocation',
								'unit'    => '%',
								'default' => 0,
							),
							'secondColor'    => array(
								'value'   => 'backgroundGradientSecondColor',
								'default' => '#5b86e5',
							),
							'secondLocation' => array(
								'value'   => 'backgroundGradientSecondLocation',
								'unit'    => '%',
								'default' => 1000,
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'gradient' === $attrs['backgroundType'] && isset( $attrs['backgroundGradientType'] ) && 'radial' === $attrs['backgroundGradientType'];
						},
					),
					array(
						'property'       => 'border',
						'pattern'        => 'width solid color',
						'pattern_values' => array(
							'width' => array(
								'value'   => 'border',
								'unit'    => 'px',
								'default' => 0,
							),
							'color' => array(
								'value'   => 'borderColor',
								'default' => '#000000',
							),
						),
						'condition'      => function( $attrs ) {
							return ! ( isset( $attrs['borderType'] ) && 'unlinked' === $attrs['borderType'] );
						},
					),
					array(
						'property'       => 'border-width',
						'pattern'        => 'top right bottom left',
						'pattern_values' => array(
							'top'    => array(
								'value'   => 'borderTop',
								'unit'    => 'px',
								'default' => 0,
							),
							'right'  => array(
								'value'   => 'borderRight',
								'unit'    => 'px',
								'default' => 0,
							),
							'bottom' => array(
								'value'   => 'borderBottom',
								'unit'    => 'px',
								'default' => 0,
							),
							'left'   => array(
								'value'   => 'borderLeft',
								'unit'    => 'px',
								'default' => 0,
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['borderType'] ) && 'unlinked' === $attrs['borderType'];
						},
					),
					array(
						'property'  => 'border-style',
						'default'   => 'solid',
						'condition' => function( $attrs ) {
							return isset( $attrs['borderType'] ) && 'unlinked' === $attrs['borderType'];
						},
					),
					array(
						'property'  => 'border-color',
						'value'     => 'borderColor',
						'default'   => '#000000',
						'condition' => function( $attrs ) {
							return isset( $attrs['borderType'] ) && 'unlinked' === $attrs['borderType'];
						},
					),
					array(
						'property'  => 'border-radius',
						'value'     => 'borderRadius',
						'unit'      => 'px',
						'default'   => 0,
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['borderRadiusType'] ) && 'unlinked' === $attrs['borderRadiusType'] );
						},
					),
					array(
						'property'       => 'border-radius',
						'pattern'        => 'top-left top-right bottom-right bottom-left',
						'pattern_values' => array(
							'top-left'     => array(
								'value'   => 'borderRadiusTop',
								'unit'    => 'px',
								'default' => 0,
							),
							'top-right'    => array(
								'value'   => 'borderRadiusRight',
								'unit'    => 'px',
								'default' => 0,
							),
							'bottom-right' => array(
								'value'   => 'borderRadiusBottom',
								'unit'    => 'px',
								'default' => 0,
							),
							'bottom-left'  => array(
								'value'   => 'borderRadiusLeft',
								'unit'    => 'px',
								'default' => 0,
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['borderRadiusType'] ) && 'unlinked' === $attrs['borderRadiusType'];
						},
					),
					array(
						'property'       => 'box-shadow',
						'pattern'        => 'horizontal vertical blur spread color',
						'pattern_values' => array(
							'horizontal' => array(
								'value'   => 'boxShadowHorizontal',
								'unit'    => 'px',
								'default' => 0,
							),
							'vertical'   => array(
								'value'   => 'boxShadowVertical',
								'unit'    => 'px',
								'default' => 0,
							),
							'blur'       => array(
								'value'   => 'boxShadowBlur',
								'unit'    => 'px',
								'default' => 5,
							),
							'spread'     => array(
								'value'   => 'boxShadowSpread',
								'unit'    => 'px',
								'default' => 1,
							),
							'color'      => array(
								'value'   => 'boxShadowColor',
								'default' => '#000',
								'format'  => function( $value, $attrs ) {
									$opacity = ( isset( $attrs['boxShadowColorOpacity'] ) ? $attrs['boxShadowColorOpacity'] : 50 ) / 100;
									return $this->hex2rgba( $value, $opacity );
								},
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['boxShadow'] ) && true === $attrs['boxShadow'];
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' > .wp-block-themeisle-blocks-advanced-columns-overlay',
				'properties' => array(
					array(
						'property'  => 'background',
						'value'     => 'backgroundOverlayColor',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['backgroundOverlayType'] ) && 'color' !== $attrs['backgroundOverlayType'] );
						},
					),
					array(
						'property' => 'opacity',
						'value'    => 'backgroundOverlayOpacity',
						'default'  => 50,
						'format'   => function( $value, $attrs ) {
							return $value / 100;
						},
					),
					array(
						'property'  => 'background-attachment',
						'value'     => 'backgroundOverlayAttachment',
						'default'   => 'scroll',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundOverlayType'] ) && 'image' === $attrs['backgroundOverlayType'];
						},
					),
					array(
						'property'  => 'background-position',
						'value'     => 'backgroundOverlayPosition',
						'default'   => 'top left',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundOverlayType'] ) && 'image' === $attrs['backgroundOverlayType'];
						},
					),
					array(
						'property'  => 'background-repeat',
						'value'     => 'backgroundOverlayRepeat',
						'default'   => 'repeat',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundOverlayType'] ) && 'image' === $attrs['backgroundOverlayType'];
						},
					),
					array(
						'property'  => 'background-size',
						'value'     => 'backgroundOverlaySize',
						'default'   => 'auto',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundOverlayType'] ) && 'image' === $attrs['backgroundOverlayType'];
						},
					),
					array(
						'property'  => 'background',
						'value'     => 'backgroundOverlayGradient',
						'default'   => 'linear-gradient(90deg,rgba(54,209,220,1) 0%,rgba(91,134,229,1) 100%)',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundOverlayType'] ) && 'gradient' === $attrs['backgroundOverlayType'] && isset( $attrs['backgroundGradient'] );
						},
					),
					array(
						'property' => 'mix-blend-mode',
						'value'    => 'backgroundOverlayBlend',
						'default'  => 'normal',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'dividerTopHeight',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'dividerBottomHeight',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .innerblocks-wrap',
				'properties' => array(
					array(
						'property' => 'max-width',
						'value'    => 'columnsWidth',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'properties' => array(
					array(
						'property'  => 'padding',
						'value'     => 'paddingTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['paddingTypeTablet'] ) && 'unlinked' === $attrs['paddingTypeTablet'] );
						},
					),
					array(
						'property'  => 'padding-top',
						'value'     => 'paddingTopTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeTablet'] ) && 'unlinked' === $attrs['paddingTypeTablet'];
						},
					),
					array(
						'property'  => 'padding-right',
						'value'     => 'paddingRightTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeTablet'] ) && 'unlinked' === $attrs['paddingTypeTablet'];
						},
					),
					array(
						'property'  => 'padding-bottom',
						'value'     => 'paddingBottomTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeTablet'] ) && 'unlinked' === $attrs['paddingTypeTablet'];
						},
					),
					array(
						'property'  => 'padding-left',
						'value'     => 'paddingLeftTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeTablet'] ) && 'unlinked' === $attrs['paddingTypeTablet'];
						},
					),
					array(
						'property'  => 'margin-top',
						'value'     => 'marginTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['marginTypeTablet'] ) && 'linked' === $attrs['marginTypeTablet'];
						},
					),
					array(
						'property'  => 'margin-bottom',
						'value'     => 'marginTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['marginTypeTablet'] ) && 'linked' === $attrs['marginTypeTablet'];
						},
					),
					array(
						'property'  => 'margin-top',
						'value'     => 'marginTopTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginTypeTablet'] ) && 'linked' === $attrs['marginTypeTablet'] );
						},
					),
					array(
						'property'  => 'margin-bottom',
						'value'     => 'marginBottomTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginTypeTablet'] ) && 'linked' === $attrs['marginTypeTablet'] );
						},
					),
					array(
						'property'  => 'min-height',
						'value'     => 'columnsHeightCustomTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['columnsHeight'] ) && 'custom' === $attrs['columnsHeight'];
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'dividerTopHeightTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 600px ) and ( max-width: 960px )',
				'selector'   => ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'dividerBottomHeightTablet',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'properties' => array(
					array(
						'property'  => 'padding',
						'value'     => 'paddingMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['paddingTypeMobile'] ) && 'unlinked' === $attrs['paddingTypeMobile'] );
						},
					),
					array(
						'property'  => 'padding-top',
						'value'     => 'paddingTopMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeMobile'] ) && 'unlinked' === $attrs['paddingTypeMobile'];
						},
					),
					array(
						'property'  => 'padding-right',
						'value'     => 'paddingRightMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeMobile'] ) && 'unlinked' === $attrs['paddingTypeMobile'];
						},
					),
					array(
						'property'  => 'padding-bottom',
						'value'     => 'paddingBottomMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeMobile'] ) && 'unlinked' === $attrs['paddingTypeMobile'];
						},
					),
					array(
						'property'  => 'padding-left',
						'value'     => 'paddingLeftMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['paddingTypeMobile'] ) && 'unlinked' === $attrs['paddingTypeMobile'];
						},
					),
					array(
						'property'  => 'margin-top',
						'value'     => 'marginMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['marginTypeMobile'] ) && 'linked' === $attrs['marginTypeMobile'];
						},
					),
					array(
						'property'  => 'margin-bottom',
						'value'     => 'marginMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['marginTypeMobile'] ) && 'linked' === $attrs['marginTypeMobile'];
						},
					),
					array(
						'property'  => 'margin-top',
						'value'     => 'marginTopMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginTypeMobile'] ) && 'linked' === $attrs['marginTypeMobile'] );
						},
					),
					array(
						'property'  => 'margin-bottom',
						'value'     => 'marginBottomMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginTypeMobile'] ) && 'linked' === $attrs['marginTypeMobile'] );
						},
					),
					array(
						'property'  => 'min-height',
						'value'     => 'columnsHeightCustomMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return isset( $attrs['columnsHeight'] ) && 'custom' === $attrs['columnsHeight'];
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'dividerTopHeightMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( max-width: 600px )',
				'selector'   => ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg',
				'properties' => array(
					array(
						'property' => 'height',
						'value'    => 'dividerBottomHeightMobile',
						'unit'     => 'px',
					),
				),
			)
		);

		$style = $css->generate();

		return $style;

		// $style .= '#' . $attr['id'] . ' > .wp-block-themeisle-blocks-advanced-columns-overlay {' . "\n";
		// if ( 'image' === $this->get_attr_value( ( isset( $attr['backgroundOverlayType'] ) ? $attr['backgroundOverlayType'] : null ), 'color' ) ) {
		// 	if ( ! empty( $attr['backgroundOverlayImageURL'] ) ) {
		// 		$style .= '	background-image: url( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayImageURL'] ) ? $attr['backgroundOverlayImageURL'] : null ) ) . ' );' . "\n";
		// 	}
		// }

		// if ( 'gradient' === $this->get_attr_value( ( isset( $attr['backgroundOverlayType'] ) ? $attr['backgroundOverlayType'] : null ), 'color' ) ) {
		// 	$direction;

		// 	if ( 'linear' === $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientType'] ) ? $attr['backgroundOverlayGradientType'] : null ), 'linear' ) ) {
		// 		$direction = $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientAngle'] ) ? $attr['backgroundOverlayGradientAngle'] : null ), 90 ) . 'deg';
		// 	} else {
		// 		$direction = 'at ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientPosition'] ) ? $attr['backgroundOverlayGradientPosition'] : null ), 'center center' );
		// 	}

		// 	$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientType'] ) ? $attr['backgroundOverlayGradientType'] : null ), 'linear' ) . '-gradient( ' . $direction . ', ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientFirstColor'] ) ? $attr['backgroundOverlayGradientFirstColor'] : null ), '#36d1dc' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientFirstLocation'] ) ? $attr['backgroundOverlayGradientFirstLocation'] : null ), 0 ) . '%, ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientSecondColor'] ) ? $attr['backgroundOverlayGradientSecondColor'] : null ), '#5b86e5' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientSecondLocation'] ) ? $attr['backgroundOverlayGradientSecondLocation'] : null ), 100 ) . '% );' . "\n";
		// }

		// if ( isset( $attr['backgroundOverlayFilterBlur'] ) ) {
		// 	$style .= '	filter: blur( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterBlur'] ) ? ( $attr['backgroundOverlayFilterBlur'] / 10 ) : 0 ) ) . 'px ) brightness( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterBrightness'] ) ? ( $attr['backgroundOverlayFilterBrightness'] / 10 ) : 1 ) ) . ' ) contrast( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterContrast'] ) ? ( $attr['backgroundOverlayFilterContrast'] / 10 ) : 1 ) ) . ' ) grayscale( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterGrayscale'] ) ? ( $attr['backgroundOverlayFilterGrayscale'] / 100 ) : 0 ) ) . ' ) hue-rotate( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterHue'] ) ? $attr['backgroundOverlayFilterHue'] : 0 ) ) . 'deg ) saturate( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterSaturate'] ) ? ( $attr['backgroundOverlayFilterSaturate'] / 10 ) : 1 ) ) . ' );' . "\n";
		// }
		// $style .= '}' . "\n \n";

		// if ( isset( $attr['dividerTopWidth'] ) ) {
		// 	$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
		// 		$style .= '	transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidth'] ) ? $attr['dividerTopWidth'] : null ) ) / 100 . ' );' . "\n";
		// 	$style     .= '}' . "\n \n";
		// }

		// if ( isset( $attr['dividerBottomWidth'] ) ) {
		// 	$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
		// 		$style .= '	transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidth'] ) ? $attr['dividerBottomWidth'] : null ) ) / 100 . ' );' . "\n";
		// 	$style     .= '}' . "\n \n";
		// }

		// $style .= '@media ( min-width: 600px ) and ( max-width: 960px ) {' . "\n";
		// if ( isset( $attr['dividerTopWidthTablet'] ) ) {
		// 	$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
		// 		$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidthTablet'] ) ? $attr['dividerTopWidthTablet'] : null ) ) / 100 . ' );' . "\n";
		// 	$style     .= '	}' . "\n \n";
		// }

		// if ( isset( $attr['dividerBottomWidthTablet'] ) ) {
		// 	$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
		// 		$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidthTablet'] ) ? $attr['dividerBottomWidthTablet'] : null ) ) / 100 . ' );' . "\n";
		// 	$style     .= '	}' . "\n \n";
		// }
		// $style .= '}' . "\n \n";

		// $style .= '@media ( max-width: 600px ) {' . "\n";
		// if ( isset( $attr['dividerTopWidthMobile'] ) ) {
		// 	$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
		// 		$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidthMobile'] ) ? $attr['dividerTopWidthMobile'] : null ) ) / 100 . ' );' . "\n";
		// 	$style     .= '	}' . "\n \n";
		// }

		// if ( isset( $attr['dividerBottomWidthMobile'] ) ) {
		// 	$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
		// 		$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidthMobile'] ) ? $attr['dividerBottomWidthMobile'] : null ) ) / 100 . ' );' . "\n";
		// 	$style     .= '	}' . "\n \n";
		// }
		// $style .= '}' . "\n \n";
	}
}
