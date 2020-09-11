<?php
/**
 * Css handling logic for icons.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

/**
 * Class Progress_Bar_CSS
 */
class Progress_Bar_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'progress-bar';

	/**
	 * Generate Progress Bar CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.3.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$attr  = $block['attrs'];
		$style = '';
		$ratio = 0.65;

		if ( isset( $attr['id'] ) ) {

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__outer .wp-block-themeisle-blocks-progress-bar__outer__title {' . "\n";
			if ( isset( $attr['titleColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['titleColor'] ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__outer .wp-block-themeisle-blocks-progress-bar__outer__value {' . "\n";
			if ( isset( $attr['percentageColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['percentageColor'] ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";


			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area {' . "\n";
			if ( isset( $attr['backgroundColor'] ) ) {
				$style .= '	background: ' . $this->get_attr_value( $attr['backgroundColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['borderRadius'] ) ) {
				$style .= '	border-radius: ' . $this->get_attr_value( $attr['borderRadius'] ) . 'px;' . "\n";
			}
			if ( isset( $attr['height'] ) ) {
				$style .= '	height: ' . $this->get_attr_value( $attr['height'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";



			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area .wp-block-themeisle-blocks-progress-bar__area__title {' . "\n";
			if ( isset( $attr['height'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['height'] ) * $ratio . 'px;' . "\n";
			}
			
			if ( isset( $attr['height'] ) ) {
				$style .= '	height: ' . $this->get_attr_value( $attr['height'] ) . 'px;' . "\n";
			}
			if ( isset( $attr['borderRadius'] ) ) {
				$style .= '	border-radius: ' . $this->get_attr_value( $attr['borderRadius'] ) . 'px 0 0 ' . $this->get_attr_value( $attr['borderRadius'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";


			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area .wp-block-themeisle-blocks-progress-bar__area__title.highlight {' . "\n";
			
			if ( isset( $attr['barBackgroundColor'] ) ) {
				$style .= '	background: ' . $this->get_attr_value( $attr['barBackgroundColor'] ) . ';' . "\n";
			}
			
			$style .= '}' . "\n \n";


			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area .wp-block-themeisle-blocks-progress-bar__area__title span {' . "\n";
			if ( isset( $attr['height'] ) ) {
				$style .= '	height: ' . $this->get_attr_value( $attr['height'] ) . 'px;' . "\n";
			}
			if ( isset( $attr['titleColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['titleColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['borderRadius'] ) ) {
				$style .= '	border-radius: ' . $this->get_attr_value( $attr['borderRadius'] ) . 'px 0 0 ' . $this->get_attr_value( $attr['borderRadius'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";


			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area .wp-block-themeisle-blocks-progress-bar__area__bar {' . "\n";
			if ( isset( $attr['barBackgroundColor'] ) ) {
				$style .= '	background: ' . $this->get_attr_value( $attr['barBackgroundColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['height'] ) ) {
				$style .= '	height: ' . $this->get_attr_value( $attr['height'] ) . 'px;' . "\n";
			}
			if ( isset( $attr['borderRadius'] ) ) {
				$style .= '	border-radius: ' . $this->get_attr_value( $attr['borderRadius'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";


			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area .wp-block-themeisle-blocks-progress-bar__area__bar .wp-block-themeisle-blocks-progress-bar__area__tooltip {' . "\n";
			if ( isset( $attr['percentageColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['percentageColor'] ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";


			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area .wp-block-themeisle-blocks-progress-bar__progress {' . "\n";
			if ( isset( $attr['height'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['height'] ) * $ratio . 'px;' . "\n";
			}
			if ( isset( $attr['percentageColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['percentageColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['height'] ) ) {
				$style .= '	height: ' . $this->get_attr_value( $attr['height'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";


			$style .= '#' . $attr['id'] . ' .wp-block-themeisle-blocks-progress-bar__area .wp-block-themeisle-blocks-progress-bar__area__bar .wp-block-themeisle-blocks-progress-bar__progress__append {' . "\n";
			if ( isset( $attr['height'] ) ) {
				$style .= '	font-size: ' . $this->get_attr_value( $attr['height'] ) * $ratio . 'px;' . "\n";
			}
			if ( isset( $attr['percentageColor'] ) ) {
				$style .= '	color: ' . $this->get_attr_value( $attr['percentageColor'] ) . ';' . "\n";
			}
			if ( isset( $attr['height'] ) ) {
				$style .= '	height: ' . $this->get_attr_value( $attr['height'] ) . 'px;' . "\n";
			}
			$style .= '}' . "\n \n";
		}

		return $style;
	}
}
