/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { inputIcon as icon } from '../../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';
import './editor.scss';

registerBlockType( 'themeisle-blocks/form-captcha', {
	title: __( 'reCaptcha Field', 'otter-blocks' ),
	description: __( 'Display a captach in the form to provent spam from bots.', 'otter-blocks' ),
	icon,
	parent: [ 'themeisle-blocks/form' ],
	category: 'themeisle-blocks',
	keywords: [
		'captcha',
		'reCaptcha',
		'input'
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ]
	},
	edit,
	save
});
