/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl
} = wp.components;

const { InspectorControls } = wp.blockEditor;

import MarkerWrapper from './components/marker-wrapper.js';

const Inspector = ({
	attributes,
	setAttributes,
	map,
	isMarkerOpen,
	setMarkerOpen,
	removeMarker,
	changeMarkerProp,
	addMarkerManual,
	mapRef
}) => {

	const changeLatitude = value => {
		setAttributes({ latitude: value.toString() });
		const latitude = Number( value );
		const longitude = attributes.longitude;
		map.panTo([ latitude, longitude ]);
	};

	const changeLongitude = value => {
		setAttributes({ longitude: value.toString() });
		const latitude = attributes.latitude;
		const longitude = Number( value );
		map.panTo([ latitude, longitude ]);
	};

	const changeZoom = value => {
		setAttributes({ zoom: value });
		map.setZoom( value );
	};

	const changeMapType = value => {
		mapRef.current.eachLayer( layer=>{
			if ( layer.url ) {  //prevents removing the markers
				mapRef.current.removeLayer( layer );
			}
		});
		setAttributes({ type: value });
		L.esri.basemapLayer( value ).addTo( mapRef.current );
	};


	const changeHeight = value => {
		mapRef.current.invalidateSize( true );
		setAttributes({ height: value });
	};

	const toggleDraggable = () => {
		attributes.draggable ? mapRef.current.dragging.disable() : mapRef.current.dragging.enable();
		setAttributes({ draggable: ! attributes.draggable });
	};

	const toggleMapTypeControl = () => {
		setAttributes({ mapTypeControl: ! attributes.mapTypeControl });
	};

	const toggleZoomControl = () => {
		attributes.zoomControl ? mapRef.current.zoomControl.disable() : mapRef.zoomControl.enable();
		setAttributes({ zoomControl: ! attributes.zoomControl });
	};

	const toggleFullScreenControl = () => {
		setAttributes({ fullscreenControl: ! attributes.fullscreenControl });
	};


	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Location' ) }
			>
				<BaseControl
					label={ __( 'Location' ) }
					id="wp-block-themeisle-blocks-leaflet-map-search"
				>
					<input
						type="text"
						id="wp-block-themeisle-blocks-leaflet-map-search"

						//value={ attributes.location }
						//className="wp-block-themeisle-blocks-leaflet-map-search"

					/>
				</BaseControl>

				<TextControl
					label={ __( 'Latitude' ) }
					type="text"
					placeholder={ __( 'Enter latitude…' ) }
					value={ attributes.latitude }
					onChange={ changeLatitude }
				/>

				<TextControl
					label={ __( 'Longitude' ) }
					type="text"
					placeholder={ __( 'Enter longitude' ) }
					value={ attributes.longitude }
					onChange={ changeLongitude }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Positioning & Zooming' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Map Type' ) }
					value={ attributes.type }
					options={ [
						{ label: __( 'Topographic' ), value: 'Topographic' },
						{ label: __( 'Streets' ), value: 'Streets' },
						{ label: __( 'National Geographic' ), value: 'NationalGeographic' },
						{ label: __( 'Oceans' ), value: 'Oceans' },
						{ label: __( 'Gray' ), value: 'Gray' },
						{ label: __( 'Physical' ), value: 'Physical' },
						{ label: __( 'Shaded Relief' ), value: 'ShadedRelief' },
						{ label: __( 'Satellite View' ), value: 'Imagery' }
					] }
					onChange={ changeMapType }
				/>

				<RangeControl
					label={ __( 'Map Zoom Level' ) }
					value={ attributes.zoom }
					onChange={ changeZoom }
					min={ 0 }
					max={ 18 }
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
				<BaseControl>
					{__( 'The following changes will not affect block preview during the editing process. You can click outside the block to see the changes take effect.' )}
				</BaseControl>

				<ToggleControl
					label={'Draggable Map'}
					checked={attributes.draggable}
					onChange={toggleDraggable}
				/>

				<ToggleControl
					label={'Map Type Control'}
					checked={attributes.mapTypeControl}
					onChange={toggleMapTypeControl}
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
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
