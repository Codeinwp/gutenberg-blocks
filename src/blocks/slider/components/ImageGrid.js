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

const SortableItem = SortableElement( ({ onClick, value }) => (
	<div
		className="wp-block-themeisle-blocks-slider-images-grid__image"
		tabIndex="0"
		onClick={ () => onClick( value ) }
		onKeyPress={ event => {
			if ( event.which === ENTER_KEY ) {
				onClick( value );
			}
		}}
		style={{
			backgroundImage: `url( ' ${value.url} ' )`
		}}
	/>
) );

const SortableList = SortableContainer( ({
	items,
	className,
	onItemSelect,
	open
}) => {
	console.log( items );
	return (
		<div
			className={ className }
			tabIndex="0"
		>
			{ items.map( ( value, index ) => (
				<SortableItem
					key={ `image-${value.id}` }
					index={ index }
					value={ value }
					onClick={ onItemSelect }
				/>
			) ) }

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

	const [ state, setState ] = useState({
		selectedItems: [],
		isSorting: false,
		sortingItemKey: null,
		items: attributes.images
	});

	console.log( state );

	const filterItems = value => {
		const { selectedItems, sortingItemKey, isSorting } = state;

		// Do not hide the ghost of the element currently being sorted
		if ( sortingItemKey === value ) {
			return true;
		}

		// Hide the other items that are selected
		if ( isSorting && selectedItems.includes( value ) ) {
			return false;
		}

		// Do not hide any other items
		return true;
	};


	const handleUpdateBeforeSortStart = ({ index }) => {
		return new Promise( resolve =>
			setState(
				prevState => {
					prevState.sortingItemKey = prevState.items[index];
					prevState.isSorting = true;
					return { ...prevState };
				},
				resolve
			)
		);
	};

	const onSortEnd = ({
		oldIndex,
		newIndex
	}) => {
		const { selectedItems } = state;
		let newItems;

		if ( selectedItems.length ) {
			const items = state.items.filter( value => ! selectedItems.includes( value ) );

			newItems = [
				...items.slice( 0, newIndex ),
				...selectedItems,
				...items.slice( newIndex, items.length )
			];
		} else {
			newItems = arrayMove( state.items, oldIndex, newIndex );
		}

		console.log( newItems );

		setState({
			items: newItems,
			isSorting: false,
			sortingItemKey: null,
			selectedItems: []
		});

		onSelectImages( newItems );
	};

	const handleItemSelect = item => {
		setState( prevState => {
			if ( prevState.selectedItems.includes( item ) ) {
				prevState.selectedItems = prevState.selectedItems.filter( value => value !== item );
			} else {
				prevState.selectedItems = [ ...prevState.selectedItems, item ];
			}
			return {
				...prevState
			};
		});
	};

	const handleShouldCancelStart = event => {
		const { items, selectedItems } = state;
		const item = items[event.target.sortableInfo.index];

		// Never cancel start if there are no selected items
		if ( ! selectedItems.length ) {
			return false;
		}

		// If there are selected items, we want to cancel sorting
		// from starting when dragging elements that are not selected
		return ! selectedItems.includes( item );
	};

	return (
		<SortableList
			className={ classnames(
				'wp-block-themeisle-blocks-slider-images-grid',
				{ 'is-single': 1 === attributes.images.length }
			) }
			items={ state.items.filter( filterItems ) }
			isSorting={ state.isSorting }
			sortingItemKey={ state.sortingItemKey }
			selectedItems={ state.selectedItems }
			onItemSelect={ handleItemSelect }
			shouldCancelStart={ handleShouldCancelStart }
			updateBeforeSortStart={ handleUpdateBeforeSortStart }

			//onSortStart={ onSortStart }
			onSortEnd={ onSortEnd }
			distance={ 0 }
			open={ open }
			axis="xy"
		/>
	);
};

export default GridList;
