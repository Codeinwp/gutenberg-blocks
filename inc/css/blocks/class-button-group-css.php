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

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button {' . "\n";
				$style .= '	margin-left: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";
				$style .= '	margin-right: ' . $this->get_attr_value( ( isset( $attr['spacing'] ) ? $attr['spacing'] : null ), 20 ) / 2 . 'px;' . "\n";
			$style     .= '}' . "\n \n";

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:first-child {' . "\n";
				$style .= '	margin-left: 0;' . "\n";
			$style     .= '}' . "\n \n";

			$style     .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button:last-child {' . "\n";
				$style .= '	margin-right: 0;' . "\n";
			$style     .= '}' . "\n \n";

			$i = 0;

			foreach ( $attr['data'] as $button ) {
				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button-' . $i . ' {' . "\n";
				if ( isset( $button['color'] ) ) {
					$style .= '	color: ' . $button['color'] . ';' . "\n";
				}

				if ( isset( $button['background'] ) && '' !== $button['background'] ) {
					$style .= '	background: ' . $button['background'] . ';' . "\n";
				}

				if ( isset( $button['border'] ) && '' !== $button['border'] ) {
					$style .= '	border-color: ' . $button['border'] . ';' . "\n";
					$style .= '	border-style: solid;' . "\n";
				}

				if ( isset( $button['boxShadow'] ) && true === $button['boxShadow'] ) {
					$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $button['boxShadowHorizontal'] ) ? $button['boxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowVertical'] ) ? $button['boxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowBlur'] ) ? $button['boxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $button['boxShadowSpread'] ) ? $button['boxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $button['boxShadowColor'] ) ? $button['boxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $button['boxShadowColorOpacity'] ) ? $button['boxShadowColorOpacity'] : null ), '0.5' ) / 100 ) . ';' . "\n";
				}
				$style .= '}' . "\n \n";

				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-button-' . $i . ':hover {' . "\n";
				if ( isset( $button['hoverColor'] ) ) {
					$style .= '	color: ' . $button['hoverColor'] . ';' . "\n";
				}

				if ( isset( $button['hoverBackground'] ) && '' !== $button['hoverBackground'] ) {
					$style .= '	background: ' . $button['hoverBackground'] . ';' . "\n";
				}

				if ( isset( $button['hoverBorder'] ) && '' !== $button['hoverBorder'] ) {
					$style .= '	border-color: ' . $button['hoverBorder'] . ';' . "\n";
				}

				if ( isset( $button['boxShadow'] ) && true === $button['boxShadow'] ) {
					$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowHorizontal'] ) ? $button['hoverBoxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowVertical'] ) ? $button['hoverBoxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowBlur'] ) ? $button['hoverBoxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $button['hoverBoxShadowSpread'] ) ? $button['hoverBoxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $button['hoverBoxShadowColor'] ) ? $button['hoverBoxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $button['hoverBoxShadowColorOpacity'] ) ? $button['hoverBoxShadowColorOpacity'] : null ), '0.5' ) / 100 ) . ';' . "\n";
				}
				$style .= '}' . "\n \n";
				$i++;
			}
		}

		return $style;
	}
}
