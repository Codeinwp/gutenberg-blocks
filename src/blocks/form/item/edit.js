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

import { RichText } from '@wordpress/block-editor';

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

	const renderInput = type => {
		switch ( type ) {
		case 'textarea':
			return (
				<textarea
					type={ attributes.type }
					name={ attributes.id }
					required={ attributes.required }
					className={
						'wp-block-themeisle-blocks-form-input-label__input'
					}
					placeholder={attributes.placeholder}
				/>
			);

		default:
			return (
				<input
					type={ attributes.type }
					name={ attributes.id }
					className={
						'wp-block-themeisle-blocks-form-input-label__input'
					}
					required={ attributes.required }
					placeholder={attributes.placeholder}
				/>
			);
		}
	};

	return (
		<Fragment>
			<Inspector attributes={attributes} setAttributes={setAttributes} />

			<div className={ classnames( className, { 'is-checkbox': 'checkbox' === attributes.type }) } id={attributes.id}>
				<label
					for={ attributes.id }
					className={
						classnames(
							'wp-block-themeisle-blocks-form-input-label'
						)
					}
				>
					<RichText
						placeholder={__( 'Add field name', 'otter-blocks' )}
						className={classnames({
							'is-required': attributes.required
						}, 'wp-block-themeisle-blocks-form-input-label__label' )}
						value={attributes.label}
						onChange={( label ) => {
							setAttributes({ label });
						}}
						tagName="div"
					/>
				</label>
				{
					renderInput( attributes.type )
				}
			</div>
		</Fragment>
	);
};

export default Edit;
