/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const attributes = {
	id: {
		type: 'string'
	},
	title: {
		type: 'string',
		default: __( 'Skill' )
	},
	percentage: {
		type: 'number',
		default: 50
	},
	duration: {
		type: 'number',
		default: 2
	},
	titleStyle: {
		type: 'string',
		default: 'default'
	},
	height: {
		type: 'number',
		default: 120
	},
	strokeWidth: {
		type: 'number',
		default: 5
	},
	backgroundColor: {
		type: 'string'
	},
	progressColor: {
		type: 'string'
	},
	titleColor: {
		type: 'string'
	},
	percentageColor: {
		type: 'string'
	}
};

export default attributes;
