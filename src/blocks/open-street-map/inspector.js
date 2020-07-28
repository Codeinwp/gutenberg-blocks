/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	PanelBody,
	RangeControl,
	TextControl
} = wp.components;

const { InspectorControls } = wp.blockEditor;

const { useRef } = wp.element;

const Inspector = ({
	attributes,
	setAttributes,
	map
})=>{
	const changeLocation = value => {
		setAttributes({ location: value.target.value });
	};

	const changeLatitude = value => {
		setAttributes({ latitude: value.toString() });
		const latitude = Number( value );
		const longitude = attributes.longitude;

		//const latLng = new google.maps.LatLng( latitude, longitude );

		map.panTo([ latitude, longitude ]);
	};

	const changeLongitude = value => {
		setAttributes({ longitude: value.toString() });
		const latitude = attributes.latitude;
		const longitude = Number( value );

		//const latLng = new google.maps.LatLng( latitude, longitude );
		map.panTo([ latitude, longitude ]);
	};

	const changeZoom = value => {
		setAttributes({ zoom: value });
		map.setZoom( value );
	};

	const changeHeight = value => {
		setAttributes({ height: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={__( 'Location' )}
			>
				<BaseControl
					label={__( 'Location' )}
					id="wp-block-themeisle-blocks-open-street-map-search"
				>
					<input
						type="text"
						id="wp-block-themeisle-blocks-open-street-map-search"
						placeholder={__( 'Enter a location…' )}
						value={attributes.location}
						className="wp-block-themeisle-blocks-open-street-map-search"

						//ref={searchRef}
						//onFocus={initSearch}
						onChange={changeLocation}
					/>
				</BaseControl>
				<TextControl
					label={__( 'Latitude' )}
					type="text"
					placeholder={__( 'Enter latitude…' )}
					value={attributes.latitude}
					onChange={changeLatitude}
				/>

				<TextControl
					label={__( 'Longitude' )}
					type="text"
					placeholder={__( 'Enter longitude' )}
					value={attributes.longitude}
					onChange={changeLongitude}
				/>
			</PanelBody>

			<PanelBody
				title={__( 'Positioning & Zooming' )}
				initialOpen={false}
			>
				{/* <SelectControl
					label={__( 'Map Type' )}
					value={attributes.type}
					options={[
						{ label: __( 'Road Map' ), value: 'roadmap' },
						{ label: __( 'Satellite View' ), value: 'satellite' },
						{ label: __( 'Hybrid' ), value: 'hybrid' },
						{ label: __( 'Terrain' ), value: 'terrain' }
					]}
					onChange={changeMapType}
				/> */}

				<RangeControl
					label={__( 'Map Zoom Level' )}
					value={attributes.zoom}
					onChange={changeZoom}
					min={0}
					max={20}
				/>

				<RangeControl
					label={__( 'Map Height' )}
					value={attributes.height}
					onChange={changeHeight}
					min={100}
					max={1400}
				/>
			</PanelBody>
		</InspectorControls>
	);
};
export default Inspector;
