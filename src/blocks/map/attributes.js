const attributes = {
	id: {
		type: 'string'
	},
	latitude: {
		type: 'number',
		default: 40.68924563540814
	},
	longitude: {
		type: 'number',
		default: -74.04443979263307
	},
	zoom: {
		type: 'number',
		default: 15
	},
	height: {
		type: 'number',
		default: 400
	},
	markers: {
		type: 'array',
		default: []
	}
};

export default attributes;
