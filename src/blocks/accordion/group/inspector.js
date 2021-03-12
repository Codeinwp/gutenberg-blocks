/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} = wp.blockEditor;

// const {
// 	PanelBody
// } = wp.components;

const Inspector = ({
	attributes,
	setAttributes
}) => {
	return (
		<InspectorControls>
			<PanelColorSettings
				title={ __( 'Color' ) }
				colorSettings={ [
					{
						value: attributes.titleColor,
						onChange: value => setAttributes({ titleColor: value }),
						label: __( 'Title' )
					},
					{
						value: attributes.titleBackground,
						onChange: value => setAttributes({ titleBackground: value }),
						label: __( 'Title Background' )
					},
					{
						value: attributes.contentBackground,
						onChange: value => setAttributes({ contentBackground: value }),
						label: __( 'Content Background' )
					},
					{
						value: attributes.borderColor,
						onChange: value => setAttributes({ borderColor: value }),
						label: __( 'Border Color' )
					}
				] }
			>

				<ContrastChecker
					{ ...{
						textColor: attributes.titleColor,
						backgroundColor: attributes.titleBackground
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default Inspector;
