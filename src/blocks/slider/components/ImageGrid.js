/**
 * External dependencies
 */
import arrayMove from 'array-move';

import classnames from 'classnames';

import {
	SortableContainer,
	SortableElement
} from 'react-sortable-hoc';

import {
	Icon,
	plus
} from '@wordpress/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const { useState } = wp.element;

const SortableItem = SortableElement( ({
	value,
	selected,
	dragging,
	sorting,
	selectedItemsCount,
	onClick
}) => {
	const shouldRenderItemCountBadge = dragging && 1 < selectedItemsCount;

	return (
		<Button
			className={ classnames(
				'wp-block-themeisle-blocks-slider-images-grid__image',
				{
					'is-selected': selected,
					'is-sorting': selected && sorting
				}
			) }
			onClick={ () => onClick( value ) }
			style={ {
				backgroundImage: `url( ' ${ value.url } ' )`
			} }
		>
			{ shouldRenderItemCountBadge && <div className="wp-block-themeisle-blocks-slider-images-grid__image__count">{ selectedItemsCount }</div> }
		</Button>
	);
});

const SortableList = SortableContainer( ({
	items,
	className,
	onItemSelect,
	selectedItems,
	isSorting,
	sortingItemKey,
	open
}) => {
	return (
		<div
			className={ className }
			tabIndex="0"
		>
			{ items.map( ( item, index ) => {
				const isSelected = selectedItems.includes( item );
				const itemIsBeingDragged = sortingItemKey === item;

				return (
					<SortableItem
						key={ `image-${ item.id }` }
						index={ index }
						value={ item }
						selected={ isSelected }
						dragging={ itemIsBeingDragged }
						sorting={ isSorting }
						selectedItemsCount={ selectedItems.length }
						onClick={ onItemSelect }
					/>
				);
			}) }

			<Button
				label={ __( 'Add Images' ) }
				icon={ <Icon icon={ plus } /> }
				isPrimary
				onClick={ open }
			/>
		</div>
	);
});

const GridList = ({
	attributes,
	onSelectImages,
	open
}) => {
	const [ selectedItems, setSelectedItems ] = useState([]);
	const [ isSorting, setIsSorting ] = useState( false );
	const [ sortingItemKey, setSortingItemKey ] = useState( null );

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

		if ( selectedItems.length ) {
			const items = attributes.images.filter( value => ! selectedItems.includes( value ) );

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
				'wp-block-themeisle-blocks-slider-images-grid',
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
			distance={ 3 }
			axis="xy"
		/>
	);
};

export default GridList;