
// reference https://nominatim.org/release-docs/develop/api/Search/
async function makeSearchRequest( location ) {

	if ( 'string' !== typeof location ) {
		console.log( typeof location );
		throw 'Location must be a string';
	}

	// Create the query
	const query = location.split( ' ' ).map( s => encodeURIComponent( s ) ).join( '+' );

	const url = 'https://nominatim.openstreetmap.org/search?q=' + query + '&format=geojson';

	console.log( 'Link: ' + url );

	const response = await fetch( url );

	if ( response.ok && 200 === response.status ) {
		return response.json();
	}
	console.log( `An error has occured: ${response.status}` );
	return null;
}

export async function getLocation( location ) {
	const data = await makeSearchRequest( location );

	// Check if we have received some coordinates
	if ( data?.features.length ) {

		// Take only the first result
		const feature = data.features[0];

		if ( feature?.geometry?.coordinates.length ) {
			return {
				longitude: feature.geometry.coordinates[0],
				latitude: feature.geometry.coordinates[1]
			};
		}
	}

	return null;
}
