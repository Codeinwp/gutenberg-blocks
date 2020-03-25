<?php
/**
 * Css handling logic for columns.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

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
		$attr  = $block['attrs'];
		$style = '';

		if ( isset( $attr['id'] ) ) {
			$style .= '#' . $attr['id'] . ' {' . "\n";
			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
				$style .= '	padding: ' . $this->get_attr_value( ( isset( $attr['padding'] ) ? $attr['padding'] : null ), 20 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
				$style .= '	padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTop'] ) ? $attr['paddingTop'] : null ), 20 ) . 'px;' . "\n";
				$style .= '	padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRight'] ) ? $attr['paddingRight'] : null ), 20 ) . 'px;' . "\n";
				$style .= '	padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottom'] ) ? $attr['paddingBottom'] : null ), 20 ) . 'px;' . "\n";
				$style .= '	padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeft'] ) ? $attr['paddingLeft'] : null ), 20 ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'unlinked' ) ) {
				$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 20 ) . 'px;' . "\n";
				$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 20 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'unlinked' ) ) {
				$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTop'] ) ? $attr['marginTop'] : null ), 20 ) . 'px;' . "\n";
				$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottom'] ) ? $attr['marginBottom'] : null ), 20 ) . 'px;' . "\n";
			}

			if ( isset( $attr['horizontalAlign'] ) ) {
				$style .= '	justify-content: ' . $this->get_attr_value( ( isset( $attr['horizontalAlign'] ) ? $attr['horizontalAlign'] : null ), 'unset' ) . ';' . "\n";
			}

			if ( 'custom' !== $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) {
				$style .= '	min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) . ';' . "\n";
			}

			if ( ( 'custom' === $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) && isset( $attr['columnsHeightCustom'] ) ) {
				$style .= '	min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeightCustom'] ) ? $attr['columnsHeightCustom'] : null ) ) . 'px;' . "\n";
			}

			if ( 'color' === $this->get_attr_value( ( isset( $attr['backgroundType'] ) ? $attr['backgroundType'] : null ), 'color' ) ) {
				if ( isset( $attr['backgroundColor'] ) ) {
					$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['backgroundColor'] ) ? $attr['backgroundColor'] : null ) ) . ';' . "\n";
				}
			}

			if ( 'image' === $this->get_attr_value( ( isset( $attr['backgroundType'] ) ? $attr['backgroundType'] : null ), 'color' ) ) {
				if ( isset( $attr['backgroundImageURL'] ) ) {
					$style .= '	background-image: url( ' . $this->get_attr_value( ( isset( $attr['backgroundImageURL'] ) ? $attr['backgroundImageURL'] : null ) ) . ' );' . "\n";
				}

				if ( isset( $attr['backgroundAttachment'] ) ) {
					$style .= '	background-attachment: ' . $this->get_attr_value( ( isset( $attr['backgroundAttachment'] ) ? $attr['backgroundAttachment'] : null ), 'scroll' ) . ';' . "\n";
				}

				if ( isset( $attr['backgroundPosition'] ) ) {
					$style .= '	background-position: ' . $this->get_attr_value( ( isset( $attr['backgroundPosition'] ) ? $attr['backgroundPosition'] : null ), 'top left' ) . ';' . "\n";
				}

				if ( isset( $attr['backgroundRepeat'] ) ) {
					$style .= '	background-repeat: ' . $this->get_attr_value( ( isset( $attr['backgroundRepeat'] ) ? $attr['backgroundRepeat'] : null ), 'repeat' ) . ';' . "\n";
				}

				if ( isset( $attr['backgroundSize'] ) ) {
					$style .= '	background-size: ' . $this->get_attr_value( ( isset( $attr['backgroundSize'] ) ? $attr['backgroundSize'] : null ), 'auto' ) . ';' . "\n";
				}
			}

			if ( 'gradient' === $this->get_attr_value( ( isset( $attr['backgroundType'] ) ? $attr['backgroundType'] : null ), 'color' ) ) {
				$direction;

				if ( 'linear' === $this->get_attr_value( ( isset( $attr['backgroundGradientType'] ) ? $attr['backgroundGradientType'] : null ), 'linear' ) ) {
					$direction = $this->get_attr_value( ( isset( $attr['backgroundGradientAngle'] ) ? $attr['backgroundGradientAngle'] : null ), 90 ) . 'deg';
				} else {
					$direction = 'at ' . $this->get_attr_value( ( isset( $attr['backgroundGradientPosition'] ) ? $attr['backgroundGradientPosition'] : null ), 'center center' );
				}

				$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['backgroundGradientType'] ) ? $attr['backgroundGradientType'] : null ), 'linear' ) . '-gradient( ' . $direction . ', ' . $this->get_attr_value( ( isset( $attr['backgroundGradientFirstColor'] ) ? $attr['backgroundGradientFirstColor'] : null ), '#36d1dc' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundGradientFirstLocation'] ) ? $attr['backgroundGradientFirstLocation'] : null ), 0 ) . '%, ' . $this->get_attr_value( ( isset( $attr['backgroundGradientSecondColor'] ) ? $attr['backgroundGradientSecondColor'] : null ), '#5b86e5' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundGradientSecondLocation'] ) ? $attr['backgroundGradientSecondLocation'] : null ), 100 ) . '% );' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['borderType'] ) ? $attr['borderType'] : null ), 'linked' ) ) {
				$style .= '	border-width: ' . $this->get_attr_value( ( isset( $attr['border'] ) ? $attr['border'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-style: solid;' . "\n";
				$style .= '	border-color: ' . $this->get_attr_value( ( isset( $attr['borderColor'] ) ? $attr['borderColor'] : null ), '#000000' ) . ';' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['borderType'] ) ? $attr['borderType'] : null ), 'linked' ) ) {
				$style .= '	border-top-width: ' . $this->get_attr_value( ( isset( $attr['borderTop'] ) ? $attr['borderTop'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-right-width: ' . $this->get_attr_value( ( isset( $attr['borderRight'] ) ? $attr['borderRight'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-bottom-width: ' . $this->get_attr_value( ( isset( $attr['borderBottom'] ) ? $attr['borderBottom'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-left-width: ' . $this->get_attr_value( ( isset( $attr['borderLeft'] ) ? $attr['borderLeft'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-style: solid;' . "\n";
				$style .= '	border-color: ' . $this->get_attr_value( ( isset( $attr['borderColor'] ) ? $attr['borderColor'] : null ), '#000000' ) . ';' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['borderRadiusType'] ) ? $attr['borderRadiusType'] : null ), 'linked' ) ) {
				$style .= '	border-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadius'] ) ? $attr['borderRadius'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['borderRadiusType'] ) ? $attr['borderRadiusType'] : null ), 'linked' ) ) {
				$style .= '	border-top-left-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusTop'] ) ? $attr['borderRadiusTop'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-top-right-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusRight'] ) ? $attr['borderRadiusRight'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-bottom-right-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusBottom'] ) ? $attr['borderRadiusBottom'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	border-bottom-left-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadiusLeft'] ) ? $attr['borderRadiusLeft'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( isset( $attr['boxShadow'] ) && true === $attr['boxShadow'] ) {
				$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $attr['boxShadowHorizontal'] ) ? $attr['boxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowVertical'] ) ? $attr['boxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowBlur'] ) ? $attr['boxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowSpread'] ) ? $attr['boxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $attr['boxShadowColor'] ) ? $attr['boxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $attr['boxShadowColorOpacity'] ) ? $attr['boxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' > .wp-block-themeisle-blocks-advanced-columns-overlay {' . "\n";
			if ( 'color' === $this->get_attr_value( ( isset( $attr['backgroundOverlayType'] ) ? $attr['backgroundOverlayType'] : null ), 'color' ) ) {
				if ( isset( $attr['backgroundOverlayColor'] ) ) {
					$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayColor'] ) ? $attr['backgroundOverlayColor'] : null ) ) . ';' . "\n";
					$style .= '	opacity: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayOpacity'] ) ? $attr['backgroundOverlayOpacity'] : null ), 50 ) / 100 . ';' . "\n";
				}
			}
	
			if ( 'image' === $this->get_attr_value( ( isset( $attr['backgroundOverlayType'] ) ? $attr['backgroundOverlayType'] : null ), 'color' ) ) {
				if ( isset( $attr['backgroundOverlayImageURL'] ) ) {
					$style .= '	background-image: url( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayImageURL'] ) ? $attr['backgroundOverlayImageURL'] : null ) ) . ' );' . "\n";
					$style .= '	opacity: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayOpacity'] ) ? $attr['backgroundOverlayOpacity'] : null ), 50 ) / 100 . ';' . "\n";
				}
	
				if ( isset( $attr['backgroundOverlayAttachment'] ) ) {
					$style .= '	background-attachment: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayAttachment'] ) ? $attr['backgroundOverlayAttachment'] : null ), 'scroll' ) . ';' . "\n";
				}
	
				if ( isset( $attr['backgroundOverlayPosition'] ) ) {
					$style .= '	background-position: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayPosition'] ) ? $attr['backgroundOverlayPosition'] : null ), 'top left' ) . ';' . "\n";
				}
	
				if ( isset( $attr['backgroundOverlayRepeat'] ) ) {
					$style .= '	background-repeat: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayRepeat'] ) ? $attr['backgroundOverlayRepeat'] : null ), 'repeat' ) . ';' . "\n";
				}
	
				if ( isset( $attr['backgroundOverlaySize'] ) ) {
					$style .= '	background-size: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlaySize'] ) ? $attr['backgroundOverlaySize'] : null ), 'auto' ) . ';' . "\n";
				}
			}
	
			if ( 'gradient' === $this->get_attr_value( ( isset( $attr['backgroundOverlayType'] ) ? $attr['backgroundOverlayType'] : null ), 'color' ) ) {
				$direction;
	
				if ( 'linear' === $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientType'] ) ? $attr['backgroundOverlayGradientType'] : null ), 'linear' ) ) {
					$direction = $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientAngle'] ) ? $attr['backgroundOverlayGradientAngle'] : null ), 90 ) . 'deg';
				} else {
					$direction = 'at ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientPosition'] ) ? $attr['backgroundOverlayGradientPosition'] : null ), 'center center' );
				}
	
				$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientType'] ) ? $attr['backgroundOverlayGradientType'] : null ), 'linear' ) . '-gradient( ' . $direction . ', ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientFirstColor'] ) ? $attr['backgroundOverlayGradientFirstColor'] : null ), '#36d1dc' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientFirstLocation'] ) ? $attr['backgroundOverlayGradientFirstLocation'] : null ), 0 ) . '%, ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientSecondColor'] ) ? $attr['backgroundOverlayGradientSecondColor'] : null ), '#5b86e5' ) . ' ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayGradientSecondLocation'] ) ? $attr['backgroundOverlayGradientSecondLocation'] : null ), 100 ) . '% );' . "\n";
				$style .= '	opacity: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayOpacity'] ) ? $attr['backgroundOverlayOpacity'] : null ), 50 ) / 100 . ';' . "\n";
			}

			if ( isset( $attr['backgroundOverlayFilterBlur'] ) ) {
				$style .= '	filter: blur( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterBlur'] ) ? ( $attr['backgroundOverlayFilterBlur'] / 10 ) : 0 ) ) . 'px ) brightness( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterBrightness'] ) ? ( $attr['backgroundOverlayFilterBrightness'] / 10 ) : 1 ) ) . ' ) contrast( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterContrast'] ) ? ( $attr['backgroundOverlayFilterContrast'] / 10 ) : 1 ) ) . ' ) grayscale( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterGrayscale'] ) ? ( $attr['backgroundOverlayFilterGrayscale'] / 100 ) : 0 ) ) . ' ) hue-rotate( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterHue'] ) ? $attr['backgroundOverlayFilterHue'] : 0 ) ) . 'deg ) saturate( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterSaturate'] ) ? ( $attr['backgroundOverlayFilterSaturate'] / 10 ) : 1 ) ) . ' );' . "\n";
			}

			if ( isset( $attr['backgroundOverlayBlend'] ) ) {
				$style .= '	mix-blend-mode: ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayBlend'] ) ? $attr['backgroundOverlayBlend'] : null ), 'normal' ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";

			if ( isset( $attr['dividerTopWidth'] ) ) {
				$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
					$style .= '	transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidth'] ) ? $attr['dividerTopWidth'] : null ) ) / 100 . ' );' . "\n";
				$style     .= '}' . "\n \n";
			}

			if ( isset( $attr['dividerTopHeight'] ) ) {
				$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg {' . "\n";
					$style .= '	height: ' . $this->get_attr_value( ( isset( $attr['dividerTopHeight'] ) ? $attr['dividerTopHeight'] : null ) ) . 'px;' . "\n";
				$style     .= '}' . "\n \n";
			}

			if ( isset( $attr['columnsWidth'] ) ) {
				$style     .= '#' . $attr['id'] . ' .innerblocks-wrap {' . "\n";
					$style .= '	max-width: ' . $this->get_attr_value( ( isset( $attr['columnsWidth'] ) ? $attr['columnsWidth'] : null ) ) . 'px;' . "\n";
				$style     .= '}' . "\n \n";
			}

			if ( isset( $attr['dividerBottomWidth'] ) ) {
				$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
					$style .= '	transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidth'] ) ? $attr['dividerBottomWidth'] : null ) ) / 100 . ' );' . "\n";
				$style     .= '}' . "\n \n";
			}

			if ( isset( $attr['dividerBottomHeight'] ) ) {
				$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg {' . "\n";
					$style .= '	height: ' . $this->get_attr_value( ( isset( $attr['dividerBottomHeight'] ) ? $attr['dividerBottomHeight'] : null ) ) . 'px;' . "\n";
				$style     .= '}' . "\n \n";
			}

			$style .= '@media ( min-width: 600px ) and ( max-width: 960px ) {' . "\n";

				$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
				if ( isset( $attr['paddingTablet'] ) ) {
					$style .= '		padding: ' . $this->get_attr_value( $attr['paddingTablet'] ) . 'px;' . "\n";
				}
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
				if ( isset( $attr['paddingTopTablet'] ) ) {
					$style .= '		padding-top: ' . $this->get_attr_value( $attr['paddingTopTablet'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['paddingRightTablet'] ) ) {
					$style .= '		padding-right: ' . $this->get_attr_value( $attr['paddingRightTablet'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['paddingBottomTablet'] ) ) {
					$style .= '		padding-bottom: ' . $this->get_attr_value( $attr['paddingBottomTablet'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['paddingLeftTablet'] ) ) {
					$style .= '		padding-left: ' . $this->get_attr_value( $attr['paddingLeftTablet'] ) . 'px;' . "\n";
				}
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
				if ( isset( $attr['marginTablet'] ) ) {
					$style .= '		margin-top: ' . $this->get_attr_value( $attr['marginTablet'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['marginTablet'] ) ) {
					$style .= '		margin-bottom: ' . $this->get_attr_value( $attr['marginTablet'] ) . 'px;' . "\n";
				}
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
				if ( isset( $attr['marginTopTablet'] ) ) {
					$style .= '		margin-top: ' . $this->get_attr_value( $attr['marginTopTablet'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['marginBottomTablet'] ) ) {
					$style .= '		margin-bottom: ' . $this->get_attr_value( $attr['marginBottomTablet'] ) . 'px;' . "\n";
				}
			}

			if ( ( 'custom' === $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) && isset( $attr['columnsHeightCustomTablet'] ) ) {
				$style .= '		min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeightCustomTablet'] ) ? $attr['columnsHeightCustomTablet'] : null ) ) . 'px;' . "\n";
			}
				$style .= '	}' . "\n \n";

			if ( isset( $attr['dividerTopWidthTablet'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
					$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidthTablet'] ) ? $attr['dividerTopWidthTablet'] : null ) ) / 100 . ' );' . "\n";
				$style     .= '	}' . "\n \n";
			}
	
			if ( isset( $attr['dividerTopHeightTablet'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg {' . "\n";
					$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerTopHeightTablet'] ) ? $attr['dividerTopHeightTablet'] : null ) ) . 'px;' . "\n";
				$style     .= '	}' . "\n \n";
			}
	
			if ( isset( $attr['dividerBottomWidthTablet'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
					$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidthTablet'] ) ? $attr['dividerBottomWidthTablet'] : null ) ) / 100 . ' );' . "\n";
				$style     .= '	}' . "\n \n";
			}
	
			if ( isset( $attr['dividerBottomHeightTablet'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg {' . "\n";
					$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerBottomHeightTablet'] ) ? $attr['dividerBottomHeightTablet'] : null ) ) . 'px;' . "\n";
				$style     .= '	}' . "\n \n";
			}

			$style .= '}' . "\n \n";

			$style .= '@media ( max-width: 600px ) {' . "\n";

				$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
				if ( isset( $attr['paddingMobile'] ) ) {
					$style .= '		padding: ' . $this->get_attr_value( $attr['paddingMobile'] ) . 'px;' . "\n";
				}
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
				if ( isset( $attr['paddingTopMobile'] ) ) {
					$style .= '		padding-top: ' . $this->get_attr_value( $attr['paddingTopMobile'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['paddingRightMobile'] ) ) {
					$style .= '		padding-right: ' . $this->get_attr_value( $attr['paddingRightMobile'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['paddingBottomMobile'] ) ) {
					$style .= '		padding-bottom: ' . $this->get_attr_value( $attr['paddingBottomMobile'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['paddingLeftMobile'] ) ) {
					$style .= '		padding-left: ' . $this->get_attr_value( $attr['paddingLeftMobile'] ) . 'px;' . "\n";
				}
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
				if ( isset( $attr['marginMobile'] ) ) {
					$style .= '		margin-top: ' . $this->get_attr_value( $attr['marginMobile'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['marginMobile'] ) ) {
					$style .= '		margin-bottom: ' . $this->get_attr_value( $attr['marginMobile'] ) . 'px;' . "\n";
				}
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
				if ( isset( $attr['marginTopMobile'] ) ) {
					$style .= '		margin-top: ' . $this->get_attr_value( $attr['marginTopMobile'] ) . 'px;' . "\n";
				}

				if ( isset( $attr['marginBottomMobile'] ) ) {
					$style .= '		margin-bottom: ' . $this->get_attr_value( $attr['marginBottomMobile'] ) . 'px;' . "\n";
				}
			}

			if ( ( 'custom' === $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) && isset( $attr['columnsHeightCustomMobile'] ) ) {
				$style .= '		min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeightCustomMobile'] ) ? $attr['columnsHeightCustomMobile'] : null ) ) . 'px;' . "\n";
			}
				$style .= '	}' . "\n \n";

			if ( isset( $attr['dividerTopWidthMobile'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top {' . "\n";
					$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerTopWidthMobile'] ) ? $attr['dividerTopWidthMobile'] : null ) ) / 100 . ' );' . "\n";
				$style     .= '	}' . "\n \n";
			}
	
			if ( isset( $attr['dividerTopHeightMobile'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.top svg {' . "\n";
					$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerTopHeightMobile'] ) ? $attr['dividerTopHeightMobile'] : null ) ) . 'px;' . "\n";
				$style     .= '	}' . "\n \n";
			}
	
			if ( isset( $attr['dividerBottomWidthMobile'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom {' . "\n";
					$style .= '		transform: scaleX( ' . $this->get_attr_value( ( isset( $attr['dividerBottomWidthMobile'] ) ? $attr['dividerBottomWidthMobile'] : null ) ) / 100 . ' );' . "\n";
				$style     .= '	}' . "\n \n";
			}
	
			if ( isset( $attr['dividerBottomHeightMobile'] ) ) {
				$style     .= '	#' . $attr['id'] . ' .wp-block-themeisle-blocks-advanced-columns-separators.bottom svg {' . "\n";
					$style .= '		height: ' . $this->get_attr_value( ( isset( $attr['dividerBottomHeightMobile'] ) ? $attr['dividerBottomHeightMobile'] : null ) ) . 'px;' . "\n";
				$style     .= '	}' . "\n \n";
			}

			$style .= '}' . "\n \n";
		}

		return $style;
	}
}
