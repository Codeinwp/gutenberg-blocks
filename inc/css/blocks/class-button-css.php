<?php
/**
 * Css handling logic for group.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

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
		$css = new CSS_Utility( $block );

		$css->add_item(
			array(
				'selector'   => ' .wp-block-button__link',
				'properties' => array(
					array(
						'property'  => 'display',
						'default'   => 'inline-flex',
						'condition' => function( $attrs ) {
							return isset( $attrs['library'] ) && 'themeisle-icons' === $attrs['library'];
						},
					),
					array(
						'property'  => 'align-items',
						'default'   => 'center',
						'condition' => function( $attrs ) {
							return isset( $attrs['library'] ) && 'themeisle-icons' === $attrs['library'];
						},
					),
					array(
						'property' => 'color',
						'value'    => 'color',
					),
					array(
						'property' => 'background',
						'value'    => 'background',
					),
					array(
						'property' => 'background',
						'value'    => 'backgroundGradient',
					),
					array(
						'property' => 'border-width',
						'value'    => 'borderSize',
						'unit'     => 'px',
					),
					array(
						'property'  => 'border-color',
						'value'     => 'border',
						'condition' => function( $attrs ) {
							return isset( $attrs['border'] ) && ! empty( $attrs['border'] );
						},
					),
					array(
						'property'  => 'border-style',
						'default'   => 'solid',
						'condition' => function( $attrs ) {
							return isset( $attrs['border'] ) && ! empty( $attrs['border'] );
						},
					),
					array(
						'property' => 'border-radius',
						'value'    => 'borderRadius',
						'unit'     => 'px',
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-button__link:hover',
				'properties' => array(
					array(
						'property' => 'color',
						'value'    => 'hoverColor',
					),
					array(
						'property' => 'background',
						'value'    => 'hoverBackground',
					),
					array(
						'property' => 'background',
						'value'    => 'hoverBackgroundGradient',
					),
					array(
						'property' => 'border-color',
						'value'    => 'hoverBorder',
					),
				),
			)
		);

		$style = $css->generate();

		return $style;
		$attr  = $block['attrs'];
		$style = '';

		if ( isset( $attr['id'] ) ) {
			$style .= '#' . $attr['id'] . ' .wp-block-button__link {' . "\n";
			if ( isset( $attr['boxShadow'] ) && true === $attr['boxShadow'] ) {
				$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $attr['boxShadowHorizontal'] ) ? $attr['boxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowVertical'] ) ? $attr['boxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowBlur'] ) ? $attr['boxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $attr['boxShadowSpread'] ) ? $attr['boxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $attr['boxShadowColor'] ) ? $attr['boxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $attr['boxShadowColorOpacity'] ) ? $attr['boxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";

			$style .= '#' . $attr['id'] . ' .wp-block-button__link:hover {' . "\n";
			if ( isset( $attr['boxShadow'] ) && true === $attr['boxShadow'] ) {
				$style .= '	box-shadow: ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowHorizontal'] ) ? $attr['hoverBoxShadowHorizontal'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowVertical'] ) ? $attr['hoverBoxShadowVertical'] : null ), 0 ) . 'px ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowBlur'] ) ? $attr['hoverBoxShadowBlur'] : null ), 5 ) . 'px ' . $this->get_attr_value( ( isset( $attr['hoverBoxShadowSpread'] ) ? $attr['hoverBoxShadowSpread'] : null ), 1 ) . 'px ' . $this->hex2rgba( $this->get_attr_value( ( isset( $attr['hoverBoxShadowColor'] ) ? $attr['hoverBoxShadowColor'] : null ), '#000' ), $this->get_attr_value( ( isset( $attr['hoverBoxShadowColorOpacity'] ) ? $attr['hoverBoxShadowColorOpacity'] : null ), '50' ) / 100 ) . ';' . "\n";
			}
			$style .= '}' . "\n \n";
		}

		return $style;
	}
}
