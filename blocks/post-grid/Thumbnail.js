/**
 * WordPress Dependencies
 */
const { Spinner } = wp.components;

const { withSelect } = wp.data;

const { Component } = wp.element;

class Thumbnail extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { alt, id, thumbnail, link } = this.props;

		const img = thumbnail ? <img src={ thumbnail } alt={ alt } data-id={ id } /> : <Spinner />;

		return (
			<div className="post-thumbnail" >
				<a href={ link }>{ img }</a>
			</div>
		);
	}
}

export default withSelect( ( select, ownProps ) => {
	const { id } = ownProps;
	const image = id ? select( 'core' ).getMedia( id ) : undefined;
	const size = 'medium';
	const thumbnail = image ? image.media_details.sizes[size].source_url : null;

	return image ? {
		thumbnail: thumbnail,
		alt: image.alt_text
	} : {
		alt: null
	};
})( Thumbnail );
