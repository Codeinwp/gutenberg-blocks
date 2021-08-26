/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import { contactIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

import save from './save.js';

registerBlockType( 'themeisle-blocks/form', {
	title: __( 'Form', 'otter-blocks' ),
	description: __( 'Display a form for your clients.', 'otter-blocks' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'business',
		'form',
		'email'
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ]
	},
	edit,
	save,
	variations: [
		{
			name: 'themeisle-blocks/form-contact',
			description: __( 'Contact form for clients', 'otter-blocks' ),
			icon: icon,
			title: __( 'Contact Form', 'otter-blocks' ),
			attributes: {
				atemplateType: 'contact'
			}
		},
		{
			name: 'themeisle-blocks/form-feedback',
			description: __( 'Request a feedback from clients', 'otter-blocks' ),
			icon: icon,
			title: __( 'Feedback Form', 'otter-blocks' ),
			attributes: {
				templateType: 'feedback'
			}
		},
		{
			name: 'themeisle-blocks/form-appointment',
			description: __( 'Request an appointment from clients', 'otter-blocks' ),
			icon: icon,
			title: __( 'Appointment Form', 'otter-blocks' ),
			attributes: {
				templateType: 'appointment'
			}
		}
	]
});
