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
	TextControl,
	TextareaControl
} = wp.components;

const { Component} = wp.element;

class Marker extends Component {
	constructor() {
		super( ...arguments );
		this.initSearch = this.initSearch.bind( this );
		this.changeLocation = this.changeLocation.bind( this );
	}

	initSearch( e ) {
		this.searchBox = new google.maps.places.SearchBox( e.target );

		this.searchBox.addListener( 'places_changed', () => {
			const places = this.searchBox.getPlaces();

			if ( places && ( 0 < places.length ) ) {
				places.forEach( place => {
					const location = place.formatted_address || place.name;
					const latitude = place.geometry.location.lat();
					const longitude = place.geometry.location.lng();
					this.props.changeMarkerProp( this.props.marker.id, 'location', location );
					this.props.changeMarkerProp( this.props.marker.id, 'latitude', latitude );
					this.props.changeMarkerProp( this.props.marker.id, 'longitude', longitude );
				});
			}
		});
	}

	changeLocation( value ) {
		this.props.changeMarkerProp( this.props.marker.id, 'location', value.target.value );
	}

	render() {
		return (
			<div className="wp-block-themeisle-blocks-google-map-marker">
				<div className="wp-block-themeisle-blocks-google-map-marker-title-area">
					<Button
						className="wp-block-themeisle-blocks-google-map-marker-title"
						onClick={ () => this.props.openMarker( this.props.marker.id ) }
					>
						{ this.props.marker.title || __( 'Custom Marker' ) }
					</Button>

					<IconButton
						icon="no-alt"
						label={ __( 'Remove Marker' ) }
						className="wp-block-themeisle-blocks-google-map-marker-remove"
						onClick={ () => this.props.removeMarker( this.props.marker.id ) }
					/>
				</div>

				<div
					className={ classnames(
						'wp-block-themeisle-blocks-google-map-marker-control-area',
						{ 'opened': this.props.marker.id === this.props.isOpen }
					) }
				>
					<BaseControl
						label={ __( 'Location' ) }
						id={ `themeisle-location-search-${ this.props.marker.id }` }
					>
						<input
							type="text"
							id={ `themeisle-location-search-${ this.props.marker.id }` }
							placeholder={ __( 'Enter a location…' ) }
							value={ this.props.marker.location }
							className="wp-block-themeisle-blocks-google-map-search"
							onFocus={ e => this.initSearch( e ) }
							onChange={ e => this.changeLocation( e ) }
							disabled={ ! this.props.isPlaceAPIAvailable }
						/>

						{ ! this.props.isPlaceAPIAvailable && (
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
						value={ this.props.marker.latitude }
						onChange={ e => this.props.changeMarkerProp( this.props.marker.id, 'latitude', e ) }
					/>

					<TextControl
						label={ __( 'Longitude' ) }
						type="text"
						value={ this.props.marker.longitude }
						onChange={ e => this.props.changeMarkerProp( this.props.marker.id, 'longitude', e ) }
					/>

					<TextControl
						label={ __( 'Title' ) }
						type="text"
						value={ this.props.marker.title }
						onChange={ e => this.props.changeMarkerProp( this.props.marker.id, 'title', e ) }
					/>

					<TextareaControl
						label={ __( 'Description' ) }
						type="text"
						value={ this.props.marker.description }
						onChange={ e => this.props.changeMarkerProp( this.props.marker.id, 'description', e ) }
					/>
				</div>
			</div>
		);
	}
}

export default Marker;
