/**
 * WordPress dependencies...
 */

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings
} = wp.editor;

/**
 * Internal dependencies
 */
registerBlockType( 'themeisle-blocks/testimonials-block', {
	title: __( 'Testimonials Block' ),
	description: __( 'Display kudos from customers and clients and display them on your website.' ),
	parent: [ 'themeisle-blocks/testimonials-area' ],
	icon: 'testimonial',
	category: 'themeisle-blocks',
	keywords: [
		'testimonials',
		'clients',
		'quotes'
	],
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '#ffffff'
		}
	},

	edit: props => {
		const setBackgroundColor = value => {
			props.setAttributes({ backgroundColor: value });
		};
		const TEMPLATE =  [
			[ 'core/image', {
				align: 'center'
			} ],
			[ 'core/heading', {
				content: __( 'John Doe' ),
				className: 'testimonials-title',
				align: 'center',
				level: 3
			} ],
			[ 'core/heading', {
				content: __( 'Jedi Master' ),
				className: 'testimonials-subtitle',
				align: 'center',
				level: 6
			} ],
			[ 'core/paragraph', {
				content: __( 'What is the point of being alive if you don’t at least try to do something remarkable?' ),
				className: 'testimonials-content',
				align: 'center'
			} ]
		];

		return [
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ true }
					colorSettings={ [
						{
							value: props.attributes.backgroundColor,
							onChange: setBackgroundColor,
							label: __( 'Background Color' )
						}
					] }
				>
				</PanelColorSettings>
			</InspectorControls>,

			<div
				className="wp-block-column"
				style={ {
					backgroundColor: props.attributes.backgroundColor
				}}
			>
				<InnerBlocks
					template={ TEMPLATE }
				/>
			</div>
		];
	},

	save: props => {
		return (
			<div
				className="wp-block-column"
				style={ {
					backgroundColor: props.attributes.backgroundColor
				}}
			>
				<InnerBlocks.Content/>
			</div>
		);
	}
});
