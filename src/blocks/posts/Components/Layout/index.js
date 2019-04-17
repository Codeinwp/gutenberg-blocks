/**
 * Internal dependencies
 */
import Grid from './Grid.js';

import List from './List.js';

const Layout = ({ className, attributes, posts, categoriesList, authors }) => {
	if ( 'grid' === attributes.style ) {
		return (
			<Grid
				className= { className }
				attributes= { attributes }
				posts= { posts }
				categoriesList= { categoriesList }
				authors= { authors }
			/>
		);
	}

	if ( 'list' === attributes.style ) {
		return (
			<List
				className= { className }
				attributes= { attributes }
				posts= { posts }
				categoriesList= { categoriesList }
				authors= { authors }
			/>
		);
	}
};

export default Layout;
