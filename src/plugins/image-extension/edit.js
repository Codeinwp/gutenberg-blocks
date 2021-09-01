/** @jsx jsx */
/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import hexToRgba from 'hex-rgba';

import {
	css,
	jsx
} from '@emotion/react';

import {
	PanelBody,
	RangeControl,
	ToggleControl
} from '@wordpress/components';

import { ColorPalette, InspectorControls } from '@wordpress/block-editor';
import ColorBaseControl from '../../components/color-base-control/index.js';
import ControlPanelControl from '../../components/control-panel-control/index.js';

import {
	Fragment
} from '@wordpress/element';

const Edit = ({
	BlockEdit,
	props
}) => {

	const { attributes, setAttributes } = props;

	const changeBoxShadowColor = value => {
		setAttributes({ boxShadowColor: value });
	};

	const changeBoxShadow = value => {
		setAttributes({ boxShadow: value });
	};

	const changeBoxShadowColorOpacity = value => {
		setAttributes({ boxShadowColorOpacity: value });
	};

	const changeBoxShadowBlur = value => {
		setAttributes({ boxShadowBlur: value });
	};

	const changeBoxShadowHorizontal = value => {
		setAttributes({ boxShadowHorizontal: value });
	};

	const changeBoxShadowVertical = value => {
		setAttributes({ boxShadowVertical: value });
	};

	const getShadowColor = () => {
		if ( attributes.boxShadowColor ) {
			if ( attributes.boxShadowColor.includes( '#' ) ) {
				return hexToRgba( attributes.boxShadowColor, attributes.boxShadowColorOpacity );
			}
			return attributes.boxShadowColor;
		}
		return hexToRgba( '#000000', attributes.boxShadowColorOpacity );
	};

	const style = css`
		img {
			box-shadow: ${ attributes.boxShadowHorizontal }px ${ attributes.boxShadowVertical }px ${ attributes.boxShadowBlur }px ${ getShadowColor() }
		}
	`;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Shadows', 'otter-blocks' ) }
					initialOpen={ false }
				>

					<ToggleControl
						label={ __( 'Shadow Properties', 'otter-blocks' ) }
						checked={ attributes.boxShadow }
						onChange={ changeBoxShadow }
					/>

					{ attributes.boxShadow && (
						<Fragment>

							<ColorBaseControl
								label={ __( 'Color', 'otter-blocks' ) }
								colorValue={ attributes.boxShadowColor }
							>
								<ColorPalette
									label={ __( 'Color', 'otter-blocks' ) }
									value={ attributes.boxShadowColor }
									onChange={ changeBoxShadowColor }
								/>
							</ColorBaseControl>

							<ControlPanelControl
								label={ __( 'Shadow Properties', 'otter-blocks' ) }
							>
								<RangeControl
									label={ __( 'Opacity', 'otter-blocks' ) }
									value={ attributes.boxShadowColorOpacity }
									onChange={ changeBoxShadowColorOpacity }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Blur', 'otter-blocks' ) }
									value={ attributes.boxShadowBlur }
									onChange={ changeBoxShadowBlur }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Horizontal', 'otter-blocks' ) }
									value={ attributes.boxShadowHorizontal }
									onChange={ changeBoxShadowHorizontal }
									min={ -100 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Vertical', 'otter-blocks' ) }
									value={ attributes.boxShadowVertical }
									onChange={ changeBoxShadowVertical }
									min={ -100 }
									max={ 100 }
								/>
							</ControlPanelControl>

						</Fragment>
					) }
				</PanelBody>
			</InspectorControls>

			{

				// TODO: Add block modifications
			}
			{ attributes.boxShadow ? (
				<div className="wp-block-themeisle-blocks-image-extension" css={style}>
					<BlockEdit { ...props } />
				</div>
			) : (
				<BlockEdit { ...props } />
			) }


		</Fragment>
	);
};

export default Edit;
