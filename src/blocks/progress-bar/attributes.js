const attributes = {
	text: {
		type: 'string',
		source: 'text',
		selector: 'p'
	},
	type: {
		type: 'string',
		default: 'BAR'
	},
	percentage: {
		type: 'number',
		default: 80
	},
	progressColor: {
		type: 'string',
		default: 'green'
	},
	strokeWidth: {
		type: 'number',
		default: 2.1
	},
	trailColor: {
		type: 'string',
		default: 'gray'
	},
	trailWidth: {
		type: 'number',
		default: 0
	},
	borderRadius: {
		type: 'number',
		default: 10
	},
	height: {
		type: 'number',
		default: 15
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
		default: '#d20f12'
	},
	endColor: {
		type: 'string',
		default: '#0ce950'
	},
	strokeAnimation: {
		type: 'boolean',
		default: false
	},
	easing: {
		type: 'string',
		default: 'linear'
	},
	warnings: {
		type: 'string',
		default: true
	}

};

export default attributes;
