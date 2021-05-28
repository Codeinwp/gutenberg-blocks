/* eslint-disable no-unused-vars */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const { PanelBody, Button, RangeControl, SelectControl, TextControl } = wp.components;

const Inspector = ({
	attributes,
	setAttributes,
	selectParent
}) => {

	const onTitleChange = ( value ) => {
		setAttributes({
			title: value
		});
	};

	return (
		<InspectorControls>
			<PanelBody title={__( 'Settings' )} initialOpen={true}>
				<Button isSecondary onClick={ () => selectParent() }>
					{ __( 'Back to the Tabs' ) }
				</Button>
				<TextControl
					type="text"
					label={ __( 'Title' ) }
					placeholder={ __( 'Insert a title' ) }
					value={ attributes.title }
					className="components-placeholder__input"
					onChange={ onTitleChange } />
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
