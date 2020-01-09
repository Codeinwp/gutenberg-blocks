const attributes = {
	id: {
		type: 'string'
	},
	buttons: {
		type: 'number',
		default: 2
	},
	align: {
		type: 'string'
	},
	spacing: {
		type: 'number',
		default: 20
	},
	collapse: {
		type: 'string',
		default: 'collapse-none'
	},
	fontSize: {
		type: 'number',
		default: 18
	},
	fontFamily: {
		type: 'string'
	},
	fontVariant: {
		type: 'string'
	},
	textTransform: {
		type: 'string'
	},
	fontStyle: {
		type: 'string',
		default: 'normal'
	},
	lineHeight: {
		type: 'number'
	},
	data: {
		type: 'array',
		default: [
			{
				text: '',
				link: '',
				newTab: false,
				color: '#ffffff',
				background: '#32373c',
				border: '',
				hoverColor: '',
				hoverBackground: '',
				hoverBorder: '',
				borderSize: 0,
				borderRadius: 0,
				boxShadow: false,
				boxShadowColor: '',
				boxShadowColorOpacity: 50,
				boxShadowBlur: 5,
				boxShadowSpread: 1,
				boxShadowHorizontal: 0,
				boxShadowVertical: 0,
				hoverBoxShadowColor: '',
				hoverBoxShadowColorOpacity: 50,
				hoverBoxShadowBlur: 5,
				hoverBoxShadowSpread: 1,
				hoverBoxShadowHorizontal: 0,
				hoverBoxShadowVertical: 0,
				iconType: 'none',
				prefix: '',
				icon: '',
				paddingTopBottom: 12,
				paddingLeftRight: 24
			},
			{
				text: '',
				link: '',
				newTab: false,
				color: '#ffffff',
				background: '#32373c',
				border: '',
				hoverColor: '',
				hoverBackground: '',
				hoverBorder: '',
				borderSize: 0,
				borderRadius: 0,
				boxShadow: false,
				boxShadowColor: '',
				boxShadowColorOpacity: 50,
				boxShadowBlur: 5,
				boxShadowSpread: 1,
				boxShadowHorizontal: 0,
				boxShadowVertical: 0,
				hoverBoxShadowColor: '',
				hoverBoxShadowColorOpacity: 50,
				hoverBoxShadowBlur: 5,
				hoverBoxShadowSpread: 1,
				hoverBoxShadowHorizontal: 0,
				hoverBoxShadowVertical: 0,
				iconType: 'none',
				prefix: '',
				icon: '',
				paddingTopBottom: 12,
				paddingLeftRight: 24
			}
		]
	}
};

export default attributes;
