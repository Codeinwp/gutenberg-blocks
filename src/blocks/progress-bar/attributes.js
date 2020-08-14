const attributes = {
	text: {
		type: 'string'
	},
	value: {
		type: 'number',
		default: 80
	},
	progressColor: {
		type: 'string'
	},
	backgroundColor: {
		type: 'string'
	},
	borderRadius: {
		type: 'number',
		default: 10
	},
	height: {
		type: 'number',
		default: 8
	},
	animated: {
		type: 'boolean',
		default: true
	},
	hideValue: {
		type: 'boolean',
		default: false
	}
};

export default attributes;
