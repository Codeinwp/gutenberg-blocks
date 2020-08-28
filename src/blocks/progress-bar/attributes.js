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
		default: 'skill'
	},
	borderRadius: {
		type: 'number',
		default: 3
	},
	hidePercentage: {
		type: 'bool',
		default: false
	},
	highlightTitle: {
		type: 'bool',
		default: 'false'
	},
	titlePosition: {
		type: 'string',
		default: 'inline'
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
