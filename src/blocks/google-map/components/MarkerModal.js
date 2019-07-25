/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Button,
	ButtonGroup,
	Modal,
	SelectControl,
	TextControl,
	TextareaControl
} = wp.components;

const { Component} = wp.element;

class MarkerModal extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
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

	render() {
		return (
			<Modal
				title={ __( 'Add Marker' ) }
				onRequestClose={ this.props.close }
			>
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

				<ButtonGroup>
					<Button
						isLarge
						isPrimary
						onClick={ () => this.props.addMarker( this.state.title, this.state.icon, this.state.description, this.state.latitude, this.state.longitude  ) }
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
