<?php
/**
 * Css handling logic for Column.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

/**
 * Class Advanced_Column_CSS
 */
class Advanced_Column_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'advanced-column';

	/**
	 * Generate Advanced Column CSS
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
						'property' => 'margin',
						'value'    => 'margin',
						'unit'     => 'px',
						'default'  => 20,
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
						'property'  => 'margin-right',
						'value'     => 'marginRight',
						'unit'      => 'px',
						'default'   => 0,
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
						'property'  => 'margin-left',
						'value'     => 'marginLeft',
						'unit'      => 'px',
						'default'   => 0,
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginType'] ) && 'linked' === $attrs['marginType'] );
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
					// array(
					// 	'property'  => 'background',
					// 	'condition' => function( $attrs ) {
					// 		return isset( $attrs['backgroundType'] ) && 'gradient' === $attrs['backgroundType'] && ! isset( $attrs['backgroundGradient'] );
					// 	},
					// ),
					array(
						'property'  => 'border-width',
						'value'     => 'border',
						'unit'      => 'px',
						'default'   => 0,
						'condition' => function( $attrs ) {
							return isset( $attrs['backgroundType'] ) && 'gradient' === $attrs['backgroundType'] && isset( $attrs['backgroundGradient'] );
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'query'      => '@media ( min-width: 960px )',
				'properties' => array(
					array(
						'property' => 'flex-basis',
						'value'    => 'columnWidth',
						'unit'     => '%',
						'format'   => function( $value, $attrs ) {
							return floatval( $value );	
						},
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
						'property'  => 'margin',
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
						'property'  => 'margin-right',
						'value'     => 'marginRightTablet',
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
						'property'  => 'margin-left',
						'value'     => 'marginLeftTablet',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginTypeTablet'] ) && 'linked' === $attrs['marginTypeTablet'] );
						},
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
						'property'  => 'margin',
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
						'property'  => 'margin-right',
						'value'     => 'marginRightMobile',
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
						'property'  => 'margin-left',
						'value'     => 'marginLeftMobile',
						'unit'      => 'px',
						'condition' => function( $attrs ) {
							return ! ( isset( $attrs['marginTypeMobile'] ) && 'linked' === $attrs['marginTypeMobile'] );
						},
					),
				),
			)
		);

		$style = $css->generate();

		return $style;
		$attr  = $block['attrs'];
		$style = '';

		if ( isset( $attr['id'] ) ) {
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
		}

		return $style;
	}
}
