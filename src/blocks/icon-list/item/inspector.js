/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const {
	PanelBody,
	Placeholder,
	Spinner
} = wp.components;

const {
	lazy,
	Suspense,
} = wp.element;

const IconPickerControl = lazy( () => import( '../../../components/icon-picker-control/index.js' ) );

const Inspector = ({
	attributes,
	setAttributes,
	setHasCustomIcon
}) => {

	const changeIcon = value => {
		if ('object' === typeof value) {
			setAttributes({
				icon: value.name,
				iconPrefix: value.prefix
			});
		} else {
			setAttributes({ icon: value });
		}
		setHasCustomIcon( true );
	};

	const onDefaultTitleColorChange = value => {
		setAttributes({ titleColor: value });
	};

	const onDefaultIconColorChange = value => {
		setAttributes({ iconColor: value });
	};
	
	return (
		<InspectorControls>
			<PanelBody
				title={ __('Settings') }
				initialOpen={true}
			>
				<Suspense fallback={<Placeholder><Spinner /></Placeholder>}>
					<IconPickerControl
						label={ __('Icon Picker') }
						prefix={ attributes.iconPrefix }
						icon={ attributes.icon }
						onChange={ changeIcon }
					/>
				</Suspense>
				<ColorGradientControl
					label={ __( 'Title Color' ) }
					colorValue={ attributes.titleColor }
					onColorChange={ onDefaultTitleColorChange }
				/>
				<ColorGradientControl
					label={ __( 'Icon Color' ) }
					colorValue={ attributes.iconColor }
					onColorChange={ onDefaultIconColorChange }
				/>
			</PanelBody>
		</InspectorControls>

	);
}

export default Inspector;
