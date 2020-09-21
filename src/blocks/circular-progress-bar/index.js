/**
 * External dependencies
 */
import { loop as icon } from '@wordpress/icons';

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

registerBlockType( 'themeisle-blocks/circular-progress-bar', {
	title: __( 'Circular Progress Bar' ),
	description: __( 'Show your progress with a beautiful Circular Progress Bar block.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'progress',
		'circulat',
		'skills'
	],
	attributes,
	transforms,
	edit,
	save
});
