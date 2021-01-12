const attributes = {
	id: {
		type: 'string'
	},
	location: {
		type: 'string',
		default: 'La Sagrada Familia, Barcelona, Spain'
	},
	latitude: {
		type: 'string'
	},
	longitude: {
		type: 'string'
	},
	zoom: {
		type: 'number',
		default: 13
	},
	height: {
		type: 'number',
		default: 400
	}
};

export default attributes;
