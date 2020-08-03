/**
 * WordPress dependencies
 */
const { debounce } = lodash;

const {
	MediaUpload,
	MediaUploadCheck
} = wp.blockEditor;

/**
 * Internal dependencies
 */
import './editor.scss';
import GridList from './GridList.js';

const ImageGrid = ({
	attributes,
	onSelectImages
}) => {
	const selectImages = debounce( onSelectImages, 250 );

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ selectImages }
				allowedTypes={ [ 'image' ] }
				multiple
				addToGallery={ true }
				gallery
				value={ attributes.images.map( ({ id }) => id ) }
				render={ ({ open }) => (
					<GridList
						attributes={ attributes }
						open={ open }
						onSelectImages={ onSelectImages }
					/>
				) }
			/>
		</MediaUploadCheck>
	);
};

export default ImageGrid;
