/**
 * External dependencies
 */

import { v4 as uuidv4 } from 'uuid';

/**
 * WordPress dependencies
 */
const { isEqual } = lodash;
const IDs = [];

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

import defaults from '../../plugins/options/global-defaults/defaults.js';
import Inspector from './inspector';

export const ActionType = {
	ADD: 'ADD',
	ADD_MANUAL: 'ADD_MANUAL',
	REMOVE: 'REMOVE',
	UPDATE: 'UPDATE',
	INIT: 'INIT'
};


const Edit = ({
	clientId,
	attributes,
	setAttributes,
	className
}) => {

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-map-${ clientId.substr( 0, 8 ) }`;

			const globalDefaults = window.themeisleGutenberg.globalDefaults ? window.themeisleGutenberg.globalDefaults : undefined;

			if ( undefined !== globalDefaults ) {
				if ( ! isEqual( defaults[ name ], window.themeisleGutenberg.globalDefaults[ name ]) ) {
					attrs = { ...window.themeisleGutenberg.globalDefaults[ name ] };

					Object.keys( attrs ).map( i => {
						if ( attributes[i] !== attrs[i] && ( undefined !== defaultAttributes[i].default && attributes[i] !== defaultAttributes[i].default ) ) {
							return delete attrs[i];
						}
					});
				}
			}

			setAttributes({
				...attrs,
				id: instanceId
			});

			IDs.push( instanceId );
			blockIDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-map-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};

	/**
	 * Add an ID to the block.
	 */
	useEffect( () => {
		initBlock();
	}, []);


	const mapRef = useRef( null );
	const [ map, setMap ] = useState( null );
	const [ isAddingToLocationActive, setActiveAddingToLocation ] = useState( false );
	const [ openMarker, setOpenMarker ] = useState( null );

	// ----------------------------------- Markers -------------------------------------------
	const createMarker = ( markerProps, dispatch ) => {

		if ( L && map && dispatch && markerProps ) {

			// Check for undefined and set a default value if it is the case.
			markerProps.id ??= uuidv4();
			markerProps.latitude ??= map.getCenter().lat;
			markerProps.longitude ??= map.getCenter().lng;
			markerProps.title ??= 'Add a title';
			markerProps.description ??= '';

			// Create the marker on the map
			const markerMap = L.marker([ markerProps.latitude, markerProps.longitude ] || map.getCenter(), {
				draggable: true
			});


			// Change coords when dragging
			markerMap.on( 'moveend', () => {
				const latlng = markerMap.getLatLng();

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

			markerMap.on( 'popupclose', () => {
				setOpenMarker( null );
			});

			markerMap.markerProps = markerProps;

			return markerMap;
		}
		return null;
	};

	const markerReducer = ( oldState, action ) => {

		switch ( action.type ) {
		case ActionType.ADD:
			const newMarker = createMarker( action.marker, action.dispatch );
			return [ ...oldState, newMarker ];

		case ActionType.ADD_MANUAL:
			if ( isAddingToLocationActive ) {
				const newMarker = createMarker( action.marker, action.dispatch );
				return [ ...oldState, newMarker ];
			}
			return oldState;

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
				}

				return marker;
			});

		default:
			console.warn( 'The action for the leaflet block do not have a defined action in marker\'s reducer: ' + action.type );
		}

		return oldState;
	};

	const [ markersStore, dispatch ] = useReducer( markerReducer, []);

	// ---------------------------------- Map Interaction ---------------------------------------
	const createMap = () => {

		if ( ! mapRef.current && ! L ) {
			return ;
		}

		// Create the map
		mapRef.current.innerHTML = '';
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
			setAttributes({
				latitude: latlng.lat.toString(),
				longitude: latlng.lng.toString()
			});
		});

		_map.on( 'click', event => {
			dispatch({
				type: ActionType.ADD_MANUAL,
				marker: { latitude: event.latlng.lat, longitude: event.latlng.lng },
				dispatch
			});
			setActiveAddingToLocation( false );
		});

		/**
		 * Create the Add Marker button on the map
		 * Reference: https://leafletjs.com/examples/extending/extending-3-controls.html
		 */
		L.Control.AddMarker = L.Control.extend({
			onAdd: () => {
				const button = L.DomUtil.create( 'button', 'wp-block-themeisle-blocks-leaflet-map-marker-button' );
				const span = L.DomUtil.create( 'span', 'dashicons dashicons-sticky', button );

				L.DomEvent.on( button, 'click', event => {

					// Do not sent this event to the rest of the components
					L.DomEvent.stopPropagation( event );
					console.log( isAddingToLocationActive );
					setActiveAddingToLocation( ! isAddingToLocationActive );
				});

				button.title = 'Add marker on the map with a click';
				button.appendChild( span );

				return button;
			},
			onRemove: () => {

			}
		});
		L.control.addmarker = ( opts ) => {
			return new L.Control.AddMarker( opts );
		};
		L.control.addmarker({ position: 'bottomleft' }).addTo( _map );

		setMap( _map );
		dispatch({ type: ActionType.INIT, markers: attributes.markers, dispatch: dispatch });

	};

	/**
	 * Initialize the map.
	 */
	useEffect( () => {
		createMap();
	}, []);

	/**
	 * Triger the update size function the map when height is changed to prevent an incorrect display on the bottom of the map.
	 */
	useEffect( () => {
		if ( attributes.height && map ) {
			map.invalidateSize( true );
		}
	}, [ attributes.height, map ]);

	/**
	 * Set View location on the map
	 */
	useEffect( () => {
		if ( attributes.latitude && attributes.longitude && map ) {
			map.setView([ attributes.latitude, attributes.longitude ], attributes.zoom || 13 );
		}
	}, [ attributes.latitude, attributes.longitude, attributes.zoom, map ]);

	useEffect( () => {
		mapRef.current?.classList.toggle( 'is-selecting-location', isAddingToLocationActive );
	}, [ isAddingToLocationActive ]);


	const createPopupContent = ( markerProps, dispatch ) => {

		/**
		 * The Popup can take a string or a HTMLElement
		 * For simple use, a string is enough.
		 * But we need interaction, in our case, to remove the marker.
		 * So, creating an HTMLElement will allow us to bind function very easily.
		 */
		const container = document.createElement( 'div' );
		const title = document.createElement( 'h6' );
		const content = document.createElement( 'div' );
		const description = document.createElement( 'p' );
		const deleteButton = document.createElement( 'button' );

		title.innerHTML = markerProps.title;
		description.innerHTML = markerProps.description;
		deleteButton.onclick = () => dispatch({ type: ActionType.REMOVE, ids: [ markerProps.id ]});
		deleteButton.innerHTML = 'Delete Marker';

		container.classList.add( 'wp-block-themeisle-blocks-map-overview' );
		content.classList.add( 'wp-block-themeisle-blocks-map-overview-content' );
		title.classList.add( 'wp-block-themeisle-blocks-map-overview-title' );
		deleteButton.classList.add( 'wp-block-themeisle-blocks-map-overview-delete' );

		container.appendChild( title );
		container.appendChild( content );
		container.appendChild( deleteButton );

		content.appendChild( description );

		return container;
	};

	useEffect( () => {
		if ( markersStore ) {
			setAttributes({ markers: markersStore.map( ({markerProps}) => markerProps ) });

			markersStore.forEach( marker => {
				if ( ! map.hasLayer( marker ) ) {
					map.addLayer( marker );
				}
				const { markerProps } = marker;

				// Update the marker location
				marker.setLatLng([ markerProps.latitude, markerProps.longitude ]);

				// Update the title
				marker.bindTooltip( markerProps.title, { direction: 'auto'});

				// Update the content of the Popup
				marker.bindPopup( createPopupContent( markerProps, dispatch ) );
			});
		}
	}, [ markersStore ]);

	// console.log( 'Store', markersStore );
	// console.log( 'Attr', attributes.markers );

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				dispatch={ dispatch }
				markersInteraction={{
					openMarker: openMarker,
					setOpenMarker: setOpenMarker
				}}
			/>
			<div id={ attributes.id } ref={ mapRef } className={ className } style={{ width: '100%', height: attributes.height || 400, marginBottom: 70, marginTop: 70 }}>
			</div>
		</Fragment>
	);
};

export default Edit;
