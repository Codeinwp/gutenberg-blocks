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
			<div className="wp-block-themeisle-blocks-business-hours__container">
				<div className="wp-block-themeisle-blocks-business-hours__container__title">
					<RichText.Content
						value={ attributes.title }
						tagName="span"
					/>
				</div>

				<div className="wp-block-themeisle-blocks-business-hours__container__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
};

export default Save;
