/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	RichText,
	InnerBlocks
} = wp.editor;

registerBlockType( 'themeisle-blocks/accordion-block', {
	title: __( 'Accordion Item' ),
	description: __( 'Accordion block allows you to add beautiful accordions in your posts.' ),
	parent: [ 'themeisle-blocks/accordion-area' ],
	icon: 'menu',
	category: 'themeisle-blocks',
	keywords: [
		'accordion',
		'collapsible',
		'orbitfox'
	],

	attributes: {
		heading: {
			type: 'array',
			source: 'children',
			selector: '.accordion-heading'
		}
	},

	edit: props => {

		const CONTENT =  [
			[ 'core/paragraph', {
				content: __( 'What is the point of being alive if you don’t at least try to do something remarkable?' ),
				className: 'accordion-content'
			} ]
		];

		return (
			<li className={ props.className }>
				<RichText
					tagName="h4"
					className="accordion-heading"
					value={ props.attributes.heading }
					placeholder="Section Title"
					onChange={ ( heading ) => props.setAttributes({ heading }) }
				/>
				<div className="accordion-content">
					<InnerBlocks
						template={ CONTENT }
						id="accordion-content"
					/>
				</div>
			</li>
		);
	},

	save: props => {
		return (
			<li>
				<input type="checkbox" checked />
				<i></i>
				<RichText.Content
					tagName="h4"
					className="accordion-heading"
					value={ props.attributes.heading }
				/>
				<div className="accordion-content">
					<InnerBlocks.Content/>
				</div>
			</li>
		);
	}
});
