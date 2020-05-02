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
import { postsIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/posts-grid', {
	title: __( 'Posts' ),
	description: __( 'Display a list of your most recent posts in a beautiful layout.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'posts',
		'grid',
		'news'
	],
	attributes,
	example: {},
	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},
	edit,
	save: () => null
});
