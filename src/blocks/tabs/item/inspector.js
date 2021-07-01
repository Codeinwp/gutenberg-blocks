/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	InspectorControls
} = wp.blockEditor;

const {
	PanelBody,
	Button,
	TextControl
} = wp.components;

const Inspector = ({
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
			<PanelBody
				title={ __( 'Settings' ) }
			>
				<Button
					isSecondary
					onClick={ () => selectParent() }
				>
					{ __( 'Back to the Tabs' ) }
				</Button>

				<TextControl
					type="text"
					label={ __( 'Title' ) }
					placeholder={ __( 'Insert a title' ) }
					onChange={ onTitleChange } />
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
