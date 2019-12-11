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
import { authorIcon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType( 'themeisle-blocks/about-author', {
	title: __( 'About Author' ),
	description: __( 'About Author block is the easiest way to add a author bio below your posts.' ),
	icon: authorIcon,
	category: 'themeisle-blocks',
	keywords: [
		'about',
		'author',
		'profile'
	],
	attributes,
	supports: {
		html: false
	},
	edit,
	save: () => null
});
