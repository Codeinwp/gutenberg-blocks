<?php
/**
 * Css handling logic for icons.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Font_Awesome_Icons_CSS
 */
class Font_Awesome_Icons_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'font-awesome-icons';

	/**
	 * Generate Font Awesome Icons CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.3.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$attr               = $block['attrs'];
		$style              = '';
		$is_themeisle_icons = isset( $attr['library'] ) && 'themeisle-icons' === $this->get_attr_value( $attr['library'], 'fontawesome' );

		if ( isset( $attr['id'] ) ) {
			if ( isset( $attr['align'] ) ) {
				$style     .= '#' . $attr['id'] . ' {' . "\n";
					$style .= '	text-align: ' . $this->get_attr_value( $attr['align'] ) . ';' . "\n";
				$style     .= '}' . "\n \n";
			}

			if ( isset( $attr['textColor'] ) || isset( $attr['backgroundColor'] ) || isset( $attr['borderColor'] ) || isset( $attr['borderRadius'] ) || isset( $attr['borderSize'] ) || isset( $attr['margin'] ) ) {
				$width  = 0;
				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-font-awesome-icons-container {' . "\n";
				if ( isset( $attr['textColor'] ) ) {
					$style .= '	color: ' . $this->get_attr_value( $attr['textColor'] ) . ';' . "\n";
				}
				if ( isset( $attr['backgroundColor'] ) ) {
					$style .= '	background: ' . $this->get_attr_value( $attr['backgroundColor'] ) . ';' . "\n";
				}
				if ( isset( $attr['borderColor'] ) ) {
					$style .= '	border-color: ' . $this->get_attr_value( $attr['borderColor'] ) . ';' . "\n";
				}
				if ( isset( $attr['borderSize'] ) ) {
					$style .= '	border-width: ' . $this->get_attr_value( $attr['borderSize'], 0 ) . 'px;' . "\n";
					$style .= '	border-style: solid;' . "\n";
					$width += $this->get_attr_value( $attr['borderSize'], 0 ) * 2;
				}
				if ( isset( $attr['borderRadius'] ) ) {
					$style .= '	border-radius: ' . $this->get_attr_value( $attr['borderRadius'], 0 ) . '%;' . "\n";
				}
				if ( isset( $attr['margin'] ) ) {
					$style .= '	margin: ' . $this->get_attr_value( $attr['margin'] ) . 'px;' . "\n";
				}
				if ( $is_themeisle_icons && isset( $attr['padding'] ) ) {
					$style .= '	padding: ' . $this->get_attr_value( $attr['padding'] ) . 'px;' . "\n";
				}
				if ( isset( $attr['fontSize'] ) ) {
					$width += $this->get_attr_value( $attr['fontSize'], 0 );
				} else {
					$width += 16;
				}
				if ( isset( $attr['padding'] ) ) {
					$width += $this->get_attr_value( $attr['padding'], 5 ) * 2;
				} else {
					$width += 5 * 2;
				}

				if ( $width > 0 ) {
					$style .= '	width: ' . $width . 'px;' . "\n";
				}

				$style .= '}' . "\n \n";
			}

			if ( isset( $attr['textColorHover'] ) || isset( $attr['backgroundColorHover'] ) || isset( $attr['borderColorHover'] ) ) {
				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-font-awesome-icons-container:hover {' . "\n";
				if ( isset( $attr['textColorHover'] ) ) {
					$style .= '	color: ' . $this->get_attr_value( $attr['textColorHover'] ) . ';' . "\n";
				}
				if ( isset( $attr['backgroundColorHover'] ) ) {
					$style .= '	background: ' . $this->get_attr_value( $attr['backgroundColorHover'] ) . ';' . "\n";
				}
				if ( isset( $attr['borderColorHover'] ) ) {
					$style .= '	border-color: ' . $this->get_attr_value( $attr['borderColorHover'] ) . ';' . "\n";
				}
				$style .= '}' . "\n \n";
			}

			if ( isset( $attr['textColorHover'] ) && $is_themeisle_icons ) {
				$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-font-awesome-icons-container:hover svg {' . "\n";
				$style .= '	fill: ' . $this->get_attr_value( $attr['textColorHover'] ) . ';' . "\n";
				$style .= '}' . "\n \n";
			}

			if ( isset( $attr['textColor'] ) ) {
				if ( $is_themeisle_icons ) {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-font-awesome-icons-container svg {' . "\n";
					$style .= '	fill: ' . $this->get_attr_value( $attr['textColor'] ) . ';' . "\n";
					$style .= '}' . "\n \n";
				} else {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-font-awesome-icons-container a {' . "\n";
					$style .= '	color: ' . $this->get_attr_value( $attr['textColor'] ) . ';' . "\n";
					$style .= '}' . "\n \n";
				}
			}

			if ( isset( $attr['borderRadius'] ) || isset( $attr['fontSize'] ) || isset( $attr['padding'] ) ) {
				if ( $is_themeisle_icons ) {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-font-awesome-icons-container svg {' . "\n";
				} else {
					$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-font-awesome-icons-container i {' . "\n";
					if ( isset( $attr['padding'] ) ) {
						$style .= '	padding: ' . $this->get_attr_value( $attr['padding'] ) . 'px;' . "\n";
					}

					if ( isset( $attr['borderRadius'] ) ) {
						$style .= '	border-radius: ' . $this->get_attr_value( $attr['borderRadius'] ) . '%;' . "\n";
					}
				}

				if ( isset( $attr['fontSize'] ) ) {
					if ( $is_themeisle_icons ) {
						$style .= '	width: ' . $this->get_attr_value( $attr['fontSize'] ) . 'px;' . "\n";
					} else {
						$style .= '	font-size: ' . $this->get_attr_value( $attr['fontSize'] ) . 'px;' . "\n";
					}
				}
				$style .= '}' . "\n";
			}
		}

		return $style;
	}
}
