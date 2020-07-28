/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
//const { __ } = wp.i18n;

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
//import Placeholder from './placeholder.js';
import Inspector from './inspector.js';

//import { StyleSwitcherBlockControl } from '../../components/style-switcher-control/index.js';
//import MarkerModal from './components/marker-modal.js';
import Map from './components/map.js';

//import styles from './components/styles.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	isSelected,
	toggleSelection
}) =>{
	useEffect( ()=>{
		initBlock();

		window.isMapLoaded = window.isMapLoaded || false;
		linkRef.current = document.createElement( 'script' );
		linkRef.current.type = 'text/javascript';
		linkRef.current.async = true;
		linkRef.current.defer = true;
		linkRef.current.id = 'themeisle-open-street-map-api-loading';

		stylesheetRef.current = document.createElement( 'link' );
		stylesheetRef.current.type = 'text/css ';
		stylesheetRef.current.rel = 'stylesheet';
		stylesheetRef.current.async = true;
		stylesheetRef.current.defer = true;
		stylesheetRef.current.id = 'themeisle-open-street-map-api-stylesheet-loading';
	}, []);

	useEffect( ()=>{
		if ( null === mapRef ) {
			mapRef.current.setOptions({
				zoomControl: isSelected ? true : attributes.zoomControl
			});

			//todo: do something
		};
	}, [ isSelected ]);

	//const settingsRef = useRef( null );
	const linkRef = useRef( null );
	const stylesheetRef = useRef( null );
	const mapRef = useRef( null );
	const markerRef = useRef([]);

	//const mapRef = useRef( null );

	const [ displayMap, setDisplayMap ] = useState( false );

	//const [ isMapLoaded, setMapLoaded ] = useState( false );
	const IDs = [];

	const initBlock = async() =>{
		if ( attributes.id === undefined ) {
			const instanceId = `wp-block-themeisle-blocks-open-street-map-${clientId.substr( 0, 8 )}`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-open-street-map-${clientId.substr( 0, 8 )}`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
		}

		enqueueScripts();
	};

	const enqueueScripts = () => {

		if ( ! window.isMapLoaded ) {
			window.isMapLoaded = true;

			stylesheetRef.current.onload = () =>{

				console.log( 'loaded stylesheet' );
				const stylesheet = document.getElementById( 'themeisle-open-street-map-api-stylesheet-loading' );
				stylesheet.id = 'themeisle-open-street-map-api-stylesheet';
				setDisplayMap( true );
			};
			linkRef.current.onload = () => {
				const script = document.getElementById( 'themeisle-open-street-map-api-loading' );
				script.id = 'themeisle-open-street-map-api';
			};
			stylesheetRef.current.href = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css';

			//stylesheetRef.current.integrity = 'sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==';
			linkRef.current.src = 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js';

			//linkRef.current.integrity = 'sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==';
			document.head.appendChild ( stylesheetRef.current );
			document.head.appendChild( linkRef.current );
		}

		const loaded = document.getElementById( 'themeisle-open-street-map-api' ) && document.getElementById( 'themeisle-open-street-map-api-stylesheet' );

		if ( loaded ) {
			setDisplayMap( true );
		}
	};

	const initMap = () =>{
		! attributes.latitude ? setAttributes({ latitude: 41.4036299 }) : '';
		! attributes.longitude ? setAttributes({ longitude: 2.1743558000000576}) : '';
		mapRef.current = new L.map( document.getElementById( attributes.id ), {
			center: {
				lat: Number( attributes.latitude ) || 41.4036299,
				lng: Number( attributes.longitude ) || 2.1743558000000576
			},
			zoom: attributes.zoom
		});


		L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo( mapRef.current );
		console.log( mapRef.current );


		mapRef.current.addEventListener( 'zoom', () => {
			const zoom = mapRef.current.getZoom();
			setAttributes({ zoom });
		});

		mapRef.current.addEventListener( 'moveend', () => {
			const location = mapRef.current.getCenter();
			console.log( location );
			const latitude = location.lat;
			const longitude = location.lng;
			setAttributes({
				latitude: latitude.toString(),
				longitude: longitude.toString()
			});
		});

		/* mapRef.current.addEventListener('dragend', event => {
			const lat = event.latLng.lat();
			const lng = event.latLng.lng();
			setAttributes({ zoom });
		}); */


	};

	return (
		<Fragment>
			<Inspector
				attributes={attributes}
				setAttributes={setAttributes}
				map={mapRef.current}/>
			<ResizableBox
				size={
					{height: attributes.height
					}}
				enable={{
					top: false,
					right: false,
					bottom: true,
					left: false
				}}
				minHeight={100}
				maxHeight={1400}
				onResizeStart={() => {
					toggleSelection( false );
				}}

				onResizeStop={( event, direction, elt, delta ) => {
					setAttributes({
						height: parseInt( attributes.height + delta.height, 10 )
					});
					toggleSelection( true );
				}}
				className={classnames(
					'wp-block-themeisle-blocks-open-street-map-resizer',
					{ 'is-focused': isSelected }
				)}>
				<Map
					attributes={attributes}
					className={className}
					displayMap={displayMap}
					initMap={initMap}/>
			</ResizableBox>
		</Fragment>
	);

};

export default Edit;
