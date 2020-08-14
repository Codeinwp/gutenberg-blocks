const attributes = {
	text: {
		type: 'string',
		source: 'text',
		selector: 'p'
	},
	percentage: {
		type: 'number',
		default: 80
	},
	progressColor: {
		type: 'string'
	},
	strokeWidth: {
		type: 'number',
		default: 2.1
	},
	trailColor: {
		type: 'string'
	},
	trailWidth: {
		type: 'number',
		default: 0.8
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
	},
	duration: {
		type: 'number',
		default: 3
	},
	coloredProgress: {
		type: 'boolean',
		default: false
	},
	startColor: {
		type: 'string',
		default: 'orange'
	},
	endColor: {
		type: 'string',
		default: 'green'
	},
	coloredProgress: {
		type: 'boolean',
		default: false
	},
	easing: {
		type: 'string',
		default: 'easeOut'
	},
	warnings: {
		type: 'string',
		default: true
	}

};

export default attributes;
