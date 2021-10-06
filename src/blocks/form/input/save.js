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
				className="ti-form-input-label"
			>
				<RichText.Content
					value={ attributes.label }
					className="ti-form-input-label__label"
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
				className="ti-form-input"
			/>
		</div>
	);
};

export default Save;
