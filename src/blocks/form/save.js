/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

const Save = ({
	attributes,
	className
}) => {
	return (
		<div
			className={ classnames( className, {'has-captcha': attributes.hasCaptcha }) }
			id={ attributes.id }
			data-email-subject={ attributes.subject }
			data-option-name={ attributes.optionName }
		>
			<div className={'wp-block-themeisle-blocks-form__container'}>
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
