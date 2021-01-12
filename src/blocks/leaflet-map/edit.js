/**
 * External dependencies
 */

/**
 * WordPress dependencies
*/

const {
	useEffect,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */

const Edit = (
	attributes,
	setAttributes,
	className
) => {

	const mapRef = useRef( null );

	useEffect( () => {
		console.log( L );

		if ( ! mapRef.current ) {
			return ;
		}

		// Create the map
		const map = L.map( mapRef.current ).setView([ 51.505, -0.09 ], attributes.zoom );

		// Add Open Street Map as source
		L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			subdomains: [ 'a', 'b', 'c' ]
		}).addTo( map );

	}, []);

	return (
		<div ref={mapRef} className={className} style={{width: 600, height: attributes.height}}>

		</div>
	);
};

export default Edit;
