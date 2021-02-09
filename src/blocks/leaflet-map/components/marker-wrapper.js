
import { v4 as uuidv4 } from 'uuid';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const {
	Fragment,
	useState
} = wp.element;

import { ActionType } from '../edit.js';

/**
 * Internal dependencies
 */
import Marker from './marker.js';

const MarkerWrapper = ({
	markers,
	dispatch
}) => {

	const [ isOpen, setOpen ] = useState( null );


	return (
		<Fragment>
			<div className="wp-block-themeisle-blocks-leaflet-map-marker-group">
				{ markers.map(  marker => {
					return (
						<Marker
							key={ marker.id }
							marker={ marker }
							isOpen={ isOpen === marker.id }
							openMarker={ () => setOpen( isOpen !== marker.id ? marker.id : null ) }
							dispatch={ dispatch }
						/>
					);
				}) }
			</div>

			<Button
				isSecondary
				isLarge
				className="wp-block-themeisle-blocks-leaflet-map-marker-add"
				onClick={ () => {
					console.count( 'Click' );
					dispatch({type: ActionType.ADD, marker: {id: uuidv4()}, dispatch: dispatch});
				}}
			>
				{ __( 'Add Marker' ) }
			</Button>
		</Fragment>
	);
};

export default MarkerWrapper;
