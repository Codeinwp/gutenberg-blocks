/**
 * External dependencies
 */
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { ResizableBox } = wp.components;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import MarkerModal from './components/marker-modal.js';
import Map from './components/map.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	isSelected,
	toggleSelection
}) => {

	useEffect( () => {
		initBlock();
		window.isMapLoaded = window.isMapLoaded || false;
		window[`removeMarker_${ clientId.substr( 0, 8 ) }`] = removeMarker;
	}, []);


	useEffect( () => {
		markersAttrRef.current = [ ...attributes.markers ];
	}, [ attributes.markers ]);

	const markersRef = useRef([]);
	const settingsRef = useRef( null );
	const mapRef = useRef( null );
	const lastInfoWindowRef = useRef( null );
	const markersAttrRef = useRef([ ...attributes.markers ]);
	const isSelectingMarkerRef = useRef( isSelectingMarker );


	const [ displayMap, setDisplayMap ] = useState( false );
	const [ isMarkerOpen, setMarkerOpen ] = useState( false );
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ isSelectingMarker, setSelectingMarker ] = useState( false );
	const [ isAdvanced, setAdvanced ] = useState( false );
	const [ selectedMarker, setSelectedMarker ] = useState({});

	const markerIcon = L.icon({
		iconUrl: themeisleGutenberg.assetsPath + '/map/marker-icon.png'
	});

	const initBlock = async() => {
		if ( attributes.id === undefined ) {
			const instanceId = `wp-block-themeisle-blocks-map-${ clientId.substr( 0, 8 ) }`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-map-${ clientId.substr( 0, 8 ) }`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
		}

		await wp.api.loadPromise.then( () => {
			settingsRef.current = new wp.api.models.Settings();
		});


		setDisplayMap( true );
	};

	const initMap = () => {
		if ( mapRef.current ) {
			return;
		}
		mapRef.current = L.map( document.getElementById( attributes.id ), {
			center: {
				lat: Number( attributes.latitude ),
				lng: Number( attributes.longitude )
			},
			zoom: attributes.zoom
		});

		L.control.fullscreen({ position: 'bottomright' }).addTo( mapRef.current );
		L.control.addMarker({fnct: selectMarker}).addTo( mapRef.current );

		L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo( mapRef.current );

		mapRef.current.on( 'zoom', () => {
			const zoom = mapRef.current.getZoom();
			setAttributes({ zoom });
		});

		mapRef.current.on( 'moveend', () => {
			const location = mapRef.current.getCenter();
			const latitude = location.lat;
			const longitude = location.lng;
			setAttributes({
				latitude: latitude,
				longitude: longitude
			});

		});

		if ( 0 < attributes.markers.length ) {
			cycleMarkers( attributes.markers );
		}
	};


	const addMarker = ( title, description, latitude, longitude ) => {
		isSelectingMarkerRef.current = false;
		setSelectingMarker( false );
		const id = uuidv4();

		const mark = L.marker([ latitude, longitude ], { icon: markerIcon }).addTo( mapRef.current );
		mark.dragging.enable();

		mark.on( 'dragend', () => {
			const lat = mark.getLatLng().lat;
			const lng = mark.getLatLng().lng;

			changeMarkerProp( id, 'latitude', lat );
			changeMarkerProp( id, 'longitude', lng );
		});

		markersRef.current.push( mark );
		const markers = [ ...attributes.markers ];

		const marker = {
			id,
			title,
			description,
			latitude,
			longitude
		};
		markers.push( marker );

		setAttributes({ markers });

		L.DomEvent.on( mark, 'click', () => {
			if ( lastInfoWindowRef.current ) {
				lastInfoWindowRef.current.close();
			}
		});

		addInfoWindow( mark, marker.id, title, description );
		setModalOpen( false );
	};

	const addInfoWindow = ( marker, id, title, description ) => {
		const contentString = `<div class="wp-block-themeisle-blocks-map-overview"><h6 class="wp-block-themeisle-blocks-map-overview-title">${ title }</h6><div class="wp-block-themeisle-blocks-map-overview-content">${ description ? `<p>${ description }</p>` : '' }<a class="wp-block-themeisle-blocks-map-overview-delete" onclick="removeMarker_${ clientId.substr( 0, 8 ) }( '${ id }' )">${ __( 'Delete Marker' ) }</a></div></div>`;

		marker.bindPopup( contentString ).openPopup();

	};

	const cycleMarkers = markers => {
		markers.forEach( marker => {
			const latitude = marker.latitude;
			const longitude = marker.longitude;

			const mark = L.marker([ latitude, longitude ], { icon: markerIcon }).addTo( mapRef.current );
			mark.dragging.enable();

			mark.on( 'dragend', () => {
				const lat = mark.getLatLng().lat;
				const lng = mark.getLatLng().lng;

				changeMarkerProp( marker.id, 'latitude', lat );
				changeMarkerProp( marker.id, 'longitude', lng );
			});

			markersRef.current.push( mark );

			mark.on( 'click', () => {
				if ( lastInfoWindowRef.current ) {
					lastInfoWindowRef.current.close();
				}
			});

			addInfoWindow( mark, marker.id, marker.title, marker.description );
		});
	};


	const selectMarker = () => {

		isSelectingMarkerRef.current = ! isSelectingMarkerRef.current;
		setSelectingMarker( isSelectingMarkerRef.current );

		if ( isSelectingMarkerRef.current ) {
			mapRef.current.on( 'click', e => {
				mapRef.current.off( 'click' );

				const id = uuidv4();
				const title = __( 'Custom Marker' );
				const latitude = e.latlng.lat;
				const longitude = e.latlng.lng;

				setModalOpen( true );
				setAdvanced( false );
				setSelectedMarker({
					id,
					title,
					description: '',
					latitude,
					longitude
				});
			});
		} else {
			mapRef.current.off( 'click' );
		}
	};

	const addMarkerManual = () => {
		const id = uuidv4();
		const title = __( 'Custom Marker' );
		const location = mapRef.current.getCenter();
		const latitude = location.lat;
		const longitude = location.lng;

		setModalOpen( true );
		setAdvanced( true );
		setSelectedMarker({
			id,
			title,
			description: '',
			latitude,
			longitude
		});
	};

	const changeMarkerProp = ( id, prop, value ) => {
		const markers = [ ...markersAttrRef.current ];
		markers.map( marker => {
			if ( marker.id === id ) {
				return marker[ prop ] = value.toString();
			}
		});

		removeMarkers();
		cycleMarkers( markers );
		setAttributes({ markers });
	};

	const removeMarker = id => {
		let markers = [ ...markersAttrRef.current ];
		markers = markers.filter( marker => marker.id !== id );
		setAttributes({ markers });
		removeMarkers();
		setMarkerOpen( false );

		if ( 0 < markers.length ) {
			cycleMarkers( markers );
		}
	};

	const removeMarkers = () => {
		for ( let i = 0; i < markersRef.current.length; i++ ) {
			markersRef.current[i].remove();
		}

		markersRef.current = [];
	};


	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				isMarkerOpen={ isMarkerOpen }
				setMarkerOpen={ setMarkerOpen }
				removeMarker={ removeMarker }
				changeMarkerProp={ changeMarkerProp }
				addMarkerManual={ addMarkerManual }
				mapRef={mapRef}
			/>

			{ isModalOpen && (
				<MarkerModal
					marker={ selectedMarker }
					isAdvanced={ isAdvanced }
					close={ () => {
						selectMarker(); setModalOpen( false );
					} }
					addMarker={ addMarker }
					mapRef={ mapRef }
				/>
			) }

			<ResizableBox
				size={ {
					height: attributes.height
				} }
				enable={ {
					top: false,
					right: false,
					bottom: true,
					left: false
				} }
				minHeight={ 100 }
				maxHeight={ 1400 }
				onResizeStart={ () => {
					toggleSelection( false );
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes({
						height: parseInt( attributes.height + delta.height, 10 )
					});

					mapRef.current.invalidateSize( true );
					toggleSelection( true );
				} }
				className={ classnames(
					'wp-block-themeisle-blocks-map-resizer',
					{ 'is-focused': isSelected }
				) }
			>
				<Map
					attributes={ attributes }
					className={ className }
					initMap={ initMap }
					displayMap={ displayMap }
					isSelectingMarkerRef={ isSelectingMarkerRef }
				/>
			</ResizableBox>
		</Fragment>
	);
};

export default Edit;
