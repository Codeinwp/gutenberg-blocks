/**
 * External dependencies
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
import { getLocation } from './../utility.js';
import { ActionType } from '../edit.js';

const Marker = ({
	marker,
	isOpen,
	openMarker,
	dispatch
}) => {

	/**
	 * Use local state for updating the interface
	 */

	const [ location, setLocation ] = useState( marker.location );
	const [ lng, setLng ] = useState( marker.longitude );
	const [ lat, setLat ] = useState( marker.latitude );
	const [ title, setTitle ] = useState( marker.title );
	const [ description, setDescription ] = useState( marker.description );
	const [ error, setError ] = useState({ target: '', reason: '' });


	const search = async() => {

		const LngLat = await getLocation( location );

		if ( LngLat ) {

			dispatch({
				type: ActionType.UPDATE,
				ids: [ marker.id ],
				updatedProps: {
					location: location,
					latitude: LngLat.latitude,
					longitude: LngLat.longitude
				}
			});

			setLat( LngLat.latitude );
			setLng( LngLat.longitude );

			if ( 'LOCATION' === error.target ) {
				setError({});
			}
		} else {
			setError({
				target: 'LOCATION',
				reason: 'Location couldn\'t been found!'
			});
		}
	};

	const searchOnPress = ( event, key ) => {
		if ( event.key === key ) {
			search();
		}
	};

	return (
		<div className="wp-block-themeisle-blocks-leaflet-map-marker">
			<div className="wp-block-themeisle-blocks-leaflet-map-marker-title-area">
				<Button
					className="wp-block-themeisle-blocks-leaflet-map-marker-title"
					onClick={ () => openMarker() }
				>
					{ marker.title || __( 'Custom Marker' ) }
				</Button>

				<Button
					icon="no-alt"
					label={ __( 'Remove Marker' ) }
					showTooltip={ true }
					className="wp-block-themeisle-blocks-leaflet-map-marker-remove"
					onClick={ () => dispatch({type: ActionType.REMOVE, ids: [ marker.id ]}) }
				/>
			</div>

			{
				( isOpen ) && (
					<div
						className={ classnames(
							'wp-block-themeisle-blocks-leaflet-map-marker-control-area'

						) }
					>
						<TextControl
							label={ __( 'Location' ) }
							type="text"
							className={ classnames({'wp-block-themeisle-blocks-leaflet-map-input-error': 'LOCATION' === error.target })}
							value={ location }
							onChange={ e => {
								setLocation( e );
							} }
							help={ __( 'Press Enter to search the location' ) }
							onKeyDown={ ( event ) => searchOnPress( event, 'Enter' ) }
						/>

						<Button
							isPrimary
							isSmall
							label={ __( 'Search location' ) }
							onClick={ () => {
								console.log( 'Search' );
								search();
							}}
						>
							{ __( 'Search location' )}
						</Button>

						<TextControl
							label={ __( 'Latitude' ) }
							type="text"
							value={ lat }
							onChange={ e => {
								setLat( e );
								dispatch({
									type: ActionType.UPDATE,
									ids: [ marker.id ],
									updatedProps: {
										latitude: e
									}
								});
							} }

						/>

						<TextControl
							label={ __( 'Longitude' ) }
							type="text"
							value={ lng }
							onChange={ e => {
								setLng( e );
								dispatch({
									type: ActionType.UPDATE,
									ids: [ marker.id ],
									updatedProps: {
										longitude: e
									}
								});
							} }
						/>

						{/* <SelectControl
						label={ __( 'Map Icon' ) }
						value={ marker.icon || 'https://maps.leaflet.com/mapfiles/ms/icons/red-dot.png' }
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
								dispatch({
									type: ActionType.UPDATE,
									ids: [ marker.id ],
									updatedProps: {
										title: e
									}
								});
							} }
						/>

						<MarkerEditor
							label={ __( 'Description' ) }
							type="text"
							value={ description }
							onChange={ e => {
								setDescription( description );
								dispatch({
									type: ActionType.UPDATE,
									ids: [ marker.id ],
									updatedProps: {
										description: e
									}
								});
							} }
						/>
					</div>
				)
			}


		</div>
	);
};

export default Marker;
