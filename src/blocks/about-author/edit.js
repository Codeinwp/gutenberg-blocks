/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Spinner } = wp.components;

const { withSelect } = wp.data;

const {
	useEffect,
	useState
} = wp.element;

const Edit = ({
	attributes,
	setAttributes,
	className,
	postAuthor,
	authors
}) => {
	useEffect( () => {
		if ( ! status && postAuthor && authors ) {
			authors.find( ( o ) => {
				if ( o.id === postAuthor ) {
					if ( postAuthor !== attributes.id ) {
						setAttributes({ id: o.id });
					}

					setStatus( true );
					setAuthorDetauls( o );

					return o.id === postAuthor;
				}
			});
		}
	}, [ postAuthor, authors ]);

	const [ status, setStatus ] = useState( false );
	const [ authorDetails, setAuthorDetauls ] = useState({});

	if ( status ) {
		return (
			<section className={ className }>
				<div className="wp-block-themeisle-author-image">
					<img
						className="author-image"
						src={ authorDetails.avatar_urls[ '96' ] }
						alt={ authorDetails.name }
					/>
				</div>
				<div className="wp-block-themeisle-author-data">
					<h4>{ authorDetails.name }</h4>
					<p>{ authorDetails.description }</p>
				</div>
			</section>
		);
	} else {
		return (
			<div className="wp-block-themeisle-author-loading">
				<Spinner />
				<p className="wp-block-themeisle-author-loading-text">{ __( 'Loading…' ) }</p>
			</div>
		);
	}
};

export default withSelect( ( select ) => {
	return {
		postAuthor: select( 'core/editor' ).getEditedPostAttribute( 'author' ),
		authors: select( 'core' ).getAuthors()
	};
})( Edit );
