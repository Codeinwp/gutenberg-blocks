/**
 * WordPress dependencies
 */
const { isUndefined, pickBy } = lodash;

const { __ } = wp.i18n;

const {
	Disabled,
	Placeholder,
	Spinner
} = wp.components;

const { withSelect } = wp.data;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import { StyleSwitcherBlockControl } from '../../components/style-switcher-control/index.js';
import Inspector from './inspector.js';
import Layout from './components/layout/index.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	posts,
	categoriesList,
	authors
}) => {
	const changeStyle = value => {
		setAttributes({ style: value });
	};

	if ( ! posts || ! categoriesList || ! authors ) {
		return (
			<Placeholder>
				<Spinner />
				{ __( 'Loading Posts' ) }
			</Placeholder>
		);
	}

	if ( 0 === posts.length ) {
		return (
			<Placeholder>
				{ __( 'No Posts' ) }
			</Placeholder>
		);
	}

	return (
		<Fragment>
			<StyleSwitcherBlockControl
				label={ __( 'Block Styles' ) }
				value={ attributes.style }
				options={ [
					{
						label: __( 'Grid' ),
						value: 'grid',
						image: themeisleGutenberg.assetsPath + '/icons/posts-grid.jpg'
					},
					{
						label: __( 'List' ),
						value: 'list',
						image: themeisleGutenberg.assetsPath + '/icons/posts-list.jpg'
					}
				] }
				onChange={ changeStyle }
			/>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				changeStyle={ changeStyle }
				categoriesList={ categoriesList }
			/>

			<Disabled>
				<Layout
					className={ className }
					attributes={ attributes }
					posts={ posts }
					categoriesList={ categoriesList }
					authors={ authors }
				/>
			</Disabled>
		</Fragment>
	);
};

export default withSelect( ( select, props ) => {
	const { categories, order, orderBy, postsToShow } = props.attributes;
	const latestPostsQuery = pickBy({
		categories,
		order,
		orderby: orderBy,
		per_page: postsToShow // eslint-disable-line camelcase
	}, ( value ) => ! isUndefined( value ) );
	return {
		posts: select( 'core' ).getEntityRecords( 'postType', 'post', latestPostsQuery ),
		// eslint-disable-next-line camelcase
		categoriesList: select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: 100 }),
		authors: select( 'core' ).getAuthors()
	};
})( Edit );