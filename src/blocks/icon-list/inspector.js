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
	RangeControl,
	SelectControl,
	Placeholder,
	Spinner
} = wp.components;

const {
	lazy,
	Suspense,
} = wp.element;

const IconPickerControl = lazy( () => import( '../../components/icon-picker-control/index.js' ) );

const Inspector = ({
	attributes,
	setAttributes
}) => {

	const changeIcon = value => {
		if ('object' === typeof value) {
			setAttributes({
				defaultIcon: value.name,
				defaultIconPrefix: value.prefix
			});
		} else {
			setAttributes({ defaultIcon: value });
		}
	};

	const selectDefaultIconStyleChange = value => {
		setAttributes({ defaultIconStyle: value });
	};

	const onDefaultTitleColorChange = value => {
		setAttributes({ defaultTitleColor: value });
	};

	const onDefaultIconColorChange = value => {
		setAttributes({ defaultIconColor: value });
	};

	const onDefaultSizeChange = value => {
		setAttributes({ defaultSize: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __('Settings') }
				initialOpen={true}
			>
				<SelectControl
					label={ __('Icons Style') }
					value={attributes.defaultIconStyle}
					options={[
						{ label: __( 'Default' ), value: 'default' },
						{ label: __( 'Hide' ), value: 'hide' }
					]}
					onChange={ selectDefaultIconStyleChange }
				/>
				<Suspense fallback={<Placeholder><Spinner /></Placeholder>}>
					<IconPickerControl
						label={ __('Icon Picker') }
						prefix={ attributes.defaultIconPrefix }
						icon={ attributes.defaultIcon }
						onChange={ changeIcon }
					/>
				</Suspense>
				<RangeControl
					label={ __('Font Size') }
					help={ __('The size of the font size of the title and icon.') }
					value={ attributes.defaultSize }
					onChange={ onDefaultSizeChange }
					min={ 0 }
					max={ 60 }
				/>
				<ColorGradientControl
					label={ __( 'Title Color' ) }
					colorValue={ attributes.defaultTitleColor }
					onColorChange={ onDefaultTitleColorChange }
				/>
				<ColorGradientControl
					label={ __( 'Icon Color' ) }
					colorValue={ attributes.defaultIconColor }
					onColorChange={ onDefaultIconColorChange }
				/>
			</PanelBody>
		</InspectorControls>

	);
}

export default Inspector;
