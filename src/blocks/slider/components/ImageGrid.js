/**
 * External dependencies
 */
import arrayMove from 'array-move';

import {
	SortableContainer,
	SortableElement,
	SortableHandle
} from 'react-sortable-hoc';

const SortableItem = SortableElement( ({ url }) => {
    return (
            <img src={ url } style={{ width: "100px", height: "100px", padding: "6px" }} />
    )    
});

const SortableList = SortableContainer( ({ images }) => {
    return (
        <div style={{ display: "content"}}>
            {
                images.map( ({ id, url }, index) => (
                    <SortableItem key={`image-${id}`} index={index} url={ url } /> 
                ))
            }
        </div>
    )
} );

const GridList = ({ attributes, onSelectImages }) => {
    
    const onSortEnd = ({ oldIndex, newIndex })  => {
        const images = arrayMove( attributes.images, oldIndex, newIndex );
		onSelectImages( images.filter( image => image !== undefined) );
    };
    
    return (
        <SortableList images={ attributes.images } onSortEnd={ onSortEnd } axis="xy"/>
    );
}

export default GridList;
