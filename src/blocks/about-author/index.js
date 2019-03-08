/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	compose,
	withState
} = wp.compose;

const { Spinner } = wp.components;

const { withSelect } = wp.data;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

import { authorIcon } from '../../helpers/icons.js';

registerBlockType( 'themeisle-blocks/about-author', {
	title: __( 'About Author' ),
	description: __( 'About Author block is the easiest way to add a author bio below your posts.' ),
	icon: authorIcon,
	category: 'themeisle-blocks',
	keywords: [
		'about',
		'author',
		'profile'
	],
	attributes: {
		id: {
			type: 'number'
		}
	},

	supports: {
		html: false
	},

	edit: compose([

		withSelect( ( select, props ) => {
			return {
				postAuthor: select( 'core/editor' ).getEditedPostAttribute( 'author' ),
				authors: select( 'core' ).getAuthors(),
				props
			};
		}),

		withState({
			status: 0,
			authorDetails: {}
		})

	])( ({ postAuthor, authors, status, authorDetails, setState, props, className }) => {

		if ( 0 === status && postAuthor && authors ) {
			authors.find( ( o ) => {
				if ( o.id === postAuthor ) {
					if ( postAuthor !== props.attributes.id ) {
						props.setAttributes({ id: o.id });
					}
					setState({
						authorDetails: o,
						status: 1
					});
					return o.id === postAuthor;
				}
			});
		}

		return (
			( 1 === status && postAuthor && authors ) ? (
				<section className={ className }>
					<div className="themeisle-author-image">
						<img className="author-image" src={ authorDetails.avatar_urls[ '96' ] } alt={ authorDetails.name }/>
					</div>
					<div className="themeisle-author-data">
						<h4>{ authorDetails.name }</h4>
						<p>{ authorDetails.description }</p>
					</div>
				</section>
			) : (
				<div key="loading" className="wp-block-embed is-loading">
					<Spinner />
					<p>{ __( 'Loading…' ) }</p>
				</div>
			)
		);
	}),

	save: () => {
		return null;
	}
});
