/**
 * External dependencies
 */
import classnames from 'classnames';
import uuidv4 from 'uuid';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	Placeholder,
	RangeControl,
	ResizableBox,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl
} = wp.components;

const { InspectorControls } = wp.blockEditor || wp.editor;

const {
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import { StyleSwitcherBlockControl, StyleSwitcherInspectorControl } from '../../../components/style-switcher-control/index.js';
import MarkerWrapper from './MarkerWrapper.js';
import MarkerModal from './MarkerModal.js';
import styles from './styles.js';

class Editor extends Component {
	constructor() {
		super( ...arguments );
		this.enqueueScript = this.enqueueScript.bind( this );
		this.initMap = this.initMap.bind( this );
		this.initSearch = this.initSearch.bind( this );
		this.cycleMarkers = this.cycleMarkers.bind( this );
		this.changeAPI = this.changeAPI.bind( this );
		this.saveAPIKey = this.saveAPIKey.bind( this );
		this.changeStyle = this.changeStyle.bind( this );
		this.changeLocation = this.changeLocation.bind( this );
		this.markerButton = this.markerButton.bind( this );
		this.selectMarker = this.selectMarker.bind( this );
		this.addMarkerManual = this.addMarkerManual.bind( this );
		this.addMarker = this.addMarker.bind( this );
		this.addInfoWindow = this.addInfoWindow.bind( this );
		this.removeMarker = this.removeMarker.bind( this );
		this.removeMarkers = this.removeMarkers.bind( this );
		this.changeLatitude = this.changeLatitude.bind( this );
		this.changeLongitude = this.changeLongitude.bind( this );
		this.changeMapType = this.changeMapType.bind( this );
		this.changeZoom = this.changeZoom.bind( this );
		this.changeHeight = this.changeHeight.bind( this );
		this.toggleDraggable = this.toggleDraggable.bind( this );
		this.toggleMapTypeControl = this.toggleMapTypeControl.bind( this );
		this.toggleZoomControl = this.toggleZoomControl.bind( this );
		this.toggleFullScreenControl = this.toggleFullScreenControl.bind( this );
		this.toggleStreetViewControl = this.toggleStreetViewControl.bind( this );
		this.changeMarkerProp = this.changeMarkerProp.bind( this );

		window.isMapLoaded = window.isMapLoaded || false;
		window.selectMarker = this.selectMarker;
		window.removeMarker = this.removeMarker;

		this.state = {
			api: '',
			isAPILoaded: false,
			isAPISaved: false,
			isSaving: false,
			isPlaceAPIAvailable: true,
			isMarkerOpen: false,
			isSelectingMarker: false,
			isModalOpen: false,
			selectedMarker: {}
		};

		this.settings;

		this.link = document.createElement( 'script' );
		this.link.type = 'text/javascript';
		this.link.async = true;
		this.link.defer = true;
		this.link.id = 'themeisle-google-map-api-loading';

		this.map;
		this.searchBox;
		this.name;
		this.markers = [];
		this.lastInfoWindow;
	}

	async componentDidMount() {
		if ( this.props.attributes.id === undefined || this.props.attributes.id.substr( this.props.attributes.id.length - 8 ) !== this.props.clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-google-map-${ this.props.clientId.substr( 0, 8 ) }`;
			this.props.setAttributes({ id: instanceId });
		}

		await wp.api.loadPromise.then( () => {
			this.settings = new wp.api.models.Settings();
		});

		if ( false === Boolean( themeisleGutenberg.mapsAPI ) ) {
			if ( ! this.state.isAPILoaded ) {
				this.settings.fetch().then( response => {
					this.setState({
						api: response.themeisle_google_map_block_api_key,
						isAPILoaded: true
					});

					if ( '' !== response.themeisle_google_map_block_api_key ) {
						this.setState({
							isAPISaved: true
						});

						this.enqueueScript( response.themeisle_google_map_block_api_key );
					}
				});
			}
		} else {
			if ( ! this.state.isAPILoaded ) {
				this.setState({
					api: themeisleGutenberg.mapsAPI,
					isAPILoaded: true,
					isAPISaved: true
				});

				this.enqueueScript( themeisleGutenberg.mapsAPI );
			}
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.isSelected !== prevProps.isSelected && false !== this.state.isAPISaved ) {
			const isSelected = this.props.isSelected;

			this.map.setOptions({
				mapTypeControl: isSelected ? true : this.props.attributes.mapTypeControl,
				zoomControl: isSelected ? true : this.props.attributes.zoomControl,
				fullscreenControl: isSelected ? true : this.props.attributes.fullscreenControl,
				streetViewControl: isSelected ? true : this.props.attributes.streetViewControl
			});
		}
	}

	enqueueScript( api ) {
		if ( ! window.isMapLoaded ) {
			window.isMapLoaded = true;
			this.link.onload = () => {
				const script = document.getElementById( 'themeisle-google-map-api-loading' );
				script.id = 'themeisle-google-map-api';
				this.initMap();
			};
			this.link.src = `https://maps.googleapis.com/maps/api/js?key=${ api }&libraries=places&cache=${ Math.random() }`;
			document.head.appendChild( this.link );
		}

		const loaded = document.getElementById( 'themeisle-google-map-api' );

		if ( loaded ) {
			this.initMap();
		}
	}

	initMap() {
		this.map = new google.maps.Map( document.getElementById( this.props.attributes.id ), {
			center: {
				lat: Number( this.props.attributes.latitude ) || 41.4036299,
				lng: Number( this.props.attributes.longitude ) || 2.1743558000000576
			},
			gestureHandling: 'cooperative',
			zoom: this.props.attributes.zoom,
			mapTypeId: this.props.attributes.type,
			styles: styles[ this.props.attributes.style ]
		});

		if ( this.props.attributes.location && ( undefined === this.props.attributes.latitude && undefined === this.props.attributes.longitude ) ) {
			const request = {
				query: this.props.attributes.location,
				fields: [ 'name', 'geometry' ]
			};

			const service = new google.maps.places.PlacesService( this.map );

			service.findPlaceFromQuery( request, ( results, status ) => {
				if ( status === google.maps.places.PlacesServiceStatus.OK ) {
					if ( 0 < results.length ) {
						this.map.setCenter( results[0].geometry.location );
					}
				}
			});
		}

		this.map.addListener( 'zoom_changed', () => {
			const zoom = this.map.getZoom();
			this.props.setAttributes({ zoom });
		});

		this.map.addListener( 'maptypeid_changed', () => {
			const type = this.map.getMapTypeId();
			this.props.setAttributes({ type });
		});

		this.map.addListener( 'bounds_changed', () => {
			const location = this.map.getCenter();
			const latitude = location.lat();
			const longitude = location.lng();
			this.props.setAttributes({
				latitude: latitude.toString(),
				longitude: longitude.toString()
			});
		});

		if ( 0 < this.props.attributes.markers.length ) {
			this.cycleMarkers( this.props.attributes.markers );
		}

		const request = {
			query: this.props.attributes.location,
			fields: [ 'name', 'geometry' ]
		};

		const service = new google.maps.places.PlacesService( this.map );

		service.findPlaceFromQuery( request, ( results, status ) => {
			if ( 'REQUEST_DENIED' === status ) {
				this.setState({ isPlaceAPIAvailable: false });
			}
		});

		const centerControlDiv = document.createElement( 'div' );
		new this.markerButton( centerControlDiv );
		centerControlDiv.index = 1;
		this.map.controls[ google.maps.ControlPosition.LEFT_BOTTOM ].push( centerControlDiv );
	}

	initSearch( e ) {
		const elements = document.getElementsByClassName( 'pac-container' );

		Object.keys( elements ).forEach( e => elements[e].remove() );

		this.searchBox = new google.maps.places.SearchBox( e.target );

		this.searchBox.addListener( 'places_changed', () => {
			const places = this.searchBox.getPlaces();

			if ( places && ( 0 < places.length ) ) {
				places.forEach( place => {
					this.name = place.name || __( 'Custom Marker' );
					const latitude = place.geometry.location.lat();
					const longitude = place.geometry.location.lng();
					const latLng = new google.maps.LatLng( latitude, longitude );
					this.map.setCenter( latLng );
					this.props.setAttributes({
						location: place.formatted_address || place.name,
						latitude: latitude.toString(),
						longitude: longitude.toString()
					});
				});
			}
		});
	}

	markerButton( controlDiv ) {
		const controlUI = document.createElement( 'button' );
		controlUI.className = 'gm-control-marker-ui';
		controlUI.title = __( 'Add Marker' );
		controlDiv.appendChild( controlUI );

		const controlText = document.createElement( 'span' );
		controlText.className = 'dashicons dashicons-sticky';
		controlUI.appendChild( controlText );

		controlUI.addEventListener( 'click', () => {
			window.selectMarker();
		});
	}

	selectMarker() {
		if ( ! this.state.isSelectingMarker ) {
			this.map.addListener( 'click', e => {
				google.maps.event.clearListeners( this.map, 'click' );

				const id = uuidv4();
				const title = __( 'Custom Marker' );
				const latitude = e.latLng.lat();
				const longitude = e.latLng.lng();

				this.setState({
					isSelectingMarker: ! this.state.isSelectingMarker,
					isModalOpen: true,
					selectedMarker: {
						advanced: false,
						id,
						location: '',
						title,
						icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
						description: '',
						latitude,
						longitude
					}
				});
			});
		} else {
			google.maps.event.clearListeners( this.map, 'click' );
		}

		this.setState({ isSelectingMarker: ! this.state.isSelectingMarker });
	}

	addMarkerManual() {
		const id = uuidv4();
		const title = __( 'Custom Marker' );
		const location = this.map.getCenter();
		const latitude = location.lat();
		const longitude = location.lng();

		this.setState({
			isModalOpen: true,
			selectedMarker: {
				advanced: true,
				id,
				location: '',
				title,
				icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
				description: '',
				latitude,
				longitude
			}
		});
	}

	addMarker( location, title, icon, description, latitude, longitude  ) {
		const latLng = new google.maps.LatLng( latitude, longitude );

		const id = uuidv4();

		let mark = new google.maps.Marker({
			position: latLng,
			map: this.map,
			title,
			draggable: true,
			icon
		});

		google.maps.event.addListener( mark, 'dragend', event => {
			const lat = event.latLng.lat();
			const lng = event.latLng.lng();
			this.changeMarkerProp( id, 'latitude', lat );
			this.changeMarkerProp( id, 'longitude', lng );
		});

		this.markers.push( mark );

		const markers = [ ...this.props.attributes.markers ];

		const marker = {
			id,
			location,
			title,
			icon,
			description,
			latitude,
			longitude
		};

		markers.push( marker );

		this.props.setAttributes({ markers });

		google.maps.event.addListener( mark, 'click', event => {
			if ( this.lastInfoWindow ) {
				this.lastInfoWindow.close();
			}
		});

		this.addInfoWindow( mark, marker.id, title, description );

		this.setState({ isModalOpen: false });
	}

	addInfoWindow( marker, id, title, description ) {
		const contentString = `<div class="wp-block-themeisle-blocks-map-overview"><h6 class="wp-block-themeisle-blocks-map-overview-title">${ title }</h6><div class="wp-block-themeisle-blocks-map-overview-content">${ description ? `<p>${ description }</p>` : '' }<a class="wp-block-themeisle-blocks-map-overview-delete" onclick="removeMarker( '${ id }' )">${ __( 'Delete Marker' ) }</a></div></div>`;

		const infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		marker.addListener( 'click', () => {
			this.lastInfoWindow = infowindow;
			infowindow.open( this.map, marker );
		});

		google.maps.event.addListener( infowindow, 'domready', () => {
			this.setState({ isMarkerOpen: id });
		});

		google.maps.event.addListener( infowindow, 'closeclick', () => {
			this.setState({ isMarkerOpen: false });
		});
	}

	removeMarker( id ) {
		let markers = [ ...this.props.attributes.markers ];
		markers = markers.filter( marker => marker.id !== id );
		this.props.setAttributes({ markers });

		this.removeMarkers();
		this.setState({ isMarkerOpen: false });

		if ( 0 < markers.length ) {
			this.cycleMarkers( markers );
		}
	}

	removeMarkers() {
		for ( let i = 0; i < this.markers.length; i++ ) {
			this.markers[i].setMap( null );
		}

		this.markers = [];
	}

	cycleMarkers( markers ) {
		markers.forEach( marker => {
			const latitude = marker.latitude;
			const longitude = marker.longitude;
			const position = new google.maps.LatLng( latitude, longitude );

			let mark = new google.maps.Marker({
				position,
				map: this.map,
				title: marker.title,
				draggable: true,
				icon: marker.icon || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
			});

			google.maps.event.addListener( mark, 'dragend', event => {
				const lat = event.latLng.lat();
				const lng = event.latLng.lng();
				this.changeMarkerProp( marker.id, 'latitude', lat );
				this.changeMarkerProp( marker.id, 'longitude', lng );
			});

			this.markers.push( mark );

			google.maps.event.addListener( mark, 'click', event => {
				if ( this.lastInfoWindow ) {
					this.lastInfoWindow.close();
				}
			});

			this.addInfoWindow( mark, marker.id, marker.title, marker.description );
		});
	}

	changeAPI( value ) {
		this.setState({
			api: value
		});
	}

	saveAPIKey() {
		if ( false === Boolean( themeisleGutenberg.mapsAPI ) ) {
			this.setState({
				isSaving: true
			});

			const model = new wp.api.models.Settings({
				// eslint-disable-next-line camelcase
				themeisle_google_map_block_api_key: this.state.api
			});

			const save = model.save();

			save.success( ( response, status ) => {
				if ( 'success' === status ) {
					let isAPISaved = false;

					this.settings.fetch();

					if ( '' !== response.themeisle_google_map_block_api_key ) {
						isAPISaved = true;
					}

					this.setState({
						isSaving: false,
						isAPISaved
					});

					if ( '' !== response.themeisle_google_map_block_api_key ) {
						window.isMapLoaded = false;
						this.enqueueScript( response.themeisle_google_map_block_api_key );
					}
				}

				if ( 'error' === status ) {
					console.log( response );
				}

				this.settings.fetch();
			});

			save.error( ( response, status ) => {
				console.log( response );
			});
		}
	}

	changeStyle( value ) {
		this.props.setAttributes({ style: value });
		this.map.setOptions({ styles: styles[ value ] });
	}

	changeLocation( value ) {
		this.props.setAttributes({ location: value.target.value });
	}

	changeLatitude( value ) {
		this.props.setAttributes({ latitude: value.toString() });
		const latitude = Number( value );
		const longitude = this.props.attributes.longitude;
		const latLng = new google.maps.LatLng( latitude, longitude );
		this.map.setCenter( latLng );
	}

	changeLongitude( value ) {
		this.props.setAttributes({ longitude: value.toString() });
		const latitude = this.props.attributes.latitude;
		const longitude = Number( value );
		const latLng = new google.maps.LatLng( latitude, longitude );
		this.map.setCenter( latLng );
	}

	changeMapType( value ) {
		this.props.setAttributes({ type: value });
		this.map.setMapTypeId( google.maps.MapTypeId[ value.toUpperCase() ]);
	}

	changeZoom( value ) {
		this.props.setAttributes({ zoom: value });
		this.map.setZoom( value );
	}

	changeHeight( value ) {
		this.props.setAttributes({ height: value });
	}

	toggleDraggable() {
		this.props.setAttributes({ draggable: ! this.props.attributes.draggable });
	}

	toggleMapTypeControl() {
		this.props.setAttributes({ mapTypeControl: ! this.props.attributes.mapTypeControl });
	}

	toggleZoomControl() {
		this.props.setAttributes({ zoomControl: ! this.props.attributes.zoomControl });
	}

	toggleFullScreenControl() {
		this.props.setAttributes({ fullscreenControl: ! this.props.attributes.fullscreenControl });
	}

	toggleStreetViewControl() {
		this.props.setAttributes({ streetViewControl: ! this.props.attributes.streetViewControl });
	}

	changeMarkerProp( id, prop, value ) {
		const markers = [ ...this.props.attributes.markers ];
		markers.map( marker => {
			if ( marker.id === id ) {
				return marker[ prop ] = value;
			}
		});
		this.removeMarkers();
		this.cycleMarkers( markers );
		this.props.setAttributes({ markers });
	}

	render() {
		if ( ! this.state.isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner></Spinner>
					{ __( 'Loading…' ) }
				</Placeholder>
			);
		}

		if ( ! this.state.isAPISaved ) {
			return (
				<div className={ this.props.className }>
					<Placeholder
						icon="admin-site"
						label={ __( 'Google Maps' ) }
						instructions={ __( 'A Google Maps API key is required, please enter one below.' ) }
					>
						<TextControl
							type="text"
							placeholder={ __( 'Google Maps API Key' ) }
							value={ this.state.api }
							className="components-placeholder__input"
							onChange={ this.changeAPI }
						/>

						<Button
							isLarge
							type="submit"
							onClick={ this.saveAPIKey }
							isBusy={ this.state.isSaving }
							disabled={ '' === this.state.api }
						>
							{ __( 'Save API Key' ) }
						</Button>

						<div className="components-placeholder__instructions">
							<p className="components-placeholder__text">
								{ __( 'Need an API key? Get one ' ) }
								<ExternalLink href="https://developers.google.com/maps/documentation/javascript/get-api-key">{ __( 'here.' ) }</ExternalLink>
							</p>
							<p className="components-placeholder__text">{ __( 'You need to activate Maps and Places API.' ) }</p>
						</div>
					</Placeholder>
				</div>
			);
		}

		return (
			<Fragment>
				<StyleSwitcherBlockControl
					label={ __( 'Block Styles' ) }
					value={ this.props.attributes.style }
					options={ [
						{
							label: __( 'Standard' ),
							value: 'standard',
							image: themeisleGutenberg.assetsPath + '/icons/map-standard.png'
						},
						{
							label: __( 'Silver' ),
							value: 'silver',
							image: themeisleGutenberg.assetsPath + '/icons/map-silver.png'
						},
						{
							label: __( 'Retro' ),
							value: 'retro',
							image: themeisleGutenberg.assetsPath + '/icons/map-retro.png'
						},
						{
							label: __( 'Dark' ),
							value: 'dark',
							image: themeisleGutenberg.assetsPath + '/icons/map-dark.png'
						},
						{
							label: __( 'Night' ),
							value: 'night',
							image: themeisleGutenberg.assetsPath + '/icons/map-night.png'
						},
						{
							label: __( 'Aubergine' ),
							value: 'aubergine',
							image: themeisleGutenberg.assetsPath + '/icons/map-aubergine.png'
						}
					] }
					onChange={ this.changeStyle }
				/>

				<InspectorControls>
					<PanelBody
						title={ __( 'Styles' ) }
						initialOpen={ false }
					>
						<StyleSwitcherInspectorControl
							value={ this.props.attributes.style }
							options={ [
								{
									label: __( 'Standard' ),
									value: 'standard',
									image: themeisleGutenberg.assetsPath + '/icons/map-standard.png'
								},
								{
									label: __( 'Silver' ),
									value: 'silver',
									image: themeisleGutenberg.assetsPath + '/icons/map-silver.png'
								},
								{
									label: __( 'Retro' ),
									value: 'retro',
									image: themeisleGutenberg.assetsPath + '/icons/map-retro.png'
								},
								{
									label: __( 'Dark' ),
									value: 'dark',
									image: themeisleGutenberg.assetsPath + '/icons/map-dark.png'
								},
								{
									label: __( 'Night' ),
									value: 'night',
									image: themeisleGutenberg.assetsPath + '/icons/map-night.png'
								},
								{
									label: __( 'Aubergine' ),
									value: 'aubergine',
									image: themeisleGutenberg.assetsPath + '/icons/map-aubergine.png'
								}
							] }
							onChange={ this.changeStyle }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Location' ) }
					>
						<BaseControl
							label={ __( 'Location' ) }
							id="wp-block-themeisle-blocks-google-map-search"
						>
							<input
								type="text"
								id="wp-block-themeisle-blocks-google-map-search"
								placeholder={ __( 'Enter a location…' ) }
								value={ this.props.attributes.location }
								className="wp-block-themeisle-blocks-google-map-search"
								onFocus={ e => this.initSearch( e ) }
								onChange={ e => this.changeLocation( e ) }
								disabled={ ! this.state.isPlaceAPIAvailable }
							/>

							{ ! this.state.isPlaceAPIAvailable && (
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
							placeholder={ __( 'Enter latitude…' ) }
							value={ this.props.attributes.latitude }
							onChange={ this.changeLatitude }
						/>

						<TextControl
							label={ __( 'Longitude' ) }
							type="text"
							placeholder={ __( 'Enter longitude' ) }
							value={ this.props.attributes.longitude }
							onChange={ this.changeLongitude }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Positioning & Zooming' ) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Map Type' ) }
							value={ this.props.attributes.type }
							options={ [
								{ label: __( 'Road Map' ), value: 'roadmap' },
								{ label: __( 'Satellite View' ), value: 'satellite' },
								{ label: __( 'Hybrid' ), value: 'hybrid' },
								{ label: __( 'Terrain' ), value: 'terrain' }
							] }
							onChange={ this.changeMapType }
						/>

						<RangeControl
							label={ __( 'Map Zoom Level' ) }
							value={ this.props.attributes.zoom }
							onChange={ this.changeZoom }
							min={ 0 }
							max={ 20 }
						/>

						<RangeControl
							label={ __( 'Map Height' ) }
							value={ this.props.attributes.height }
							onChange={ this.changeHeight }
							min={ 100 }
							max={ 1400 }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Controls' ) }
						initialOpen={ false }
					>
						<BaseControl>
							{ __( 'The following changes will not affect block preview during the editing process. You can click outside the block to see the changes take effect.' ) }
						</BaseControl>

						<ToggleControl
							label={ 'Draggable Map' }
							checked={ this.props.attributes.draggable }
							onChange={ this.toggleDraggable }
						/>

						<ToggleControl
							label={ 'Map Type Control' }
							checked={ this.props.attributes.mapTypeControl }
							onChange={ this.toggleMapTypeControl }
						/>

						<ToggleControl
							label={ 'Zoom Control' }
							checked={ this.props.attributes.zoomControl }
							onChange={ this.toggleZoomControl }
						/>

						<ToggleControl
							label={ 'Full Screen Control' }
							checked={ this.props.attributes.fullscreenControl }
							onChange={ this.toggleFullScreenControl }
						/>

						<ToggleControl
							label={ 'Streen View Control' }
							checked={ this.props.attributes.streetViewControl }
							onChange={ this.toggleStreetViewControl }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Markers' ) }
						initialOpen={ false }
						opened={ false !== this.state.isMarkerOpen ? true : undefined }
						onToggle={ () => {
							if ( false !== this.state.isMarkerOpen ) {
								this.setState({ isMarkerOpen: false });
							}
						} }
					>
						<MarkerWrapper
							markers={ this.props.attributes.markers }
							removeMarker={ this.removeMarker }
							changeMarkerProp={ this.changeMarkerProp }
							addMarker={ this.addMarkerManual }
							isPlaceAPIAvailable={ this.state.isPlaceAPIAvailable }
							initialOpen={ this.state.isMarkerOpen }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Global Settings' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Google Maps API Key' ) }
							type="text"
							placeholder={ __( 'Google Maps API Key' ) }
							value={ this.state.api }
							className="components-placeholder__input"
							onChange={ this.changeAPI }
							help={ __( 'Changing the API key effects all Google Map Embed blocks. You will have to refresh the page after changing your API keys.' ) }
						/>

						<Button
							isLarge
							type="submit"
							onClick={ this.saveAPIKey }
							isBusy={ this.state.isSaving }
						>
							{ __( 'Save API Key' ) }
						</Button>
					</PanelBody>
				</InspectorControls>

				{ this.state.isModalOpen && (
					<MarkerModal
						marker={ this.state.selectedMarker }
						isPlaceAPIAvailable={ this.state.isPlaceAPIAvailable }
						close={ () => this.setState({ isModalOpen: false }) }
						addMarker={ this.addMarker }
					/>
				) }

				<ResizableBox
					size={ {
						height: this.props.attributes.height
					} }
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false
					} }
					minHeight={ 100 }
					maxHeight={ 1400 }
					onResizeStart={ () => {
						this.props.toggleSelection( false );
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						this.props.setAttributes({
							height: parseInt( this.props.attributes.height + delta.height, 10 )
						});
						this.props.toggleSelection( true );
					} }
					className={ classnames(
						'wp-block-themeisle-blocks-google-map-resizer',
						{ 'is-focused': this.props.isSelected }
					) }
				>
					<div
						id={ this.props.attributes.id }
						className={ classnames(
							this.props.className,
							{ 'is-selecting-marker': this.state.isSelectingMarker }
						) }
						style={ {
							height: this.props.attributes.height + 'px'
						} }
					>
					</div>
				</ResizableBox>
			</Fragment>
		);
	}
}

export default Editor;
