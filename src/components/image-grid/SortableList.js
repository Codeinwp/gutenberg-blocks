/**
 * External dependencies
 */
import { SortableContainer } from 'react-sortable-hoc';

import {
	Icon,
	plus
} from '@wordpress/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

/**
 * Internal dependencies
 */
import SortableItem from './SortableItem.js';

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

export default SortableList;
