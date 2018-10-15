/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const {
	Button,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl
} = wp.components;

const {
	compose,
	withState
} = wp.compose;

const { withSelect } = wp.data;

const { InspectorControls } = wp.editor;

/**
 * Internal dependencies
 */
import './editor.scss';

registerBlockType( 'themeisle-blocks/google-map', {
	title: __( 'Google Map' ),
	description: __( 'Display a Google Map on your website with Google Map block.' ),
	icon: 'admin-site',
	category: 'themeisle-blocks',
	keywords: [
		'map',
		'google',
		'orbitfox'
	],
	attributes: {
		location: {
			type: 'string'
		},
		type: {
			type: 'string',
			default: 'roadmap'
		},
		zoom: {
			type: 'number',
			default: 10
		},
		height: {
			type: 'string',
			default: '400px'
		}
	},

	supports: {
		html: false
	},

	edit: compose([

		withSelect( ( select, props ) => {
			return {
				props
			};
		}),

		withState({
			api: '',
			isAPILoaded: false,
			isAPISaved: false,
			isSaving: false
		})

	])( ({ props, className, api, isAPILoaded, isAPISaved, isSaving, setState }) => {

		let settings;

		wp.api.loadPromise.then( () => {
			settings = new wp.api.models.Settings();
		});

		if ( false === isAPILoaded ) {
			settings.fetch().then( response => {
				setState({
					api: response.themeisle_google_map_block_api_key,
					isAPILoaded: true
				});

				if ( '' !== response.themeisle_google_map_block_api_key ) {
					setState({
						isAPISaved: true
					});
				}
			});
		}

		const changeAPI = ( value ) => {
			setState({
				api: value
			});
		};

		const saveAPIKey = () => {

			setState({
				isSaving: true
			});

			const model = new wp.api.models.Settings({
				// eslint-disable-next-line camelcase
				themeisle_google_map_block_api_key: api
			});

			model.save().then( response => {
				settings.fetch();
				setState({
					isSaving: false,
					isAPISaved: true
				});
			});
		};

		const changeLocation = ( value ) => {
			props.setAttributes({ location: value });
		};

		const changeMapType = ( value ) => {
			props.setAttributes({ type: value });
		};

		const changeZoom = ( value ) => {
			props.setAttributes({ zoom: value });
		};

		const changeHeight = ( value ) => {
			props.setAttributes({ height: value });
		};

		if ( ! isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner></Spinner>
					{ __( 'Loading…' ) }
				</Placeholder>
			);
		}

		if ( ! isAPISaved ) {
			return (
				<div className={ className }>
					<Placeholder
						icon="admin-site"
						label={ __( 'Google Maps' ) }
						instructions={ __( 'A Google Maps API key is required, please enter one below.' ) }
					>
						<TextControl
							type="text"
							placeholder={ __( 'Google Maps API Key' ) }
							value={ api }
							className="components-placeholder__input"
							onChange={ changeAPI }
						/>
						<Button
							isLarge
							type="submit"
							onClick={ saveAPIKey }
							isBusy={ isSaving }
							disabled={ '' === api}
						>
							{ __( 'Save API Key' ) }
						</Button>
						<div class="components-placeholder__instructions">
							{ __( 'Need an API key? Get one' ) }
							<a target="_blank" href="https://console.developers.google.com/flows/enableapi?apiid=maps_backend,static_maps_backend,maps_embed_backend&keyType=CLIENT_SIDE&reusekey=true">
								{ __( ' here.' ) }
							</a>
						</div>
					</Placeholder>
				</div>
			);
		}

		return [
			<InspectorControls>
				<PanelBody
					title={ __( 'Map Settings' ) }
				>
					<SelectControl
						label={ __( 'Map Type' ) }
						value={ props.attributes.type }
						options={ [
							{ label: __( 'Road Map' ), value: 'roadmap' },
							{ label: __( 'Satellite View' ), value: 'satellite' }
						] }
						onChange={ changeMapType }
					/>

					<RangeControl
						label={ __( 'Map Zoom Level' ) }
						value={ props.attributes.zoom }
						onChange={ changeZoom }
						min={ 0 }
						max={ 21 }
					/>

					<TextControl
						label={ __( 'Map Height' ) }
						type="text"
						value={ props.attributes.height }
						onChange={ changeHeight }
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
						value={ api }
						className="components-placeholder__input"
						onChange={ changeAPI }
						help={ __( 'Changing the API key effects all Google Map Embed blocks.' ) }
					/>
					<Button
						isLarge
						type="submit"
						onClick={ saveAPIKey }
						isBusy={ isSaving }
						disabled={ '' === api}
					>
						{ __( 'Save API Key' ) }
					</Button>
				</PanelBody>
			</InspectorControls>,

			<TextControl
				type="text"
				placeholder={ __( 'Enter a location…' ) }
				value={ props.attributes.location }
				onChange={ changeLocation }
			/>,

			( props.attributes.location ) && (
				<div className={ `${ className } interactive` }>
					<div className="map" >
						<iframe
							width="100%"
							height="100%"
							frameBorder="0"
							style={ {
								border: 0,
								height: props.attributes.height
							} }
							src={ `https://www.google.com/maps/embed/v1/place?key=${ api }&q=${ props.attributes.location }&maptype=${ props.attributes.type }&zoom=${ props.attributes.zoom }` }
							allowFullScreen={ true }>
						>
						</iframe>
					</div>
				</div>
			)
		];
	}),

	save: () => {
		return null;
	}
});
