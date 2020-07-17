/**
 * External dependencies
 */
import arrayMove from 'array-move';

import {
	SortableContainer,
    SortableElement,
    SortableHandle
} from 'react-sortable-hoc';

import {
    Icon,
    plus
} from '@wordpress/icons';

/**
 * WordPress dependencies
 */
const { Button } = wp.components;

const SortableItem = SortableElement( ({ url }) => {
    return (
            <img src={ url } />
        )    
});

const SortableButton = SortableElement( ({onClick}) => {
    return (
        <div className="add-button">
            <Button 
                onClick={ onClick } 
                icon={ <Icon icon={ plus } />}
            />
        </div>
    )
} )

const SortableList = SortableContainer( ({ images, className, open }) => {
    console.log(images.length)
    return (
        <div className={className}>
            {
                images.map(({ id, url }, index) => (
                    <SortableItem key={`image-${id}`} index={index} url={url} />
                ))
            }
            <SortableButton index={images.length} onClick={() => open()} />
        </div>
    )
} );


const GridList = ({ attributes, onSelectImages, className, open }) => {

    const onSortEnd = ({ oldIndex, newIndex })  => {
        const images = arrayMove( attributes.images, oldIndex, newIndex );
		onSelectImages( images.filter( image => image !== undefined) );
    };
    
    return (
        <SortableList className={className} images={attributes.images} onSortEnd={onSortEnd} open={ open } axis="xy" />
    );
}

export default GridList;
