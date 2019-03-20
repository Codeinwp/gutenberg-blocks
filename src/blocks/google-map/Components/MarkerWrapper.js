/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const {
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import Marker from './Marker.js';

class MarkerWrapper extends Component {
	constructor() {
		super( ...arguments );
		this.openMarker = this.openMarker.bind( this );

		this.state = {
			isOpen: null
		};
	}

	openMarker( id ) {
		if ( this.state.isOpen === id ) {
			id = null;
		}

		this.setState({ isOpen: id });
	}

	render() {
		return (
			<Fragment>
				<div className="wp-block-themeisle-blocks-google-map-marker-group">
					{ this.props.markers.map( marker => {
						return (
							<Marker
								marker={ marker }
								isOpen={ this.state.isOpen }
								isPlaceAPIAvailable={ this.props.isPlaceAPIAvailable }
								openMarker={ this.openMarker }
								removeMarker={ this.props.removeMarker }
								changeMarkerProp={ this.props.changeMarkerProp }
							/>
						);
					}) }
				</div>

				<Button
					isDefault
					isLarge
					className="wp-block-themeisle-blocks-google-map-marker-add"
					onClick={ this.props.addMarker }
				>
					{ __( 'Add Marker' ) }
				</Button>
			</Fragment>
		);
	}
}

export default MarkerWrapper;
