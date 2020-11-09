/**
 * WordPress dependencies...
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
import deprecated from './deprecated.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/font-awesome-icons', {
	title: __( 'Icon' ),
	description: __( 'Add icons from Font Awesome or ThemeIsle Icons library to your website.' ),
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
