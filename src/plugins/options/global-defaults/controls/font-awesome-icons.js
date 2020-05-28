/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
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

/**
 * Internal dependencies
 */
import ColorBaseControl from '../../../../components/color-base-control/index.js';

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
				/>

				<hr/>

				<RangeControl
					label={ __( 'Padding' ) }
					value={ defaults.padding || '' }
					initialPosition={ 5 }
					onChange={ value => changeConfig( blockName, { padding: value }) }
					min={ 0 }
					max={ 100 }
				/>

				<hr/>

				<RangeControl
					label={ __( 'Margin' ) }
					value={ defaults.margin || '' }
					initialPosition={ 5 }
					onChange={ value => changeConfig( blockName, { margin: value }) }
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
						isSecondary
						isSmall
						isPrimary={ ! hover }
						onClick={ () => setHover( false ) }
					>
						{ __( 'Normal' ) }
					</Button>

					<Button
						isSecondary
						isSmall
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
							colorValue={ defaults.backgroundColorHover }
						>
							<ColorPalette
								label={ 'Hover Background' }
								value={ defaults.backgroundColorHover }
								onChange={ value => changeConfig( blockName, { backgroundColorHover: value }) }
							/>
						</ColorBaseControl>

						<ColorBaseControl
							label={ 'Hover Icon' }
							colorValue={ defaults.textColorHover }
						>
							<ColorPalette
								label={ 'Hover Icon' }
								value={ defaults.textColorHover }
								onChange={ value => changeConfig( blockName, { textColorHover: value }) }
							/>
						</ColorBaseControl>

						<ContrastChecker
							{ ...{
								textColor: defaults.textColorHover,
								backgroundColor: defaults.backgroundColorHover
							} }
						/>
					</Fragment>
				) : (
					<Fragment>
						<ColorBaseControl
							label={ 'Background' }
							colorValue={ defaults.backgroundColor }
						>
							<ColorPalette
								label={ 'Background' }
								value={ defaults.backgroundColor }
								onChange={ value => changeConfig( blockName, { backgroundColor: value }) }
							/>
						</ColorBaseControl>

						<ColorBaseControl
							label={ 'Icon' }
							colorValue={ defaults.textColor }
						>
							<ColorPalette
								label={ 'Icon' }
								value={ defaults.textColor }
								onChange={ value => changeConfig( blockName, { textColor: value }) }
							/>
						</ColorBaseControl>

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
