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
import edit from './edit.js';
import save from './save.js';

import { pluginsIcon as icon } from '../../helpers/icons.js';

registerBlockType( 'themeisle-blocks/progress-bar', {
	title: __( 'Progress Bar' ),
	description: __( 'A simple progress bar' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'bar',
		'progress',
		'orbitfox'
	],
	attributes,
	supports: {
		html: true
	},
	edit,
	save
});