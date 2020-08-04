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
class Leaflet_Map_Block extends Base_Block {

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	protected function set_block_slug() {
		$this->block_slug = 'leaflet-map';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	protected function set_attributes() {
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
			'type'              => array(
				'type'    => 'string',
				'default' => 'roadmap',
			),
			'zoom'              => array(
				'type'    => 'number',
				'default' => 15,
			),
			'height'            => array(
				'type'    => 'number',
				'default' => 400,
			),
			'draggable'         => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'mapTypeControl'    => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'zoomControl'       => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'fullscreenControl' => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'streetViewControl' => array(
				'type'    => 'boolean',
				'default' => true,
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
	protected function render( $attributes ) {

			$output  = '<iframe height="' . intval( $attributes['height'] ) . '" marginwidth="0" src="https://www.arcgis.com/apps/Embed/index.html?webmap=432a8d7ca22d4b5b859e0bdaa30ae118&center='. esc_attr($attributes['latitude'] ).','.esc_attr($attributes['longitude']) .'&level='.esc_attr($attributes['zoom']) .'&home=true&zoom ='.$attributes['zoomControl'].'" style="border: 1px solid black  width: 400 "></iframe>';
			return $output;
		}

		// {$id    = isset( $attributes['id'] ) ? $attributes['id'] : 'wp-block-themeisle-blocks-leaflet-map-' . wp_rand( 10, 100 );
		// $class = 'wp-block-themeisle-blocks-leaflet-map';

		// if ( isset( $attributes['className'] ) ) {
		// 	$class .= ' ' . esc_attr( $attributes['className'] );
		// }

		// if ( isset( $attributes['align'] ) ) {
		// 	$class .= ' align' . esc_attr( $attributes['align'] );
		// }

		// $output  = '<div class="' . esc_attr( $class ) . '" id="' . esc_attr( $id ) . '"></div>' . "\n";
		// $output .= '<script type="text/javascript">' . "\n";
		// $output .= '	/* <![CDATA[ */' . "\n";
		// $output .= '		if ( ! window.themeisleLeafletMap ) window.themeisleLeafletMap =[];' . "\n";
		// $output .= '		window.themeisleLeafletMap.push( { container: "' . $id . '", attributes: ' . wp_json_encode( $attributes ) . ' } );' . "\n";
		// $output .= '	/* ]]> */' . "\n";
		// $output .= '</script>' . "\n";

		// return $output;}

}
