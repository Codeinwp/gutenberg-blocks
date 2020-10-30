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
import transforms from './transforms.js';

registerBlockType( 'themeisle-blocks/circle-counter', {
	title: __( 'Circle Counter' ),
	description: __( 'Show your progress with a beautiful Circle Counter block.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'progress',
		'circle',
		'counter'
	],
	attributes,
	transforms,
	edit,
	save
});
