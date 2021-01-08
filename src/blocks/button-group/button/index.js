/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { buttonsIcon as icon } from '../../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType('themeisle-blocks/button', {
	title: __('Button'),
	description: __('Prompt visitors to take action with a button group.'),
	parent: ['themeisle-blocks/button-group'],
	icon,
	category: 'themeisle-blocks',
	keywords: [__('button'), __('buttons'), __('button group')],
	attributes,
	supports: {
		reusable: false,
	},
	styles: [
		{ name: 'fill', label: __('Fill'), isDefault: true },
		{ name: 'outline', label: __('Outline') },
	],
	edit,
	save,
});
