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
	TextControl
} = wp.components;

const {
	useEffect,
	useState,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import MarkerEditor from './marker-editor.js';

const MarkerModal = ({
	marker,
	isAdvanced,
	addMarker,
	close,
	mapRef
}) => {
	useEffect( () => {
		setID( marker.id );
		setLocation( marker.location );
		setTitle( marker.title );
		setIconColor( marker.iconColor );
		setDescription( marker.description );
		setLatitude( marker.latitude );
		setLongitude( marker.longitude );
	}, [ marker ]);

	useEffect( () => {
		if ( document.getElementById( `themeisle-location-search-${marker.id}` ) ) {
			L.Layer.search({
				inputTag: `themeisle-location-search-${marker.id}`,
				placeholder: 'Enter a location',
				setLocation: setLocation,
				setLatitude: setLatitude,
				setLongitude: setLongitude

			//changeMarkerProp: changeMarkerProp
			}).addTo( mapRef.current );
		}
	}, []);

	const [ id, setID ] = useState( marker.id );
	const [ location, setLocation ] = useState( marker.location );
	const [ title, setTitle ] = useState( marker.title );
	const [ iconColor, setIconColor ] = useState( marker.iconColor );
	const [ description, setDescription ] = useState( marker.description );
	const [ latitude, setLatitude ] = useState( marker.latitude );
	const [ longitude, setLongitude ] = useState( marker.longitude );

	return (
		<Modal
			title={ __( 'Add Marker' ) }
			onRequestClose={ close }
			shouldCloseOnClickOutside={ false }
		>
			{ isAdvanced && (
				<Fragment>
					<BaseControl
						label={__( 'Location' )}
						id={`themeisle-location-search-${marker.id}`}
					>
						<input
							type="text"
							id={`themeisle-location-search-${marker.id}`}
							placeholder={__( 'Enter a location' )}

						/>
					</BaseControl>

					<TextControl
						label={ __( 'Latitude' ) }
						type="text"
						value={ latitude }
						onChange={ setLatitude }
					/>

					<TextControl
						label={ __( 'Longitude' ) }
						type="text"
						value={ longitude }
						onChange={ setLongitude }
					/>
				</Fragment>
			) }

			<TextControl
				label={ __( 'Title' ) }
				type="text"
				value={ title }
				onChange={ setTitle }
			/>

			<MarkerEditor
				label={ __( 'Description' ) }
				type="text"
				value={ description }
				onChange={ setDescription }
			/>

			<SelectControl
				label={ __( 'Map Icon' ) }
				value={ iconColor || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' }
				options={ [
					{ label: __( 'Red' ), value: 'red' },
					{ label: __( 'Blue' ), value: 'blue' },
					{ label: __( 'Yellow' ), value: 'yellow' },
					{ label: __( 'Green' ), value: 'green' },
					{ label: __( 'Orange' ), value: 'orange' }
				] }
				onChange={ setIconColor }
			/>

			<ButtonGroup>
				<Button
					isLarge
					isPrimary
					onClick={ () => addMarker( location, title, iconColor, description, latitude, longitude  ) }
				>
					{ __( 'Add' ) }
				</Button>

				<Button
					isLarge
					isSecondary
					onClick={ close }
				>
					{ __( 'Cancel' ) }
				</Button>
			</ButtonGroup>
		</Modal>
	);
};

export default MarkerModal;
