<?php

/**
 * Map block
 *
 * @package ThemeIsle\GutenbergBlocks\Render
 */

namespace ThemeIsle\GutenbergBlocks\Render;

use ThemeIsle\GutenbergBlocks\Base_Block;

/**
 * Class Leaflet_Map_Block
 */
class Leaflet_Map_Block extends Base_Block
{

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	protected function set_block_slug()
	{
		$this->block_slug = 'map-block';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	protected function set_attributes()
	{
		$this->attributes = array(
			'id'                => array(
				'type' => 'string',
			),
			'location'          => array(
				'type'    => 'string',
				'default' => 'La Sagrada Familia, Barcelona, Spain',
			),
			'latitude'          => array(
				'type'    => 'string',
				'default' => '41.4036299',
			),
			'longitude'         => array(
				'type'    => 'string',
				'default' => '2.1743558000000576',
			),
			'zoom'              => array(
				'type'    => 'number',
				'default' => 15,
			),
			'height'            => array(
				'type'    => 'number',
				'default' => 400,
			),
			'markers'           => array(
				'type'    => 'object',
				'default' => [],
			),
		);
	}

	/**
	 * Block render function for server-side.
	 *
	 * This method will pe passed to the render_callback parameter and it will output
	 * the server side output of the block.
	 *
	 * @param array $attributes Blocks attrs.
	 *
	 * @return mixed|string
	 */
	protected function render($attributes)
	{
		if (function_exists('is_amp_endpoint') && is_amp_endpoint()) {

			$output  = '<amp-iframe width="400" height="' . intval($attributes['height']) . '" sandbox="allow-scripts allow-same-origin" layout="responsive" src="https://www.embed-leaflet.com/map?center=' . esc_attr($attributes['latitude']) . ',' . esc_attr($attributes['longitude']) . '&zoom=8&style=&marker=false&popup=false&title=&enhancedScroll=true' . '">';
			$output .= '	<amp-img layout="fill" src="' . plugin_dir_url(__FILE__) . '../../assets/icons/map-standard.png" placeholder></amp-img>';
			$output .= '</amp-iframe>';

			return $output;
		}

		// Set the ID and the class name
		$id    = isset($attributes['id']) ? $attributes['id'] : 'wp-block-themeisle-blocks-map-' . wp_rand(10, 100);
		$class = 'wp-block-themeisle-blocks-map';

		if (isset($attributes['className'])) {
			$class .= ' ' . esc_attr($attributes['className']);
		}

		if (isset($attributes['align'])) {
			$class .= ' align' . esc_attr($attributes['align']);
		}

		// Load the attributes in the page and make a placeholder to render the map
		$output  = '<div class="' . esc_attr($class) . '" id="' . esc_attr($id) . '"></div>' . "\n";
		$output .= '<script type="text/javascript">' . "\n";
		$output .= '	/* <![CDATA[ */' . "\n";
		$output .= '		if ( ! window.themeisleLeafletMaps ) window.themeisleLeafletMaps =[];' . "\n";
		$output .= '		window.themeisleLeafletMaps.push( { container: "' . $id . '", attributes: ' . wp_json_encode($attributes) . ' } );' . "\n";
		$output .= '	/* ]]> */' . "\n";
		$output .= '</script>' . "\n";

		return $output;
	}
}
