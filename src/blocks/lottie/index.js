/**
 * External dependencies
 */
import { video as icon } from '@wordpress/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './editor.scss';
import edit from './edit.js';
import save from './save.js';
import attributes from './attributes.js';

registerBlockType( 'themeisle-blocks/lottie-block', {
	title: __( 'Lottie Animation' ),
	description: __( 'Add Lottie animations to your WordPress.' ),
	icon,
	category: 'media',
	keywords: [
		'media',
		'lottie',
		'animation'
	],
	attributes,
	edit,
	save
});
