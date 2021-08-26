/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/block-editor';

import {
	Fragment,
	useEffect
} from '@wordpress/element';

import {
	select
} from '@wordpress/data';

import {
	Button,
	Placeholder
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { blockInit } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import { contactIcon as icon } from '../../helpers/icons.js';


const TEMPLATES = {
	'contact': [
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Name', 'otter-blocks' ),
				type: 'text',
				isRequired: true
			}
		],
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Email', 'otter-blocks' ),
				type: 'email',
				isRequired: true
			}
		],
		[
			'themeisle-blocks/form-textarea',
			{
				label: __( 'Message', 'otter-blocks' )
			}
		],
		[
			'core/paragraph',
			{
				content: __( 'You agree to receive email communication from us by submitting this form and understand that your contact information will be stored with us.', 'otter-blocks' ),
				fontSize: 'extra-small'
			}
		]
	],
	'feedback': [
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Email', 'otter-blocks' ),
				type: 'email',
				isRequired: true
			}
		],
		[
			'themeisle-blocks/form-textarea',
			{
				label: __( 'Message', 'otter-blocks' )
			}
		],
		[
			'core/paragraph',
			{
				content: __( 'You agree to receive email communication from us by submitting this form and understand that your contact information will be stored with us.', 'otter-blocks' ),
				fontSize: 'extra-small'
			}
		]
	],
	'appointment': [
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Name', 'otter-blocks' ),
				type: 'text',
				isRequired: true
			}
		],
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Phone', 'otter-blocks' ),
				type: 'text',
				isRequired: true
			}
		],
		[
			'themeisle-blocks/form-input',
			{
				label: __( 'Email', 'otter-blocks' ),
				type: 'email',
				isRequired: true
			}
		],
		[
			'themeisle-blocks/form-textarea',
			{
				label: __( 'Message', 'otter-blocks' )
			}
		],
		[
			'core/paragraph',
			{
				content: __( 'You agree to receive email communication from us by submitting this form and understand that your contact information will be stored with us.', 'otter-blocks' ),
				fontSize: 'extra-small'
			}
		]
	],
	'custom': []
};

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId
}) => {
	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {
		if (  attributes.id && select( 'core/edit-widgets' ) ) {
			setAttributes({ optionName: `widget_${ attributes.id.slice( -8 ) }` });
		} else  if ( attributes.id && select( 'core/editor' )?.getCurrentPostId() ) {
			setAttributes({ optionName: `${ select( 'core/editor' ).getCurrentPostId() }_${ attributes.id.slice( -8 ) }` });
		}
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
				{
					attributes.templateType ? (
						<div className="wp-block-themeisle-blocks-form__container">
							<InnerBlocks
								template={ TEMPLATES[ attributes.templateType ] }
							/>

							<div className="wp-block-button">
								<button className="wp-block-button__link">
									{ __( 'Submit', 'otter-blocks' ) }
								</button>
							</div>
						</div>
					) : (
						<Placeholder
							label={ __( 'Select Form', 'otter-blocks' ) }
							instructions={ __( 'Select a form to start with, or make one yourself.', 'otter-blocks' ) }
							icon={ icon }
							isColumnLayout={ true }
						>
							<div className="wp-block-themeisle-blocks-form_placeholder">
								<Button
									isLarge
									isPrimary
									className="wp-block-themeisle-blocks-form_placeholder__button"
									onClick={ () => setAttributes({ templateType: 'contact' }) }
								>
									{__( 'Contact Form', 'otter-blocks' )}
								</Button>
								<Button
									isLarge
									isPrimary
									className="wp-block-themeisle-blocks-form_placeholder__button"
									onClick={ () => setAttributes({ templateType: 'feedback' }) }
								>
									{__( 'Feedback Form', 'otter-blocks' )}
								</Button>
								<Button
									isLarge
									isPrimary
									className="wp-block-themeisle-blocks-form_placeholder__button"
									onClick={ () => setAttributes({ templateType: 'appointment' }) }
								>
									{__( 'Appointment Form', 'otter-blocks' )}
								</Button>

							</div>
							<div className="wp-block-themeisle-layout-skipper">
								<Button
									isLink
									onClick={ () => setAttributes({ templateType: 'custom' }) }
								>
									{ __( 'Skip', 'otter-blocks' ) }
								</Button>
							</div>
						</Placeholder>
					)
				}
			</div>
		</Fragment>
	);
};

export default Edit;
