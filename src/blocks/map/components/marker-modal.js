/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Button,
	ButtonGroup,
	Modal,
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
	close
}) => {
	useEffect( () => {
		setID( marker.id );
		setTitle( marker.title );
		setDescription( marker.description );
		setLatitude( marker.latitude );
		setLongitude( marker.longitude );
	}, [ marker ]);


	const [ id, setID ] = useState( marker.id );
	const [ title, setTitle ] = useState( marker.title );
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

			<ButtonGroup>
				<Button
					isLarge
					isPrimary
					onClick={ () => addMarker( title, description, latitude, longitude  ) }
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
