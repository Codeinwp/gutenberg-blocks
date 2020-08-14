/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl
} = wp.components;

/**
 * Internal dependencies
 */
import { LOOP_OPTIONS } from './constants.js';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	const setAutoplay = value => {
		setAttributes({ autoplay: value });
	};

	const setLoopType = loopType => {
		setAttributes({
			loopType: loopType,
			loop: loopType === LOOP_OPTIONS.CONTINUOUS
		});
	};

	const setLoopCount = value => {
		setAttributes({ loopCount: value });
	};

	const setRenderer = value => {
		setAttributes({ renderer: value });
	};

	const setSpeed = value => {
		setAttributes({ speed: Number( value ) });
	};

	const setControls = value => {
		setAttributes({ controls: value });
	};

	const setHover = value => {
		setAttributes({ hover: value });
	};

	const setHeight = value => {
		setAttributes({ height: value });
	};

	const setWidth = value => {
		setAttributes({ width: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>
				<ToggleControl
					label={ __( 'Autoplay' ) }
					help={ __( 'Set the animation to play automaticaly after loading.' ) }
					checked={ attributes.autoplay }
					onChange={ setAutoplay }
				/>

				<RangeControl
					label={ __( 'Speed' ) }
					help={ __( 'Animation speed.' ) }
					value={ attributes.speed }
					onChange={ setSpeed }
					min={ 1 }
					max={ 10 }
				/>

				<SelectControl
					label= { __( 'Loop Type' ) }
					help={ __( 'Whether to loop animation.' ) }
					options= { [
						{ label: LOOP_OPTIONS.NONE, value: LOOP_OPTIONS.NONE },
						{ label: LOOP_OPTIONS.CONTINUOUS, value: LOOP_OPTIONS.CONTINUOUS },
						{ label: LOOP_OPTIONS.COUNTED, value: LOOP_OPTIONS.COUNTED }
					] }
					value={ attributes.loopType }
					onChange={ setLoopType }
				/>

				{
					attributes.loopType === LOOP_OPTIONS.COUNTED && (
						<RangeControl
							label={ __( 'Numbers of loops' ) }
							value={ attributes.loopCount }
							onChange={ setLoopCount }
							min={ 0 }
							max={ 10 }
						/>
					)
				}

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

				<ToggleControl
					label={ __( 'Controls' ) }
					help={ __( 'Show controls ( play, stop, ...) to user.' ) }
					checked={ attributes.controls }
					onChange={ setControls }
				/>

				<ToggleControl
					label={ __( 'Hover' ) }
					help={ __( 'Whether to play on mouse hover.' ) }
					checked={ attributes.hover }
					onChange={ setHover }
				/>

				<SelectControl
					label= { __( 'Renderer' ) }
					help={ __( 'Renderer to use.' ) }
					options= { [
						{ label: 'svg', value: 'svg' },
						{ label: 'html', value: 'html' }
					] }
					value={ attributes.renderer }
					onChange={ setRenderer }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
