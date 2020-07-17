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

const SortableItem = SortableElement( ({ url, alt }) => {
    return (
            <img src={ url } alt={ alt } />
        )    
});

const SortableList = SortableContainer( ({ images, className, open }) => {
    return (
        <div className={className} tabIndex={0}>
            {
                images.map(({ id, url, alt }, index) => (
                    <SortableItem 
                        key={ `image-${id}` } 
                        index={ index } 
                        url={ url } 
                        alt={ alt }
                    />
                ))
            }
            
            <div className="add-button">
                <Button 
                    isPrimary
                    onClick={() => open()} 
                    icon={ <Icon icon={ plus } />}
                />
            </div>
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
