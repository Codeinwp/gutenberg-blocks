/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import edit from './edit.js';
import attributes from './attributes.js';

registerBlockType( 'themeisle-blocks/lottie', {
	title: __( 'Lottie' ),
	description: __( 'Embed Lottie content' ),
	category: 'themeisle-blocks',
	keywords: [
		'embed',
		'lottie',
		'animation'
	],
	attributes,
	edit,
	save: () => null
});
