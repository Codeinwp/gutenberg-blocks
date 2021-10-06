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
			<div className="otter-bh__container">
				<div className="otter-bh__title">
					<RichText.Content
						value={ attributes.title }
						tagName="span"
					/>
				</div>

				<div className="otter-bh__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

export default Save;
