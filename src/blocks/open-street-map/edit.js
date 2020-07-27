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
//import Inspector from './inspector.js';

//import { StyleSwitcherBlockControl } from '../../components/style-switcher-control/index.js';
//import MarkerModal from './components/marker-modal.js';
import Map from './components/map.js';

//import styles from './components/styles.js';

//const IDs = [];

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

	//const settingsRef = useRef( null );
	const linkRef = useRef( null );
	const stylesheetRef = useRef( null );

	//const mapRef = useRef( null );

	const [ api, setAPI ] = useState( '' );
	const [ displayMap, setDisplayMap ] = useState( false );
	const [ isAPILoaded, setAPILoaded ] = useState( false );
	const [ isAPISaved, setAPISaved ] = useState( false );

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

		if ( ! isAPILoaded ) {
			setAPI( themeisleGutenberg.mapsAPI );
			setAPILoaded( true );
			setAPISaved( true );

			enqueueScripts();
		}
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
		var mymap = L.map( attributes.id ).setView([ 51.505, -0.09 ], 13 );

		L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo( mymap );
		console.log( mymap );
	};

	return (
		<Fragment>
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
