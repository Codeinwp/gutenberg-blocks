/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import attributes from './attributes.js';
import deprecated from './deprecated.js';
import transforms from './transforms.js';
import edit from './edit.js';
import save from './save.js';

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
	attributes,
	example: {
		attributes: {
			id: 'wp-block-themeisle-blocks-slider-example',
			perView: 2,
			images: [
				{
					url: 'https://s.w.org/images/core/5.3/Glacial_lakes%2C_Bhutan.jpg'
				},
				{
					url: 'https://s.w.org/images/core/5.3/Sediment_off_the_Yucatan_Peninsula.jpg'
				}
			]
		}
	},
	deprecated,
	transforms,
	supports: {
		align: [ 'wide', 'full' ]
	},
	edit,
	save
});
