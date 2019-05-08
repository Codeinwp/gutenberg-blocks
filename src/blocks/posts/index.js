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

import Editor from './components/Editor.js';

registerBlockType( 'themeisle-blocks/posts-grid', {
	title: __( 'Posts' ),
	description: __( 'Display a list of your most recent posts in a beautiful layout.' ),
	icon: postsIcon,
	category: 'themeisle-blocks',
	keywords: [
		'posts',
		'grid',
		'news'
	],
	attributes: {
		style: {
			type: 'string',
			default: 'grid'
		},
		columns: {
			type: 'number',
			default: 3
		},
		template: {
			type: 'array',
			default: [
				'category',
				'title',
				'meta',
				'description'
			]
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
		imageSize: {
			type: 'string',
			default: 'full'
		},
		displayFeaturedImage: {
			type: 'boolean',
			default: true
		},
		displayCategory: {
			type: 'boolean',
			default: true
		},
		displayTitle: {
			type: 'boolean',
			default: true
		},
		displayMeta: {
			type: 'boolean',
			default: true
		},
		displayDescription: {
			type: 'boolean',
			default: true
		},
		excerptLength: {
			type: 'number',
			default: 100
		}
	},

	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},

	edit: Editor,

	save: () => {
		return null;
	}
});
