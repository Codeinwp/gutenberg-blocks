/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl
} = wp.components;

const Inspector = ({
	attributes,
	setAttributes,
	playerRef
}) => {
	const toggleLoop = value => {
		setAttributes({ loop: value });
		playerRef.current.setLooping( value );
		playerRef.current.play();
	};

	const onChangeLoopCount = value => {
		setAttributes({ count: value });
		playerRef.current.load( attributes.file.url );
	};

	const onChangeSpeed = value => {
		setAttributes({ speed: value });
		playerRef.current.setSpeed( value );
	};

	const toggleDirection = value => {
		setAttributes({ direction: value });
		console.log( playerRef.current, value ? -1 : 1 );
		playerRef.current.setDirection( value ? -1 : 1 );
	};

	const onChangeWidth = value => {
		setAttributes({ width: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Loop' ) }
					help={ __( 'Whether to loop animation.' ) }
					checked={ attributes.loop }
					onChange={ toggleLoop }
				/>

				{ attributes.loop && (
					<TextControl
						label={ __( 'Numbers of loops' ) }
						help={ __( 'Number of times to loop animation.' ) }
						type="number"
						value={ attributes.count }
						onChange={ onChangeLoopCount }
					/>
				) }

				<RangeControl
					label={ __( 'Speed' ) }
					help={ __( 'Animation speed.' ) }
					value={ attributes.speed }
					onChange={ onChangeSpeed }
					step={ 0.1 }
					min={ 0.1 }
					max={ 5 }
				/>

				<ToggleControl
					label={ __( 'Reverse' ) }
					help={ __( 'Direction of animation.' ) }
					checked={ attributes.direction }
					onChange={ toggleDirection }
				/>

				<RangeControl
					label={ __( 'Width' ) }
					help={ __( 'Container width in pixels.' ) }
					value={ attributes.width }
					onChange={ onChangeWidth }
					min={ 100 }
					max={ 1000 }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
