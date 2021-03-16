/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	ToggleControl
} = wp.components;

const Inspector = ({
	attributes,
	setAttributes
}) => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
			>
				<ToggleControl
					label={ 'Initially Open' }
					checked={ attributes.initialOpen }
					onChange={ value => setAttributes({ initialOpen: value }) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
