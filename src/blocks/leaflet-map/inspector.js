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
	Button,
	TextControl,
	RangeControl
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
	const [ error, setError ] = useState({ target: '', reason: '' });

	const search = async() => {
		setAttributes({ location: location});

		const LngLat = await getLocation( location );

		if ( LngLat ) {
			setAttributes({
				latitude: LngLat.latitude,
				longitude: LngLat.longitude
			});

			if ( 'LOCATION' === error.target ) {
				setError({});
			}
		} else {
			setError({
				target: 'LOCATION',
				reason: 'Location couldn\'t been found!'
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


	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Location' ) }
			>

				<TextControl
					label={ __( 'Location' ) }
					type="text"
					className={ classnames({'wp-block-themeisle-blocks-leaflet-map-input-error': 'LOCATION' === error.target })}
					placeholder={ __( 'Enter location. E.g: La Sagrada Familia, Barcelona, Spain' ) }
					help={ __( 'Press Enter to search the location' ) }
					value={ location }
					onChange={ ( value ) => setLocation( value ) }
				/>

				<Button
					isPrimary
					isSmall
					label={ __( 'Search location' ) }
					onClick={ () => {
						search();
					}}
				>
					{ __( 'Search location' )}
				</Button>

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
