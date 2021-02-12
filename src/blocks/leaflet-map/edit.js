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
	useRef,
	useReducer
} = wp.element;

const {
	merge
} = lodash;

/**
 * Internal dependencies
 */

export const ActionType = {
	ADD: 'ADD',
	REMOVE: 'REMOVE',
	UPDATE: 'UPDATE',
	INIT: 'INIT'
};


const Edit = ({
	attributes,
	setAttributes,
	className
}) => {

	const mapRef = useRef( null );
	const [ map, setMap ] = useState( null );
	const [ openMarker, setOpenMarker ] = useState( null );

	const createMarker = ( markerProps, dispatch ) => {

		if ( L && map ) {

			// Check for undefined
			markerProps.id ??= uuidv4();
			markerProps.latitude ??= map.getCenter().lat;
			markerProps.longitude ??= map.getCenter().lng;
			markerProps.title ??= 'Add a title';
			markerProps.description ??= '';

			// Create the marker on the map
			const markerMap = L.marker([ markerProps.latitude, markerProps.longitude ] || map.getCenter(), {
				title: markerProps.title,
				draggable: true
			});

			markerMap.bindPopup(
				`<div class="wp-block-themeisle-blocks-map-overview">
						<h6 class="wp-block-themeisle-blocks-map-overview-title">
							${ markerProps.title }
						</h6>
						<div class="wp-block-themeisle-blocks-map-overview-content">
							<p>
								${ markerProps.description }
							</p
						</div>
					</div>`
			);

			// Change coords when dragging
			markerMap.on( 'moveend', () => {
				const latlng = markerMap.getLatLng();
				console.log( latlng );
				dispatch({
					type: ActionType.UPDATE,
					ids: [ markerProps.id ],
					updatedProps: {
						latitude: latlng.lat,
						longitude: latlng.lng
					}
				});
			});

			markerMap.on( 'click', () => {
				setOpenMarker( markerProps.id );
			});

			markerMap.markerProps = markerProps;

			return markerMap;
		}
		return null;
	};

	const markerReducer = ( oldState, action ) => {
		console.log( 'Event: ' + action.type );
		switch ( action.type ) {
		case ActionType.ADD:
			const newMarker = createMarker( action.marker, action.dispatch );
			return [ ...oldState, newMarker ];

		case ActionType.REMOVE:
			oldState.filter( ({ markerProps }) => action.ids.includes( markerProps.id ) ).forEach( marker => {
				if ( map.hasLayer( marker ) ) {
					map.removeLayer( marker );
				}
			});
			return oldState.filter( ({ markerProps }) => ! action.ids.includes( markerProps.id ) );

		case ActionType.INIT:
			const storedMarkers = action.markers.map(
				marker => {
					return createMarker( marker, action.dispatch );
				}
			);

			return [ ...oldState, ...storedMarkers ];

		case ActionType.UPDATE:
			return oldState.map( marker => {
				const props = marker.markerProps;

				if ( action.ids.includes( props.id )  ) {
					marker.markerProps = merge( marker.markerProps, action.updatedProps );
					console.log( action.updatedProps, marker.markerProps );

					// Show information in popup when clicked
					marker.bindPopup(
						`<div class="wp-block-themeisle-blocks-map-overview">
							<h6 class="wp-block-themeisle-blocks-map-overview-title">
								${ props.title }
							</h6>
							<div class="wp-block-themeisle-blocks-map-overview-content">
								<p>
									${ props.description }
								</p
							</div>
						</div>`
					);
				}

				return marker;
			});

		default:
			console.warn( 'The action for the leaflet block do not have an action in marker reducer: ' + action.type );
		}

		return oldState;
	};

	const [ markersStore, dispatch ] = useReducer( markerReducer, []);

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
		_map.on( 'zoom', () => {
			setAttributes({
				zoom: _map.getZoom()
			});
		});

		_map.on( 'moveend', () => {
			const latlng = _map.getCenter();
			console.log( latlng );
			setAttributes({
				latitude: latlng.lat,
				longitude: latlng.lng
			});
		});

		setMap( _map );
		dispatch({ type: ActionType.INIT, markers: attributes.markers, dispatch: dispatch });

	}, []);

	/**
	 * Set View on the map
	 */
	useEffect( () => {
		if ( attributes.latitude && attributes.longitude && map ) {
			map.setView([ attributes.latitude, attributes.longitude ], attributes.zoom || 13 );
		}
	}, [ attributes.latitude, attributes.longitude, attributes.zoom, map ]);

	useEffect( () => {
		if ( markersStore ) {
			setAttributes({ markers: markersStore.map( ({markerProps}) => markerProps ) });

			// map?.eachLayer( layer => {
			// 	if ( layer.markerProps?.id ) {
			// 		map.removeLayer( layer );
			// 	}
			// });

			markersStore.forEach( marker => {
				if ( ! map.hasLayer( marker ) ) {
					map.addLayer( marker );
				}
			});
		}
	}, [ markersStore ]);

	console.log( 'Store', markersStore );
	console.log( 'Attr', attributes.markers );

	// console.log( 'Layers', map );


	return (
		<Fragment>
			<Inspector
				attributes={attributes}
				setAttributes={setAttributes}
				dispatch={dispatch}
				markersInteraction={{
					openMarker: openMarker,
					setOpenMarker: setOpenMarker
				}}
			/>
			<div ref={mapRef} className={className} style={{width: 600, height: attributes.height || 400, marginBottom: 70, marginTop: 70 }}>

			</div>
		</Fragment>
	);
};

export default Edit;
