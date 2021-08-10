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
	Placeholder,
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


const templates = {
	contact: [
		[
			'core/paragraph',
			{
				content: __( 'Contact Us!', 'otter-blocks' ),
				align: 'center',
				style: { typography: { fontSize: '2em'} }
			}
		],
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
		],
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Accept the terms & conditions', 'otter-blocks' ),
				type: 'checkbox'
			}
		]
	],
	feedback: [
		[
			'core/paragraph',
			{
				content: __( 'Gives us a feedback!', 'otter-blocks' ),
				align: 'center',
				style: { typography: { fontSize: '2em'} }
			}
		],
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
				label: __( 'Feedback', 'otter-blocks' ),
				placeholder: __( 'Add a message...', 'otter-blocks' ),
				type: 'textarea'
			}
		],
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Accept the terms & conditions', 'otter-blocks' ),
				type: 'checkbox'
			}
		]
	],
	newsletter: [
		[
			'core/paragraph',
			{
				content: __( 'Subscribe to our newsletter!', 'otter-blocks' ),
				align: 'center',
				style: { typography: { fontSize: '2em'} }
			}
		],
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
				label: __( 'Accept the terms & conditions', 'otter-blocks' ),
				type: 'checkbox'
			}
		]
	]
};

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
				{
					attributes.templateType ? (
						<form method="POST" className="wp-block-themeisle-blocks-form__container">

							<div className="wp-block-themeisle-blocks-business-form__container__content">
								<InnerBlocks
									allowedBlocks={ [
										'themeisle-blocks/form-input',
										'core/paragraph'
									] }
									template={ templates[ attributes.templateType ] }
									renderAppender={ isSelected ? InnerBlocks.ButtonBlockAppender : '' }
								/>

							</div>
							<button
								className="wp-block-themeisle-blocks-form__container__submit"
							>
								{ __( 'Submit', 'otter-blocks' ) }
							</button>
						</form>
					) : (
						<Fragment>
							<Placeholder>
								{
									Object.keys( templates ).map( templateName => {
										return (
											<Button
												isPrimary
												onClick={ () => {
													setAttributes({ templateType: templateName});
												}}
											>
												{ __( templateName, 'otter-blocks' ) }
											</Button>
										);
									})
								}
							</Placeholder>
						</Fragment>
					)
				}
			</div>
		</Fragment>
	);
};

export default Edit;
