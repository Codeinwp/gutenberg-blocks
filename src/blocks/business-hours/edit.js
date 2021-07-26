/* eslint-disable no-unused-vars */
/** @jsx jsx */

import { __ } from '@wordpress/i18n';

import {
	Fragment,
	useEffect,
	useState,
	useRef
} from '@wordpress/element';

import {
	css,
	jsx
} from '@emotion/react';

import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import { InnerBlocks } from '@wordpress/block-editor';

import { blockInit } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';

const Edit = ({ attributes, setAttributes, clientId, className, isSelected }) => {

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	const baseCSS = css`
		background-color: ${ attributes.backgroundColor };
		border-radius: ${ attributes.borderRadius }px;
		border-width: ${ attributes.borderWidth }px;
		border-color: ${ attributes.borderColor };
	`;

	const titleCSS = css`
		font-size: ${ attributes.titleFontSize }px;
		color: ${ attributes.titleColor }px;
	`;

	const contentCSS = css`
		div > div.block-editor-block-list__layout div + div {
			margin-bottom: ${ attributes.gap }px;
		}

		.wp-block-themeisle-blocks-business-hours-item {
			font-size: ${ attributes.itemsFontSize }px;
		}
	`;

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes }/>
			<div css={ baseCSS } className={className} id={ attributes.id }>
				<div css={ titleCSS } className="wp-block-themeisle-blocks-business-hours-title">
					<RichText
						placeholder={ __( 'Add title', 'otter-blocks' ) }
						value={ attributes.title }
						onChange={ title => {
							setAttributes({ title });
						} }
						tagName="div"
					/>
				</div>
				<div css={ contentCSS } className="wp-block-themeisle-blocks-business-hours-content">
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/business-hours-item' ] }
						template={ [ [ 'themeisle-blocks/business-hours-item' ] ] }
						renderAppender={ isSelected ? InnerBlocks.ButtonBlockAppender : '' }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
