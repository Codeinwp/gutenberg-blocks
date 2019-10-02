/**
 * WordPress dependencies
 */
const { isUndefined, pickBy } = lodash;

const { __ } = wp.i18n;

const {
	Disabled,
	PanelBody,
	QueryControls,
	RangeControl,
	Placeholder,
	Spinner
} = wp.components;

const { withSelect } = wp.data;

const { InspectorControls } = wp.blockEditor || wp.editor;

const {
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import LayoutBuilder from './LayoutBuilder.js';
import { StyleSwitcherBlockControl, StyleSwitcherInspectorControl } from '../../../components/style-switcher-control/index.js';
import Layout from './Layout/index.js';

class Editor extends Component {
	constructor() {
		super( ...arguments );
		this.changeStyle = this.changeStyle.bind( this );
		this.changeColumns = this.changeColumns.bind( this );
		this.changeImageSize = this.changeImageSize.bind( this );
		this.getFields = this.getFields.bind( this );
		this.toggleFields = this.toggleFields.bind( this );
		this.changeExcerptLength = this.changeExcerptLength.bind( this );
	}

	changeStyle( value ) {
		this.props.setAttributes({ style: value });
	}

	changeColumns( value ) {
		this.props.setAttributes({ columns: value });
	}

	changeImageSize( value ) {
		this.props.setAttributes({ imageSize: value });
	}

	getFields( field ) {
		if ( 'image' === field ) {
			return this.props.attributes.displayFeaturedImage;
		}

		if ( 'category' === field ) {
			return this.props.attributes.displayCategory;
		}

		if ( 'title' === field ) {
			return this.props.attributes.displayTitle;
		}

		if ( 'meta' === field ) {
			return this.props.attributes.displayMeta;
		}

		if ( 'description' === field ) {
			return this.props.attributes.displayDescription;
		}

		if ( 'date' === field ) {
			return this.props.attributes.displayDate;
		}

		if ( 'author' === field ) {
			return this.props.attributes.displayAuthor;
		}
	}

	toggleFields( field ) {
		if ( 'image' === field ) {
			this.props.setAttributes({ displayFeaturedImage: ! this.props.attributes.displayFeaturedImage });
		}

		if ( 'category' === field ) {
			this.props.setAttributes({ displayCategory: ! this.props.attributes.displayCategory });
		}

		if ( 'title' === field ) {
			this.props.setAttributes({ displayTitle: ! this.props.attributes.displayTitle });
		}

		if ( 'meta' === field ) {
			this.props.setAttributes({ displayMeta: ! this.props.attributes.displayMeta });
		}

		if ( 'description' === field ) {
			this.props.setAttributes({ displayDescription: ! this.props.attributes.displayDescription });
		}

		if ( 'date' === field ) {
			this.props.setAttributes({ displayDate: ! this.props.attributes.displayDate });
		}

		if ( 'author' === field ) {
			this.props.setAttributes({ displayAuthor: ! this.props.attributes.displayAuthor });
		}
	}

	changeExcerptLength( value ) {
		this.props.setAttributes({ excerptLength: value });
	}

	render() {
		if ( ! this.props.posts || ! this.props.categoriesList || ! this.props.authors ) {
			return (
				<Placeholder>
					<Spinner />
					{ __( 'Loading Posts' ) }
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<StyleSwitcherBlockControl
					label={ __( 'Block Styles' ) }
					value={ this.props.attributes.style }
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
					onChange={ this.changeStyle }
				/>

				<InspectorControls>
					<PanelBody
						title={ __( 'Styles' ) }
						initialOpen={ false }
					>
						<StyleSwitcherInspectorControl
							value={ this.props.attributes.style }
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
							onChange={ this.changeStyle }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Settings' ) }
					>

						{ 'grid' === this.props.attributes.style && (
							<RangeControl
								label={ __( 'Columns' ) }
								value={ this.props.attributes.columns }
								onChange={ this.changeColumns }
								min={ 1 }
								max={ 5 }
							>
							</RangeControl>
						) }

						<QueryControls
							numberOfItems={ this.props.attributes.postsToShow }
							categoriesList={ this.props.categoriesList }
							selectedCategoryId={ this.props.attributes.categories }
							onOrderChange={ value => this.props.setAttributes({ order: value }) }
							onOrderByChange={ value => this.props.setAttributes({ orderBy: value }) }
							onCategoryChange={ value => this.props.setAttributes({ categories: '' !== value ? value : undefined }) }
							onNumberOfItemsChange={ value => this.props.setAttributes({ postsToShow: value }) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Design & Layout' ) }
						initialOpen={ false }
					>
						<LayoutBuilder
							attributes={ this.props.attributes }
							getFields={ this.getFields }
							toggleFields={ this.toggleFields }
							setAttributes={ this.props.setAttributes }
							imageSize={ {
								value: this.props.attributes.imageSize,
								onChange: this.changeImageSize
							} }
							excerptLimit={ {
								value: this.props.attributes.excerptLength,
								onChange: this.changeExcerptLength
							} }
						/>
					</PanelBody>
				</InspectorControls>

				{ ( 0 === this.props.posts.length ) && (
					<Placeholder>
						{ __( 'No Posts' ) }
					</Placeholder>
				) }

				{ ( 0 < this.props.posts.length ) && (
					<Disabled>
						<Layout
							className={ this.props.className }
							attributes={ this.props.attributes }
							posts={ this.props.posts }
							categoriesList={ this.props.categoriesList }
							authors={ this.props.authors }
						/>
					</Disabled>
				) }
			</Fragment>
		);
	}
}

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
})( Editor );
