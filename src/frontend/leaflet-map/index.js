/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

const createLeafletMap = ( container, attributes ) => {
	console.log( container, attributes );
};

domReady( () => {
	if ( ! window.themeisleLeafletMaps ) {
		console.warn( 'The leaflet map attributes did not load on the page!' );
		return;
	}

	window.themeisleLeafletMaps.forEach( block => {
		createLeafletMap( block.container, block.attributes );
	});
});
