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
	percentagePosition: {
		type: 'string',
		default: 'default'
	},
	height: {
		type: 'number',
		default: 30
	},
	borderRadius: {
		type: 'number'
	},
	backgroundColor: {
		type: 'string'
	},
	barBackgroundColor: {
		type: 'string'
	}
};

export default attributes;
