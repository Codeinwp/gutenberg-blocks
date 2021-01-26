const attributes = {
	id: {
		type: 'string'
	},
	location: {
		type: 'string',
		default: 'La Sagrada Familia, Barcelona, Spain'
	},
	latitude: {
		type: 'number',
		default: 41.4034789
	},
	longitude: {
		type: 'number',
		default: 2.174410333009705
	},
	zoom: {
		type: 'number',
		default: 13
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
