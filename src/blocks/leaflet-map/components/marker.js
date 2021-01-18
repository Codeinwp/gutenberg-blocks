/**
 * WordPress dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	useState
} = wp.element;

const {
	Button,
	TextControl
} = wp.components;


/**
 * Internal dependencies
 */
import MarkerEditor from './marker-editor.js';

const Marker = ({
	marker,
	isOpen,
	openMarker,
	removeMarker,
	changeMarkerProps
}) => {

	/**
	 * Use local state for updating the interface
	 */

	const [ location, setLocation ] = useState( marker.location );
	const [ lng, setLng ] = useState( marker.longitude );
	const [ lat, setLat ] = useState( marker.latitude );
	const [ title, setTitle ] = useState( marker.title );
	const [ description, setDescription ] = useState( marker.description );

	return (
		<div className="wp-block-themeisle-blocks-google-map-marker">
			<div className="wp-block-themeisle-blocks-google-map-marker-title-area">
				<Button
					className="wp-block-themeisle-blocks-google-map-marker-title"
					onClick={ () => openMarker( marker.id ) }
				>
					{ marker.title || __( 'Custom Marker' ) }
				</Button>

				<Button
					icon="no-alt"
					label={ __( 'Remove Marker' ) }
					showTooltip={ true }
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
				<TextControl
					label={ __( 'Location' ) }
					type="text"
					value={ location }
					onChange={ e => {
						setLocation( e );
						changeMarkerProps( marker.id, {
							location: e
						});
					} }
				/>

				<TextControl
					label={ __( 'Latitude' ) }
					type="text"
					value={ lat }
					onChange={ e => {
						setLat( e );
						changeMarkerProps( marker.id, {
							latitude: e
						});
					} }

				/>

				<TextControl
					label={ __( 'Longitude' ) }
					type="text"
					value={ lng }
					onChange={ e => {
						setLng( e );
						changeMarkerProps( marker.id, {
							longitude: e
						});
					} }
				/>

				{/* <SelectControl
					label={ __( 'Map Icon' ) }
					value={ marker.icon || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }
					options={ [
						{ label: __( 'Red' ), value: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' },
						{ label: __( 'Blue' ), value: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' },
						{ label: __( 'Yellow' ), value: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' },
						{ label: __( 'Green' ), value: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' },
						{ label: __( 'Orange' ), value: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' }
					] }
					onChange={ e => changeMarkerProps( marker.id, 'icon', e ) }
				/> */}

				<TextControl
					label={ __( 'Title' ) }
					type="text"
					value={ title }
					onChange={ e => {
						setTitle( e );
						changeMarkerProps( marker.id, {
							title: e
						});
					} }
				/>

				<MarkerEditor
					label={ __( 'Description' ) }
					type="text"
					value={ description }
					onChange={ e => {
						setDescription( description );
						changeMarkerProps( marker.id, {
							description: e
						});
					} }
				/>
			</div>
		</div>
	);
};

export default Marker;
