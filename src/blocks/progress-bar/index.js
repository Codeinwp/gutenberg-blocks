/**
 * External dependencies
 */
import { minus as icon } from '@wordpress/icons';

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

registerBlockType( 'themeisle-blocks/progress-bar', {
	title: __( 'Progress Bar' ),
	description: __( 'Show your progress with a beautiful Progress Bar block.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'progress',
		'bar',
		'skills'
	],
	attributes,
	edit,
	save
});
