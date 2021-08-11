/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { registerBlockVariation } from '@wordpress/blocks';

const blocksVariation = [
	{
		name: 'themeisle-blocks/form-input-email',
		description: 'Insert an email field',
		icon: 'email',
		title: 'Email',
		attributes: {
			type: 'email'
		}
	},
	{
		name: 'themeisle-blocks/form-input-password',
		description: 'Insert a password field',
		icon: 'lock',
		title: 'Password',
		attributes: {
			type: 'password'
		}
	},
	{
		name: 'themeisle-blocks/form-input-number',
		description: 'Insert a number field',
		icon: 'calculator',
		title: 'Number',
		attributes: {
			type: 'number'
		}
	},
	{
		name: 'themeisle-blocks/form-input-date',
		description: 'Insert a date field',
		icon: 'calendar-alt',
		title: 'Date',
		attributes: {
			type: 'date'
		}
	},
	{
		name: 'themeisle-blocks/form-input-checkbox',
		description: 'Insert a checkbox',
		icon: 'saved',
		title: 'Checkbox',
		attributes: {
			type: 'checkbox'
		}
	},
	{
		name: 'themeisle-blocks/form-input-textarea',
		description: 'Insert a text-area field',
		icon: 'welcome-write-blog',
		title: 'Text Area',
		attributes: {
			type: 'textarea'
		}
	}
];

blocksVariation.forEach( ({ name, description, icon, title, attributes }) => {
	registerBlockVariation( 'themeisle-blocks/form-input', {
		name,
		title: __( title, 'otter-blocks' ),
		description: __( description, 'otter-blocks' ),
		icon,
		category: 'themeisle-blocks',
		attributes
	});
});

