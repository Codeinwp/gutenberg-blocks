<?php
/**
 * Css generator.
 *
 * $css = new CSS_Utility( $block );
 *
 * $css->add_item( array(
 *  'global'     => 'global',
 *  'selector'   => ' .wp-block',
 *  'properties' => array(
 *      array(
 *          'property'    => 'margin',
 *          'value'       => 'spacing',
 *          'unit'        => 'px',
 *          'default'     => 20,
 *          'format'      => function( $value, $attrs ) {
 *              return $value / 2;
 *          },
 *          'condition'   => function( $attrs ) {
 *              return true;
 *          },
 *      ),
 *      array(
 *          'property'       => 'margin',
 *          'pattern'        => '20px marginLeftRight',
 *          'pattern_values' => array(
 *              'marginLeftRight' => array(
 *                  'value'   => 'marginLeftRight',
 *                  'unit'    => 'px',
 *                  'default' => 20,
 *                  'format'  => function( $value, $attrs ) {
 *                      return $value / 2;
 *                  },
 *              ),
 *          ),
 *          'condition'      => function( $attrs ) {
 *              return true;
 *          },
 *      ),
 *  ),
 * ) );
 *
 * $style = $css->generate();
 * 
 * Inspired by https://github.com/kirki-framework/wp-css-generator
 *
 * @package ThemeIsle\GutenbergBlocks\CSS
 */

namespace ThemeIsle\GutenbergBlocks\CSS;

/**
 * Class Block_Frontend
 */
class CSS_Utility {

	/**
	 * Variable to hold block array.
	 *
	 * @var array
	 */
	public $block = array();

	/**
	 * Variable to hold CSS array.
	 *
	 * @var array
	 */
	public $css_array = array();

	/**
	 * Constructor
	 *
	 * @access public
	 * @param array $block Block object.
	 */
	public function __construct( $block ) {
		$this->block = $block;
	}

	/**
	 * Add a style to CSS array.
	 *
	 * @access public
	 * @since 1.6.0
	 * @param array $params CSS object parameters.
	 */
	public function add_item( $params ) {
		$params = wp_parse_args(
			$params,
			array(
				'query'      => 'global',
				'selector'   => '',
				'properties' => '',
			)
		);

		if ( ! isset( $this->css_array[ $params['query'] ] ) ) {
			$this->css_array[ $params['query'] ] = array();
		}

		if ( ! isset( $this->css_array[ $params['query'] ][ $params['selector'] ] ) ) {
			$this->css_array[ $params['query'] ][ $params['selector'] ] = array();
		}

		$this->css_array[ $params['query'] ][ $params['selector'] ] = $params['properties'];
	}

	/**
	 * Generate CSS from provided values.
	 *
	 * @access public
	 * @since 1.6.0
	 */
	public function generate() {
		$style = '';

		$attrs = $this->block['attrs'];

		if ( ! isset( $attrs['id'] ) ) {
			return $style;
		}

		foreach ( $this->css_array as $media_query => $css_items ) {
			$style .= ( 'global' !== $media_query ) ? $media_query . '{'  . "\n" : '';

			foreach ( $css_items as $selector => $properties ) {
				$item_style = '';

				foreach ( $properties as $property ) {
					$property = wp_parse_args(
						$property,
						array(
							'unit' => '',
						)
					);

					if ( isset( $property['condition'] ) && is_callable( $property['condition'] ) && ! $property['condition']( $attrs ) ) {
						continue;
					}

					if ( isset( $property['property'] ) && ( ( isset( $property['value'] ) && isset( $attrs[ $property['value'] ] ) ) || isset( $property['default'] ) ) ) {
						$value = ( ( isset( $property['value'] ) && isset( $attrs[ $property['value'] ] ) ) ? $attrs[ $property['value'] ] : $property['default'] );

						if ( isset( $property['format'] ) && is_callable( $property['format'] ) ) {
							$value = $property['format']( $value, $attrs );
						}

						$value       = $value . $property['unit'];
						$item_style .= $property['property'] . ': ' . $value . ';' . "\n";
					}
				}

				if ( '' !== $item_style ) {
					$style .= '#' . $attrs['id'] . $selector . ' {' . "\n" . $item_style . '}' . "\n \n";
				}
			}

			$style .= ( 'global' !== $media_query ) ? '}' : '';
		}

		echo '<pre>';
		print_r( $style );
		echo '</pre>';

		return $style;
	}
}
