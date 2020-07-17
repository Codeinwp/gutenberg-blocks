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

const SortableItem = SortableElement( ({ url }) => (
	<div
		className="wp-block-themeisle-blocks-slider-images-grid__image"
		tabIndex="0"
		style={ {
			backgroundImage: `url( ' ${ url } ' )`
		} }
	/>
) );

const SortableList = SortableContainer( ({
	images,
	className,
	open
}) => {
	return (
		<div
			className={ className }
			tabIndex={ 0 }
		>
			{ images.map( ({ id, url }, index ) => (
				<SortableItem
					key={ `image-${ id }` }
					index={ index }
					url={ url }
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
	const onSortEnd = ({
		oldIndex,
		newIndex
	}) => {
		const images = arrayMove( attributes.images, oldIndex, newIndex );
		onSelectImages( images.filter( image => undefined !== image ) );
	};

	return (
		<SortableList
			className={ classnames(
				'wp-block-themeisle-blocks-slider-images-grid',
				{ 'is-single': 1 === attributes.images.length }
			) }
			images={ attributes.images }
			onSortEnd={ onSortEnd }
			open={ open }
			axis="xy"
		/>
	);
};

export default GridList;
