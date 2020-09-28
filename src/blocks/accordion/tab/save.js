import { Icon, chevronRight } from '@wordpress/icons';

const { RichText } = wp.blockEditor;


const Save = ({
	attributes
}) => {
	const titleStyle = {
		color: attributes.titleColor,
		fontSize: attributes.titleFontSize
	};

	const contentStyle = {
		color: attributes.contentColor,
		fontSize: attributes.contentFontSize
	};

	console.log( attributes.id );

	const ratio = 36 / 20;
	const size = attributes.titleFontSize * ratio || 36;
	console.log( size );

	return (
		<div
			className="wp-block-themeisle-blocks-accordion-block-tab"
			style={{
				backgroundColor: attributes.titleBackgroundColor
			}}
		>
			<input type="checkbox" id={ attributes.id } class="wp-block-themeisle-blocks-accordion-block-tab-toggle"/>

			<div className="wp-block-themeisle-blocks-accordion-block-tab-title">
				<Icon
					icon={ chevronRight }
					style={{ fill: attributes.titleColor }}
					size={ size }
				/>
				<RichText.Content
					tagName="label"
					className="wp-block-themeisle-blocks-accordion-block-tab-label"
					htmlFor={ attributes.id }
					value={ attributes.title }
					style={
						{ ...titleStyle }
					}
				/>
			</div>
			<div
				className="wp-block-themeisle-blocks-accordion-block-tab-content"
				style={{
					backgroundColor: attributes.contentBackgroundColor
				}}
			>
				<RichText.Content
					tagName="p"
					value={ attributes.content }
					style={
						{ ...contentStyle }
					}
				/>
			</div>
		</div>
	);
};

export default Save;
