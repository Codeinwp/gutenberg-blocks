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
import { faIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/review', {
	title: __( 'Product Review' ),
	description: __( 'Turn your posts into smart reviews with ratings and generate leads with a performing review block.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'product',
		'review',
		'stars'
	],
	attributes,
	supports: {
		html: false
	},
	edit,
	save: () => null
});
