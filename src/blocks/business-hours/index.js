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
import { mapIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType( 'themeisle-blocks/business-hours', {
	title: __( 'Business Hours', 'otter-blocks' ),
	description: __( 'Display your business schedule on your website.', 'otter-blocks' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'business',
		'schedule',
		'time'
	],
	attributes,
	supports: {
		align: [ 'wide', 'full' ]
	},
	styles: [
		{
			name: 'default',
			label: __( 'default', 'otter-blocks' ),
			isDefault: true
		},
		{
			name: 'black-white',
			label: __( 'Black & White', 'otter-blocks' )
		}
	],
	edit,
	save
});
