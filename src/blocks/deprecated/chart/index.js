/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	ExternalLink,
	Notice
} = wp.components;

registerBlockType( 'themeisle-blocks/chart-pie', {
	title: __( 'Pie Chart' ),
	description: __( 'Display a beautiful Pie Chart on your blog post with Pie Chart block.' ),
	icon: 'chart-pie',
	category: 'themeisle-blocks',
	keywords: [
		__( 'pie' ),
		__( 'chart' ),
		__( 'orbitfox' )
	],
	attributes: {
		data: {
			type: 'string',
			default: '[["Label","Data"],["Dogs",40],["Cats",30],["Racoons",20],["Monkeys",10]]'
		},
		options: {
			type: 'object',
			default: {
				title: 'Animals',
				is3D: true
			}
		},
		id: {
			type: 'string',
			default: ''
		}
	},

	supports: {
		inserter: false
	},

	edit: props => {
		return (
			<div className={ props.className }>
				<Notice status="warning" isDismissible={ false }>{ __( 'We have deprecated Pie Chart Block and it will be removed soon. For advance options and more charts, please install our Visualizer plugin:' ) } <ExternalLink href="http://wordpress.org/plugins/visualizer/">{ __( 'Visualizer: Tables and Charts Manager for WordPress' ) }</ExternalLink></Notice>
			</div>
		);
	},

	save: () => {
		return null;
	}
});
