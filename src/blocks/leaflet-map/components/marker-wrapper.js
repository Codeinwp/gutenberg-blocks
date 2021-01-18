/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import Marker from './marker.js';

const MarkerWrapper = ({
	markers,
	addMarker,
	removeMarker,
	changeMarkerProps
}) => {

	const [ isOpen, setOpen ] = useState( null );

	const openMarker = ( id ) => {
		if ( isOpen === id ) {
			id = null;
		}

		setOpen( id );
	};

	return (
		<Fragment>
			<div className="wp-block-themeisle-blocks-google-map-marker-group">
				{ markers.map( marker => {
					return (
						<Marker
							key={ marker.id }
							marker={ marker }
							isOpen={ isOpen }
							openMarker={ openMarker }
							removeMarker={ removeMarker }
							changeMarkerProps={ changeMarkerProps }
						/>
					);
				}) }
			</div>

			<Button
				isSecondary
				isLarge
				className="wp-block-themeisle-blocks-google-map-marker-add"
				onClick={ addMarker }
			>
				{ __( 'Add Marker' ) }
			</Button>
		</Fragment>
	);
};

export default MarkerWrapper;
