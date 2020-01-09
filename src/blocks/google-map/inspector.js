/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl
} = wp.components;

const { InspectorControls } = wp.blockEditor;

const { useRef } = wp.element;

import { StyleSwitcherInspectorControl } from '../../components/style-switcher-control/index.js';
import MarkerWrapper from './components/marker-wrapper.js';

const Inspector = ({
	attributes,
	setAttributes,
	map,
	changeStyle,
	isPlaceAPIAvailable,
	isMarkerOpen,
	setMarkerOpen,
	removeMarker,
	changeMarkerProp,
	addMarkerManual,
	api,
	isSaving,
	changeAPI,
	saveAPIKey
}) => {
	const searchRef = useRef( null );

	const initSearch = () => {
		const elements = document.getElementsByClassName( 'pac-container' );

		Object.keys( elements ).forEach( e => elements[e].remove() );

		const searchBox = new google.maps.places.SearchBox( searchRef.current );

		searchBox.addListener( 'places_changed', () => {
			const places = searchBox.getPlaces();

			if ( places && ( 0 < places.length ) ) {
				places.forEach( place => {
					const latitude = place.geometry.location.lat();
					const longitude = place.geometry.location.lng();
					const latLng = new google.maps.LatLng( latitude, longitude );
					map.setCenter( latLng );
					setAttributes({
						location: place.formatted_address || place.name,
						latitude: latitude.toString(),
						longitude: longitude.toString()
					});
				});
			}
		});
	};

	const changeLocation = value => {
		setAttributes({ location: value.target.value });
	};

	const changeLatitude = value => {
		setAttributes({ latitude: value.toString() });
		const latitude = Number( value );
		const longitude = attributes.longitude;
		const latLng = new google.maps.LatLng( latitude, longitude );
		map.setCenter( latLng );
	};

	const changeLongitude = value => {
		setAttributes({ longitude: value.toString() });
		const latitude = attributes.latitude;
		const longitude = Number( value );
		const latLng = new google.maps.LatLng( latitude, longitude );
		map.setCenter( latLng );
	};

	const changeMapType = value => {
		setAttributes({ type: value });
		map.setMapTypeId( google.maps.MapTypeId[ value.toUpperCase() ]);
	};

	const changeZoom = value => {
		setAttributes({ zoom: value });
		map.setZoom( value );
	};

	const changeHeight = value => {
		setAttributes({ height: value });
	};

	const toggleDraggable = () => {
		setAttributes({ draggable: ! attributes.draggable });
	};

	const toggleMapTypeControl = () => {
		setAttributes({ mapTypeControl: ! attributes.mapTypeControl });
	};

	const toggleZoomControl = () => {
		setAttributes({ zoomControl: ! attributes.zoomControl });
	};

	const toggleFullScreenControl = () => {
		setAttributes({ fullscreenControl: ! attributes.fullscreenControl });
	};

	const toggleStreetViewControl = () => {
		setAttributes({ streetViewControl: ! attributes.streetViewControl });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Styles' ) }
				initialOpen={ false }
			>
				<StyleSwitcherInspectorControl
					value={ attributes.style }
					options={ [
						{
							label: __( 'Standard' ),
							value: 'standard',
							image: themeisleGutenberg.assetsPath + '/icons/map-standard.png'
						},
						{
							label: __( 'Silver' ),
							value: 'silver',
							image: themeisleGutenberg.assetsPath + '/icons/map-silver.png'
						},
						{
							label: __( 'Retro' ),
							value: 'retro',
							image: themeisleGutenberg.assetsPath + '/icons/map-retro.png'
						},
						{
							label: __( 'Dark' ),
							value: 'dark',
							image: themeisleGutenberg.assetsPath + '/icons/map-dark.png'
						},
						{
							label: __( 'Night' ),
							value: 'night',
							image: themeisleGutenberg.assetsPath + '/icons/map-night.png'
						},
						{
							label: __( 'Aubergine' ),
							value: 'aubergine',
							image: themeisleGutenberg.assetsPath + '/icons/map-aubergine.png'
						}
					] }
					onChange={ changeStyle }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Location' ) }
			>
				<BaseControl
					label={ __( 'Location' ) }
					id="wp-block-themeisle-blocks-google-map-search"
				>
					<input
						type="text"
						id="wp-block-themeisle-blocks-google-map-search"
						placeholder={ __( 'Enter a location…' ) }
						value={ attributes.location }
						className="wp-block-themeisle-blocks-google-map-search"
						ref={ searchRef }
						onFocus={ initSearch }
						onChange={ changeLocation }
						disabled={ ! isPlaceAPIAvailable }
					/>

					{ ! isPlaceAPIAvailable && (
						<p>
							{ __( 'To enable locations earch, please ensure Places API is activated in the Google Developers Console.' ) + ' ' }
							<ExternalLink href="https://developers.google.com/places/web-service/intro">
								{ __( 'More info.' ) }
							</ExternalLink>
						</p>
					) }
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
						{ label: __( 'Road Map' ), value: 'roadmap' },
						{ label: __( 'Satellite View' ), value: 'satellite' },
						{ label: __( 'Hybrid' ), value: 'hybrid' },
						{ label: __( 'Terrain' ), value: 'terrain' }
					] }
					onChange={ changeMapType }
				/>

				<RangeControl
					label={ __( 'Map Zoom Level' ) }
					value={ attributes.zoom }
					onChange={ changeZoom }
					min={ 0 }
					max={ 20 }
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
				title={ __( 'Controls' ) }
				initialOpen={ false }
			>
				<BaseControl>
					{ __( 'The following changes will not affect block preview during the editing process. You can click outside the block to see the changes take effect.' ) }
				</BaseControl>

				<ToggleControl
					label={ 'Draggable Map' }
					checked={ attributes.draggable }
					onChange={ toggleDraggable }
				/>

				<ToggleControl
					label={ 'Map Type Control' }
					checked={ attributes.mapTypeControl }
					onChange={ toggleMapTypeControl }
				/>

				<ToggleControl
					label={ 'Zoom Control' }
					checked={ attributes.zoomControl }
					onChange={ toggleZoomControl }
				/>

				<ToggleControl
					label={ 'Full Screen Control' }
					checked={ attributes.fullscreenControl }
					onChange={ toggleFullScreenControl }
				/>

				<ToggleControl
					label={ 'Streen View Control' }
					checked={ attributes.streetViewControl }
					onChange={ toggleStreetViewControl }
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
					isPlaceAPIAvailable={ isPlaceAPIAvailable }
					initialOpen={ isMarkerOpen }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Global Settings' ) }
				initialOpen={ false }
			>
				<TextControl
					label={ __( 'Google Maps API Key' ) }
					type="text"
					placeholder={ __( 'Google Maps API Key' ) }
					value={ api }
					className="components-placeholder__input"
					onChange={ changeAPI }
					help={ __( 'Changing the API key effects all Google Map Embed blocks. You will have to refresh the page after changing your API keys.' ) }
				/>

				<Button
					isLarge
					type="submit"
					onClick={ saveAPIKey }
					isBusy={ isSaving }
				>
					{ __( 'Save API Key' ) }
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
