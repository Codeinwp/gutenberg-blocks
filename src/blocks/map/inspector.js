/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl
} = wp.components;

const {
	useEffect,
	useRef
} = wp.element;

const { InspectorControls } = wp.blockEditor;

import MarkerWrapper from './components/marker-wrapper.js';
import { StyleSwitcherInspectorControl } from '../../components/style-switcher-control';
import layersOptions  from './layers-options';

const Inspector = ({
	attributes,
	setAttributes,
	isMarkerOpen,
	setMarkerOpen,
	removeMarker,
	changeMarkerProp,
	addMarkerManual,
	mapRef,
	locationId
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

	const changeStyle = value => {
		mapRef.current.eachLayer( layer=>{
			if ( '_container' in layer && 'leaflet-layer ' === layer._container.className ) {
				mapRef.current.removeLayer( layer );
			}
		});

		setAttributes({ style: value });
		L.esri.basemapLayer( value ).addTo( mapRef.current );
		layersOptions[value] < attributes.zoom ? changeZoom( layersOptions[value]) : '';
	};


	const changeHeight = value => {
		mapRef.current.invalidateSize( true );
		setAttributes({ height: value });
	};

	const toggleDraggable = () => {
		attributes.draggable ? mapRef.current.dragging.disable() : mapRef.current.dragging.enable();
		setAttributes({ draggable: ! attributes.draggable });
	};


	const toggleZoomControl = () => {
		if ( attributes.zoomControl ) {
			mapRef.current.touchZoom.disable();
			mapRef.current.doubleClickZoom.disable();
			mapRef.current.scrollWheelZoom.disable();
			mapRef.current.boxZoom.disable();
			mapRef.current.keyboard.disable();
			mapRef.current.removeControl( mapRef.current.zoomControl );

		} else {
			mapRef.current.touchZoom.enable();
			mapRef.current.doubleClickZoom.enable();
			mapRef.current.scrollWheelZoom.enable();
			mapRef.current.boxZoom.enable();
			mapRef.current.keyboard.enable();
			L.control.zoom().addTo( mapRef.current );
		}
		setAttributes({ zoomControl: ! attributes.zoomControl });
	};

	const toggleFullScreenControl = () => {
		attributes.fullscreenControl ? mapRef.current.removeControl( mapRef.current.fullscreenControl ) : L.control.fullscreen({ position: 'bottomright' }).addTo( mapRef.current );
		setAttributes({ fullscreenControl: ! attributes.fullscreenControl });
	};

	return (
		<InspectorControls>

			<PanelBody
				title={__( 'Styles' )}
				initialOpen={true}
			>
				<StyleSwitcherInspectorControl
					value={attributes.style}
					options={[
						{
							label: __( 'Topographic' ),
							value: 'Topographic',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-topographic.png'
						},
						{
							label: __( 'Streets' ),
							value: 'Streets',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-streets.png'
						},
						{
							label: __( 'National Geographic' ),
							value: 'NationalGeographic',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-nationalgeographic.png'
						},
						{
							label: __( 'Oceans' ),
							value: 'Oceans',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-oceans.png'
						},
						{
							label: __( 'Gray' ),
							value: 'Gray',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-gray.png'
						},
						{
							label: __( 'Physical' ),
							value: 'Physical',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-physical.png'
						},
						{
							label: __( 'Shaded Relief' ),
							value: 'ShadedRelief',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-shadedrelief.png'
						},
						{
							label: __( 'Imagery' ),
							value: 'Imagery',
							image: themeisleGutenberg.assetsPath + '/icons/esri-basemap/map-imagery.png'
						}
					]}
					onChange={changeStyle}
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Location' ) }
			>
				<BaseControl
					label={ __( 'Location' ) }
				>
					<input
						type="text"
						id= {`wp-block-themeisle-blocks-map-search-${locationId}`}

					/>
				</BaseControl>

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
					max={ layersOptions[attributes.style] }
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
				title={__( 'Controls' )}
				initialOpen={false}
			>

				<ToggleControl
					label={'Draggable Map'}
					checked={attributes.draggable}
					onChange={toggleDraggable}
				/>

				<ToggleControl
					label={'Zoom Control'}
					checked={attributes.zoomControl}
					onChange={toggleZoomControl}
				/>

				<ToggleControl
					label={'Full Screen Control'}
					checked={attributes.fullscreenControl}
					onChange={toggleFullScreenControl}
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
