/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { servicesIcon as icon } from '../../../helpers/icons.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/service-old', {
	title: __( 'Service Old' ),
	description: __( 'Use this Service block to showcase services your website offers.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'services',
		'icon',
		'features'
	],
	edit,
	save
});
