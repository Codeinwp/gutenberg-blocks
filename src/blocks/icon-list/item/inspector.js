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
	Suspense
} = wp.element;

/**
 * Internal dependencies
 */
const IconPickerControl = lazy( () => import( '../../../components/icon-picker-control/index.js' ) );

const Inspector = ({
	attributes,
	setAttributes,
	setHasCustomIcon
}) => {
	const changeIcon = value => {
		if ( 'object' === typeof value ) {
			setAttributes({
				icon: value.name,
				iconPrefix: value.prefix
			});
		} else {
			setAttributes({ icon: value });
		}

		setHasCustomIcon( true );
	};

	const changeLibrary = value => {
		setAttributes({
			library: value,
			icon: undefined,
			iconPrefix: 'fab'
		});

		setHasCustomIcon( true );
	};

	const onDefaultContentColorChange = value => {
		setAttributes({ contentColor: value });
	};

	const onDefaultIconColorChange = value => {
		setAttributes({ iconColor: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
			>
				<Suspense fallback={<Placeholder><Spinner /></Placeholder>}>
					<IconPickerControl
						label={ __( 'Icon Picker' ) }
						library={ attributes.library }
						prefix={ attributes.iconPrefix }
						icon={ attributes.icon }
						changeLibrary={ changeLibrary }
						onChange={ changeIcon }
					/>
				</Suspense>

				<ColorGradientControl
					label={ __( 'Content Color' ) }
					colorValue={ attributes.contentColor }
					onColorChange={ onDefaultContentColorChange }
				/>

				<ColorGradientControl
					label={ __( 'Icon Color' ) }
					colorValue={ attributes.iconColor }
					onColorChange={ onDefaultIconColorChange }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
