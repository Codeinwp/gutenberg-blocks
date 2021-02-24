const { registerGenericStore } = wp.data;

const defaultValues = {
	posts: {
		slugs: [],
		usedSlugs: []
	}
};

/**
 * General store used by the other components
 * Reference: https://github.com/WordPress/gutenberg/tree/master/packages/data
 */

const createOtterStore = () => {
	let storeChanged = () => {};
	const store = defaultValues;

	/**
	 * Functions used to get data from the store.
	 * Used with the hooks: useSelect & select
	 */
	const selectors = {
		getPostsSlugs() {
			return store.posts.slugs;
		},
		getPostsUsedSlugs() {
			return store.posts.usedSlugs;
		}
	};

	/**
	 * Functions used to send data to the store.
	 * Used with the hooks: useDispatch & dispatch
	 */
	const actions = {
		setPostsSlugs( newSlugs ) {
			store.posts.slugs = newSlugs;
			storeChanged();
		},
		setPostsUsedSlugs( slug ) {
			store.posts.usedSlugs.push( slug );
			storeChanged();
		},
		removePostsUsedSlugs( slug ) {
			store.posts.usedSlugs = store.posts.usedSlugs.filter( s => s !== slug );
			storeChanged();
		}
	};

	return {
		getSelectors() {
			return selectors;
		},
		getActions() {
			return actions;
		},
		subscribe( listener ) {
			storeChanged = listener;
		}
	};
};

registerGenericStore( 'otter-store', createOtterStore() );
