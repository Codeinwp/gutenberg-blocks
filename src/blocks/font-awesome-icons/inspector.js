/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const {
	Button,
	ButtonGroup,
	PanelBody,
	Placeholder,
	RangeControl,
	Spinner
} = wp.components;

const {
	ColorPalette,
	ContrastChecker,
	InspectorControls
} = wp.blockEditor;

const {
	Fragment,
	lazy,
	Suspense,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
const IconPickerControl = lazy( () => import( '../../components/icon-picker-control/index.js' ) );
import ColorBaseControl from '../../components/color-base-control/index.js';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	const [ hover, setHover ] = useState( false );

	const changeLibrary = value => {
		setAttributes({
			library: value,
			icon: 'fontawesome' === value ? 'themeisle' : 'balance',
			prefix: 'fab'
		});
	};

	const changeIcon = value => {
		if ( 'object' === typeof value ) {
			setAttributes({
				icon: value.name,
				prefix: value.prefix
			});
		} else {
			setAttributes({ icon: value });
		}
	};

	const changeFontSize = value => {
		setAttributes({ fontSize: value });
	};

	const changePadding = value => {
		setAttributes({ padding: value });
	};

	const changeMargin = value => {
		setAttributes({ margin: value });
	};

	const changeBackgroundColor = value => {
		setAttributes({ backgroundColor: value });
	};

	const changeTextColor = value => {
		setAttributes({ textColor: value });
	};

	const changeBorderColor = value => {
		setAttributes({ borderColor: value });
	};

	const changeBackgroundColorHover = value => {
		setAttributes({ backgroundColorHover: value });
	};

	const changeTextColorHover = value => {
		setAttributes({ textColorHover: value });
	};

	const changeBorderColorHover = value => {
		setAttributes({ borderColorHover: value });
	};

	const changeBorderSize = value => {
		setAttributes({ borderSize: value });
	};

	const changeBorderRadius = value => {
		setAttributes({ borderRadius: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Icon' ) }
			>
				<Suspense fallback={<Placeholder><Spinner/></Placeholder>}>
					<IconPickerControl
						label={ __( 'Icon Picker' ) }
						library={ attributes.library }
						prefix={ attributes.prefix }
						icon={ attributes.icon }
						changeLibrary={ changeLibrary }
						onChange={ changeIcon }
					/>
				</Suspense>
			</PanelBody>

			<PanelBody
				title={ __( 'Icon Sizes' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Icon Size' ) }
					value={ attributes.fontSize || '' }
					initialPosition={ 16 }
					onChange={ changeFontSize }
					min={ 12 }
					max={ 140 }
				/>

				<RangeControl
					label={ __( 'Padding' ) }
					value={ attributes.padding || '' }
					initialPosition={ 5 }
					onChange={ changePadding }
					min={ 0 }
					max={ 100 }
				/>

				<RangeControl
					label={ __( 'Margin' ) }
					value={ attributes.margin || '' }
					initialPosition={ 5 }
					onChange={ changeMargin }
					min={ 0 }
					max={ 100 }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Color' ) }
				initialOpen={ false }
			>
				<ButtonGroup>
					<Button
						isSmall
						isSecondary={ hover }
						isPrimary={ ! hover }
						onClick={ () => setHover( false ) }
					>
						{ __( 'Normal' ) }
					</Button>

					<Button
						isSmall
						isSecondary={ ! hover }
						isPrimary={ hover }
						onClick={ () => setHover( true ) }
					>
						{ __( 'Hover' ) }
					</Button>
				</ButtonGroup>

				{ hover ? (
					<Fragment>
						<ColorBaseControl
							label={ 'Hover Background' }
							colorValue={ attributes.backgroundColorHover }
						>
							<ColorPalette
								label={ 'Hover Background' }
								value={ attributes.backgroundColorHover }
								onChange={ changeBackgroundColorHover }
							/>
						</ColorBaseControl>

						<ColorBaseControl
							label={ 'Hover Icon' }
							colorValue={ attributes.textColorHover }
						>
							<ColorPalette
								label={ 'Hover Icon' }
								value={ attributes.textColorHover }
								onChange={ changeTextColorHover }
							/>
						</ColorBaseControl>

						<ColorBaseControl
							label={ 'Hover Border' }
							colorValue={ attributes.borderColorHover }
						>
							<ColorPalette
								label={ 'Hover Border' }
								value={ attributes.borderColorHover }
								onChange={ changeBorderColorHover }
							/>
						</ColorBaseControl>

						<ContrastChecker
							{ ...{
								textColor: attributes.textColorHover,
								backgroundColor: attributes.backgroundColorHover
							} }
						/>
					</Fragment>
				) : (
					<Fragment>
						<ColorBaseControl
							label={ 'Background' }
							colorValue={ attributes.backgroundColor }
						>
							<ColorPalette
								label={ 'Background' }
								value={ attributes.backgroundColor }
								onChange={ changeBackgroundColor }
							/>
						</ColorBaseControl>

						<ColorBaseControl
							label={ 'Icon' }
							colorValue={ attributes.textColor }
						>
							<ColorPalette
								label={ 'Icon' }
								value={ attributes.textColor }
								onChange={ changeTextColor }
							/>
						</ColorBaseControl>

						<ColorBaseControl
							label={ 'Border' }
							colorValue={ attributes.borderColor }
						>
							<ColorPalette
								label={ 'Border' }
								value={ attributes.borderColor }
								onChange={ changeBorderColor }
							/>
						</ColorBaseControl>

						<ContrastChecker
							{ ...{
								textColor: attributes.textColor,
								backgroundColor: attributes.backgroundColor
							} }
						/>
					</Fragment>
				) }
			</PanelBody>

			<PanelBody
				title={ __( 'Border Settings' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Border Size' ) }
					value={ attributes.borderSize }
					onChange={ changeBorderSize }
					min={ 0 }
					max={ 120 }
				/>

				<RangeControl
					label={ __( 'Border Radius' ) }
					value={ attributes.borderRadius }
					onChange={ changeBorderRadius }
					min={ 0 }
					max={ 100 }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
