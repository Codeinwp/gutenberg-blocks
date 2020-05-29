/**
 * External dependencies
 */
import classnames from 'classnames';

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
	isMapLoaded,
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
				className={ classnames(
					className,
					{ 'is-selecting-marker': isSelectingMarker }
				) }
				style={ {
					height: attributes.height + 'px'
				} }
			>
			</div>

			{ isMapLoaded && (
				<Button
					className="wp-block-themeisle-blocks-google-map-marker-button"
					title={ __( 'Add Button' ) }
					onClick={ selectMarker }
				>
					<span className="dashicons dashicons-sticky"></span>
				</Button>
			) }
		</Fragment>
	);
};

export default Map;
