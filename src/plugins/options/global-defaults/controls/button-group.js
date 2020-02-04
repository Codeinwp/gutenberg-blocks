/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { cloneDeep } = lodash;

const {
	BaseControl,
	Button,
	ButtonGroup,
	HorizontalRule,
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
				title={ __( 'Color' ) }
			>
				<ButtonGroup className="wp-block-themeisle-blocks-button-group-hover-control">
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
							label={ 'Hover Color' }
						>
							<ColorPalette
								label={ 'Hover Color' }
								value={ defaults.data.hoverColor }
								onChange={ value => changeData( 'hoverColor', value ) }
							/>
						</BaseControl>

						<HorizontalRule/>

						<BaseControl
							label={ 'Hover Background' }
						>
							<ColorPalette
								label={ 'Hover Background' }
								value={ defaults.data.hoverBackground }
								onChange={ value => changeData( 'hoverBackground', value ) }
							/>
						</BaseControl>
					</Fragment>
				) : (
					<Fragment>
						<BaseControl
							label={ 'Color' }
						>
							<ColorPalette
								label={ 'Color' }
								value={ defaults.data.color }
								onChange={ value => changeData( 'color', value ) }
							/>
						</BaseControl>

						<HorizontalRule/>

						<BaseControl
							label={ 'Background' }
						>
							<ColorPalette
								label={ 'Background' }
								value={ defaults.data.background }
								onChange={ value => changeData( 'background', value ) }
							/>
						</BaseControl>
					</Fragment>
				) }
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

				<RangeControl
					label={ __( 'Group Spacing' ) }
					value={ defaults.spacing }
					onChange={ value => changeConfig( blockName, { spacing: value }) }
					min={ 0 }
					max={ 50 }
				/>

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
