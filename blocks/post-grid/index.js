/**
 * External dependencies
 */
import classnames from 'classnames';

import Thumbnail from './Thumbnail.js';

/**
 * WordPress dependencies...
 */

const { isUndefined, pickBy } = lodash;

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	Button,
	Dashicon,
	PanelBody,
	QueryControls,
	RangeControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	Tooltip
} = wp.components;

const { withSelect } = wp.data;

const {
	BlockControls,
	InspectorControls
} = wp.editor;

const unescapeHTML = value => {
	const htmlNode = document.createElement( 'div' );
	htmlNode.innerHTML = value;
	if ( htmlNode.innerText !== undefined ) {
		return htmlNode.innerText;
	}
	return htmlNode.textContent;
};

const formatDate = date => {
	const monthNames = [
		__( 'January' ), __( 'February' ), __( 'March' ),
		__( 'April' ), __( 'May' ), __( 'June' ), __( 'July' ),
		__( 'August' ), __( 'September' ), __( 'October' ),
		__( 'November' ), __( 'December' )
	];
	const weekNames = [
		__( 'Sunday' ), __( 'Monday' ), __( 'Tuesday' ), __( 'Wednesday' ),
		__( 'Thursday' ), __( 'Friday' ), __( 'Saturday' )
	];
	date = new Date( date );
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	return day + ' ' + monthNames[monthIndex] + ', ' + year;
};


import './style.scss';
import './editor.scss';

registerBlockType( 'themeisle-blocks/posts-grid', {
	title: __( 'Posts Grid' ),
	description: __( 'Display a list of your most recent posts in a beautiful grid.' ),
	icon: 'screenoptions',
	category: 'themeisle-blocks',
	keywords: [
		'posts',
		'grid',
		'orbitfox'
	],
	attributes: {
		grid: {
			type: 'boolean',
			default: false
		},
		columns: {
			type: 'number',
			default: 3
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
		displayFeaturedImage: {
			type: 'boolean',
			default: true
		},
		displayCategory: {
			type: 'boolean',
			default: true
		},
		displayDate: {
			type: 'boolean',
			default: true
		},
		displayAuthor: {
			type: 'boolean',
			default: true
		},
		excerptLength: {
			type: 'number',
			default: 200
		}
	},

	edit: withSelect( ( select, props ) => {
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
			authors: select( 'core' ).getAuthors(),
			props
		};
	})( ({ posts, categoriesList, authors, className, setAttributes, props }) => {
		if ( ! posts ) {
			return (
				<p className={ className } >
					<Spinner />
					{ __( 'Loading Posts' ) }
				</p>
			);
		}
		if ( 0 === posts.length ) {
			return <p>{ __( 'No Posts' ) }</p>;
		}

		const {
			grid,
			columns,
			order,
			orderBy,
			categories,
			postsToShow,
			displayFeaturedImage,
			displayCategory,
			displayDate,
			displayAuthor,
			excerptLength
		} = props.attributes;

		const toggleLayout = () => {
			props.setAttributes({ grid: ! grid });
		};

		const changeColumns = value => {
			props.setAttributes({ columns: value});
		};

		const toggleFeaturedImage = () => {
			props.setAttributes({ displayFeaturedImage: ! displayFeaturedImage });
		};

		const toggleDisplayCategory = () => {
			props.setAttributes({ displayCategory: ! displayCategory });
		};

		const toggleDisplayDate = () => {
			props.setAttributes({ displayDate: ! displayDate });
		};

		const toggleDisplayAuthor = () => {
			props.setAttributes({ displayAuthor: ! displayAuthor });
		};

		const onExcerptLength = value => {
			props.setAttributes({ excerptLength: value });
		};

		return [
			<BlockControls key="toolbar-controls">
				<Toolbar
					className='components-toolbar'
				>
					<Tooltip text={ __( 'List Layout' )	}>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{ 'is-active': ! grid },
							) }
							onClick={ toggleLayout }
						>
							<Dashicon icon="list-view" />
						</Button>
					</Tooltip>
					<Tooltip text={ __( 'Grid Layout' )	}>
						<Button
							className={ classnames(
								'components-icon-button',
								'components-toolbar__control',
								{ 'is-active': grid },
							) }
							onClick={ toggleLayout }
						>
							<Dashicon icon="grid-view" />
						</Button>
					</Tooltip>
				</Toolbar>
			</BlockControls>,

			<InspectorControls>
				<PanelBody
					title={ __( 'Posts Grid Settings' ) }
				>
					{ ( grid ) && (
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ changeColumns}
							min={ 1 }
							max={ 5 }
						>
						</RangeControl>
					) }
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ categories }
						onOrderChange={ ( value ) => setAttributes({ order: value }) }
						onOrderByChange={ ( value ) => setAttributes({ orderBy: value }) }
						onCategoryChange={ ( value ) => setAttributes({ categories: '' !== value ? value : undefined }) }
						onNumberOfItemsChange={ ( value ) => setAttributes({ postsToShow: value }) }
					/>

					<ToggleControl
						label={ __( 'Display Featured Image?' ) }
						checked={ displayFeaturedImage }
						onChange={ toggleFeaturedImage }
					/>

					<ToggleControl
						label={ __( 'Display Post Category?' ) }
						checked={ displayCategory }
						onChange={ toggleDisplayCategory }
					/>

					<ToggleControl
						label={ __( 'Display Post Date?' ) }
						checked={ displayDate }
						onChange={ toggleDisplayDate }
					/>

					<ToggleControl
						label={ __( 'Display Post Author?' ) }
						checked={ displayAuthor }
						onChange={ toggleDisplayAuthor }
					/>

					<TextControl
						label={ __( 'Description Character Limit' ) }
						type="number"
						value={ excerptLength }
						onChange={ onExcerptLength }
					/>
				</PanelBody>
			</InspectorControls>,

			<div className={ classnames(
				className,
				{ 'is-grid': grid },
			) }>
				{ posts.map( post => {
					let category, author;
					if ( categoriesList ) {
						category = categoriesList.find( item => item.id === post.categories[0]);
					}
					if ( authors ) {
						author = authors.find( item => item.id === post.author );
					}
					return (
						<div className={ `grid-post grid-${ columns }` }>
							<div className="grid-post-row">
								{ ( 0 !== post.featured_media && displayFeaturedImage ) &&
									<div className="grid-image-area" >
										<Thumbnail id={ post.featured_media } link={ post.link } />
									</div>
								}
								<div className={ `grid-content-area ${ ! displayFeaturedImage && 'full' }` }>
									{ ( displayCategory && categoriesList ) && (
										<h6 className="grid-content-category">
											<a href={ category.link }>{ category.name }</a>
										</h6>
									) }
									<h3 className="grid-content-title">
										<a href={ post.link }>
											{ post.title.rendered }
										</a>
									</h3>
									{ ( displayDate || displayAuthor ) && (
										<p className="grid-content-meta">
											{ ( displayDate ) && [
												__( 'on ' ),
												<time datetime={ post.date }>{ formatDate( post.date ) }</time>,
												' '
											] }
											{ ( displayAuthor && authors ) && [
												__( 'by ' ),
												<a href={ author.link }>{ author.name }</a>
											] }
										</p>
									) }
									{ ( 0 < excerptLength ) && (
										<p className="grid-content-excerpt">
											{ unescapeHTML( post.excerpt.rendered ).substring( 0, excerptLength ) + '…' }
										</p>
									) }
								</div>
							</div>
						</div>
					);
				}) }
			</div>
		];
	}),

	save: () => {
		return null;
	}
});
