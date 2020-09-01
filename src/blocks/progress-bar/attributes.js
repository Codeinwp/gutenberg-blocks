const attributes = {
	height: {
		type: 'number',
		default: 35
	},
	percentage: {
		type: 'number',
		default: 50
	},
	duration: {
		type: 'number',
		default: 3
	},
	title: {
		type: 'string',
		default: 'Skill'
	},
	borderRadius: {
		type: 'number'
	},
	hidePercentage: {
		type: 'bool',
		default: false
	},
	titleStyle: {
		type: 'string',
		default: 'default'
	},
	percentagePosition: {
		type: 'string',
		default: 'inline'
	},
	backgroundColor: {
		type: 'string'
	},
	barBackgroundColor: {
		type: 'string'
	}
};

export default attributes;
