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
import { pluginsIcon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/plugin-cards', {
	title: __( 'Plugin Card' ),
	description: __( 'Plugin Card block lets you display plugins data in your blog posts.' ),
	icon: pluginsIcon,
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
