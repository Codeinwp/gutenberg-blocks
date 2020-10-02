import { Icon, chevronRight } from '@wordpress/icons';

const { RichText } = wp.blockEditor;

const { InnerBlocks } = wp.blockEditor;
import classnames from 'classnames';


const Save = ({
	attributes,
	className
}) => {

	const ratio = 36 / 20;

	let titleStyle;
	let tabStyle;
	let iconStyle;
	let iconSize = 36;
	let iconStylePosition = 'default';


	if ( attributes.parentAttributes ) {
		titleStyle = {
			color: attributes.parentAttributes.tabsTitleColor,
			fontSize: attributes.parentAttributes.tabsTitleFontSize + 'px'
		};

		tabStyle = {
			border: 'solid ' + attributes.parentAttributes.tabsBorderSize + 'px',
			borderColor: attributes.parentAttributes.tabsBorderColor,
			borderRadius: attributes.parentAttributes.tabsBorderRadius + 'px',
			marginBottom: attributes.parentAttributes.tabsGap + 'px'
		};

		iconStyle = {
			fill: attributes.parentAttributes.tabsTitleColor
		};

		iconSize =  attributes.parentAttributes.tabsTitleFontSize * ratio || iconSize;
		iconStylePosition =  attributes.parentAttributes.iconStyle || iconStylePosition;
	}

	return (
		<div
			className={ className }
			id={ attributes.id }
			style={
				{ ...tabStyle }
			}
		>
			<input type="checkbox" id={ attributes.htmlFor } class="wp-block-themeisle-blocks-accordion-block-tab-toggle"/>

			<label
				className="wp-block-themeisle-blocks-accordion-block-tab-title"
				style={{
					backgroundColor: attributes.titleBackgroundColor
				}}
				htmlFor={ attributes.htmlFor }
			>
				{ ( 'default' === iconStylePosition ) && (
					<Icon
						icon={ chevronRight }
						style={{ ...iconStyle }}
						size={ iconSize }
						className="wp-block-themeisle-blocks-accordion-block-tab-title__icon__start"
					/>
				)}
				<RichText.Content
					tagName="p"
					className={
						classnames( 'wp-block-themeisle-blocks-accordion-block-tab-label', {'no-front-icon': 'default' !== iconStylePosition})
					}
					
					value={ attributes.title }
					style={{
						...titleStyle,
						backgroundColor: attributes.titleBackgroundColor
					}}
				/>
				{ ( 'end' === iconStylePosition ) && (
					<Icon
						icon={ chevronRight }
						style={{ ...iconStyle }}
						size={ iconSize }
						className="wp-block-themeisle-blocks-accordion-block-tab-title__icon__end"
					/>
				)}
			</label>
			<div
				className="wp-block-themeisle-blocks-accordion-block-tab-content"
				style={{
					backgroundColor: attributes.contentBackgroundColor
				}}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
