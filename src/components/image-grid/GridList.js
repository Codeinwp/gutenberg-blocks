/**
 * External dependencies
 */
import arrayMove from 'array-move';

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { useState } = wp.element;

/**
 * Internal dependencies
 */
import SortableList from './SortableList.js';

const GridList = ({
	attributes,
	onSelectImages,
	open
}) => {
	const [ selectedItems, setSelectedItems ] = useState([]);
	const [ isSorting, setIsSorting ] = useState( false );
	const [ sortingItemKey, setSortingItemKey ] = useState( null );
	const [ isHovering, setIsHovering ] = useState( true );

	const handleUpdateBeforeSortStart = ({ index }) => {
		return new Promise( resolve => {
			setIsSorting( true );
			setSortingItemKey( attributes.images[ index ]);
			resolve();
		});
	};

	const onSortEnd = ({
		oldIndex,
		newIndex
	}) => {
		let newItems;
		const items = attributes.images.filter( value => ! selectedItems.includes( value ) );
		if ( isHovering ) {
			newItems = [ ...items ];
		} else if ( selectedItems.length ) {

			newItems = [
				...items.slice( 0, newIndex ),
				...selectedItems,
				...items.slice( newIndex, items.length )
			];
		} else {
			newItems = arrayMove( attributes.images, oldIndex, newIndex );
		}

		setIsSorting( false );
		setSortingItemKey( null );
		setSelectedItems([]);
		onSelectImages( newItems );
	};

	const handleItemSelect = item => {
		let items;
		if ( selectedItems.includes( item ) ) {
			items = selectedItems.filter( value => value !== item );
		} else {
			items = [ ...selectedItems, item ];
		}

		setSelectedItems( items );
	};

	const handleShouldCancelStart = event => {
		if ( ! event.target.sortableInfo ) {
			return false;
		}

		const items = attributes.images;

		const item = items[event.target.sortableInfo.index];

		if ( ! selectedItems.length ) {
			return false;
		}

		return ! selectedItems.includes( item );
	};

	return (
		<SortableList
			className={ classnames(
				'wp-block-themeisle-blocks-images-grid-component',
				{ 'is-single': 1 === attributes.images.length }
			) }
			open={ open }
			items={ attributes.images }
			onItemSelect={ handleItemSelect }
			selectedItems={ selectedItems }
			isSorting={ isSorting }
			sortingItemKey={ sortingItemKey }
			shouldCancelStart={ handleShouldCancelStart }
			updateBeforeSortStart={ handleUpdateBeforeSortStart }
			onSortEnd={ onSortEnd }
			setIsHovering={ setIsHovering }
			distance={ 3 }
			axis="xy"
		/>
	);
};

export default GridList;
