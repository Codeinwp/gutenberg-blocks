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
        <img src={ url } />
        )    
});

const SortableList = SortableContainer( ({ images, className }) => {
    return (
        <div className={className}>
            {
                images.map(({ id, url }, index) => (
                    <SortableItem key={`image-${id}`} index={index} url={url} />
                ))
            }
            <button onClick={() => wp.media.frame.open()}>Click Me</button>
        </div>
    )
} );


const GridList = ({ attributes, onSelectImages, className }) => {

    
    

    const onSortEnd = ({ oldIndex, newIndex })  => {
        const images = arrayMove( attributes.images, oldIndex, newIndex );
		onSelectImages( images );
    };


    
    return (
        <SortableList className={className} images={attributes.images} onSortEnd={onSortEnd} axis="xy" />
    );
}

export default GridList;
