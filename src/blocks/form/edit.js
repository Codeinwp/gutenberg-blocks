/* eslint-disable no-unused-vars */
/** @jsx jsx */

/**
 * External dependencies
 */
import {
	css,
	jsx
} from '@emotion/react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	RichText
} from '@wordpress/block-editor';

import {
	Button
} from '@wordpress/components';

import {
	Fragment,
	useEffect
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import { blockInit } from '../../helpers/block-utility.js';
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

	useEffect( () => {
		setAttributes({ url: themeisleGutenberg.form_url });
	}, [ themeisleGutenberg?.form_url ]);

	return (
		<Fragment>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				className={ className }
				id={ attributes.id }
			>
				<form method="POST" className="wp-block-themeisle-blocks-form__container">

					<div className="wp-block-themeisle-blocks-business-form__container__content">
						<InnerBlocks
							allowedBlocks={ [
								'themeisle-blocks/form-input'
							] }
							template={ [
								[
									'themeisle-blocks/form-input',
									{
										label: __( 'Name', 'otter-blocks' ),
										placeholder: __( 'Add your name...', 'otter-blocks' ),
										type: 'text'
									}
								],
								[
									'themeisle-blocks/form-input',
									{
										label: __( 'Email', 'otter-blocks' ),
										placeholder: __( 'Add your email...', 'otter-blocks' ),
										type: 'email',
										required: true
									}
								],
								[
									'themeisle-blocks/form-input',
									{
										label: __( 'Message', 'otter-blocks' ),
										placeholder: __( 'Add a message...', 'otter-blocks' ),
										type: 'textarea'
									}
								]
							] }
							renderAppender={ isSelected ? InnerBlocks.ButtonBlockAppender : '' }
						/>
					</div>
					<button
						className="wp-block-themeisle-blocks-form__container__submit"
					>
						{ __( 'Submit', 'otter-blocks' ) }
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default Edit;
