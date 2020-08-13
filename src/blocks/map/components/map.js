/**
 * WordPress dependencies
 */

const {
	Fragment,
	useEffect
} = wp.element;

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
		<Fragment>
			<div
				id={ attributes.id }
				className={className}

				style={ {
					height: attributes.height + 'px',
					cursor: isSelectingMarkerRef.current ? 'crosshair' : ''
				} }
			>
			</div>
		</Fragment>
	);
};

export default Map;
