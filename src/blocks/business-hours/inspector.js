/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	RangeControl,
	SelectControl
} from '@wordpress/components';

import {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

const Inspector = ({ attributes, setAttributes }) => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
				initialOpen={ true }
			>
				<RangeControl
					label={ __( 'Spacing', 'otter-blocks' ) }
					value={ attributes.gap }
					onChange={ value => setAttributes({ gap: Number( value )})}
					min={ 0 }
					max={ 60 }
				/>
				<RangeControl
					label={ __( 'Item Height', 'otter-blocks' ) }
					value={ attributes.heightItem }
					onChange={ value => setAttributes({ heightItem: Number( value )})}
					min={ 0 }
					max={ 60 }
				/>
				<RangeControl
					label={ __( 'Title Font Size', 'otter-blocks' ) }
					value={ attributes.titleFontSize }
					onChange={ value => setAttributes({ titleFontSize: Number( value )})}
					min={ 0 }
					max={ 60 }
				/>
				<RangeControl
					label={ __( 'Items Font Size', 'otter-blocks' ) }
					value={ attributes.itemsFontSize }
					onChange={ value => setAttributes({ itemsFontSize: Number( value )})}
					min={ 0 }
					max={ 60 }
				/>
				<RangeControl
					label={ __( 'Border Width', 'otter-blocks' ) }
					value={ attributes.borderWidth }
					onChange={ value => setAttributes({ borderWidth: Number( value )})}
					min={ 0 }
					max={ 60 }
				/>
				<RangeControl
					label={ __( 'Border Radius', 'otter-blocks' ) }
					value={ attributes.borderRadius }
					onChange={ value => setAttributes({ borderRadius: Number( value )})}
					min={ 0 }
					max={ 60 }
				/>
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Color', 'otter-blocks' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: attributes.titleColor,
						onChange: titleColor => setAttributes({ titleColor }),
						label: __( 'Title', 'otter-blocks' )
					},
					{
						value: attributes.backgroundColor,
						onChange: backgroundColor => setAttributes({ backgroundColor }),
						label: __( 'Background', 'otter-blocks' )
					},
					{
						value: attributes.borderColor,
						onChange: borderColor => setAttributes({ borderColor }),
						label: __( 'Border', 'otter-blocks' )
					}
				] }
			>
				<ContrastChecker
					{ ...{
						textColor: attributes.backgroundColor,
						backgroundColor: attributes.titleColor
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default Inspector;
