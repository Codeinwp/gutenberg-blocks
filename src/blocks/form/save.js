/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

const Save = ({
	attributes,
	className
}) => {

	const hasIntegrationActive = attributes.provider && attributes.apiKey && attributes.listId;

	return (
		<div
			className={ classnames( className, { 'is-subscription': hasIntegrationActive && 'subscribe' === attributes.action  }) }
			id={ attributes.id }
			data-email-subject={ attributes.subject }
			data-option-name={ attributes.optionName }
		>
			<div className="wp-block-themeisle-blocks-form__container">
				<InnerBlocks.Content />

				<div className="wp-block-button">
					<button className="wp-block-button__link">
						{ __( 'Submit', 'otter-blocks' ) }
					</button>
				</div>
			</div>
		</div>
	);
};

export default Save;
