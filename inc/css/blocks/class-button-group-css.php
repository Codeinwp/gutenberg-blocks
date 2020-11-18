<?php
/**
 * Css handling logic for group.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Button_Group_CSS
 */
class Button_Group_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'button-group';

	/**
	 * Generate Button Group CSS
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

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button {' . "\n";
				$style .= '	margin-left: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";
				$style .= '	margin-right: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";
			$style     .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button .wp-block-button__link {' . "\n";
			if ( isset( $attr['paddingTopBottom'] ) ) {
				$style .= '	padding-top: ' . $this->get_attr_value( ( isset( $attr['paddingTopBottom'] ) ? $attr['paddingTopBottom'] : null ) ) . 'px;' . "\n";
				$style .= '	padding-bottom: ' . $this->get_attr_value( ( isset( $attr['paddingTopBottom'] ) ? $attr['paddingTopBottom'] : null ) ) . 'px;' . "\n";
			}

			if ( isset( $attr['paddingLeftRight'] ) ) {
				$style .= '	padding-left: ' . $this->get_attr_value( ( isset( $attr['paddingLeftRight'] ) ? $attr['paddingLeftRight'] : null ) ) . 'px;' . "\n";
				$style .= '	padding-right: ' . $this->get_attr_value( ( isset( $attr['paddingLeftRight'] ) ? $attr['paddingLeftRight'] : null ) ) . 'px;' . "\n";
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
	
			if ( isset( $attr['textTransform'] ) ) {
				$style .= '	text-transform: ' . $this->get_attr_value( ( isset( $attr['textTransform'] ) ? $attr['textTransform'] : null ), 'none' ) . ';' . "\n";
			}
	
			if ( isset( $attr['fontStyle'] ) ) {
				$style .= '	font-style: ' . $this->get_attr_value( ( isset( $attr['fontStyle'] ) ? $attr['fontStyle'] : null ), 'normal' ) . ';' . "\n";
			}
	
			if ( isset( $attr['lineHeight'] ) ) {
				$style .= '	line-height: ' . $this->get_attr_value( ( isset( $attr['lineHeight'] ) ? $attr['lineHeight'] : null ) ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button .wp-block-button__link svg {' . "\n";
			if ( isset( $attr['fontSize'] ) ) {
				$style .= '	width: ' . $this->get_attr_value( ( isset( $attr['fontSize'] ) ? $attr['fontSize'] : null ) ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:first-child {' . "\n";
				$style .= '	margin-left: 0;' . "\n";
			$style     .= '}' . "\n \n";

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:last-child {' . "\n";
				$style .= '	margin-right: 0;' . "\n";
			$style     .= '}' . "\n \n";
		}

		return $style;
	}
}
