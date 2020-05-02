<?php
/**
 * Css handling logic for heading.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Advanced_Heading_CSS
 */
class Advanced_Heading_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'advanced-heading';

	/**
	 * Generate Advanced Heading CSS
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

			$this->get_google_fonts( $attr );

			$style .= '#' . $attr['id'] . ' {' . "\n";

			if ( isset( $attr['align'] ) ) {
				$style .= '	text-align: ' . $this->get_attr_value( ( isset( $attr['align'] ) ? $attr['align'] : 'unset' ) ) . ';' . "\n";
			}

			if ( isset( $attr['headingColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['headingColor'] ) . ';' . "\n";
			}

			if ( isset( $attr['fontSize'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( ( isset( $attr['fontSize'] ) ? $attr['fontSize'] : null ) ) . 'px;' . "\n";
			}

			if ( isset( $attr['fontFamily'] ) ) {
				$style .= '	font-family: ' . $this->get_attr_value( ( isset( $attr['fontFamily'] ) ? $attr['fontFamily'] : null ) ) . ';' . "\n";
			}

			if ( isset( $attr['fontVariant'] ) ) {
				$style .= '	font-weight: ' . ( 'regular' === $this->get_attr_value( ( isset( $attr['fontVariant'] ) ? $attr['fontVariant'] : null ) ) ? 'normal' : $this->get_attr_value( ( isset( $attr['fontVariant'] ) ? $attr['fontVariant'] : null ) ) ) . ';' . "\n";
			}

			if ( isset( $attr['fontStyle'] ) ) {
				$style .= '	font-style: ' . $this->get_attr_value( ( isset( $attr['fontStyle'] ) ? $attr['fontStyle'] : null ), 'normal' ) . ';' . "\n";
			}

			if ( isset( $attr['textTransform'] ) ) {
				$style .= '	text-transform: ' . $this->get_attr_value( ( isset( $attr['textTransform'] ) ? $attr['textTransform'] : null ), 'none' ) . ';' . "\n";
			}

			if ( isset( $attr['lineHeight'] ) ) {
				$style .= '	line-height: ' . $this->get_attr_value( ( isset( $attr['lineHeight'] ) ? $attr['lineHeight'] : null ) ) . 'px;' . "\n";
			}

			if ( isset( $attr['letterSpacing'] ) ) {
				$style .= '	letter-spacing: ' . $this->get_attr_value( ( isset( $attr['letterSpacing'] ) ? $attr['letterSpacing'] : null ) ) . 'px;' . "\n";
			}

			if ( isset( $attr['textShadow'] ) ) {
				$style .= '	text-shadow: ' . $this->get_attr_value( ( isset( $attr['textShadowHorizontal'] ) ? $attr['textShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['textShadowVertical'] ) ? $attr['textShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['textShadowBlur'] ) ? $attr['textShadowBlur'] : null ), 5 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $attr['textShadowColor'] ) ? $attr['textShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $attr['textShadowColorOpacity'] ) ? $attr['textShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
				$style .= '	padding: ' . $this->get_attr_value( ( isset( $attr['padding'] ) ? $attr['padding'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingType'] ) ? $attr['paddingType'] : null ), 'linked' ) ) {
				$style .= '	padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTop'] ) ? $attr['paddingTop'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRight'] ) ? $attr['paddingRight'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottom'] ) ? $attr['paddingBottom'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeft'] ) ? $attr['paddingLeft'] : null ), 20 ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'unlinked' ) ) {
				$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['margin'] ) ? $attr['margin'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginType'] ) ? $attr['marginType'] : null ), 'unlinked' ) ) {
				$style .= '	margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTop'] ) ? $attr['marginTop'] : null ), 0 ) . 'px;' . "\n";
				$style .= '	margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottom'] ) ? $attr['marginBottom'] : null ), 25 ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

			if ( isset( $attr['highlightColor'] ) || isset( $attr['highlightBackground'] ) ) {
				$style .= '#' . $attr['id'] . ' mark {' . "\n";
				if ( isset( $attr['highlightColor'] ) ) {
					$style .= '	color: ' . $this->get_attr_value( ( isset( $attr['highlightColor'] ) ? $attr['highlightColor'] : null ) ) . ';' . "\n";
				}

				if ( isset( $attr['highlightBackground'] ) ) {
					$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['highlightBackground'] ) ? $attr['highlightBackground'] : null ) ) . ';' . "\n";
				}
				$style .= '}' . "\n \n";
			}

			$style .= '@media ( min-width: 600px ) and ( max-width: 960px ) {' . "\n";

			$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( isset( $attr['alignTablet'] ) ) {
				$style .= '		text-align: ' . $this->get_attr_value( ( isset( $attr['alignTablet'] ) ? $attr['alignTablet'] : 'unset' ) ) . ';' . "\n";
			}

			if ( isset( $attr['fontSizeTablet'] ) ) {
				$style .= '		font-size: ' . $this->get_attr_value( ( isset( $attr['fontSizeTablet'] ) ? $attr['fontSizeTablet'] : null ) ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
				if ( isset( $attr['paddingTablet'] ) ) {
					$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingTablet'] ) ? $attr['paddingTablet'] : null ) ) . 'px;' . "\n";
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
			$style .= '	}' . "\n \n";

			$style .= '}' . "\n \n";

			$style .= '@media ( max-width: 600px ) {' . "\n";

			$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( isset( $attr['alignMobile'] ) ) {
				$style .= '		text-align: ' . $this->get_attr_value( ( isset( $attr['alignMobile'] ) ? $attr['alignMobile'] : 'unset' ) ) . ';' . "\n";
			}

			if ( isset( $attr['fontSizeMobile'] ) ) {
				$style .= '		font-size: ' . $this->get_attr_value( ( isset( $attr['fontSizeMobile'] ) ? $attr['fontSizeMobile'] : null ) ) . 'px;' . "\n";
			}

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
			$style .= '	}' . "\n \n";

			$style .= '}' . "\n \n";
		}

		return $style;
	}
}
