const attributes = {
	id: {
		type: 'string'
	},
	location: {
		type: 'string',
		default: 'La Sagrada Familia, Barcelona, Spain'
	},
	latitude: {
		type: 'string',
		default: '41.4034789'
	},
	longitude: {
		type: 'string',
		default: '2.174410333009705'
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
	},
	zoomControl: {
		type: 'boolean',
		default: true
	},
	draggable: {
		type: 'boolean',
		default: true
	}
};

export default attributes;
