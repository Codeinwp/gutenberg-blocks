/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';

const Save = ({
	attributes,
	className
}) => {
	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			<div className="ti_bhi__label">
				<RichText.Content
					value={ attributes.label }
					tagName="span"
				/>
			</div>

			<div className="ti_bhi__time">
				<RichText.Content
					value={ attributes.time }
					tagName="span"
				/>
			</div>
		</div>
	);
};

export default Save;
