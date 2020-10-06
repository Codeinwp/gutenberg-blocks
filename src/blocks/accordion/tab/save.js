import { Icon, chevronRight } from '@wordpress/icons';

const { RichText } = wp.blockEditor;

const { InnerBlocks } = wp.blockEditor;
import classnames from 'classnames';


const Save = ({
	attributes,
	className
}) => {

	const ratio = 36 / 20;
	
	let iconSize = 36;
	let iconStylePosition = 'default';

	if ( attributes.parentAttributes ) {

		iconSize =  attributes.parentAttributes.tabsTitleFontSize * ratio || iconSize;
		iconStylePosition =  attributes.parentAttributes.iconStyle || iconStylePosition;
	}

	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			<input type="checkbox" id={ attributes.htmlFor } class="wp-block-themeisle-blocks-accordion-block-tab-toggle"/>

			<label
				className="wp-block-themeisle-blocks-accordion-block-tab-title"
				htmlFor={ attributes.htmlFor }
			>
				{ ( 'default' === iconStylePosition ) && (
					<Icon
						icon={ chevronRight }
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
				/>
				{ ( 'end' === iconStylePosition ) && (
					<Icon
						icon={ chevronRight }
						size={ iconSize }
						className="wp-block-themeisle-blocks-accordion-block-tab-title__icon__end"
					/>
				)}
			</label>
			<div
				className="wp-block-themeisle-blocks-accordion-block-tab-content"
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
