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

		if ( isset( $attr['id'] ) && isset( $attr['data'] ) ) {
			$this->get_google_fonts( $attr );

			$style .= '#' . $attr['id'] . ' {' . "\n";
			if ( isset( $attr['align'] ) ) {
				$style .= '	justify-content: ' . $this->get_attr_value( ( isset( $attr['align'] ) ? $attr['align'] : null ) ) . ';' . "\n";
			}
				$style .= '	align-items: ' . $this->get_attr_value( ( isset( $attr['align'] ) ? $attr['align'] : null ), 'flex-start' ) . ';' . "\n";
			$style     .= '}' . "\n \n";

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button {' . "\n";
				$style .= '	margin-left: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";
				$style .= '	margin-right: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";

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

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:first-child {' . "\n";
				$style .= '	margin-left: 0;' . "\n";
			$style     .= '}' . "\n \n";

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:last-child {' . "\n";
				$style .= '	margin-right: 0;' . "\n";
			$style     .= '}' . "\n \n";

			$i = 0;

			foreach ( $attr['data'] as $button ) {
				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button-' . $i . ' {' . "\n";
				if ( isset( $button['color'] ) && '' !== $button['color'] ) {
					$style .= '	color: ' . $button['color'] . ';' . "\n";
				}

				if ( isset( $button['background'] ) && '' !== $button['background'] ) {
					$style .= '	background: ' . $button['background'] . ';' . "\n";
				}

				if ( isset( $button['border'] ) && '' !== $button['border'] ) {
					$style .= '	border-color: ' . $button['border'] . ';' . "\n";
					$style .= '	border-style: solid;' . "\n";
				}

				if ( isset( $button['borderSize'] ) && '' !== $button['borderSize'] ) {
					$style .= '	border-width: ' . $button['borderSize'] . 'px;' . "\n";
				}

				if ( isset( $button['borderRadius'] ) && '' !== $button['borderRadius'] ) {
					$style .= '	border-radius: ' . $button['borderRadius'] . 'px;' . "\n";
				}

				if ( isset( $button['boxShadow'] ) && true === $button['boxShadow'] ) {
					$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $button['boxShadowHorizontal'] ) ? $button['boxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowVertical'] ) ? $button['boxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowBlur'] ) ? $button['boxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowSpread'] ) ? $button['boxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $button['boxShadowColor'] ) ? $button['boxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $button['boxShadowColorOpacity'] ) ? $button['boxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
				}

				if ( isset( $button['paddingTopBottom'] ) && '' !== $button['paddingTopBottom'] ) {
					$style .= '	padding-top: ' . $button['paddingTopBottom'] . 'px;' . "\n";
					$style .= '	padding-bottom: ' . $button['paddingTopBottom'] . 'px;' . "\n";
				}

				if ( isset( $button['paddingLeftRight'] ) && '' !== $button['paddingLeftRight'] ) {
					$style .= '	padding-left: ' . $button['paddingLeftRight'] . 'px;' . "\n";
					$style .= '	padding-right: ' . $button['paddingLeftRight'] . 'px;' . "\n";
				}
				$style .= '}' . "\n \n";

				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button-' . $i . ':hover {' . "\n";
				if ( isset( $button['hoverColor'] ) && '' !== $button['hoverColor'] ) {
					$style .= '	color: ' . $button['hoverColor'] . ';' . "\n";
				}

				if ( isset( $button['hoverBackground'] ) && '' !== $button['hoverBackground'] ) {
					$style .= '	background: ' . $button['hoverBackground'] . ';' . "\n";
				}

				if ( isset( $button['hoverBorder'] ) && '' !== $button['hoverBorder'] ) {
					$style .= '	border-color: ' . $button['hoverBorder'] . ';' . "\n";
				}

				if ( isset( $button['boxShadow'] ) && true === $button['boxShadow'] ) {
					$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowHorizontal'] ) ? $button['hoverBoxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowVertical'] ) ? $button['hoverBoxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowBlur'] ) ? $button['hoverBoxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowSpread'] ) ? $button['hoverBoxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $button['hoverBoxShadowColor'] ) ? $button['hoverBoxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $button['hoverBoxShadowColorOpacity'] ) ? $button['hoverBoxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
				}
				$style .= '}' . "\n \n";
				$i++;
			}
		}

		return $style;
	}
}
