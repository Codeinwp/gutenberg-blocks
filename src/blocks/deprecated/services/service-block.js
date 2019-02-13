/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings
} = wp.editor;

registerBlockType( 'themeisle-blocks/service-block', {
	title: __( 'Service Block' ),
	description: __( 'Use this Services table to showcase services your website offers.' ),
	parent: [ 'themeisle-blocks/services' ],
	icon: 'slides',
	category: 'themeisle-blocks',
	keywords: [
		'pricing',
		'table',
		'orbitfox'
	],
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '#ffffff'
		}
	},

	supports: {
		inserter: false
	},

	edit: props => {
		const setBackgroundColor = value => {
			props.setAttributes({ backgroundColor: value });
		};
		const TEMPLATE =  [
			[ 'themeisle-blocks/font-awesome-icons', {
				fontSize: 62,
				prefix: 'fab',
				icon: 'angellist'
			} ],
			[ 'core/heading', {
				content: __( 'Panel' ),
				className: 'service-title',
				align: 'center',
				level: 4
			} ],
			[ 'core/paragraph', {
				content: __( 'Small description, but a pretty long one.' ),
				className: 'service-content',
				align: 'center'
			} ],
			[ 'core/button', {
				text: __( 'Learn More' ),
				className: 'service-button',
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
				} }
			>
				<InnerBlocks.Content/>
			</div>
		);
	}
});
