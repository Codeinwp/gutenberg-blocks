/**
 * WordPress dependencies
 */

const { useEffect } = wp.element;

const Map = ({
	attributes,
	className,
	initMap,
	displayMap,
	isSelectingMarkerRef
}) => {
	useEffect( () => {
		if ( displayMap ) {
			initMap();
		}
	}, [ displayMap ]);

	return (
		<div
			id={ attributes.id }
			className={className}

			style={ {
				height: attributes.height + 'px',
				cursor: isSelectingMarkerRef.current ? 'crosshair' : ''
			} }
		>
		</div>
	);
};

export default Map;
