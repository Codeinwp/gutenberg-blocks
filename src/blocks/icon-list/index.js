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
import { faIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/icon-list', {
	title: __( 'Icon List' ),
	description: __( 'Display an icon list in a beautiful layout.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'icon',
		'list',
		'items'
	],
	attributes,
	styles: [
		{
			name: 'vertical',
			label: __( 'Vertical' ),
			isDefault: true
		},
		{
			name: 'horizontal',
			label: __( 'Horizontal' )
		}
	],
	edit,
	save
});
