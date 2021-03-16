/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	RangeControl,
	SelectControl
} = wp.components;

const { Fragment } = wp.element;

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
				title={ __( 'Spacing' ) }
			>
				<SizingControl
					label={ __( 'Button Padding' ) }
					min={ 0 }
					max={ 100 }
					onChange={ ( key, value ) => changeConfig( blockName, { [key]: value }) }
					options={ [
						{
							label: __( 'Top' ),
							type: 'paddingTopBottom',
							value: defaults.paddingTopBottom
						},
						{
							label: __( 'Right' ),
							type: 'paddingLeftRight',
							value: defaults.paddingLeftRight
						},
						{
							label: __( 'Bottom' ),
							type: 'paddingTopBottom',
							value: defaults.paddingTopBottom
						},
						{
							label: __( 'Left' ),
							type: 'paddingLeftRight',
							value: defaults.paddingLeftRight
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
						{ label: __( 'None' ), value: 'collapse-none' },
						{ label: __( 'Desktop' ), value: 'collapse-desktop' },
						{ label: __( 'Tablet' ), value: 'collapse-tablet' },
						{ label: __( 'Mobile' ), value: 'collapse-mobile' }
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
