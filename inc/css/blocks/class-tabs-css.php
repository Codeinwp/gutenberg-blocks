<?php
/**
 * Css handling logic for blocks.
 *
 * @package ThemeIsle\GutenbergBlocks\CSS\Blocks
 */

namespace ThemeIsle\GutenbergBlocks\CSS\Blocks;

use ThemeIsle\GutenbergBlocks\Base_CSS;

use ThemeIsle\GutenbergBlocks\CSS\CSS_Utility;

/**
 * Class Progress_Bar_CSS
 */
class Tabs_CSS extends Base_CSS {

	/**
	 * The namespace under which the blocks are registered.
	 *
	 * @var string
	 */
	public $block_prefix = 'tabs';

	/**
	 * Generate Progress Bar CSS
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
				'selector'   => ' .wp-block-themeisle-blocks-tabs-header.active',
				'properties' => array(
					array(
						'property'  => 'background-color',
						'value'     => 'tabColor',
						'condition' => function( $attrs ) {
							return isset( $attrs['tabColor'] );
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-tabs-header.active, .wp-block-themeisle-blocks-tabs-header.active::before, .wp-block-themeisle-blocks-tabs-header.active::after',
				'properties' => array(
					array(
						'property'  => 'border-width',
						'value'     => 'borderWidth',
						'condition' => function( $attrs ) {
							return isset( $attrs['borderWidth'] );
						},
					),
				),
			)
		);

		$css->add_item(
			array(
				'selector'   => ' .wp-block-themeisle-blocks-tabs-item-header, .wp-block-themeisle-blocks-tabs-item-content',
				'properties' => array(
					array(
						'property'  => 'background-color',
						'value'     => 'tabColor',
						'condition' => function( $attrs ) {
							return isset( $attrs['tabColor'] );
						},
					),
					array(
						'property'  => 'border-width',
						'value'     => 'borderWidth',
						'condition' => function( $attrs ) {
							return isset( $attrs['borderWidth'] );
						},
					),
				),
			)
		);

		$style = $css->generate();

		return $style;
	}
}
