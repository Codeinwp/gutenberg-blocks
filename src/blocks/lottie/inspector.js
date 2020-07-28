/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPicker
} = wp.components;

const { Fragment } = wp.element;

const Inspector = ({
	attributes,
	setAttributes
}) => {

	const setSrc = ( value ) => {
		setAttributes({
			src: value
		});
	};

	const setAutoplay = ( value ) => {
		setAttributes({ autoplay: value });
	};

	const setDirection = ( value ) => {
		setAttributes({ direction: Number( value ) });
	};

	const setLoop = ( value ) => {
		setAttributes({ loop: value });
	};

	const setRenderer = ( value ) => {
		setAttributes({ renderer: value });
	};

	const setSpeed = ( value ) => {
		console.log({ ...attributes });
		setAttributes({ speed: Number( value ) });
	};

	const setControls = ( value ) => {
		setAttributes({ controls: value });
	};

	const setBackground = ( value ) => {
		setAttributes({ background: value.hex });
	};

	const setHover = ( value ) => {
		setAttributes({ hover: value });
	};

	const setHeight = ( value ) => {
		setAttributes({ height: value });
	};

	const setWidth = ( value ) => {
		setAttributes({ width: value });
	};


	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>

				<TextControl
					label= { __( 'Lottie Animation URL ' ) }
					help={ __( 'Ex: https://assets1.lottiefiles.com/datafiles/jEgAWaDrrm6qdJx/data.json' ) }
					type='text'
					value={ attributes.src }
					onChange={ setSrc }
				/>

				{
					attributes.src && (
						<Fragment>
							<ToggleControl
								label={ __( 'Autoplay' ) }
								help={ __( 'Set the animation to play automaticaly.' ) }
								checked={ attributes.autoplay }
								onChange={ setAutoplay }
							/>

							<ToggleControl
								label={ __( 'Loop' ) }
								help={ __( 'Whether to loop animation.' ) }
								checked={ attributes.loop }
								onChange={ setLoop }
							/>

							<RangeControl
								label={ __( 'Height' ) }
								help={ __( 'Animation height in pixels.' ) }
								value={ attributes.height }
								onChange={ setHeight }
								min={ 100 }
								max={ 800 }
							/>

							<RangeControl
								label={ __( 'Width' ) }
								help={ __( 'Animation width in pixels.' ) }
								value={ attributes.width }
								onChange={ setWidth }
								min={ 100 }
								max={ 800 }
							/>

							<ColorPicker
								color={ attributes.background }
								onChangeComplete={ setBackground }
								disableAlpha
							/>

							<ToggleControl
								label={ __( 'Controls' ) }
								help={ __( 'Show controls.' ) }
								checked={ attributes.controls }
								onChange={ setControls }
							/>

							<ToggleControl
								label={ __( 'Hover' ) }
								help={ __( 'Whether to play on mouse hover.' ) }
								checked={ attributes.hover}
								onChange={ setHover }
							/>

							<TextControl
								label= { __( 'Speed' ) }
								help={ __( 'Animation speed.' ) }
								type='number'
								value={ attributes.speed }
								onChange={ setSpeed }
							/>

							<SelectControl
								label= { __( 'Direction' ) }
								help={ __( 'Direction of animation.' ) }
								options= { [
									{ label: 'Forward', value: 1 },
									{ label: 'Backward', value: -1 }
								] }
								value={ attributes.direction }
								onChange={ setDirection }
							/>

							<SelectControl
								label= { __( 'Renderer' ) }
								help={ __( 'Renderer to use.' ) }
								options= { [
									{ label: 'svg', value: 'svg' },
									{ label: 'canvas', value: 'canvas' }
								] }
								value={ attributes.renderer }
								onChange={ setRenderer }
							/>
						</Fragment>
					)
				}


			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
