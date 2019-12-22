const attributes = {
	style: {
		type: 'string',
		default: 'grid'
	},
	columns: {
		type: 'number',
		default: 3
	},
	template: {
		type: 'array',
		default: [
			'category',
			'title',
			'meta',
			'description'
		]
	},
	categories: {
		type: 'string'
	},
	postsToShow: {
		type: 'number',
		default: 5
	},
	order: {
		type: 'string',
		default: 'desc'
	},
	orderBy: {
		type: 'string',
		default: 'date'
	},
	imageSize: {
		type: 'string',
		default: 'full'
	},
	displayFeaturedImage: {
		type: 'boolean',
		default: true
	},
	displayCategory: {
		type: 'boolean',
		default: true
	},
	displayTitle: {
		type: 'boolean',
		default: true
	},
	displayMeta: {
		type: 'boolean',
		default: true
	},
	displayDescription: {
		type: 'boolean',
		default: true
	},
	excerptLength: {
		type: 'number',
		default: 100
	},
	displayDate: {
		type: 'boolean',
		default: true
	},
	displayAuthor: {
		type: 'boolean',
		default: true
	}
};

export default attributes;
