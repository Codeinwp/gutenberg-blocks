/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/block-editor';

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

const TEMPLATE = [
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
];

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
				<div className="wp-block-themeisle-blocks-form__container">
					<InnerBlocks
						template={ TEMPLATE }
					/>

					<div className="wp-block-button">
						<button className="wp-block-button__link">
							{ __( 'Submit', 'otter-blocks' ) }
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
