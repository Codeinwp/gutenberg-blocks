/**
 * WordPress dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	SelectControl,
	TextControl
} = wp.components;

const {
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import MarkerEditor from './marker-editor.js';

const Marker = ({
	marker,
	isOpen,
	openMarker,
	removeMarker,
	changeMarkerProp,
	mapRef
}) => {

	useEffect ( ()=>{
		if ( document.getElementById( `themeisle-location-search-${marker.id}` ) ) {
			L.Layer.search({
				inputTag: `themeisle-location-search-${marker.id}`,
				placeholder: 'Enter a location',
				markerId: marker.id,
				changeMarkerProp: changeMarkerProp,
				inputValue: marker.location ? marker.location : ''
			}).addTo( mapRef.current );
		}
	}, []);

	return (
		<div className="wp-block-themeisle-blocks-map-marker">
			<div className="wp-block-themeisle-blocks-map-marker-title-area">
				<Button
					className="wp-block-themeisle-blocks-map-marker-title"
					onClick={ () => openMarker( marker.id ) }
				>
					{ marker.title || __( 'Custom Marker' ) }
				</Button>

				<Button
					icon="no-alt"
					label={ __( 'Remove Marker' ) }
					showTooltip={ true }
					className="wp-block-themeisle-blocks-map-marker-remove"
					onClick={ () => removeMarker( marker.id ) }
				/>
			</div>

			<div
				className={ classnames(
					'wp-block-themeisle-blocks-map-marker-control-area',
					{ 'opened': marker.id === isOpen }
				) }
			>
				<BaseControl
					label={ __( 'Location' ) }
					id={ `themeisle-location-search-${ marker.id }` }
				>
					<input
						type="text"
						id={ `themeisle-location-search-${ marker.id }` }
						placeholder= { __( 'Enter a location' ) }

					/>
				</BaseControl>

				<TextControl
					label={ __( 'Latitude' ) }
					type="text"
					value={ marker.latitude }
					onChange={ e => changeMarkerProp( marker.id, 'latitude', e ) }
				/>

				<TextControl
					label={ __( 'Longitude' ) }
					type="text"
					value={ marker.longitude }
					onChange={ e => changeMarkerProp( marker.id, 'longitude', e ) }
				/>

				<SelectControl
					label={ __( 'Map Icon' ) }
					value={ marker.iconColor || 'red' }
					options={ [
						{ label: __( 'Red' ), value: 'red' },
						{ label: __( 'Blue' ), value: 'blue' },
						{ label: __( 'Yellow' ), value: 'yellow' },
						{ label: __( 'Green' ), value: 'green' },
						{ label: __( 'Orange' ), value: 'orange' }
					] }
					onChange={ e => changeMarkerProp( marker.id, 'iconColor', e ) }
				/>

				<TextControl
					label={ __( 'Title' ) }
					type="text"
					value={ marker.title }
					onChange={ e => changeMarkerProp( marker.id, 'title', e ) }
				/>

				<MarkerEditor
					label={ __( 'Description' ) }
					type="text"
					value={ marker.description }
					onChange={ e => changeMarkerProp( marker.id, 'description', e ) }
				/>
			</div>
		</div>
	);
};

export default Marker;
