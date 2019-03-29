/**
 * External dependencies
 */
import classnames from 'classnames';

/**
* WordPress dependencies
*/
const {
	__,
	sprintf
} = wp.i18n;

/**
 * Internal dependencies
 */
import { unescapeHTML, formatDate } from '../../../../helpers/helper-functions.js';

import Thumbnail from '../Thumbnail.js';

const List = ({ className, attributes, posts, categoriesList, authors }) => {
	return (
		<div className={ classnames(
			className,
			'is-list'
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
					<div className="posts-grid-post-blog posts-grid-post-plain">
						<div className="posts-grid-post">
							{ ( 0 !== post.featured_media && attributes.displayFeaturedImage ) && (
								<Thumbnail
									id={ post.featured_media }
									link={ post.link }
									alt={ post.title.rendered }
									size={ attributes.imageSize }
								/>
							) }

							<div className={ classnames(
								'posts-grid-post-body',
								{ 'is-full': ! attributes.displayFeaturedImage }
							)}>
								{ attributes.template.map( element => {
									if ( 'category' === element ) {
										if ( undefined !== category && ( attributes.displayCategory && categoriesList ) ) {
											return <h6 class="posts-grid-post-category">{ category.name }</h6>;
										}
									}

									if ( 'title' === element ) {
										if ( attributes.displayTitle ) {
											return (
												<h5 className="posts-grid-post-title">
													<a href={ post.link }>
														{ unescapeHTML( post.title.rendered ) }
													</a>
												</h5>
											);
										}
									}

									if ( 'meta' === element ) {
										if ( attributes.displayMeta ) {
											return (
												<p className="posts-grid-post-meta">
													{ __( 'on ' ) }

													<time datetime={ post.date }>{ formatDate( post.date ) }</time>

													{ ( undefined !== author && authors ) && (
														sprintf( __( ' by %s' ), author.name )
													) }
												</p>
											);
										}
									}

									if ( 'description' === element ) {
										if ( 0 < attributes.excerptLength && attributes.displayDescription ) {
											return (
												<p className="posts-grid-post-description">
													{ unescapeHTML( post.excerpt.rendered ).substring( 0, attributes.excerptLength ) + '…' }
												</p>
											);
										}
									}
								}) }
							</div>
						</div>
					</div>
				);
			}) }
		</div>
	);
};

export default List;
