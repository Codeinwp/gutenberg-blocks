const attributes = {
	src: {
		type: 'string'
	},
	autoplay: {
		type: 'boolean',
		default: false
	},
	direction: {
		type: 'number',
		default: 1
	},
	loop: {
		type: 'boolean',
		default: false
	},
	renderer: {
		type: 'string',
		default: 'svg'
	},
	speed: {
		type: 'number',
		default: 1
	},
	controls: {
		type: 'boolean',
		default: true
	},
	background: {
		type: 'string'
	},
	hover: {
		type: 'boolean',
		default: false
	},
	height: {
		type: 'number',
		default: 400
	},
	width: {
		type: 'number',
		default: 400
	}
};

export default attributes;
