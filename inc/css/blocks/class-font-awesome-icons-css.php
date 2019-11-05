<?php

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
	 * Constructor function for the module.
	 *
	 * @method __construct
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Generate Font Awesome Icons CSS
	 * 
	 * @since   1.3.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$attr = $block['attrs'];
		$style = '';

		if ( isset( $attr['id'] ) ) {
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
			$style .= '}' . "\n \n";

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
			$style .= '}' . "\n";
		}

		return $style;
	}
}
