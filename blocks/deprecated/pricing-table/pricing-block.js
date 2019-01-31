/**
 * WordPress dependencies
 */

import classnames from 'classnames';

const { __ } = wp.i18n;

const {
	registerBlockType
} = wp.blocks;

const {
	InnerBlocks,
	BlockControls,
	InspectorControls,
	PanelColorSettings
} = wp.editor;

const {
	Dashicon,
	Toolbar,
	Button,
	Tooltip
} = wp.components;

/**
 * Internal dependencies
 */
registerBlockType( 'themeisle-blocks/pricing-block', {
	title: __( 'Pricing Block' ),
	description: __( 'Pricing tables are a critical part in showcasing your services, prices and overall offerings.' ),
	parent: [ 'themeisle-blocks/pricing-table' ],
	icon: 'slides',
	category: 'themeisle-blocks',
	keywords: [
		'pricing',
		'table',
		'orbitfox'
	],
	attributes: {
		featured: {
			type: 'boolean',
			default: false
		},
		backgroundColor: {
			type: 'string',
			default: '#ffffff'
		}
	},

	supports: {
		inserter: false
	},

	edit: props => {
		const toggleFeatured = () => {
			props.setAttributes({ featured: ! props.attributes.featured });
		};
		const setBackgroundColor = value => {
			props.setAttributes({ backgroundColor: value });
		};
		const TEMPLATE =  [
			[ 'core/heading', {
				content: __( 'Basic' ),
				className: 'pricing-title',
				align: 'center',
				level: 5
			} ],
			[ 'core/paragraph', {
				content: __( '$9.99' ),
				align: 'center',
				customFontSize: 36
			} ],
			[ 'core/paragraph', {
				content: __( 'Per Month' ),
				align: 'center',
				customFontSize: 12
			} ],
			[ 'core/separator', {} ],
			[ 'core/paragraph', {
				content: __( 'First Feature' ),
				align: 'center',
				fontSize: 'small'
			} ],
			[ 'core/separator', {} ],
			[ 'core/paragraph', {
				content: __( 'Second Feature' ),
				align: 'center',
				fontSize: 'small'
			} ],
			[ 'core/separator', {} ],
			[ 'core/paragraph', {
				content: __( 'Last Feature' ),
				align: 'center',
				fontSize: 'small'
			} ],
			[ 'core/separator', {} ],
			[ 'core/button', {
				text: __( 'Buy Now' ),
				className: 'pricing-button',
				align: 'center'
			} ]
		];

		return [
			<BlockControls key="toolbar-controls">
				<Toolbar
					className='components-toolbar'
				>
					<Tooltip text={ __( 'Feature Table' )	}>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{ 'is-active': props.attributes.featured },
							) }
							onClick={ toggleFeatured }
						>
							<Dashicon icon="star-empty" />
						</Button>
					</Tooltip>
				</Toolbar>
			</BlockControls>,

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
				className={ classnames(
					'wp-block-column',
					{ 'raised': props.attributes.featured },
				) }
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
				className={ classnames(
					'wp-block-column',
					{ 'raised': props.attributes.featured },
				) }
				style={ {
					backgroundColor: props.attributes.backgroundColor
				} }
			>
				<InnerBlocks.Content/>
			</div>
		);
	}
});
