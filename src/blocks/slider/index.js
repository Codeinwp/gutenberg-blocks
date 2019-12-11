/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	filter,
	every
} = lodash;

const {
	createBlock,
	registerBlockType
} = wp.blocks;

const {
	Path,
	SVG
} = wp.components;

const { RichText } = wp.blockEditor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

import Editor from './components/Editor.js';

registerBlockType( 'themeisle-blocks/slider', {
	title: __( 'Slider' ),
	description: __( 'Minimal image slider to showcase beautiful images.' ),
	icon: 'images-alt2',
	category: 'themeisle-blocks',
	keywords: [
		'slider',
		'gallery',
		'carousel'
	],
	attributes: {
		id: {
			type: 'string'
		},
		images: {
			type: 'array',
			default: [],
			source: 'query',
			selector: '.wp-block-themeisle-blocks-slider-item-wrapper',
			query: {
				id: {
					type: 'number',
					source: 'attribute',
					selector: 'img',
					attribute: 'data-id'
				},
				url: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'src'
				},
				alt: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'alt',
					default: ''
				},
				caption: {
					type: 'string',
					source: 'html',
					selector: 'figcaption',
					default: ''
				}
			}
		},
		perView: {
			type: 'number',
			default: 1
		},
		gap: {
			type: 'number',
			default: 0
		},
		peek: {
			type: 'number',
			default: 0
		},
		autoplay: {
			type: 'boolean',
			default: true
		},
		height: {
			type: 'number',
			default: 400
		}
	},

	transforms: {
		from: [
			{
				type: 'block',
				isMultiBlock: true,
				blocks: [ 'core/image' ],
				transform: ( attributes ) => {
					let { align } = attributes[ 0 ];

					align = every( attributes, [ 'align', align ]) ? align : undefined;

					const validImages = filter( attributes, ({ url }) => url );

					return createBlock( 'themeisle-blocks/slider', {
						images: validImages.map( ({ id, url, alt, caption }) => ({
							id,
							url,
							alt,
							caption
						}) ),
						align
					});
				}
			},
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ({ images, align }) => {
					return createBlock( 'themeisle-blocks/slider', {
						images: images.map( ({ id, url, alt, caption }) => ({
							id,
							url,
							alt,
							caption
						}) ),
						align
					});
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/image' ],
				transform: ({ images, align }) => {
					if ( 0 < images.length ) {
						return images.map( ({ id, url, alt, caption }) => createBlock( 'core/image', {
							id,
							url,
							alt,
							caption,
							align
						}) );
					}

					return createBlock( 'core/image', { align });
				}
			},
			{
				type: 'block',
				blocks: [ 'core/gallery' ],
				transform: ({ images, align }) => {
					return createBlock( 'core/gallery', {
						images: images.map( ({ id, url, alt, caption }) => ({
							id,
							url,
							alt,
							caption
						}) ),
						align
					});
				}
			}
		]
	},

	supports: {
		align: [ 'wide', 'full' ]
	},

	edit: Editor,

	save: props => {
		const {
			id,
			images,
			perView,
			gap,
			peek,
			autoplay,
			height
		} = props.attributes;

		return (
			<div
				id={ id }
				className={ classnames(
					'wp-block-themeisle-blocks-slider',
					'glide',
					props.className
				) }
				data-per-view={ perView }
				data-gap={ gap }
				data-peek={ peek }
				data-autoplay={ autoplay }
			>
				<div className="glide__track" data-glide-el="track">
					<div
						className="glide__slides"
						style={{
							height: `${ height }px`
						}}
					>
						{ images.map( image => {
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
											<RichText.Content tagName="figcaption" value={ image.caption } />
										) }
									</figure>
								</div>
							);
						}) }
					</div>

					<div className="glide__arrows" data-glide-el="controls">
						<button className="glide__arrow glide__arrow--left" data-glide-dir="<">
							<SVG
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 100 100"
							>
								<Path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></Path>
							</SVG>
						</button>
						<button className="glide__arrow glide__arrow--right" data-glide-dir=">">
							<SVG
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 100 100"
							>
								<Path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></Path>
							</SVG>
						</button>
					</div>

					<div className="glide__bullets" data-glide-el="controls[nav]">
						{ images.map( ( image, index ) => (
							<button className="glide__bullet" data-glide-dir={ `=${ index }` }></button>
						) ) }
					</div>
				</div>
			</div>
		);
	}
});
