/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';


/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import { pluginsIcon as icon } from '../../helpers/icons';
import attributes from './attributes';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/plugin-cards', {
	title: __( 'Plugin Card' ),
	description: __( 'Plugin Card block lets you display plugins data in your blog posts.' ),
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
