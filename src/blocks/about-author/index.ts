
import './editor.scss';
import './style.scss';
import { authorIcon as icon } from '../../helpers/icons.js';
import edit from './edit';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

console.log( 'Hey' );

registerBlockType( 'themeisle-blocks/about-author', {
	title: __( 'About Author' ),
	description: __( 'About Author block is the easiest way to add a author bio below your posts.' ),
	attributes: {},
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'about',
		'author',
		'profile'
	],
	supports: {
		html: false
	},
	edit,
	save: () => null
});

