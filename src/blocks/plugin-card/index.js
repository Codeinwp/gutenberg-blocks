/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import { pluginsIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/plugin-cards', {
	title: __( 'Plugin Card', 'otter-blocks' ),
	description: __( 'Plugin Card block lets you display plugins data in your blog posts.', 'otter-blocks' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'plugin',
		'card',
		'orbitfox'
	],
	attributes,
	supports: {
		html: false
	},
	edit,
	save: () => null
});
