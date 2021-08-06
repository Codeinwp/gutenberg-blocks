import {
	InnerBlocks
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Save = ({ attributes, className }) => {
	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			<form method="POST" className="wp-block-themeisle-blocks-contact-form__container">

				<div className="wp-block-themeisle-blocks-business-contact-form__container__content">
					<InnerBlocks.Content />
				</div>
				<button
					className="wp-block-themeisle-blocks-contact-form__container__submit"
					type="button"
				>
					{ __( 'Submit', 'otter-blocks' ) }
				</button>
			</form>
		</div>
	);
};

export default Save;
