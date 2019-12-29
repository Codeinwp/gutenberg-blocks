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
	ExternalLink,
	IconButton,
	SelectControl,
	TextControl,
	TextareaControl
} = wp.components;

const { useRef } = wp.element;

const Marker = ({
	marker,
	isOpen,
	isPlaceAPIAvailable,
	openMarker,
	removeMarker,
	changeMarkerProp
}) => {
	const searchRef = useRef( null );

	const initSearch = () => {
		const elements = document.getElementsByClassName( 'pac-container' );

		Object.keys( elements ).forEach( e => elements[e].remove() );

		const searchBox = new google.maps.places.SearchBox( searchRef.current );

		searchBox.addListener( 'places_changed', () => {
			const places = searchBox.getPlaces();

			if ( places && ( 0 < places.length ) ) {
				places.forEach( place => {
					const location = place.formatted_address || place.name;
					const latitude = place.geometry.location.lat();
					const longitude = place.geometry.location.lng();
					changeMarkerProp( marker.id, 'location', location );
					changeMarkerProp( marker.id, 'latitude', latitude );
					changeMarkerProp( marker.id, 'longitude', longitude );
				});
			}
		});
	};

	return (
		<div className="wp-block-themeisle-blocks-google-map-marker">
			<div className="wp-block-themeisle-blocks-google-map-marker-title-area">
				<Button
					className="wp-block-themeisle-blocks-google-map-marker-title"
					onClick={ () => openMarker( marker.id ) }
				>
					{ marker.title || __( 'Custom Marker' ) }
				</Button>

				<IconButton
					icon="no-alt"
					label={ __( 'Remove Marker' ) }
					className="wp-block-themeisle-blocks-google-map-marker-remove"
					onClick={ () => removeMarker( marker.id ) }
				/>
			</div>

			<div
				className={ classnames(
					'wp-block-themeisle-blocks-google-map-marker-control-area',
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
						placeholder={ __( 'Enter a location…' ) }
						value={ marker.location }
						className="wp-block-themeisle-blocks-google-map-search"
						ref={ searchRef }
						onFocus={ initSearch }
						onChange={ e => changeMarkerProp( marker.id, 'location', e.target.value ) }
						disabled={ ! isPlaceAPIAvailable }
					/>

					{ ! isPlaceAPIAvailable && (
						<p>
							{ __( 'To enable locations earch, please ensure Places API is activated in the Google Developers Console.' ) + ' ' }
							<ExternalLink href="https://developers.google.com/places/web-service/intro">
								{ __( 'More info.' ) }
							</ExternalLink>
						</p>
					) }
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
					value={ marker.icon || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }
					options={ [
						{ label: __( 'Red' ), value: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
						{ label: __( 'Blue' ), value: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
						{ label: __( 'Yellow' ), value: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' },
						{ label: __( 'Green' ), value: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
						{ label: __( 'Orange' ), value: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' }
					] }
					onChange={ e => changeMarkerProp( marker.id, 'icon', e ) }
				/>

				<TextControl
					label={ __( 'Title' ) }
					type="text"
					value={ marker.title }
					onChange={ e => changeMarkerProp( marker.id, 'title', e ) }
				/>

				<TextareaControl
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
