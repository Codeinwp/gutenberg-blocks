/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	RangeControl,
	TextControl
} = wp.components;

const {
	useEffect,
	useRef
} = wp.element;

const { InspectorControls } = wp.blockEditor;

import MarkerWrapper from './components/marker-wrapper.js';

const Inspector = ({
	attributes,
	setAttributes,
	isMarkerOpen,
	setMarkerOpen,
	removeMarker,
	changeMarkerProp,
	addMarkerManual,
	mapRef
}) => {

	useEffect( ()=>{
		latitudeRef.current = attributes.latitude;
	}, [ attributes.latitude ]);

	useEffect( () => {
		longitudeRef.current = attributes.longitude;
	}, [ attributes.longitude ]);

	const latitudeRef = useRef( attributes.latitude );
	const longitudeRef = useRef( attributes.longitude );

	const changeLatitude = value => {
		latitudeRef.current = value;
		setAttributes({ latitude: latitudeRef.current });
		const latitude = latitudeRef.current;
		const longitude = longitudeRef.current;
		mapRef.current.panTo([ latitude, longitude ]);
	};

	const changeLongitude = value => {
		longitudeRef.current = value;
		setAttributes({ longitude: longitudeRef.current });
		const latitude = latitudeRef.current;
		const longitude = longitudeRef.current;
		mapRef.current.panTo([ latitude, longitude ]);
	};

	const changeZoom = value => {
		setAttributes({ zoom: value });
		mapRef.current.setZoom( value );
	};


	const changeHeight = value => {
		mapRef.current.invalidateSize( true );
		setAttributes({ height: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Location' ) }
			>

				<TextControl
					label={ __( 'Latitude' ) }
					id='wp-block-themeisle-blocks-map-latitude-input'
					type="number"
					placeholder={ __( 'Enter latitude…' ) }
					value={ latitudeRef.current }
					onChange={ changeLatitude }
				/>

				<TextControl
					label={ __( 'Longitude' ) }
					type="number"
					id='wp-block-themeisle-blocks-map-longitude-input'
					placeholder={ __( 'Enter longitude' ) }
					value={ longitudeRef.current }
					onChange={ changeLongitude }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Positioning & Zooming' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Map Zoom Level' ) }
					value={ attributes.zoom }
					onChange={ changeZoom }
					min={ 0 }
					max={ 19 }
				/>

				<RangeControl
					label={ __( 'Map Height' ) }
					value={ attributes.height }
					onChange={ changeHeight }
					min={ 100 }
					max={ 1400 }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Markers' ) }
				initialOpen={ false }
				opened={ false !== isMarkerOpen ? true : undefined }
				onToggle={ () => {
					if ( false !== isMarkerOpen ) {
						setMarkerOpen( true );
					}
				} }
			>
				<MarkerWrapper
					markers={ attributes.markers }
					removeMarker={ removeMarker }
					changeMarkerProp={ changeMarkerProp }
					addMarker={ addMarkerManual }
					initialOpen={ isMarkerOpen }
					mapRef={mapRef}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
