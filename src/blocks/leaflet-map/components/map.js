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
	isSelectingMarker,
	toggleFullscreen
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
				className="wp-block-themeisle-blocks-leaflet-map-marker-button"
				title={ __( 'Add Button' ) }
				onClick={ selectMarker }
			>
				<span className="dashicons dashicons-sticky"></span>
			</Button>

			<Button
				className="wp-block-themeisle-blocks-leaflet-map-fullscreen-button"
				disabled={! attributes.fullscreenControl}
				title={ __( 'Toggle Fullscreen' ) }
				onClick={ toggleFullscreen }
			>
				<span className="dashicons dashicons-editor-expand"></span>
			</Button>
		</Fragment>
	);
};

export default Map;
