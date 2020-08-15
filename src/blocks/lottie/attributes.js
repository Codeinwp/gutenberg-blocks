const attributes = {
	id: {
		type: 'string'
	},
	file: {
		type: 'object'
	},
	loop: {
		type: 'boolean',
		default: false
	},
	count: {
		type: 'number',
		default: 0
	},
	speed: {
		type: 'number',
		default: 1
	},
	direction: {
		type: 'boolean',
		default: false
	},
	width: {
		type: 'number'
	}
};

export default attributes;
