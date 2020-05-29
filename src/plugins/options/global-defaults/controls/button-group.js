/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { cloneDeep } = lodash;

const {
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl,
	SelectControl
} = wp.components;

const {	ColorPalette } = wp.blockEditor;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import ColorBaseControl from '../../../../components/color-base-control/index.js';
import SizingControl from '../../../../components/sizing-control/index.js';
import GoogleFontsControl from '../../../../components/google-fonts-control/index.js';

const ButtonGroupBlock = ({
	blockName,
	defaults,
	changeConfig
}) => {
	const [ hover, setHover ] = useState( false );

	const changeData = ( type, value ) => {
		const data = cloneDeep( defaults.data );
		data[type] = value;
		changeConfig( blockName, { data });
	};

	const changeFontFamily = value => {
		if ( ! value ) {
			changeConfig( blockName, {
				fontFamily: value,
				fontVariant: value
			});
		} else {
			changeConfig( blockName, {
				fontFamily: value,
				fontVariant: 'normal',
				fontStyle: 'normal'
			});
		}
	};

	return (
		<Fragment>
			<PanelBody
				title={ __( 'Color & Border' ) }
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
							label={ 'Hover Color' }
							colorValue={ defaults.data.hoverColor }
						>
							<ColorPalette
								label={ 'Hover Color' }
								value={ defaults.data.hoverColor }
								onChange={ value => changeData( 'hoverColor', value ) }
							/>
						</ColorBaseControl>

						<hr/>

						<ColorBaseControl
							label={ 'Hover Background' }
							colorValue={ defaults.data.hoverBackground }
						>
							<ColorPalette
								label={ 'Hover Background' }
								value={ defaults.data.hoverBackground }
								onChange={ value => changeData( 'hoverBackground', value ) }
							/>
						</ColorBaseControl>

						<hr/>

						<ColorBaseControl
							label={ 'Hover Border' }
							colorValue={ defaults.data.hoverBorder }
						>
							<ColorPalette
								label={ 'Hover Border' }
								value={ defaults.data.hoverBorder }
								onChange={ value => changeData( 'hoverBorder', value ) }
							/>
						</ColorBaseControl>
					</Fragment>
				) : (
					<Fragment>
						<ColorBaseControl
							label={ 'Color' }
							colorValue={ defaults.data.color }
						>
							<ColorPalette
								label={ 'Color' }
								value={ defaults.data.color }
								onChange={ value => changeData( 'color', value ) }
							/>
						</ColorBaseControl>

						<hr/>

						<ColorBaseControl
							label={ 'Background' }
							colorValue={ defaults.data.background }
						>
							<ColorPalette
								label={ 'Background' }
								value={ defaults.data.background }
								onChange={ value => changeData( 'background', value ) }
							/>
						</ColorBaseControl>

						<hr/>

						<ColorBaseControl
							label={ 'Border' }
							colorValue={ defaults.data.border }
						>
							<ColorPalette
								label={ 'Border' }
								value={ defaults.data.border }
								onChange={ value => changeData( 'border', value ) }
							/>
						</ColorBaseControl>
					</Fragment>
				) }

				<hr/>

				<RangeControl
					label={ __( 'Border Size' ) }
					value={ defaults.data.borderSize || '' }
					onChange={ value => changeData( 'borderSize', value ) }
					min={ 0 }
					max={ 10 }
				/>

				<hr/>

				<RangeControl
					label={ __( 'Border Radius' ) }
					value={ defaults.data.borderRadius || '' }
					onChange={ value => changeData( 'borderRadius', value ) }
					min={ 0 }
					max={ 100 }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Spacing' ) }
				initialOpen={ false }
			>
				<SizingControl
					label={ __( 'Button Padding' ) }
					min={ 0 }
					max={ 100 }
					onChange={ changeData }
					options={ [
						{
							label: __( 'Top' ),
							type: 'paddingTopBottom',
							value: defaults.data.paddingTopBottom
						},
						{
							label: __( 'Right' ),
							type: 'paddingLeftRight',
							value: defaults.data.paddingLeftRight
						},
						{
							label: __( 'Bottom' ),
							type: 'paddingTopBottom',
							value: defaults.data.paddingTopBottom
						},
						{
							label: __( 'Left' ),
							type: 'paddingLeftRight',
							value: defaults.data.paddingLeftRight
						}
					] }
				/>

				<hr/>

				<RangeControl
					label={ __( 'Group Spacing' ) }
					value={ defaults.spacing }
					onChange={ value => changeConfig( blockName, { spacing: value }) }
					min={ 0 }
					max={ 50 }
				/>

				<hr/>

				<SelectControl
					label={ __( 'Collapse On' ) }
					value={ defaults.collapse }
					options={ [
						{ label: 'None', value: 'collapse-none' },
						{ label: 'Desktop', value: 'collapse-desktop' },
						{ label: 'Tablet', value: 'collapse-tablet' },
						{ label: 'Mobile', value: 'collapse-mobile' }
					] }
					onChange={ value => changeConfig( blockName, { collapse: value }) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Typography Settings' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Font Size' ) }
					value={ defaults.fontSize || '' }
					onChange={ value => changeConfig( blockName, { fontSize: value }) }
					min={ 0 }
					max={ 50 }
				/>

				<hr/>

				<GoogleFontsControl
					label={ __( 'Font Family' ) }
					value={ defaults.fontFamily }
					onChangeFontFamily={ changeFontFamily }
					valueVariant={ defaults.fontVariant }
					onChangeFontVariant={ value => changeConfig( blockName, { fontVariant: value }) }
					valueStyle={ defaults.fontStyle }
					onChangeFontStyle={ value => changeConfig( blockName, { fontStyle: value }) }
					valueTransform={ defaults.textTransform }
					onChangeTextTransform={ value => changeConfig( blockName, { textTransform: value }) }
				/>

				<hr/>

				<RangeControl
					label={ __( 'Line Height' ) }
					value={ defaults.lineHeight || '' }
					onChange={ value => changeConfig( blockName, { lineHeight: value }) }
					min={ 0 }
					max={ 200 }
				/>
			</PanelBody>
		</Fragment>
	);
};

export default ButtonGroupBlock;
