/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	RichText
} from '@wordpress/block-editor';

const Save = ({
	attributes,
	className
}) => {
	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			<div className="ti_bh__container">
				<div className="ti_bh__title">
					<RichText.Content
						value={ attributes.title }
						tagName="span"
					/>
				</div>

				<div className="ti_bh__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

export default Save;
