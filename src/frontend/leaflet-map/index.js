/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

domReady( () => {
	if ( ! window.themeisleLeafletMaps ) {
		console.warn( 'The leaflet map attributes were not loaded in the page!' );
		return;
	}
});
