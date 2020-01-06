/**
 * WordPress Dependencies
 */
const {
	Placeholder,
	Spinner
} = wp.components;

const { withSelect } = wp.data;

const Thumbnail = ({
	alt,
	id,
	thumbnail,
	link
}) => {
	let img = <Placeholder><Spinner /></Placeholder>;

	if ( thumbnail ) {
		img = <img src={ thumbnail } alt={ alt } data-id={ id } />;
	}

	return (
		<div className="wp-block-themeisle-blocks-posts-grid-post-image">
			<a href={ link }>{ img }</a>
		</div>
	);
};

export default withSelect( ( select, props ) => {
	const { id, alt, size } = props;
	const image = id ? select( 'core' ).getMedia( id ) : undefined;
	const thumbnail = image ?
		0 < Object.keys( image.media_details.sizes ).length ?
			image.media_details.sizes[size] ?
				image.media_details.sizes[size].source_url :
				image.source_url :
			image.source_url :
		null;

	return image ? {
		thumbnail: thumbnail,
		alt: image.alt_text || alt
	} : {
		alt: alt
	};
})( Thumbnail );
