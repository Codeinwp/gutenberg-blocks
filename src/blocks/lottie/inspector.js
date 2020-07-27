/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	TextControl,
	SelectControl,
	ToggleControl
} = wp.components;

const { Fragment } = wp.element;

const Inspector = ({
	attributes,
	setAttributes
}) => {

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
		setAttributes({ background: value });
	};

	const setHover = ( value ) => {
		setAttributes({ hover: value });
	};


	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Autoplay' ) }
					help={ __( 'Set the animation to play automaticaly.' ) }
					checked={ attributes.autoplay }
					onChange={ setAutoplay }
				/>

				<ToggleControl
					label={ __( 'Loop' ) }
					help={ __( 'Whether to loop animation..' ) }
					checked={ attributes.loop }
					onChange={ setLoop }
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
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
