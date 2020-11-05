const attributes = {
	id: {
		type: 'string'
	},
	text: {
		type: 'string',
		source: 'html',
		selector: 'span'
	},
	link: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href'
	},
	newTab: {
		type: 'boolean',
		default: false
	},
	color: {
		type: 'string'
	},
	background: {
		type: 'string'
	},
	backgroundGradient: {
		type: 'string'
	},
	border: {
		type: 'string'
	},
	hoverColor: {
		type: 'string'
	},
	hoverBackground: {
		type: 'string'
	},
	hoverBackgroundGradient: {
		type: 'string'
	},
	hoverBorder: {
		type: 'string'
	},
	borderSize: {
		type: 'number'
	},
	borderRadius: {
		type: 'number'
	},
	boxShadow: {
		type: 'boolean',
		default: false
	},
	boxShadowColor: {
		type: 'string'
	},
	boxShadowColorOpacity: {
		type: 'number',
		default: 50
	},
	boxShadowBlur: {
		type: 'number',
		default: 5
	},
	boxShadowSpread: {
		type: 'number',
		default: 1
	},
	boxShadowHorizontal: {
		type: 'number',
		default: 0
	},
	boxShadowVertical: {
		type: 'number',
		default: 0
	},
	hoverBoxShadowColor: {
		type: 'string'
	},
	hoverBoxShadowColorOpacity: {
		type: 'number',
		default: 50
	},
	hoverBoxShadowBlur: {
		type: 'number',
		default: 5
	},
	hoverBoxShadowSpread: {
		type: 'number',
		default: 1
	},
	hoverBoxShadowHorizontal: {
		type: 'number',
		default: 0
	},
	hoverBoxShadowVertical: {
		type: 'number',
		default: 0
	},
	iconType: {
		type: 'string',
		default: 'none'
	},
	library: {
		type: 'string',
		default: 'fontawesome'
	},
	prefix: {
		type: 'string'
	},
	icon: {
		type: 'string'
	}
};

export default attributes;
