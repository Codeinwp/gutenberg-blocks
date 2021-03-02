/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	useState
} = wp.element;

const {
	PanelBody,
	TextControl,
	RangeControl,
	BaseControl,
	ToggleControl
} = wp.components;

const { InspectorControls } = wp.blockEditor;

/**
 * Internal dependencies
 */
import { getLocation } from './utility';

import MarkerWrapper from './components/marker-wrapper.js';

const Inspector = ({
	attributes,
	setAttributes,
	dispatch,
	markersInteraction
}) => {
	const [ location, setLocation ] = useState( attributes.location );

	const [ error, setError ] = useState({
		target: '',
		reason: ''
	});

	const search = async() => {
		setAttributes({ location });

		const LngLat = await getLocation( location );

		if ( LngLat ) {
			setAttributes({
				latitude: LngLat.latitude.toString(),
				longitude: LngLat.longitude.toString()
			});

			if ( 'LOCATION' === error.target ) {
				setError({});
			}
		} else {
			setError({
				target: 'LOCATION',
				reason: __( 'Location couldn\'t been found!' )
			});
		}
	};

	const changeLatitude = value => {
		setAttributes({ latitude: value.toString() });
	};

	const changeLongitude = value => {
		setAttributes({ longitude: value.toString() });
	};

	const changeHeight = value => {
		setAttributes({ height: value });
	};

	const changeZoom = value => {
		setAttributes({ zoom: value });
	};

	const toggleDraggable = () => {
		setAttributes({ draggable: ! attributes.draggable });
	};

	const toggleZoomControl = () => {
		setAttributes({ zoomControl: ! attributes.zoomControl });
	};

	const searchOnPress = ( event, key ) => {
		if ( event.key === key ) {
			search();
		}
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Location' ) }
			>
				<TextControl
					label={ __( 'Location' ) }
					type="text"
					className={ classnames(
						{ 'wp-block-themeisle-blocks-leaflet-map-input-error': 'LOCATION' === error.target }
					) }
					placeholder={ __( 'Enter location. E.g: La Sagrada Familia, Barcelona, Spain' ) }
					help={ __( 'Press Enter to search the location' ) }
					value={ location }
					onChange={ setLocation }
					onKeyDown={ event => searchOnPress( event, 'Enter' ) }
				/>

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
					label={ 'Zoom Control' }
					checked={ attributes.zoomControl }
					onChange={ toggleZoomControl }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Markers' ) }
				initialOpen={ true }
			>
				<MarkerWrapper
					markers={ attributes.markers }
					dispatch={ dispatch }
					markersInteraction={ markersInteraction }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
