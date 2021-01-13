

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	TextControl
} = wp.components;

const { InspectorControls } = wp.blockEditor;

const Inspector = ({
	attributes,
	setAttributes
}) => {

	const changeLocation = value => {
		setAttributes({ location: value });

		// const coords = getLocation( value );

		// if ( coords ) {
		// 	setAttributes({
		// 		latitude: coords.latitude,
		// 		longitude: coords.longitude
		// 	});
		// }
	};

	const changeLatitude = value => {
		setAttributes({ latitude: value.toString() });
	};

	const changeLongitude = value => {
		setAttributes({ longitude: value.toString() });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Location' ) }
			>
				<TextControl
					label={ __( 'Lacation' ) }
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
		</InspectorControls>
	);
};

export default Inspector;
