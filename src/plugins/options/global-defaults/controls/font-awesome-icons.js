/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl
} = wp.components;

const {
	ColorPalette,
	ContrastChecker
} = wp.blockEditor;

const {
	Fragment,
	useState
} = wp.element;

const ButtonGroupBlock = ({
	blockName,
	defaults,
	changeConfig
}) => {
	const [ hover, setHover ] = useState( false );

	return (
		<Fragment>
			<PanelBody
				title={ __( 'Sizing' ) }
			>
				<RangeControl
					label={ __( 'Icon Size' ) }
					value={ defaults.fontSize || '' }
					initialPosition={ 16 }
					onChange={ value => changeConfig( blockName, { fontSize: value }) }
					min={ 12 }
					max={ 140 }
					beforeIcon="minus"
					afterIcon="plus"
				/>

				<hr/>

				<RangeControl
					label={ __( 'Padding' ) }
					value={ defaults.padding || '' }
					initialPosition={ 5 }
					onChange={ value => changeConfig( blockName, { padding: value }) }
					min={ 0 }
					max={ 100 }
					beforeIcon="minus"
					afterIcon="plus"
				/>

				<hr/>

				<RangeControl
					label={ __( 'Margin' ) }
					value={ defaults.margin || '' }
					initialPosition={ 5 }
					onChange={ value => changeConfig( blockName, { margin: value }) }
					min={ 0 }
					max={ 100 }
					beforeIcon="minus"
					afterIcon="plus"
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
								value={ defaults.backgroundColorHover }
								onChange={ value => changeConfig( blockName, { backgroundColorHover: value }) }
							/>
						</BaseControl>

						<BaseControl
							label={ 'Hover Icon' }
						>
							<ColorPalette
								label={ 'Hover Icon' }
								value={ defaults.textColorHover }
								onChange={ value => changeConfig( blockName, { textColorHover: value }) }
							/>
						</BaseControl>

						<ContrastChecker
							{ ...{
								textColor: defaults.textColorHover,
								backgroundColor: defaults.backgroundColorHover
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
								value={ defaults.backgroundColor }
								onChange={ value => changeConfig( blockName, { backgroundColor: value }) }
							/>
						</BaseControl>

						<BaseControl
							label={ 'Icon' }
						>
							<ColorPalette
								label={ 'Icon' }
								value={ defaults.textColor }
								onChange={ value => changeConfig( blockName, { textColor: value }) }
							/>
						</BaseControl>

						<ContrastChecker
							{ ...{
								textColor: defaults.textColor,
								backgroundColor: defaults.backgroundColor
							} }
						/>
					</Fragment>
				) }
			</PanelBody>
		</Fragment>
	);
};

export default ButtonGroupBlock;
