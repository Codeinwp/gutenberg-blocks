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

registerBlockType( 'themeisle-blocks/lottie', {
	title: __( 'Lottie Animation' ),
	description: __( 'Add Lottie animations to your WordPress.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'media',
		'lottie',
		'animation'
	],
	attributes,
	supports: {
		align: [ 'left', 'center', 'right' ]
	},
	edit,
	save
});
