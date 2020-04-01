/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ButtonGroup,
	PanelBody,
	Placeholder,
	RangeControl,
	Spinner,
	ToggleControl
} = wp.components;

const {
	ColorPalette,
	ContrastChecker,
	InspectorControls
} = wp.blockEditor;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
const IconPickerControl = React.lazy( () => import( '../../components/icon-picker-control/index.js' ) );
import LinkControl from '../../components/link-control/index.js';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	const [ hover, setHover ] = useState( false );

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

	const changeLink = value => {
		setAttributes({ link: value });
	};

	const toggleNewTab = () => {
		setAttributes({ newTab: ! attributes.newTab });
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
				title={ __( 'Icon Settings' ) }
			>
				<React.Suspense fallback={<Placeholder className="wp-themeisle-block-spinner"><Spinner/></Placeholder>}>
					<IconPickerControl
						label={ __( 'Icon Picker' ) }
						prefix={ attributes.prefix }
						icon={ attributes.icon }
						onChange={ changeIcon }
					/>
				</React.Suspense>

				<LinkControl
					label={ __( 'Link' ) }
					placeholder="https://…"
					value={ attributes.link }
					onChange={ changeLink }
				>
					<ToggleControl
						label={ 'Open in New Tab?' }
						checked={ attributes.newTab }
						onChange={ toggleNewTab }
					/>
				</LinkControl>
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
				<ButtonGroup className="wp-block-themeisle-blocks-font-awesome-icons-hover-control">
					<Button
						isDefault
						isLarge
						isPrimary={ ! hover }
						onClick={ () => setHover( false ) }
					>
						{ __( 'Normal' ) }
					</Button>

					<Button
						isDefault
						isLarge
						isPrimary={ hover }
						onClick={ () => setHover( true ) }
					>
						{ __( 'Hover' ) }
					</Button>
				</ButtonGroup>

				{ hover ? (
					<Fragment>
						<BaseControl
							label={ 'Hover Background' }
						>
							<ColorPalette
								label={ 'Hover Background' }
								value={ attributes.backgroundColorHover }
								onChange={ changeBackgroundColorHover }
							/>
						</BaseControl>

						<BaseControl
							label={ 'Hover Icon' }
						>
							<ColorPalette
								label={ 'Hover Icon' }
								value={ attributes.textColorHover }
								onChange={ changeTextColorHover }
							/>
						</BaseControl>

						<BaseControl
							label={ 'Hover Border' }
						>
							<ColorPalette
								label={ 'Hover Border' }
								value={ attributes.borderColorHover }
								onChange={ changeBorderColorHover }
							/>
						</BaseControl>

						<ContrastChecker
							{ ...{
								textColor: attributes.textColorHover,
								backgroundColor: attributes.backgroundColorHover
							} }
						/>
					</Fragment>
				) : (
					<Fragment>
						<BaseControl
							label={ 'Background' }
						>
							<ColorPalette
								label={ 'Background' }
								value={ attributes.backgroundColor }
								onChange={ changeBackgroundColor }
							/>
						</BaseControl>

						<BaseControl
							label={ 'Icon' }
						>
							<ColorPalette
								label={ 'Icon' }
								value={ attributes.textColor }
								onChange={ changeTextColor }
							/>
						</BaseControl>

						<BaseControl
							label={ 'Border' }
						>
							<ColorPalette
								label={ 'Border' }
								value={ attributes.borderColor }
								onChange={ changeBorderColor }
							/>
						</BaseControl>

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
