<?php
/**
 * Css handling logic for group.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Button_CSS
 */
class Button_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'button';

	/**
	 * Generate Button CSS
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
			$style .= '#' . $attr['id'] . ' .wp-block-button__link {' . "\n";
			if ( isset( $attr['library'] ) && 'themeisle-icons' === $attr['library'] ) {
				$style .= '	display: inline-flex;' . "\n";
				$style .= '	align-items: center;' . "\n";
			}

			if ( isset( $attr['color'] ) && ! empty( $attr['color'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( ( isset( $attr['color'] ) ? $attr['color'] : null ) ) . ';' . "\n";
			}

			if ( ( isset( $attr['background'] ) && ! empty( $attr['background'] ) ) || ( isset( $attr['backgroundGradient'] ) && ! empty( $attr['backgroundGradient'] ) ) ) {
				$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['background'] ) ? $attr['background'] : $attr['backgroundGradient'] ) ) . ';' . "\n";
			}

			if ( isset( $attr['borderSize'] ) ) {
				$style .= '	border-width: ' . $this->get_attr_value( ( isset( $attr['borderSize'] ) ? $attr['borderSize'] : null ) ) . 'px;' . "\n";

				if ( isset( $attr['border'] ) && ! empty( $attr['border'] ) ) {
					$style .= '	border-color: ' . $this->get_attr_value( ( isset( $attr['border'] ) ? $attr['border'] : null ) ) . ';' . "\n";
					$style .= '	border-style: solid;' . "\n";
				}
			}

			if ( isset( $attr['borderRadius'] ) && ! empty( $attr['borderRadius'] ) ) {
				$style .= '	border-radius: ' . $this->get_attr_value( ( isset( $attr['borderRadius'] ) ? $attr['borderRadius'] : null ) ) . 'px;' . "\n";
			}

			if ( isset( $attr['boxShadow'] ) && true === $attr['boxShadow'] ) {
				$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $attr['boxShadowHorizontal'] ) ? $attr['boxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowVertical'] ) ? $attr['boxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowBlur'] ) ? $attr['boxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowSpread'] ) ? $attr['boxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $attr['boxShadowColor'] ) ? $attr['boxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $attr['boxShadowColorOpacity'] ) ? $attr['boxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-button__link:hover {' . "\n";
			if ( isset( $attr['hoverColor'] ) && ! empty( $attr['hoverColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( ( isset( $attr['hoverColor'] ) ? $attr['hoverColor'] : null ) ) . ';' . "\n";
			}
	
			if ( ( isset( $attr['hoverBackground'] ) && ! empty( $attr['hoverBackground'] ) ) || ( isset( $attr['hoverBackgroundGradient'] ) && ! empty( $attr['hoverBackgroundGradient'] ) ) ) {
				$style .= '	background: ' . $this->get_attr_value( ( isset( $attr['hoverBackground'] ) ? $attr['hoverBackground'] : $attr['hoverBackgroundGradient'] ) ) . ';' . "\n";
			}
	
			if ( isset( $attr['hoverBorder'] ) && ! empty( $attr['hoverBorder'] ) ) {
				$style .= '	border-color: ' . $this->get_attr_value( ( isset( $attr['hoverBorder'] ) ? $attr['hoverBorder'] : null ) ) . ';' . "\n";
			}

			if ( isset( $attr['boxShadow'] ) && true === $attr['boxShadow'] ) {
				$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowHorizontal'] ) ? $attr['hoverBoxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowVertical'] ) ? $attr['hoverBoxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowBlur'] ) ? $attr['hoverBoxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowSpread'] ) ? $attr['hoverBoxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $attr['hoverBoxShadowColor'] ) ? $attr['hoverBoxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $attr['hoverBoxShadowColorOpacity'] ) ? $attr['hoverBoxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-button__link svg {' . "\n";
			if ( isset( $attr['color'] ) && ! empty( $attr['color'] ) ) {
				$style .= '	fill: ' . $this->get_attr_value( ( isset( $attr['color'] ) ? $attr['color'] : null ) ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-button__link:hover svg {' . "\n";
			if ( isset( $attr['hoverColor'] ) && ! empty( $attr['hoverColor'] ) ) {
				$style .= '	fill: ' . $this->get_attr_value( ( isset( $attr['hoverColor'] ) ? $attr['hoverColor'] : null ) ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";
		}

		return $style;
	}
}
