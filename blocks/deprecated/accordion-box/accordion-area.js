/**
 * WordPress dependencies
 */
const {__} = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	InnerBlocks
} = wp.editor;

registerBlockType( 'themeisle-blocks/accordion-area', {
	title: __( 'Accordion' ),
	description: __( 'Accordion block allows you to add beautiful accordions in your posts.' ),
	icon: 'menu',
	category: 'themeisle-blocks',
	keywords: [
		'accordion',
		'collapsible',
		'orbitfox'
	],

	supports: {
		inserter: false
	},

	edit: props => {
		const ALLOWED_BLOCKS = [ 'themeisle-blocks/accordion-block' ];
		const TEMPLATE = [ [ 'themeisle-blocks/accordion-block' ], [ 'themeisle-blocks/accordion-block' ], [ 'themeisle-blocks/accordion-block' ] ];
		return (
			<div className={ props.className }>
				<ul>
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
					/>
				</ul>
			</div>
		);
	},

	save: () => {
		return (
			<div className="wp-block-themeisle-blocks-accordion-box">
				<ul>
					<InnerBlocks.Content/>
				</ul>
			</div>
		);
	}
});
