/**
 * External dependencies
 */

import { getLocation } from './utility';

/**
 * WordPress dependencies
*/

const {
	useEffect,
	useState,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */

const Edit = ({
	attributes,
	className
}) => {

	const mapRef = useRef( null );
	const [ map, setMap ] = useState( null );

	useEffect( () => {

		console.log( attributes );

		if ( ! mapRef.current && ! L ) {
			return ;
		}

		// Create the map
		const _map = L.map( mapRef.current ).setView([ 51.505, -0.09 ], 13 );

		// Add Open Street Map as source
		L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			subdomains: [ 'a', 'b', 'c' ]
		}).addTo( _map );

		setMap( _map );

	}, []);

	useEffect( () => {

		const fetchData = async() => {

			const location = await getLocation( attributes.location );

			console.log( location );

			if ( map ) {
				map.setView([ location.latitude, location.longitude ]);
			}
		};

		fetchData();
	}, [ map ]);

	return (
		<div ref={mapRef} className={className} style={{width: 600, height: attributes.height || 400}}>

		</div>
	);
};

export default Edit;
