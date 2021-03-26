/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
	SelectControl
} = wp.components;

/**
 * Internal dependencies
 */
import GoogleFontsControl from '../../../components/google-fonts-control/index.js';
import SizingControl from '../../../components/sizing-control/index.js';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	const changeFontFamily = value => {
		if ( ! value ) {
			setAttributes({
				fontFamily: undefined,
				fontVariant: undefined,
				fontStyle: undefined
			});
		} else {
			setAttributes({
				fontFamily: value,
				fontVariant: 'normal',
				fontStyle: 'normal'
			});
		}
	};

	const changePadding = ( type, value ) => {
		if ( 'top' === type || 'bottom' === type ) {
			setAttributes({ paddingTopBottom: value });
		}

		if ( 'right' === type || 'left' === type ) {
			setAttributes({ paddingLeftRight: value });
		}
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Spacing' ) }
			>
				<SizingControl
					label={ __( 'Padding' ) }
					min={ 0 }
					max={ 100 }
					onChange={ changePadding }
					options={ [
						{
							label: __( 'Top' ),
							type: 'top',
							value: attributes.paddingTopBottom
						},
						{
							label: __( 'Right' ),
							type: 'right',
							value: attributes.paddingLeftRight
						},
						{
							label: __( 'Bottom' ),
							type: 'bottom',
							value: attributes.paddingTopBottom
						},
						{
							label: __( 'Left' ),
							type: 'left',
							value: attributes.paddingLeftRight
						}
					] }
				/>

				<RangeControl
					label={ __( 'Spacing' ) }
					value={ attributes.spacing }
					onChange={ e => setAttributes({ spacing: e }) }
					min={ 0 }
					max={ 50 }
				/>

				<SelectControl
					label={ __( 'Collapse On' ) }
					value={ attributes.collapse }
					options={ [
						{ label: __( 'None' ), value: 'collapse-none' },
						{ label: __( 'Desktop' ), value: 'collapse-desktop' },
						{ label: __( 'Tablet' ), value: 'collapse-tablet' },
						{ label: __( 'Mobile' ), value: 'collapse-mobile' }
					] }
					onChange={ e => setAttributes({ collapse: e }) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Typography Settings' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Font Size' ) }
					value={ attributes.fontSize }
					onChange={ e => setAttributes({ fontSize: e }) }
					min={ 0 }
					max={ 50 }
				/>

				<GoogleFontsControl
					label={ __( 'Font Family' ) }
					value={ attributes.fontFamily }
					onChangeFontFamily={ changeFontFamily }
					valueVariant={ attributes.fontVariant }
					onChangeFontVariant={ e => setAttributes({ fontVariant: e }) }
					valueStyle={ attributes.fontStyle }
					onChangeFontStyle={ e => setAttributes({ fontStyle: e }) }
					valueTransform={ attributes.textTransform }
					onChangeTextTransform={ e => setAttributes({ textTransform: e }) }
				/>

				<RangeControl
					label={ __( 'Line Height' ) }
					value={ attributes.lineHeight }
					onChange={ e => setAttributes({ lineHeight: e }) }
					min={ 0 }
					max={ 200 }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
