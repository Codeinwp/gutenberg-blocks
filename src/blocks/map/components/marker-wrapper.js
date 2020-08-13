/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import Marker from './marker.js';

const MarkerWrapper = ({
	initialOpen,
	markers,
	addMarker,
	removeMarker,
	changeMarkerProp,
	mapRef
}) => {
	useEffect( () => {
		if ( false !== initialOpen ) {
			setOpen( initialOpen );
		}
	}, [ initialOpen ]);

	const [ isOpen, setOpen ] = useState( null );

	const openMarker = ( id ) => {
		if ( isOpen === id ) {
			id = null;
		}

		setOpen( id );
	};

	return (
		<Fragment>
			<div className="wp-block-themeisle-blocks-map-marker-group">
				{ markers.map( marker => {
					return (
						<Marker
							marker={ marker }
							isOpen={ isOpen }
							openMarker={ openMarker }
							removeMarker={ removeMarker }
							changeMarkerProp={ changeMarkerProp }
							mapRef={mapRef}
						/>
					);
				}) }
			</div>

			<Button
				isSecondary
				isLarge
				className="wp-block-themeisle-blocks-map-marker-add"
				onClick={ addMarker }
			>
				{ __( 'Add Marker' ) }
			</Button>
		</Fragment>
	);
};

export default MarkerWrapper;
