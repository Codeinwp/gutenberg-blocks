

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	TextControl,
	RangeControl
} = wp.components;

const { InspectorControls } = wp.blockEditor;

const Inspector = ({
	attributes,
	setAttributes
}) => {

	const changeLocation = value => {
		setAttributes({ location: value });
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
					placeholder={ __( 'Enter latitude…' ) }
					value={ attributes.location }
					onChange={ changeLocation }
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

		</InspectorControls>
	);
};

export default Inspector;
