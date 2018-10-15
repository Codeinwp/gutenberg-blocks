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
			'location'    => array(
				'type'    => 'string',
				'default' => '',
			),
			'type'     => array(
				'type'    => 'string',
				'default' => 'roadmap',
			),
			'zoom'        => array(
				'type'    => 'number',
				'default' => 10,
			),
			'height'      => array(
				'type'    => 'string',
				'default' => '400px',
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

		// Get the API key
		$apikey = get_option( 'themeisle_google_map_block_api_key' );

		// Don't output anything if there is no API key
		if ( null === $apikey || empty( $apikey ) ) {
			return;
		}

		// Exapnd all the atributes into separate variables
		foreach ( $attributes as $key => $value ) {
			${ $key } = $value;
		}

		// URL encode the location for Google Maps
		$location = urlencode( $location );

		// Set the API url based to embed or static maps based on the interactive setting
		$apiurl = "https://www.google.com/maps/embed/v1/place?key=${apikey}&q=${location}&zoom=${zoom}&maptype=${type}";

		// Check status code of apiurl
		$ch = curl_init( $apiurl );
		curl_setopt( $ch, CURLOPT_HEADER, true );
		curl_setopt( $ch, CURLOPT_NOBODY, true );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt( $ch, CURLOPT_TIMEOUT, 10 );
		$output   = curl_exec( $ch );
		$httpcode = curl_getinfo( $ch, CURLINFO_HTTP_CODE );
		curl_close( $ch );

		// Don't output anything if the response from Google Maps isn't a 200
		if ( $httpcode !== 200 ) {
			return;
		}

		$output = "<div class='wp-block-themeisle-blocks-google-map'><div class='map'>";
			$output .= "<iframe width='100%' height='100%' frameborder='0' style='border:0; height:${height};' src='$apiurl' allowfullscreen></iframe>";
		$output .= '</div></div>';

		// Return the output
		return $output;
	}
}
