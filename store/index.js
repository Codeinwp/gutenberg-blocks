const {
	data,
	apiRequest
} = wp;

const {
	registerStore,
	dispatch
} = data;

const DEFAULT_STATE = {};

registerStore( 'themeisle-gutenberg/blocks', {
	reducer( state = DEFAULT_STATE, action ) {

		switch ( action.type ) {
		case 'GET_ICONS_LIST':
			return {
				iconsList: action.data
			};
		}

		return state;
	},

	actions: {
		setFaIconsList( data ) {
			return {
				type: 'GET_ICONS_LIST',
				data: data
			};
		}
	},

	selectors: {
		getFaIconsList( data ) {
			if ( 'undefined' !== typeof data.iconsList ) {
				return data.iconsList;
			}
		}
	},

	resolvers: {
		async getFaIconsList() {
			let result = [];

			result = await apiRequest({ path: 'themeisle-gutenberg-blocks/v1/get_icons_list' });

			dispatch( 'themeisle-gutenberg/blocks' ).setFaIconsList( result );
		}
	}
});
