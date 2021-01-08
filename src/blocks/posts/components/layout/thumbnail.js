/**
 * WordPress Dependencies
 */
const { Placeholder, Spinner } = wp.components;

const { useSelect } = wp.data;

const Thumbnail = ({ id, link, alt, size }) => {
	const { featuredImage, altText } = useSelect(
		(select) => {
			const image = select('core').getMedia(id);

			const featuredImage = image
				? 0 < Object.keys(image.media_details.sizes).length
					? image.media_details.sizes[size]
						? image.media_details.sizes[size].source_url
						: image.source_url
					: image.source_url
				: null;

			return {
				featuredImage,
				altText: image && image.alt_text ? image.alt_text : alt,
			};
		},
		[size]
	);

	return (
		<div className="wp-block-themeisle-blocks-posts-grid-post-image">
			<a href={link}>
				{featuredImage ? (
					<img src={featuredImage} size={size} alt={altText} data-id={id} />
				) : (
					<Placeholder>
						<Spinner />
					</Placeholder>
				)}
			</a>
		</div>
	);
};

export default Thumbnail;
