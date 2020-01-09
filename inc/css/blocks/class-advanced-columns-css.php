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

			if ( 'custom' !== $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) {
				$style .= '	min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) . ';' . "\n";
			}

			if ( ( 'custom' === $this->get_attr_value( ( isset( $attr['columnsHeight'] ) ? $attr['columnsHeight'] : null ), 'auto' ) ) && isset( $attr['columnsHeightCustom'] ) ) {
				$style .= '	min-height: ' . $this->get_attr_value( ( isset( $attr['columnsHeightCustom'] ) ? $attr['columnsHeightCustom'] : null ) ) . 'px;' . "\n";
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

			$style     .= '#' . $attr['id'] . ' .wp-themeisle-block-overlay {' . "\n";
				$style .= '	filter: blur( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterBlur'] ) ? ( $attr['backgroundOverlayFilterBlur'] / 10 ) : 0 ) ) . 'px ) brightness( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterBrightness'] ) ? ( $attr['backgroundOverlayFilterBrightness'] / 10 ) : 1 ) ) . ' ) contrast( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterContrast'] ) ? ( $attr['backgroundOverlayFilterContrast'] / 10 ) : 1 ) ) . ' ) grayscale( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterGrayscale'] ) ? ( $attr['backgroundOverlayFilterGrayscale'] / 100 ) : 0 ) ) . ' ) hue-rotate( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterHue'] ) ? $attr['backgroundOverlayFilterHue'] : 0 ) ) . 'deg ) saturate( ' . $this->get_attr_value( ( isset( $attr['backgroundOverlayFilterSaturate'] ) ? ( $attr['backgroundOverlayFilterSaturate'] / 10 ) : 1 ) ) . ' )' . "\n";
			$style     .= '}' . "\n \n";

			$style .= '@media ( min-width: 600px ) and ( max-width: 960px )  {' . "\n";

				$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
				$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingTablet'] ) ? $attr['paddingTablet'] : null ), 20 ) . 'px;' . "\n";
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeTablet'] ) ? $attr['paddingTypeTablet'] : null ), 'linked' ) ) {
				$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopTablet'] ) ? $attr['paddingTopTablet'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightTablet'] ) ? $attr['paddingRightTablet'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomTablet'] ) ? $attr['paddingBottomTablet'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftTablet'] ) ? $attr['paddingLeftTablet'] : null ), 20 ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginTablet'] ) ? $attr['marginTablet'] : null ), 20 ) . 'px;' . "\n";
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeTablet'] ) ? $attr['marginTypeTablet'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopTablet'] ) ? $attr['marginTopTablet'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomTablet'] ) ? $attr['marginBottomTablet'] : null ), 20 ) . 'px;' . "\n";
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

			$style .= '@media ( max-width: 600px )  {' . "\n";

				$style .= '	#' . $attr['id'] . ' {' . "\n";
			if ( 'linked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
				$style .= '		padding: ' . $this->get_attr_value( ( isset( $attr['paddingMobile'] ) ? $attr['paddingMobile'] : null ), 20 ) . 'px;' . "\n";
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['paddingTypeMobile'] ) ? $attr['paddingTypeMobile'] : null ), 'linked' ) ) {
				$style .= '		padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopMobile'] ) ? $attr['paddingTopMobile'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingRightMobile'] ) ? $attr['paddingRightMobile'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingBottomMobile'] ) ? $attr['paddingBottomMobile'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftMobile'] ) ? $attr['paddingLeftMobile'] : null ), 20 ) . 'px;' . "\n";
			}

			if ( 'linked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginMobile'] ) ? $attr['marginMobile'] : null ), 20 ) . 'px;' . "\n";
			}
	
			if ( 'unlinked' === $this->get_attr_value( ( isset( $attr['marginTypeMobile'] ) ? $attr['marginTypeMobile'] : null ), 'unlinked' ) ) {
				$style .= '		margin-top: ' . $this->get_attr_value( ( isset( $attr['marginTopMobile'] ) ? $attr['marginTopMobile'] : null ), 20 ) . 'px;' . "\n";
				$style .= '		margin-bottom: ' . $this->get_attr_value( ( isset( $attr['marginBottomMobile'] ) ? $attr['marginBottomMobile'] : null ), 20 ) . 'px;' . "\n";
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
