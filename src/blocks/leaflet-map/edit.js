/**
 * External dependencies
 */

import Inspector from './inspector';
import { getLocation } from './utility';

/**
 * WordPress dependencies
*/

const {
	Fragment,
	useEffect,
	useState,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */

const Edit = ({
	attributes,
	setAttributes,
	className
}) => {

	const mapRef = useRef( null );
	const [ map, setMap ] = useState( null );

	/**
	 * Initialize the map
	 */
	useEffect( () => {

		if ( ! mapRef.current && ! L ) {
			return ;
		}

		// Create the map
		const _map = L.map( mapRef.current );

		// Add Open Street Map as source
		L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			subdomains: [ 'a', 'b', 'c' ]
		}).addTo( _map );


		/**
		 * Defines event handlers
		 */
		_map.on( 'zoom', (  ) => {
			setAttributes({
				zoom: _map.getZoom()
			});
		});

		setMap( _map );

	}, []);

	/**
	 * Get Location from Nominatim
	 */
	useEffect( () => {
		const fetchData = async() => {
			const location = await getLocation( attributes.location );

			if ( location ) {
				setAttributes({
					latitude: location.latitude,
					longitude: location.longitude
				});
			}
		};

		if ( map ) {
			fetchData();
		}

	}, [ attributes.location, map ]);

	/**
	 * Set View on the map
	 */
	useEffect( () => {
		if ( attributes.latitude && attributes.longitude && map ) {
			map.setView([ attributes.latitude, attributes.longitude ], attributes.zoom || 13 );
		}
	}, [ attributes.latitude, attributes.longitude, attributes.zoom, map ]);

	return (
		<Fragment>
			<Inspector
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<div ref={mapRef} className={className} style={{width: 600, height: attributes.height || 400, marginBottom: 70}}>

			</div>
		</Fragment>
	);
};

export default Edit;
