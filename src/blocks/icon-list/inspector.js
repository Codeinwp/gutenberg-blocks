/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { __experimentalColorGradientControl: ColorGradientControl, InspectorControls } = wp.blockEditor;

const { PanelBody, RangeControl, Placeholder, Spinner } = wp.components;

const { lazy, Suspense } = wp.element;

/**
 * Internal dependencies
 */
const IconPickerControl = lazy(() => import('../../components/icon-picker-control/index.js'));

const Inspector = ({ attributes, setAttributes }) => {
	const changeLibrary = (value) => {
		setAttributes({
			defaultLibrary: value,
			defaultIcon: undefined,
			defaultPrefix: 'fas',
		});
	};

	const changeIcon = (value) => {
		if ('object' === typeof value) {
			setAttributes({
				defaultIcon: value.name,
				defaultPrefix: value.prefix,
			});
		} else {
			setAttributes({ defaultIcon: value });
		}
	};

	const onDefaultContentColorChange = (value) => {
		setAttributes({ defaultContentColor: value });
	};

	const onDefaultIconColorChange = (value) => {
		setAttributes({ defaultIconColor: value });
	};

	const onDefaultSizeChange = (value) => {
		setAttributes({ defaultSize: value });
	};

	const onGapChange = (value) => {
		setAttributes({ gap: value });
	};

	return (
		<InspectorControls>
			<PanelBody title={__('Settings')}>
				<Suspense
					fallback={
						<Placeholder>
							<Spinner />
						</Placeholder>
					}
				>
					<IconPickerControl
						label={__('Icon Picker')}
						library={attributes.defaultLibrary}
						prefix={attributes.defaultPrefix}
						icon={attributes.defaultIcon}
						changeLibrary={changeLibrary}
						onChange={changeIcon}
					/>
				</Suspense>

				<RangeControl
					label={__('Font Size')}
					help={__('The size of the font size of the content and icon.')}
					value={attributes.defaultSize}
					onChange={onDefaultSizeChange}
					min={0}
					max={60}
				/>

				<RangeControl
					label={__('Gap')}
					help={__('The distance between the items.')}
					value={attributes.gap}
					onChange={onGapChange}
					min={0}
					max={60}
				/>

				<ColorGradientControl
					label={__('Content Color')}
					colorValue={attributes.defaultContentColor}
					onColorChange={onDefaultContentColorChange}
				/>

				<ColorGradientControl
					label={__('Icon Color')}
					colorValue={attributes.defaultIconColor}
					onColorChange={onDefaultIconColorChange}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
