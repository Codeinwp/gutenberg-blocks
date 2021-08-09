/* eslint-disable no-unused-vars */
/** @jsx jsx */

/**
 * External dependencies
 */
import { css, jsx } from '@emotion/react';

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks, RichText } from '@wordpress/block-editor';

import { Fragment, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { blockInit } from '../../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId
}) => {

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	return (
		<Fragment>
			<Inspector attributes={attributes} setAttributes={setAttributes} />

			<div className={className} id={attributes.id}>
				<label
					className={
						'wp-block-themeisle-blocks-form-input-label'
					}
				>
					<RichText
						placeholder={__( 'Add field name', 'otter-blocks' )}
						className={classnames({
							'is-required': attributes.required
						})}
						value={attributes.label}
						onChange={( label ) => {
							setAttributes({ label });
						}}
						tagName="div"
					/>
					{'textarea' !== attributes.type ? (
						<input
							type={ attributes.type }
							name={ attributes.id }
							className={
								'wp-block-themeisle-blocks-form-input-label__input'
							}
							required={ attributes.required }
							placeholder={attributes.placeholder}
						/>
					) : (
						<textarea
							type={ attributes.type }
							name={ attributes.id }
							required={ attributes.required }
							className={
								'wp-block-themeisle-blocks-form-input-label__input'
							}
							placeholder={attributes.placeholder}
						/>
					)}
				</label>
			</div>
		</Fragment>
	);
};

export default Edit;
