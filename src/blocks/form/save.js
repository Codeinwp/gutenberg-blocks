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
			<form method="POST" className="wp-block-themeisle-blocks-form__container">

				<div className="wp-block-themeisle-blocks-business-form__container__content">
					<InnerBlocks.Content />
				</div>
				<button
					type="submit"
					className="wp-block-themeisle-blocks-form__container__submit"
				>
					{ __( 'Submit', 'otter-blocks' ) }
				</button>
			</form>
		</div>
	);
};

export default Save;
