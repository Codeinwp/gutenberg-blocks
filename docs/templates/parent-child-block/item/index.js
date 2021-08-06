/**
 * External dependencies
 */
import { rotateRight as icon } from '@wordpress/icons';

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


registerBlockType( 'themeisle-blocks/template-child', {
	title: __( 'Child Template Single Block' ),
	description: __( 'Show your progress with a beautiful Circle Counter block.' ),
	parent: [ 'themeisle-blocks/template-parent' ],
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'template',
		'block',
		'counter'
	],
	attributes,
	edit,
	save
});
