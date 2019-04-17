<?php
namespace ThemeIsle\GutenbergBlocks;

/**
 * Class Google_Map_Block
 */
class Google_Map_Block extends Base_Block {

	/**
	 * Constructor function for the module.
	 *
	 * @method __construct
	 */
	public function __construct() {
		parent::__construct();
	}

	/**
	 * Every block needs a slug, so we need to define one and assign it to the `$this->block_slug` property
	 *
	 * @return mixed
	 */
	function set_block_slug() {
		$this->block_slug = 'google-map';
	}

	/**
	 * Set the attributes required on the server side.
	 *
	 * @return mixed
	 */
	function set_attributes() {
		$this->attributes = array(
			'id'				=> array(
				'type'    => 'string',
			),
			'location'			=> array(
				'type'    => 'string',
				'default' => 'La Sagrada Familia, Barcelona, Spain',
			),
			'latitude'			=> array(
				'type'    => 'string',
				'default' => '41.4036299',
			),
			'longitude'			=> array(
				'type'    => 'string',
				'default' => '2.1743558000000576',
			),
			'type'				=> array(
				'type'    => 'string',
				'default' => 'roadmap',
			),
			'zoom'				=> array(
				'type'    => 'number',
				'default' => 15,
			),
			'height'			=> array(
				'type'    => 'number',
				'default' => 400,
			),
			'draggable'			=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'mapTypeControl'	=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'zoomControl'		=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'fullscreenControl'	=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'streetViewControl'	=> array(
				'type'    => 'boolean',
				'default' => true,
			),
			'markers'			=> array(
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
	 * @return mixed|string
	 */
	function render( $attributes ) {
		$id = isset( $attributes['id'] ) ? $attributes['id'] : 'wp-block-themeisle-blocks-google-map-' . rand( 10,100 );
		$class = 'wp-block-themeisle-blocks-google-map';

		if ( isset( $attributes['className'] ) ) {
			$class .=  ' ' . esc_attr( $attributes['className'] );
		}

		if ( isset( $attributes['align'] ) ) {
			$class .=  ' align' . esc_attr( $attributes['align'] );
		}

		$output = '<div class="' . esc_attr( $class ) . '" id="' . esc_attr( $id ) . '" style="height:' . intval( $attributes['height'] ) . 'px;"></div>' . "\n";
		$output .= '<script type="text/javascript">' . "\n";
		$output .= '	/* <![CDATA[ */' . "\n";
		$output .= '		if ( ! window.themeisleGoogleMaps ) window.themeisleGoogleMaps =[];' . "\n";
		$output .= '		window.themeisleGoogleMaps.push( { container: "' . $id . '", attributes: ' . json_encode( $attributes ) . ' } );' . "\n";
		$output .= '	/* ]]> */' . "\n";
		$output .= '</script>' . "\n";

		return $output;
	}
}
