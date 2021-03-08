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
	const [ error, setError ] = useState({
		target: '',
		reason: ''
	});

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
					onClick={ () => dispatch({
						type: ActionType.REMOVE,
						ids: [ marker.id ]
					}) }
				/>
			</div>

			{
				( isOpen ) && (
					<div className="wp-block-themeisle-blocks-leaflet-map-marker-control-area">
						<TextControl
							label={ __( 'Location' ) }
							type="text"
							className={ classnames({ 'wp-block-themeisle-blocks-leaflet-map-input-error': 'LOCATION' === error.target })}
							value={ location }
							onChange={ e => {
								setLocation( e );
							} }
							help={ __( 'Press Enter to search the location' ) }
							onKeyDown={ ( event ) => searchOnPress( event, 'Enter' ) }
						/>

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
							value={ marker.description }
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
