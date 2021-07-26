/* eslint-disable no-unused-vars */
/** @jsx jsx */

import { __ } from '@wordpress/i18n';

import {
	Fragment,
	useEffect,
	useState,
	useRef
} from '@wordpress/element';

import { RichText } from '@wordpress/block-editor';


/**
 * Internal dependencies
 */
import Inspector from './inspector.js';

import {
	css,
	jsx
} from '@emotion/react';

import { blockInit } from '../../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';

const Edit = ({ attributes, setAttributes, clientId, className }) => {

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	const baseCSS = css`
		background-color: ${ attributes.backgroundColor };
		border-radius: ${ attributes.borderRadius }px;
	`;

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes }/>
			<div css={ baseCSS } className={ className } id={ attributes.id }>
				<div css={ css`color: ${ attributes.labelColor }` } className="wp-block-themeisle-blocks-business-hours-item-label">
					<RichText
						placeholder={ __( 'Add day', 'otter-blocks' ) }
						value={ attributes.label }
						onChange={ label => {
							setAttributes({ label });
						} }
						tagName="div"
					/>
				</div>
				<div css={ css`color: ${ attributes.timeColor }`} className="wp-block-themeisle-blocks-business-hours-item-time">
					<RichText
						placeholder={ __( 'Add time interval', 'otter-blocks' ) }
						value={ attributes.time }
						onChange={ time => {
							setAttributes({ time });
						} }
						tagName="div"
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
