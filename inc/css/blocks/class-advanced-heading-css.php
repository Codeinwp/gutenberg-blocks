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
	 * @param mixed $block Block.
	 *
	 * @return string Style.
	 * @since   1.3.0
	 * @access  private
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

			if ( isset( $attr['fontSize'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( ( isset( $attr['fontSize'] ) ? $attr['fontSize'] : null ) ) . 'px;' . "\n";
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
					$style .= '		color: ' . $this->get_attr_value( ( isset( $attr['highlightColor'] ) ? $attr['highlightColor'] : null ) ) . ';' . "\n";
				}

				if ( isset( $attr['highlightBackground'] ) ) {
					$style .= '		background: ' . $this->get_attr_value( ( isset( $attr['highlightBackground'] ) ? $attr['highlightBackground'] : null ) ) . ';' . "\n";
				}
				$style .= '}' . "\n \n";
			}

			$style .= '@media ( min-width: 600px ) and ( max-width: 960px )  {' . "\n";

			$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( isset( $attr['alignTablet'] ) ) {
				$style .= '		text-align: ' . $this->get_attr_value( ( isset( $attr['alignTablet'] ) ? $attr['alignTablet'] : 'unset' ) ) . ';' . "\n";
			}

			if ( isset( $attr['fontSizeTablet'] ) ) {
				$style .= '		font-size: ' . $this->get_attr_value( ( isset( $attr['fontSizeTablet'] ) ? $attr['fontSizeTablet'] : null ) ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
				$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingTablet'] ) ? $attr['paddingTablet'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
				$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopTablet'] ) ? $attr['paddingTopTablet'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightTablet'] ) ? $attr['paddingRightTablet'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomTablet'] ) ? $attr['paddingBottomTablet'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftTablet'] ) ? $attr['paddingLeftTablet'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopTablet'] ) ? $attr['marginTopTablet'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomTablet'] ) ? $attr['marginBottomTablet'] : null ), 20 ) . 'px;' . "\n";
			}
			$style .= '	}' . "\n \n";

			$style .= '}' . "\n \n";

			$style .= '@media ( max-width: 600px )  {' . "\n";

			$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( isset( $attr['alignMobile'] ) ) {
				$style .= '		text-align: ' . $this->get_attr_value( ( isset( $attr['alignMobile'] ) ? $attr['alignMobile'] : 'unset' ) ) . ';' . "\n";
			}

			if ( isset( $attr['fontSizeMobile'] ) ) {
				$style .= '		font-size: ' . $this->get_attr_value( ( isset( $attr['fontSizeMobile'] ) ? $attr['fontSizeMobile'] : null ) ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
				$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingMobile'] ) ? $attr['paddingMobile'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
				$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopMobile'] ) ? $attr['paddingTopMobile'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightMobile'] ) ? $attr['paddingRightMobile'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomMobile'] ) ? $attr['paddingBottomMobile'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftMobile'] ) ? $attr['paddingLeftMobile'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 0 ) . 'px;' . "\n";
			}

			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopMobile'] ) ? $attr['marginTopMobile'] : null ), 0 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomMobile'] ) ? $attr['marginBottomMobile'] : null ), 20 ) . 'px;' . "\n";
			}
			$style .= '	}' . "\n \n";

			$style .= '}' . "\n \n";
		}

		return $style;
	}
}
