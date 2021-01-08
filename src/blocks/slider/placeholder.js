/**
 * WordPress dependencies
 */
const { debounce } = lodash;

const { MediaPlaceholder } = wp.blockEditor;

const BlockPlaceholder = ({ labels, icon, isAppender = false, value = {}, onSelectImages }) => {
	const selectImages = debounce(onSelectImages, 250);

	return (
		<MediaPlaceholder
			labels={labels}
			icon={icon}
			accept="image/*"
			allowedTypes={['image']}
			isAppender={isAppender}
			className="wp-block-themeisle-blocks-slider-uploader"
			value={value}
			onSelect={selectImages}
			multiple
		/>
	);
};

export default BlockPlaceholder;
