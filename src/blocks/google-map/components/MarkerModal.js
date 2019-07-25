/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ButtonGroup,
	Modal,
	SelectControl,
	TextControl,
	TextareaControl
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

class MarkerModal extends Component {
	constructor() {
		super( ...arguments );
		this.initSearch = this.initSearch.bind( this );
		this.changeLocation = this.changeLocation.bind( this );

		this.state = {
			advanced: false,
			id: '',
			location: '',
			title: '',
			icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
			description: '',
			latitude: '',
			longitude: ''
		};
	}

	componentDidMount() {
		this.setState({ ...this.props.marker });
	}

	initSearch( e ) {
		const elements = document.getElementsByClassName( 'pac-container' );

		Object.keys( elements ).forEach( e => elements[e].remove() );

		this.searchBox = new google.maps.places.SearchBox( e.target );

		this.searchBox.addListener( 'places_changed', () => {
			const places = this.searchBox.getPlaces();

			if ( places && ( 0 < places.length ) ) {
				places.forEach( place => {
					const location = place.formatted_address || place.name;
					const latitude = place.geometry.location.lat();
					const longitude = place.geometry.location.lng();
					this.setState({
						location,
						latitude,
						longitude
					});
				});
			}
		});
	}

	changeLocation( value ) {
		this.setState({ location: value.target.value });
	}

	render() {
		return (
			<Modal
				title={ __( 'Add Marker' ) }
				onRequestClose={ this.props.close }
			>
				{ this.state.advanced && (
					<Fragment>
						<BaseControl
							label={ __( 'Location' ) }
							id={ `themeisle-location-search-${ this.props.marker.id }` }
						>
							<input
								type="text"
								id={ `themeisle-location-search-${ this.state.id }` }
								placeholder={ __( 'Enter a location…' ) }
								value={ this.state.location }
								className="wp-block-themeisle-blocks-google-map-search"
								onFocus={ e => this.initSearch( e ) }
								onChange={ e => this.changeLocation( e ) }
								disabled={ ! this.props.isPlaceAPIAvailable }
							/>
						</BaseControl>

						<TextControl
							label={ __( 'Latitude' ) }
							type="text"
							value={ this.state.latitude }
							onChange={ e => this.setState({ 'latitude': e }) }
						/>

						<TextControl
							label={ __( 'Longitude' ) }
							type="text"
							value={ this.state.longitude }
							onChange={ e => this.setState({ 'longitude': e }) }
						/>
					</Fragment>
				) }

				<TextControl
					label={ __( 'Title' ) }
					type="text"
					value={ this.state.title }
					onChange={ e => this.setState({ 'title': e }) }
				/>

				<TextareaControl
					label={ __( 'Description' ) }
					type="text"
					value={ this.state.description }
					onChange={ e => this.setState({ 'description': e }) }
				/>

				<SelectControl
					label={ __( 'Map Icon' ) }
					value={ this.state.icon || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }
					options={ [
						{ label: __( 'Red' ), value: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
						{ label: __( 'Blue' ), value: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
						{ label: __( 'Yellow' ), value: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' },
						{ label: __( 'Green' ), value: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
						{ label: __( 'Orange' ), value: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' }
					] }
					onChange={ e => this.setState({ 'icon': e }) }
				/>

				<ButtonGroup>
					<Button
						isLarge
						isPrimary
						onClick={ () => this.props.addMarker( this.state.location, this.state.title, this.state.icon, this.state.description, this.state.latitude, this.state.longitude  ) }
					>
						{ __( 'Add' ) }
					</Button>

					<Button
						isLarge
						isDefault
						onClick={ this.props.close }
					>
						{ __( 'Cancel' ) }
					</Button>
				</ButtonGroup>
			</Modal>
		);
	}
}

export default MarkerModal;
