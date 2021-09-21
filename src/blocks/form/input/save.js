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
				className="wp-block-themeisle-blocks-form-input-label"
			>
				<RichText.Content
					value={ attributes.label }
					className="wp-block-themeisle-blocks-form-input-label__label"
					tagName="span"
				/>

				{ attributes.isRequired && (
					<span class="required">{ __( '(required)', 'otter-blocks' ) }</span>
				) }
			</label>

			<input
				type={ attributes.type }
				name={ attributes.mappedName }
				id={ attributes.id }
				required={ attributes.isRequired }
				placeholder={ attributes.placeholder }
				className="wp-block-themeisle-blocks-form-input-input"
			/>
		</div>
	);
};

export default Save;
