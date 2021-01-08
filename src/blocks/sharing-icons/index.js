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
import { sharingIcon as icon } from '../../helpers/icons.js';
import attributes from './attributes.js';
import edit from './edit.js';

registerBlockType('themeisle-blocks/sharing-icons', {
	title: __('Sharing Icons'),
	description: __('Share buttons for your website visitors to share content on any social sharing service.'),
	icon,
	category: 'themeisle-blocks',
	keywords: ['social media', 'sharing', 'icons'],
	attributes,
	supports: {
		align: ['left', 'center', 'right'],
	},
	styles: [
		{ name: 'default', label: __('Regular'), isDefault: true },
		{ name: 'icons', label: __('Icons Only') },
	],
	edit,
	save: () => null,
});
