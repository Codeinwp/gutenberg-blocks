const { RichText } = wp.blockEditor;

import classnames from 'classnames';


const Save = ({
	attributes,
	className
}) => {

	let iconStylePosition = 'default';

	if ( attributes.parentAttributes ) {
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
				<div className={
					classnames( 'wp-block-themeisle-blocks-accordion-block-tab-title__icon__end', { 'show': 'start' === iconStylePosition  })
				}>
					<div className={
						classnames( 'wp-block-themeisle-blocks-accordion-block-tab-title__icon__end__1' )
					}></div>
					<div className={
						classnames( 'wp-block-themeisle-blocks-accordion-block-tab-title__icon__end__2' )
					}></div>
				</div>
				<RichText.Content
					tagName="p"
					className={
						classnames( 'wp-block-themeisle-blocks-accordion-block-tab-label' )
					}

					value={ attributes.title }
				/>
				<div className={
					classnames( 'wp-block-themeisle-blocks-accordion-block-tab-title__icon__end', { 'show': 'default' === iconStylePosition  })
				}>
					<div className={
						classnames( 'wp-block-themeisle-blocks-accordion-block-tab-title__icon__end__1' )
					}></div>
					<div className={
						classnames( 'wp-block-themeisle-blocks-accordion-block-tab-title__icon__end__2' )
					}></div>
				</div>
			</label>
			<div
				className="wp-block-themeisle-blocks-accordion-block-tab-content"
			>
				<RichText.Content
					tagName="p"
					className={
						classnames( 'wp-block-themeisle-blocks-accordion-block-tab-content__input' )
					}

					value={ attributes.content }
				/>
			</div>
		</div>
	);
};

export default Save;
