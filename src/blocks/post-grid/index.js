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

import { postsIcon } from '../../helpers/icons.js';

import Editor from './Components/Editor.js';

registerBlockType( 'themeisle-blocks/posts-grid', {
	title: __( 'Post Grid' ),
	description: __( 'Display a list of your most recent posts in a beautiful grid.' ),
	icon: postsIcon,
	category: 'themeisle-blocks',
	keywords: [
		'posts',
		'grid',
		'orbitfox'
	],
	attributes: {
		columns: {
			type: 'number',
			default: 3
		},
		categories: {
			type: 'string'
		},
		postsToShow: {
			type: 'number',
			default: 5
		},
		order: {
			type: 'string',
			default: 'desc'
		},
		orderBy: {
			type: 'string',
			default: 'date'
		},
		displayFeaturedImage: {
			type: 'boolean',
			default: true
		},
		displayCategory: {
			type: 'boolean',
			default: true
		},
		displayDate: {
			type: 'boolean',
			default: true
		},
		displayAuthor: {
			type: 'boolean',
			default: true
		},
		excerptLength: {
			type: 'number',
			default: 200
		}
	},

	edit: Editor,

	save: () => {
		return null;
	}
});
