<?php
/**
 * Css handling logic for blocks.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

use Masterminds\HTML5;

/**
 * Class Core_Image_Plugin_CSS
 */
class Core_Image_Plugin_CSS extends Base_CSS {

	/**
	 * The library under which the blocks are registered.
	 *
	 * @var string
	 */
	public $library_prefix = 'core';

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'image';

	/**
	 * Generate Icon Block CSS
	 *
	 * @param mixed $block Block data.
	 * @return string
	 * @since   1.7.0
	 * @access  public
	 */
	public function render_css( $block ) {
		$css = new CSS_Utility( $block );

		$html5  = new HTML5();
		$dom    = $html5->loadHTML( $block['innerHTML'] );
		$figure = $dom->getElementsByTagName( 'figure' );
		$style  = '';

		if ( 0 === count( $figure ) ) {
			return $style;
		}

		$id = $figure[0]->getAttribute( 'id' );

		if ( ! isset( $id ) || empty( $id ) ) {
			return $style;
		}

		$css->set_id( $id );

		$css->add_item(
			array(
				'selector'   => ' img',
				'properties' => array(
					array(
						'property'       => 'box-shadow',
						'pattern'        => 'horizontal vertical blur color',
						'pattern_values' => array(
							'horizontal' => array(
								'value'   => 'boxShadowHorizontal',
								'unit'    => 'px',
								'default' => 0,
							),
							'vertical'   => array(
								'value'   => 'boxShadowVertical',
								'unit'    => 'px',
								'default' => 0,
							),
							'blur'       => array(
								'value'   => 'boxShadowBlur',
								'unit'    => 'px',
								'default' => 5,
							),
							'color'      => array(
								'value'   => 'boxShadowColor',
								'default' => '#000',
								'format'  => function( $value, $attrs ) {
									$opacity = ( isset( $attrs['boxShadowColorOpacity'] ) ? $attrs['boxShadowColorOpacity'] : 50 ) / 100;
									return strpos( $value, '#' ) !== false ? $this->hex2rgba( $value, $opacity ) : $value;
								},
							),
						),
						'condition'      => function( $attrs ) {
							return isset( $attrs['boxShadow'] );
						},
					),
				),
			)
		);

		$style = $css->generate();

		return $style;
	}
}
