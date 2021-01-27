/**
 * External dependencies
 */

import Inspector from './inspector';

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


	const [ mapMarkers, setMarkers ] = useState([]);


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
	 * Set View on the map
	 */
	useEffect( () => {
		if ( attributes.latitude && attributes.longitude && map ) {
			map.setView([ attributes.latitude, attributes.longitude ], attributes.zoom || 13 );
		}
	}, [ attributes.latitude, attributes.longitude, attributes.zoom, map ]);

	/**
	 * Set/Remove Markers on the map
	 */
	useEffect( () => {

		if ( ! map && ! L ) {
			return ;
		}

		console.log( 'State: ' + mapMarkers.length, mapMarkers );

		if ( mapMarkers.length > attributes.markers.length ) {

			// Check if a marker has been removed. If true, delete it from the map
			const markersIds = attributes.markers.map( ({id}) => id );
			const oldMarkers = mapMarkers.filter( ({markerId}) => ! markersIds.includes( markerId ) );
			oldMarkers.forEach( marker => {
				console.log( 'Check marker ' + marker.markerId );
				if ( map.hasLayer( marker ) ) {
					console.log( 'Delete marker ' + marker.markerId );
					map.removeLayer( marker );
				}
			});
			setMarkers( mapMarkers.filter( ({markerId}) => markersIds.includes( markerId ) ) );
		} else if ( mapMarkers.length === attributes.markers.length ) {

			// Check if a marker has been created. If true, add it to the map
			console.log( 'Add markers to map' );
			mapMarkers.filter( marker => ! map.hasLayer( marker ) ).forEach( marker => {
				map.addLayer( marker );
			});

		} else {

			// Create markers
			const markersIds = mapMarkers.map( ({markerId}) => markerId );
			attributes.markers.filter( ({id}) => ! markersIds.includes( id ) ).forEach(
				marker => {
					console.log( 'Creater Marker' );
					addMarker( marker, false );
				}
			);
		}

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

	const changeMarkerProps = async( id, props ) => {

		// Find the index of marker
		const index =  attributes.markers.findIndex( marker => marker.id === id );

		// Override it with the given props
		attributes.markers[index] = { ...attributes.markers[index], ...props};

		const mapMarker = mapMarkers.filter( ({markerId}) => markerId === id )[0];

		if ( mapMarker ) {
			mapMarker.setLatLng( L.latLng( Number( attributes.markers[index].latitude ), Number( attributes.markers[index].longitude ) ) );

			// Show information in popup when clicked
			mapMarker.bindPopup(
				`<div class="wp-block-themeisle-blocks-map-overview">
						<h6 class="wp-block-themeisle-blocks-map-overview-title">
							${ attributes.markers[index].title }
						</h6>
						<div class="wp-block-themeisle-blocks-map-overview-content">
							<p>
								${ attributes.markers[index].description }
							</p
						</div>
					</div>`
			);
		}

		setAttributes({
			...attributes
		});
	};

	const addMarker = ( marker, addToAttributes = true ) => {

		if ( L && map ) {

			// Check for undefined
			marker.id ??= uuidv4();
			marker.latitude ??= map.getCenter().lat;
			marker.longitude ??= map.getCenter().lng;
			marker.title ??= 'Add a title';
			marker.description ??= '';

			// Create the marker on the map
			const mapMarker = L.marker([ marker.latitude, marker.longitude ] || map.getCenter(), {
				title: marker.title,
				draggable: true
			});

			mapMarker.markerId = marker.id;

			mapMarker.bindPopup(
				`<div class="wp-block-themeisle-blocks-map-overview">
						<h6 class="wp-block-themeisle-blocks-map-overview-title">
							${ marker.title }
						</h6>
						<div class="wp-block-themeisle-blocks-map-overview-content">
							<p>
								${ marker.description }
							</p
						</div>
					</div>`
			);


			// Change coords when dragging
			mapMarker.on( 'move', ({latlng}) => {
				changeMarkerProps( marker.id, {
					latitude: latlng.lat,
					longitude: latlng.lng
				});
			});

			// Save the map marker
			setMarkers(
				[ ...mapMarkers, mapMarker ]
			);

			if ( addToAttributes ) {

				// Save the marker
				attributes.markers.push( marker );
				setAttributes({ ...attributes });
			}

			return mapMarker;
		}
		return null;
	};


	return (
		<Fragment>
			<Inspector
				attributes={attributes}
				setAttributes={setAttributes}
				addMarker={addMarker}
				removeMarker={removeMarker}
				changeMarkerProps={changeMarkerProps}
			/>
			<div ref={mapRef} className={className} style={{width: 600, height: attributes.height || 400, marginBottom: 70, marginTop: 70 }}>

			</div>
		</Fragment>
	);
};

export default Edit;
