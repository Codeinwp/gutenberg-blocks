/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const {
	Fragment,
	useEffect
} = wp.element;

const Map = ({
	attributes,
	className,
	initMap,
	displayMap,
	selectMarker,
	isSelectingMarker
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
					cursor: isSelectingMarker ? 'crosshair' : ''
				} }
			>
			</div>

			<Button
				className="wp-block-themeisle-blocks-open-street-map-marker-button"
				title={ __( 'Add Button' ) }
				onClick={ selectMarker }
			>
				<span className="dashicons dashicons-sticky"></span>
			</Button>
		</Fragment>
	);
};

export default Map;
