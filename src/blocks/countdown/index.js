/**
 * External dependencies
 */
import { calendar as icon } from '@wordpress/icons';

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
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';


registerBlockType( 'themeisle-blocks/countdown', {
	title: __( 'Countdown', 'otter-blocks' ),
	description: __( 'Set a countdown for a date.', 'otter-blocks' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'countdown',
		'time',
		'counter'
	],
	attributes,
	edit,
	save,
	styles: [
		{
			name: 'simple',
			label: __( 'Simple', 'otter-blocks' )
		},
		{
			name: 'square',
			label: __( 'Square', 'otter-blocks' ),
			isDefault: true
		},
		{
			name: 'round',
			label: __( 'Round', 'otter-blocks' )
		},
		{
			name: 'card',
			label: __( 'Asymmetric', 'otter-blocks' )
		},
		{
			name: 'pocket',
			label: __( 'Pocket', 'otter-blocks' )
		},
		{
			name: 'circle',
			label: __( 'Circle', 'otter-blocks' )
		},
		{
			name: 'custom',
			label: __( 'Custom', 'otter-blocks' )
		}
	]
});

