/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { RichText } from '@wordpress/block-editor';

const Save = ({
	attributes,
	className
}) => {
	return (
		<div className={ className } >
			<label
				for={ attributes.id }
				className="wp-block-themeisle-blocks-form-textarea-label"
			>
				<RichText.Content
					value={ attributes.label }
					className="wp-block-themeisle-blocks-form-textarea-label__label"
					tagName="span"
				/>

				{ attributes.isRequired && (
					<span class="required">{ __( '(required)', 'otter-blocks' ) }</span>
				) }
			</label>

			<textarea
				name={ attributes.mappedName }
				id={ attributes.id }
				required={ attributes.isRequired }
				placeholder={ attributes.placeholder }
				rows={ 10 }
				className="wp-block-themeisle-blocks-form-textarea-input"
			>
			</textarea>
		</div>
	);
};

export default Save;
