/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const {
	PanelBody
} = wp.components;


const Inspector = ({
	attributes,
	setAttributes
}) => {

	const changeTitleBackgroundColor = value => {
		setAttributes({ titleBackgroundColor: value });
	};

	const changeContentBackgroundColor = value => {
		setAttributes({ contentBackgroundColor: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Style' )}
				initialOpen={ true }
			>
				<ColorGradientControl
					label={ __( 'Title Background Color' ) }
					colorValue={ attributes.titleBackgroundColor }
					onColorChange={ changeTitleBackgroundColor }
				/>

				<ColorGradientControl
					label={ __( 'Content Background Color' ) }
					colorValue={ attributes.contentBackgroundColor }
					onColorChange={ changeContentBackgroundColor }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
