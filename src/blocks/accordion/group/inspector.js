/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} = wp.blockEditor;

const {
	PanelBody,
	SelectControl
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
				<SelectControl
					label={ __( 'Gap' ) }
					value={ attributes.gap }
					options={ [
						{ label: __( 'No Gap' ), value: '' },
						{ label: __( 'Narrow (5px)' ), value: 'narrow' },
						{ label: __( 'Wide (10px)' ), value: 'wide' },
						{ label: __( 'Wider (20px)' ), value: 'wider' }
					] }
					onChange={ e => setAttributes({ gap: e }) }
				/>
			</PanelBody>

			<PanelColorSettings
				title={ __( 'Color' ) }
				initialOpen={ false }
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
