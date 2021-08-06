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
				<form method="POST" className="wp-block-themeisle-blocks-contact-form__container">

					<div className="wp-block-themeisle-blocks-business-contact-form__container__content">
						<InnerBlocks
							allowedBlocks={ [
								'themeisle-blocks/contact-form-item'
							] }
							template={ [
								[
									'themeisle-blocks/contact-form-item',
									{
										label: __( 'First Name', 'otter-blocks' ),
										placeholder: __( 'Add your first name...', 'otter-blocks' ),
										type: 'text'
									}
								],
								[
									'themeisle-blocks/contact-form-item',
									{
										label: __( 'Last Name', 'otter-blocks' ),
										placeholder: __( 'Add your last name...', 'otter-blocks' ),
										type: 'text'
									}
								],
								[
									'themeisle-blocks/contact-form-item',
									{
										label: __( 'Email', 'otter-blocks' ),
										placeholder: __( 'Add your email...', 'otter-blocks' ),
										type: 'email',
										required: true
									}
								],
								[
									'themeisle-blocks/contact-form-item',
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
						className="wp-block-themeisle-blocks-contact-form__container__submit"
						type="button"
					>
						{ __( 'Submit', 'otter-blocks' ) }
					</button>
				</form>
			</div>
		</Fragment>
	);
};

export default Edit;
