<?php
/**
 * Map block
 *
 * @package ThemeIsle\GutenbergBlocks\Render
 */

namespace ThemeIsle\GutenbergBlocks\Render;

use ThemeIsle\GutenbergBlocks\Base_Block;

/**
 * Class Map_Block
 */
class Map_Block extends Base_Block {
	
	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	protected function set_block_slug() {
		$this->block_slug = 'map';
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
				'default' => 'Statue of Liberty, New York, NY, 10004, USA',
			),
			'latitude'          => array(
				'type'    => 'number',
				'default' => 40.68924563540814,
			),
			'longitude'         => array(
				'type'    => 'number',
				'default' => -74.04443979263307,
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
			'zoomControl'       => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'fullscreenControl' => array(
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


		$id    = isset( $attributes['id'] ) ? $attributes['id'] : 'wp-block-themeisle-blocks-map-' . wp_rand( 10, 100 );
		$class = 'wp-block-themeisle-blocks-map';

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . esc_attr( $attributes['className'] );
		}

		if ( isset( $attributes['align'] ) ) {
		$class .= ' align' . esc_attr( $attributes['align'] );
		}

		$output  = '<div class="' . esc_attr( $class ) . '" id="' . esc_attr( $id ) . '"></div>' . "\n";
		$output .= '<script type="text/javascript">' . "\n";
		$output .= '	/* <![CDATA[ */' . "\n";
		$output .= '		if ( ! window.themeisleMaps ) window.themeisleMaps =[];' . "\n";
		$output .= '		const map= { container: "' . $id . '", attributes: ' . wp_json_encode( $attributes ) . ' };' . "\n";
		$output .= '		const mapContainer=document.getElementById( map.container); ' . "\n";
		$output .= '		mapContainer.style.height = `${map.attributes.height}px`;' . "\n";  //L is not defined. I also tried using window.L or the frontend/map.index.js script
		$output .= '		const leafletMap = L.Map( mapContainer, {  
								center: {
									lat: map.attributes.latitude,
									lng: map.attributes.longitude
								},
							zoom: map.attributes.zoom
							});' . "\n";
		$output .= '	/* ]]> */' . "\n";
		$output .= '</script>' . "\n";


		return $output;

}
}