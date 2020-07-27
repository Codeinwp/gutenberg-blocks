const attributes = {
	src: {
		type: 'string',
		default: 'https://assets3.lottiefiles.com/packages/lf20_XZ3pkn.json'
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
		default: 'canvas'
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
	}
};

export default attributes;
