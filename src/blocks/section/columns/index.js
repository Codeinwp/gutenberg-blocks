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

registerBlockType( 'themeisle-blocks/advanced-columns', {
	title: __( 'Section' ),
	description: __( 'Add a Section block that displays content in multiple columns, then add whatever content blocks you’d like.' ),
	icon,
	category: 'themeisle-blocks',
	keywords: [
		'advanced columns',
		'layout',
		'grid'
	],
	attributes,
	example: {
		attributes: {
			id: 'wp-block-themeisle-blocks-advanced-columns-example',
			columns: 2,
			layout: 'equal',
			layoutMobile: 'collapsedRows'
		},
		innerBlocks: [
			{
				name: 'themeisle-blocks/advanced-column',
				attributes: {
					id: 'wp-block-themeisle-blocks-advanced-column-example-one',
					columnWidth: 50
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.' )
						}
					},
					{
						name: 'core/image',
						attributes: {
							url: 'https://s.w.org/images/core/5.3/Windbuchencom.jpg'
						}
					},
					{
						name: 'core/paragraph',
						attributes: {
							content: __( 'Suspendisse commodo neque lacus, a dictum orci interdum et.' )
						}
					}
				]
			},
			{
				name: 'themeisle-blocks/advanced-column',
				attributes: {
					id: 'wp-block-themeisle-blocks-advanced-column-example-two',
					columnWidth: 50
				},
				innerBlocks: [
					{
						name: 'core/paragraph',
						attributes: {
							content: __( 'Etiam et egestas lorem. Vivamus sagittis sit amet dolor quis lobortis. Integer sed fermentum arcu, id vulputate lacus. Etiam fermentum sem eu quam hendrerit.' )
						}
					},
					{
						name: 'core/paragraph',
						attributes: {
							content: __( 'Nam risus massa, ullamcorper consectetur eros fermentum, porta aliquet ligula. Sed vel mauris nec enim.' )
						}
					}
				]
			}
		]
	},
	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},
	deprecated,
	edit,
	save
});
