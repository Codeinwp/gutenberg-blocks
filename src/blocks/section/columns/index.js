/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import { columnsIcon as icon } from '../../../helpers/icons.js';
import attributes from './attributes.js';
import deprecated from './deprecated.js';
import edit from './edit.js';
import save from './save.js';

registerBlockType('themeisle-blocks/advanced-columns', {
	title: __('Section'),
	description: __(
		'Add a Section block that displays content in multiple columns, then add whatever content blocks you’d like.'
	),
	icon,
	category: 'themeisle-blocks',
	keywords: ['advanced columns', 'layout', 'grid'],
	attributes,
	supports: {
		align: ['wide', 'full'],
		html: false,
	},
	deprecated,
	edit,
	save,
});
