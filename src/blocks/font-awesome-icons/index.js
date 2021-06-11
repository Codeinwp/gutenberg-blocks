/**
 * WordPress dependencies...
 */
const { __, sprintf } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import { faIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import deprecated from './deprecated.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/font-awesome-icons', {
	title: __( 'Icon', 'otter-blocks' ),

	/** translators: %1$s Font Awesome
	   	translators: %2$s ThemeIsle Icons */
	description: sprintf( __( 'Add icons from %1$s or %2$s library to your website.', 'otter-blocks' ), 'Font Awesome', 'ThemeIsle Icons' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'font awesome',
		'dashicons',
		'icons'
	],
	attributes,
	deprecated,
	edit,
	save
});
