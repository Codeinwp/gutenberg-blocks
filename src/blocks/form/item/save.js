import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Save = ({ attributes, className}) => {
	return (
		<div className={className} id={attributes.id}>
			<label
				className={
					'wp-block-themeisle-blocks-form-input-label'
				}
			>
				<RichText.Content
					placeholder={__( 'Add field name', 'otter-blocks' )}
					className={classnames({
						'is-required': attributes.required
					}, 'wp-block-themeisle-blocks-form-input-label__label' )}
					value={attributes.label}
					tagName="div"
				/>

				{'textarea' !== attributes.type ? (
					<input
						type={ attributes.type }
						name={ attributes.id }
						className={
							'wp-block-themeisle-blocks-form-input-label__input'
						}
						required={ attributes.required }
						placeholder={attributes.placeholder}
					/>
				) : (
					<textarea
						type={ attributes.type }
						name={ attributes.id }
						required={ attributes.required }
						className={
							'wp-block-themeisle-blocks-form-input-label__input'
						}
						placeholder={attributes.placeholder}
					/>
				)}
			</label>
		</div>
	);
};

export default Save;
