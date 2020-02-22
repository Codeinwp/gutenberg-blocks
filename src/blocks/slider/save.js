/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;

import SliderControls from './components/slider-controls.js';

const Save = ({
	attributes,
	className
}) => {
	return (
		<div
			id={ attributes.id }
			className={ classnames(
				'wp-block-themeisle-blocks-slider',
				'glide',
				className
			) }
			data-per-view={ attributes.perView }
			data-gap={ attributes.gap }
			data-peek={ attributes.peek }
			data-autoplay={ attributes.autoplay }
			data-height={ `${ attributes.height }px` }
		>
			<div className="glide__track" data-glide-el="track">
				<div className="glide__slides">
					{ attributes.images.map( image => {
						return (
							<div
								className="wp-block-themeisle-blocks-slider-item-wrapper glide__slide"
								tabIndex="0"
							>
								<figure>
									<img
										key={ image.id }
										className="wp-block-themeisle-blocks-slider-item"
										src={ image.url }
										alt={ image.alt }
										title={ image.alt }
										data-id={ image.id }
									/>

									{ ! RichText.isEmpty( image.caption ) && (
										<RichText.Content
											tagName="figcaption"
											value={ image.caption }
										/>
									) }
								</figure>
							</div>
						);
					}) }
				</div>

				<SliderControls attributes={ attributes } />
			</div>
		</div>
	);
};

export default Save;
