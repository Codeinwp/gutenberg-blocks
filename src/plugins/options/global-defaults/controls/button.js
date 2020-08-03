/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { __experimentalColorGradientControl: ColorGradientControl } = wp.blockEditor;

const {
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl
} = wp.components;

const {
	Fragment,
	useState
} = wp.element;

const ButtonBlock = ({
	blockName,
	defaults,
	changeConfig
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
		<Fragment>
			<PanelBody
				title={ __( 'Color' ) }
			>
				<HoverControl/>

				{ ! hover ? (
					<Fragment key="without-hover">
						<ColorGradientControl
							label={ 'Color' }
							colorValue={ defaults.color }
							onColorChange={ value => changeConfig( blockName, { color: value }) }
						/>

						<ColorGradientControl
							label={ 'Background' }
							colorValue={ defaults.background }
							onColorChange={ value => changeConfig( blockName, { background: value }) }
						/>
					</Fragment>
				) : (
					<Fragment key="with-hover">
						<ColorGradientControl
							label={ 'Hover Color' }
							colorValue={ defaults.hoverColor }
							onColorChange={ value => changeConfig( blockName, { hoverColor: value }) }
						/>

						<ColorGradientControl
							label={ 'Hover Background' }
							colorValue={ defaults.hoverBackground }
							onColorChange={ value => changeConfig( blockName, { hoverBackground: value }) }
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
						colorValue={ defaults.border }
						onColorChange={ value => changeConfig( blockName, { border: value }) }
					/>
				) : (
					<ColorGradientControl
						label={ 'Hover Border' }
						colorValue={ defaults.hoverBorder }
						onColorChange={ value => changeConfig( blockName, { hoverBorder: value }) }
					/>
				) }

				<RangeControl
					label={ __( 'Border Width' ) }
					value={ defaults.borderSize }
					onChange={ value => changeConfig( blockName, { borderSize: value }) }
					min={ 0 }
					max={ 10 }
				/>

				<RangeControl
					label={ __( 'Border Radius' ) }
					value={ defaults.borderRadius }
					onChange={ value => changeConfig( blockName, { borderRadius: value }) }
					min={ 0 }
					max={ 100 }
				/>
			</PanelBody>
		</Fragment>
	);
};

export default ButtonBlock;
