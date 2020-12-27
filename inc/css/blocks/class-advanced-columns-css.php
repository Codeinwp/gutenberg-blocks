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
						'property' => 'padding',
						'value'    => 'padding',
						'unit'     => 'px',
						'default'  => 20,
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
						'property' => 'margin-top',
						'value'    => 'margin',
						'unit'     => 'px',
						'default'  => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'];
						},
					),
					array(
						'property' => 'margin-bottom',
						'value'    => 'margin',
						'unit'     => 'px',
						'default'  => 20,
						'condition' => function( $attrs ) {
							return isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'];
						},
					),
					array(
						'property' => 'margin-top',
						'value'    => 'marginTop',
						'unit'     => 'px',
						'default'  => 20,
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'] );
						},
					),
					array(
						'property' => 'margin-bottom',
						'value'    => 'marginBottom',
						'unit'     => 'px',
						'default'  => 20,
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
						'property' => 'min-height',
						'value'    => 'columnsHeight',
						'default'  => 'auto',
						'condition' => function( $attrs ) {
							return ! isset( $attrs['columnsHeight'] ) || 'custom' !== $attrs['columnsHeight'];
						},
					),
					array(
						'property' => 'min-height',
						'value'    => 'columnsHeightCustom',
						'unit'     => 'px',
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
						'property'  => 'background-attachment',
						'value'     => 'backgroundAttachment',
						'default'   => 'scroll',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'image' === $attrs['backgroundType'];
						},
					),
					array(
						'property'  => 'background-position',
						'value'     => 'backgroundPosition',
						'default'   => 'top left',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'image' === $attrs['backgroundType'];
						},
					),
					array(
						'property'  => 'background-repeat',
						'value'     => 'backgroundRepeat',
						'default'   => 'repeat',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'image' === $attrs['backgroundType'];
						},
					),
					array(
						'property'  => 'background-size',
						'value'     => 'backgroundSize',
						'default'   => 'auto',
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'image' === $attrs['backgroundType'];
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
						'property'  => 'opacity',
						'value'     => 'backgroundOverlayOpacity',
						'default'   => 50,
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
						'property'  => 'mix-blend-mode',
						'value'     => 'backgroundOverlayBlend',
						'default'   => 'normal',
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
						'property' => 'min-height',
						'value'    => 'columnsHeightCustomTablet',
						'unit'     => 'px',
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
						'property' => 'min-height',
						'value'    => 'columnsHeightCustomMobile',
						'unit'     => 'px',
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

		// $style .= '#' . $attr['id'] . ' {' . "\n";
		// if ( 'image' === $this->get_attr_value( ( isset( $attr['backgroundType'] ) ? $attr['backgroundType'] : null ), 'color' ) ) {
		// 	if ( ! empty( $attr['backgroundImageURL'] ) ) {
		// 		$style .= '	background-image: url( ' . $this->get_attr_value( ( isset( $attr['backgroundImageURL'] ) ? $attr['backgroundImageURL'] : null ) ) . ' );' . "\n";
		// 	}
		// }

		// if ( 'gradient' === $this->get_attr_value( ( isset( $attr['backgroundType'] ) ? $attr['backgroundType'] : null ), 'color' ) ) {
		// 	$direction;

		// 	if ( 'linear' === $this->get_attr_value( ( isset( $attr['backgroundGradientType'] ) ? $attr['backgroundGradientType'] : null ), 'linear' ) ) {
		// 		$direction = $this->get_attr_value( ( isset( $attr['backgroundGradientAngle'] ) ? $attr['backgroundGradientAngle'] : null ), 90 ) . 'deg';
		// 	} else {
		// 		$direction = 'at ' . $this->get_attr_value( ( isset( $attr['backgroundGradientPosition'] ) ? $attr['backgroundGradientPosition'] : null ), 'center center' );
		// 	}

		// 	$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['backgroundGradientType'] ) ? $attr['backgroundGradientType'] : null ), 'linear' ) . '-gradient( ' . $direction . ', ' . $this->get_attr_value( ( isset( $attr['backgroundGradientFirstColor'] ) ? $attr['backgroundGradientFirstColor'] : null ), '#36d1dc' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundGradientFirstLocation'] ) ? $attr['backgroundGradientFirstLocation'] : null ), 0 ) . '%, ' . $this->get_attr_value( ( isset( $attr['backgroundGradientSecondColor'] ) ? $attr['backgroundGradientSecondColor'] : null ), '#5b86e5' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundGradientSecondLocation'] ) ? $attr['backgroundGradientSecondLocation'] : null ), 100 ) . '% );' . "\n";
		// }

		// if ( 'linked' === $this->get_attr_value( ( isset( $attr['borderType'] ) ? $attr['borderType'] : null ), 'linked' ) ) {
		// 	$style .= '	border-width: ' . $this->get_attr_value( ( isset( $attr['border'] ) ? $attr['border'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-style: solid;' . "\n";
		// 	$style .= '	border-color: ' . $this->get_attr_value( ( isset( $attr['borderColor'] ) ? $attr['borderColor'] : null ), '#000000' ) . ';' . "\n";
		// }

		// if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['borderType'] ) ? $attr['borderType'] : null ), 'linked' ) ) {
		// 	$style .= '	border-top-width: ' . $this->get_attr_value( ( isset( $attr['borderTop'] ) ? $attr['borderTop'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-right-width: ' . $this->get_attr_value( ( isset( $attr['borderRight'] ) ? $attr['borderRight'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-bottom-width: ' . $this->get_attr_value( ( isset( $attr['borderBottom'] ) ? $attr['borderBottom'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-left-width: ' . $this->get_attr_value( ( isset( $attr['borderLeft'] ) ? $attr['borderLeft'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-style: solid;' . "\n";
		// 	$style .= '	border-color: ' . $this->get_attr_value( ( isset( $attr['borderColor'] ) ? $attr['borderColor'] : null ), '#000000' ) . ';' . "\n";
		// }

		// if ( 'linked' === $this->get_attr_value( ( isset( $attr['borderRadiusType'] ) ? $attr['borderRadiusType'] : null ), 'linked' ) ) {
		// 	$style .= '	border-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadius'] ) ? $attr['borderRadius'] : null ), 0 ) . 'px;' . "\n";
		// }

		// if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['borderRadiusType'] ) ? $attr['borderRadiusType'] : null ), 'linked' ) ) {
		// 	$style .= '	border-top-left-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusTop'] ) ? $attr['borderRadiusTop'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-top-right-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusRight'] ) ? $attr['borderRadiusRight'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-bottom-right-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusBottom'] ) ? $attr['borderRadiusBottom'] : null ), 0 ) . 'px;' . "\n";
		// 	$style .= '	border-bottom-left-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusLeft'] ) ? $attr['borderRadiusLeft'] : null ), 0 ) . 'px;' . "\n";
		// }

		// if ( isset( $attr['boxShadow'] ) && true === $attr['boxShadow'] ) {
		// 	$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $attr['boxShadowHorizontal'] ) ? $attr['boxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowVertical'] ) ? $attr['boxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowBlur'] ) ? $attr['boxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowSpread'] ) ? $attr['boxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $attr['boxShadowColor'] ) ? $attr['boxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $attr['boxShadowColorOpacity'] ) ? $attr['boxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
		// }
		// $style .= '}' . "\n \n";

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
