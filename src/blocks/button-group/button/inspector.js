/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const {
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl,
	Placeholder,
	SelectControl,
	Spinner
} = wp.components;

const {
	Fragment,
	lazy,
	Suspense,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import ControlPanelControl from '../../../components/control-panel-control/index.js';
const IconPickerControl = lazy( () => import( '../../../components/icon-picker-control/index.js' ) );

const Inspector = ({
	attributes,
	setAttributes
}) => {
	const [ hover, setHover ] = useState( false );

	const HoverControl = () => {
		return (
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

		);
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Color' ) }
			>
				<HoverControl/>

				{ ! hover ? (
					<Fragment key="without-hover">
						<ColorGradientControl
							label={ 'Color' }
							colorValue={ attributes.color }
							onColorChange={ e => setAttributes({ color: e }) }
						/>

						<ColorGradientControl
							label={ 'Background' }
							colorValue={ attributes.background }
							gradientValue={ attributes.backgroundGradient }
							onColorChange={ e => setAttributes({ background: e }) }
							onGradientChange={ e => setAttributes({ backgroundGradient: e }) }
						/>
					</Fragment>
				) : (
					<Fragment key="with-hover">
						<ColorGradientControl
							label={ 'Hover Color' }
							colorValue={ attributes.hoverColor }
							onColorChange={ e => setAttributes({ hoverColor: e }) }
						/>

						<ColorGradientControl
							label={ 'Hover Background' }
							colorValue={ attributes.hoverBackground }
							gradientValue={ attributes.hoverBackgroundGradient }
							onColorChange={ e => setAttributes({ hoverBackground: e }) }
							onGradientChange={ e => setAttributes({ hoverBackgroundGradient: e }) }
						/>
					</Fragment>
				) }
			</PanelBody>

			<PanelBody
				title={ __( 'Border & Box Shadow' ) }
				initialOpen={ false }
			>
				<HoverControl/>

				{ ! hover ? (
					<ColorGradientControl
						label={ 'Border' }
						colorValue={ attributes.border }
						onColorChange={ e => setAttributes({ border: e }) }
					/>
				) : (
					<ColorGradientControl
						label={ 'Hover Border' }
						colorValue={ attributes.hoverBorder }
						onColorChange={ e => setAttributes({ hoverBorder: e }) }
					/>
				) }

				<RangeControl
					label={ __( 'Border Width' ) }
					className="border-width"
					value={ attributes.borderSize }
					onChange={ e => setAttributes({ borderSize: e }) }
					min={ 0 }
					max={ 10 }
				/>

				<RangeControl
					label={ __( 'Border Radius' ) }
					value={ attributes.borderRadius }
					onChange={ e => setAttributes({ borderRadius: e }) }
					min={ 0 }
					max={ 100 }
				/>

				<ControlPanelControl
					label={ 'Box Shadow' }
					attributes={ attributes }
					setAttributes={ setAttributes }
					resetValues={ {
						boxShadow: false,
						boxShadowColor: undefined,
						boxShadowColorOpacity: 50,
						boxShadowBlur: 5,
						boxShadowSpread: 1,
						boxShadowHorizontal: 0,
						boxShadowVertical: 0,
						hoverBoxShadowColor: undefined,
						hoverBoxShadowColorOpacity: 50,
						hoverBoxShadowBlur: 5,
						hoverBoxShadowSpread: 1,
						hoverBoxShadowHorizontal: 0,
						hoverBoxShadowVertical: 0
					} }
					onClick={ () => setAttributes({ boxShadow: true }) }
				>
					<HoverControl/>

					{ ! hover ? (
						<Fragment key="without-hover">
							<ColorGradientControl
								label={ 'Shadow Color' }
								colorValue={ attributes.boxShadowColor }
								onColorChange={ e => setAttributes({ boxShadowColor: e }) }
							/>

							<RangeControl
								label={ __( 'Opacity' ) }
								value={ attributes.boxShadowColorOpacity }
								onChange={ e => setAttributes({ boxShadowColorOpacity: e }) }
								min={ 0 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Blur' ) }
								value={ attributes.boxShadowBlur }
								onChange={ e => setAttributes({ boxShadowBlur: e }) }
								min={ 0 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Spread' ) }
								value={ attributes.boxShadowSpread }
								onChange={ e => setAttributes({ boxShadowSpread: e }) }
								min={ -100 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Horizontal' ) }
								value={ attributes.boxShadowHorizontal }
								onChange={ e => setAttributes({ boxShadowHorizontal: e }) }
								min={ -100 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Vertical' ) }
								value={ attributes.boxShadowVertical }
								onChange={ e => setAttributes({ boxShadowVertical: e }) }
								min={ -100 }
								max={ 100 }
							/>
						</Fragment>
					) : (
						<Fragment key="with-hover">
							<ColorGradientControl
								label={ 'Shadow Color on Hover' }
								colorValue={ attributes.hoverBoxShadowColor }
								onColorChange={ e => setAttributes({ hoverBoxShadowColor: e }) }
							/>

							<RangeControl
								label={ __( 'Opacity' ) }
								value={ attributes.hoverBoxShadowColorOpacity }
								onChange={ e => setAttributes({ hoverBoxShadowColorOpacity: e }) }
								min={ 0 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Blur' ) }
								value={ attributes.hoverBoxShadowBlur }
								onChange={ e => setAttributes({ hoverBoxShadowBlur: e }) }
								min={ 0 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Spread' ) }
								value={ attributes.hoverBoxShadowSpread }
								onChange={ e => setAttributes({ hoverBoxShadowSpread: e }) }
								min={ -100 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Horizontal' ) }
								value={ attributes.hoverBoxShadowHorizontal }
								onChange={ e => setAttributes({ hoverBoxShadowHorizontal: e }) }
								min={ -100 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Vertical' ) }
								value={ attributes.hoverBoxShadowVertical }
								onChange={ e => setAttributes({ hoverBoxShadowVertical: e }) }
								min={ -100 }
								max={ 100 }
							/>
						</Fragment>
					) }
				</ControlPanelControl>
			</PanelBody>

			<PanelBody
				title={ __( 'Icon Settings' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'Icon Position' ) }
					value={ attributes.iconType }
					options={ [
						{ label: 'No Icon', value: 'none' },
						{ label: 'Left', value: 'left' },
						{ label: 'Right', value: 'right' },
						{ label: 'Icon Only', value: 'only' }
					] }
					onChange={ e => setAttributes({ iconType: e }) }
				/>

				{ 'none' !== attributes.iconType && (
					<Suspense fallback={<Placeholder><Spinner/></Placeholder>}>
						<IconPickerControl
							label={ __( 'Icon Picker' ) }
							prefix={ attributes.prefix }
							icon={ attributes.icon }
							onChange={ e => {
								setAttributes({
									icon: e.name,
									prefix: e.prefix
								});
							}}
						/>
					</Suspense>
				) }
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
