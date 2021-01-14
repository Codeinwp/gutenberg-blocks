/**
 * External dependencies
 */

import Inspector from './inspector';
import { getLocation } from './utility';
import { v4 as uuidv4 } from 'uuid';

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


	const [ mapMarkers, setMarkers ] = useState({previous: [], current: []});

	// const [ isMarkerOpen, setMarkerOpen ] = useState( false );
	// const [ isSelectingMarker, setSelectingMarker ] = useState( false );
	// const [ isModalOpen, setModalOpen ] = useState( false );

	// const [ isAdvanced, setAdvanced ] = useState( false );
	// const [ selectedMarker, setSelectedMarker ] = useState({});

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

			// test add marker
			addMarker({
				id: uuidv4(),
				title: 'Test',
				longitude: attributes.longitude,
				latitude: attributes.latitude,
				description: 'The best of the best'
			});
		}
	}, [ attributes.latitude, attributes.longitude, attributes.zoom, map ]);

	/**
	 * Set/Remove Markers on the map
	 */
	useEffect( () => {

		// Check if a marker has been deleted
		if ( attributes.markers.length < mapMarkers.current.length ) {
			console.log( 'Remove Marker from map!' );
			const currentIds = attributes.markers.map( marker => marker.id );

			// Remove the map markers
			const filteredMarker = mapMarkers.current.filter( ({markerId}) => currentIds.includes( markerId ) );
			setMarkers({
				previous: mapMarkers.current,
				current: filteredMarker
			});
		}

		console.log( 'Clean Marker on the map!' );

		// Clean up the previous markers
		mapMarkers.previous.filter( mapMarker => map.hasLayer( mapMarker ) ).map( mapMarker => map.removeLayer( mapMarker ) );

		console.log( 'Set Marker on the map!' );

		// Add the current markers
		mapMarkers.current.map( mapMarker => map.addLayer( mapMarker ) );
	}, [ mapMarkers, map, attributes.markers ]);

	/**
	 * Marker Handlers
	 */

	const removeMarker = ( id ) => {
		console.log( 'ON REMOVE', id, attributes.markers );
		setAttributes({
			...attributes,
			markers: attributes.markers.filter( marker => marker.id !== id )
		});
	};

	const addMarker = ( marker ) => {

		if ( L && map ) {

			// Create the marker on the map
			const mapMarker = new L.marker([ marker.latitude, marker.longitude ], {
				title: marker.title,
				draggable: true
			});

			// Add the identification code
			mapMarker.markerId = marker.id;

			// Show information in popup when clicked
			mapMarker.bindPopup(
				`<div class="wp-block-themeisle-blocks-map-overview">
					<h6 class="wp-block-themeisle-blocks-map-overview-title">
						${ marker.title }
					</h6>
					<div class="wp-block-themeisle-blocks-map-overview-content">
						${ marker.description ? `<p>${ marker.description }</p>` : '' }
					</div>
				</div>`
			);

			// Change coords when dragging
			mapMarker.on( 'move', ({latlng}) => {
				marker.latitude = latlng.lat;
				marker.longitude = latlng.lng;
			});

			// Test remove function on double clicl
			mapMarker.on( 'dblclick', () => {
				removeMarker( mapMarker.markerId );
			});

			// Save the map marker
			setMarkers({
				previous: mapMarkers.current,
				current: [ ...mapMarkers.current, mapMarker ]
			});
		}

		// Save the marker
		attributes.markers.push( marker );
		setAttributes([ ...attributes.markers ]);

		// setModalOpen( false );
		// setSelectingMarker( false );
	};


	// const selectMarker = () => {
	// 	setSelectingMarker( ! isSelectingMarker );

	// 	if ( ! isSelectingMarker ) {

	// 		map.on( '' );

	// 		setModalOpen( true );
	// 		setAdvanced( false );
	// 		setSelectedMarker({
	// 			id,
	// 			location: '',
	// 			title,
	// 			icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
	// 			description: '',
	// 			latitude,
	// 			longitude
	// 		});
	// 	}
	// };

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
