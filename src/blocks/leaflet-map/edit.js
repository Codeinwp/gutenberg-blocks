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

//import {search} from './search';


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

		window.isLeafletMapLoaded = window.isLeafletMapLoaded || false;
		window[`removeMarker_${ clientId.substr( 0, 8 ) }`] = removeMarker;

		stylesheetRef.current = document.createElement( 'link' );
		stylesheetRef.current.type = 'text/css ';
		stylesheetRef.current.rel = 'stylesheet';
		stylesheetRef.current.async = false;
		stylesheetRef.current.defer = true;
		stylesheetRef.current.id = 'themeisle-leaflet-map-api-stylesheet-loading';

		linkRef.current = document.createElement( 'script' );
		linkRef.current.type = 'text/javascript';
		linkRef.current.async = false;
		linkRef.current.defer = true;
		linkRef.current.id = 'themeisle-leaflet-map-api-loading';

		esriRef.current = document.createElement( 'script' );
		esriRef.current.type = 'text/javascript';
		esriRef.current.async = false;
		esriRef.current.defer = true;
		esriRef.current.id = 'themeisle-leaflet-map-esri-loading';

		stylesheetRef.current.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';

		//stylesheetRef.current.integrity = 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==';
		linkRef.current.src = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js';

		//linkRef.current.integrity = 'sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==';

		esriRef.current.src = 'https://unpkg.com/esri-leaflet@2.4.1/dist/esri-leaflet.js';

		//esriRef.current.integrity = 'sha512-xY2smLIHKirD03vHKDJ2u4pqeHA7OQZZ27EjtqmuhDguxiUvdsOuXMwkg16PQrm9cgTmXtoxA6kwr8KBy3cdcw==';

	}, []);


	useEffect( () => {
		markersAttrRef.current = [ ...attributes.markers ];
	}, [ attributes.markers ]);

	const markersRef = useRef([]);
	const settingsRef = useRef( null );
	const linkRef = useRef( null );
	const stylesheetRef = useRef( null );
	const esriRef = useRef( null );
	const mapRef = useRef( null );
	const lastInfoWindowRef = useRef( null );
	const markersAttrRef = useRef([ ...attributes.markers ]);


	const [ displayMap, setDisplayMap ] = useState( false );
	const [ isMarkerOpen, setMarkerOpen ] = useState( false );
	const [ isSelectingMarker, setSelectingMarker ] = useState( false );
	const [ isModalOpen, setModalOpen ] = useState( false );
	const [ isAdvanced, setAdvanced ] = useState( false );
	const [ selectedMarker, setSelectedMarker ] = useState({});

	const initBlock = async() => {
		if ( attributes.id === undefined ) {
			const instanceId = `wp-block-themeisle-blocks-leaflet-map-${ clientId.substr( 0, 8 ) }`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-leaflet-map-${ clientId.substr( 0, 8 ) }`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
		}

		await wp.api.loadPromise.then( () => {
			settingsRef.current = new wp.api.models.Settings();
		});

		enqueueScripts();
	};

	const enqueueScripts = () => {

		if ( ! window.isLeafletMapLoaded ) {
			window.isLeafletMapLoaded = true;

			stylesheetRef.current.onload = () => {
				const stylesheet = document.getElementById( 'themeisle-leaflet-map-api-stylesheet-loading' );
				stylesheet.id = 'themeisle-leaflet-map-api-stylesheet';

				if ( document.getElementById( 'themeisle-leaflet-map-api' ) &&
					document.getElementById( 'themeisle-leaflet-map-esri' ) ) {
					setDisplayMap( true );
				}
			};
			linkRef.current.onload = () => {
				const script = document.getElementById( 'themeisle-leaflet-map-api-loading' );
				script.id = 'themeisle-leaflet-map-api';

				if ( document.getElementById( 'themeisle-leaflet-map-api-stylesheet' ) &&
					document.getElementById( 'themeisle-leaflet-map-esri' ) ) {
					setDisplayMap( true );
				}
			};

			esriRef.current.onload = () =>{
				const script = document.getElementById( 'themeisle-leaflet-map-esri-loading' );
				script.id = 'themeisle-leaflet-map-esri';

				if ( document.getElementById( 'themeisle-leaflet-map-api-stylesheet' ) &&
					document.getElementById( 'themeisle-leaflet-map-api' ) ) {
					setDisplayMap( true );
				}
			};
			document.head.appendChild( stylesheetRef.current );
			document.head.appendChild( linkRef.current );
			document.head.appendChild( esriRef.current );
		}

		if ( document.getElementById( 'themeisle-leaflet-map-api-stylesheet' ) &&
			document.getElementById( 'themeisle-leaflet-map-esri' )  &&
			document.getElementById( 'themeisle-leaflet-map-api' ) ) {
			setDisplayMap( true );
		}
	};

	const initMap = () => {
		! attributes.latitude ? setAttributes({ latitude: 41.4036299 }) : '';
		! attributes.longitude ? setAttributes({ longitude: 2.1743558000000576 }) : '';
		mapRef.current = L.map( document.getElementById( attributes.id ), {
			center: {
				lat: Number( attributes.latitude ) || 41.4036299,
				lng: Number( attributes.longitude ) || 2.1743558000000576
			},
			zoom: attributes.zoom
		});


		L.esri.basemapLayer( 'Streets' ).addTo( mapRef.current );
		setAttributes({type: 'Streets'});


		mapRef.current.on( 'zoom', () => {
			const zoom = mapRef.current.getZoom();
			setAttributes({ zoom });
		});

		mapRef.current.on( 'moveend', () => {
			const location = mapRef.current.getCenter();
			const latitude = location.lat;
			const longitude = location.lng;
			setAttributes({
				latitude: latitude.toString(),
				longitude: longitude.toString()
			});
		});

		if ( 0 < attributes.markers.length ) {
			cycleMarkers( attributes.markers );
		}

	};


	const setMarkerIcon = color =>{
		const LeafIcon = L.Icon.extend({
			options: {
				iconSize: [ 28, 30 ]
			}
		});

		const icon = new LeafIcon({
			iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`
		});

		return icon;
	};


	const addMarker = ( location, title, iconColor, description, latitude, longitude ) => {
		const id = uuidv4();
		const icon = setMarkerIcon( iconColor );

		const mark = L.marker([ latitude, longitude ], {icon: icon}).addTo( mapRef.current );
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
			location,
			title,
			iconColor,
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
		setSelectingMarker( false );
	};

	const addInfoWindow = ( marker, id, title, description ) => {
		const contentString = `<div class="wp-block-themeisle-blocks-map-overview"><h6 class="wp-block-themeisle-blocks-map-overview-title">${ title }</h6><div class="wp-block-themeisle-blocks-map-overview-content">${ description ? `<p>${ description }</p>` : '' }<a class="wp-block-themeisle-blocks-map-overview-delete" onclick="removeMarker_${ clientId.substr( 0, 8 ) }( '${ id }' )">${ __( 'Delete Marker' ) }</a></div></div>`;

		marker.bindPopup( contentString ).openPopup();

	};

	const cycleMarkers = markers => {
		markers.forEach( marker => {
			const latitude = marker.latitude;
			const longitude = marker.longitude;
			const icon = setMarkerIcon( marker.iconColor );

			const mark = L.marker([ latitude, longitude ], {icon: icon}).addTo( mapRef.current );
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
		setSelectingMarker( ! isSelectingMarker );

		if ( ! isSelectingMarker ) {
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
					location: '',
					title,
					iconColor: 'red',
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
			location: '',
			title,
			iconColor: 'red',
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

	const toggleFullscreen = () =>{
		const map = document.getElementById( attributes.id );
		if ( map.requestFullscreen ) {
			map.requestFullscreen();
		} else if ( map.mozRequestFullScreen ) { /* Firefox */
			map.mozRequestFullScreen();
		} else if ( map.webkitRequestFullscreen ) { /* Chrome, Safari and Opera */
			map.webkitRequestFullscreen();
		} else if ( map.msRequestFullscreen ) { /* IE/Edge */
			map.msRequestFullscreen();
		}

	};


	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				map={ mapRef.current }
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
					close={ () => setModalOpen( false ) }
					addMarker={ addMarker }
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
					'wp-block-themeisle-blocks-leaflet-map-resizer',
					{ 'is-focused': isSelected }
				) }
			>
				<Map
					attributes={ attributes }
					className={ className }
					initMap={ initMap }
					displayMap={ displayMap }
					selectMarker={ selectMarker }
					isSelectingMarker={ isSelectingMarker }
					toggleFullscreen={toggleFullscreen}
				/>
			</ResizableBox>
		</Fragment>
	);
};

export default Edit;
