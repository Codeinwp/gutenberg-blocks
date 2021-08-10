import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const Save = ({ attributes, className}) => {

	const renderInput = type => {
		switch ( type ) {
		case 'textarea':
			return (
				<textarea
					type={ attributes.type }
					name={ attributes.id }
					required={ attributes.required }
					className={
						'wp-block-themeisle-blocks-form-input-label__input'
					}
					placeholder={attributes.placeholder}
				/>
			);

		default:
			return (
				<input
					type={ attributes.type }
					name={ attributes.id }
					className={
						'wp-block-themeisle-blocks-form-input-label__input'
					}
					required={ attributes.required }
					placeholder={attributes.placeholder}
				/>
			);
		}
	};

	return (
		<div className={ classnames( className, { 'is-checkbox': 'checkbox' === attributes.type }) } id={attributes.id}>
			<label
				for={ attributes.id }
				className={
					classnames(
						'wp-block-themeisle-blocks-form-input-label'
					)
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
			</label>
			{
				renderInput( attributes.type )
			}
		</div>
	);
};

export default Save;
