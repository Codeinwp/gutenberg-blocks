
// reference https://nominatim.org/release-docs/develop/api/Search/
export async function makeSearchRequest( location ) {

	if ( 'string' !== typeof location ) {
		throw 'Location must be a string';
	}

	// Create the query
	const query = location.split( ' ' ).join( '+' );

	const response = await fetch( 'https://nominatim.openstreetmap.org/search?' + query );

	if ( response.ok && 200 === response.status ) {
		return response.json();
	}
	console.log( `An error has occured: ${response.status}` );
	return {};
}
