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


	return (
		<Fragment>
			<div className="wp-block-themeisle-blocks-google-map-marker-group">
				{ markers.map(  marker => {
					return (
						<Marker
							key={ marker.id }
							marker={ marker }
							isOpen={ isOpen === marker.id }
							openMarker={ () => setOpen( isOpen !== marker.id ? marker.id : null ) }
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
				onClick={ () => addMarker({}) }
			>
				{ __( 'Add Marker' ) }
			</Button>
		</Fragment>
	);
};

export default MarkerWrapper;
