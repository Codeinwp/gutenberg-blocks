/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const { Fragment, useEffect, useState } = wp.element;

/**
 * Internal dependencies
 */
import Marker from './marker.js';

const MarkerWrapper = ({ initialOpen, markers, isPlaceAPIAvailable, addMarker, removeMarker, changeMarkerProp }) => {
	useEffect(() => {
		if (false !== initialOpen) {
			setOpen(initialOpen);
		}
	}, [initialOpen]);

	const [isOpen, setOpen] = useState(null);

	const openMarker = (id) => {
		if (isOpen === id) {
			id = null;
		}

		setOpen(id);
	};

	return (
		<Fragment>
			<div className="wp-block-themeisle-blocks-google-map-marker-group">
				{markers.map((marker) => {
					return (
						<Marker
							key={marker.id}
							marker={marker}
							isOpen={isOpen}
							isPlaceAPIAvailable={isPlaceAPIAvailable}
							openMarker={openMarker}
							removeMarker={removeMarker}
							changeMarkerProp={changeMarkerProp}
						/>
					);
				})}
			</div>

			<Button isSecondary isLarge className="wp-block-themeisle-blocks-google-map-marker-add" onClick={addMarker}>
				{__('Add Marker')}
			</Button>
		</Fragment>
	);
};

export default MarkerWrapper;
