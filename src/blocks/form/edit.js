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
		'themeisle-blocks/form-input',
		{
			label: __( 'Message', 'otter-blocks' ),
			type: 'textarea'
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
					<div className="wp-block-themeisle-blocks-business-form__container__content">
						<InnerBlocks
							template={ TEMPLATE }
						/>
					</div>

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
