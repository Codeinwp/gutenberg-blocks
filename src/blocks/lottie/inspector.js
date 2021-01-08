/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InspectorControls } = wp.blockEditor;

const { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl } = wp.components;

const { Fragment } = wp.element;

const Inspector = ({ attributes, setAttributes, playerRef }) => {
	const onChangeTrigger = (value) => {
		setAttributes({ trigger: value });
	};

	const toggleLoop = (value) => {
		setAttributes({ loop: value });
		playerRef.current.setLooping(value);
		if (attributes.direction) {
			playerRef.current.seek('100%');
		}
		playerRef.current.play();
	};

	const onChangeLoopCount = (value) => {
		setAttributes({ count: Number(value) });
		playerRef.current.load(attributes.file.url);
	};

	const onChangeSpeed = (value) => {
		setAttributes({ speed: Number(value) });
		playerRef.current.setSpeed(value);
	};

	const toggleDirection = (value) => {
		setAttributes({ direction: value });
		playerRef.current.setDirection(value ? -1 : 1);
		playerRef.current.seek(value ? '100%' : 0);
	};

	const onChangeWidth = (value) => {
		setAttributes({ width: Number(value) });
	};

	return (
		<InspectorControls>
			<PanelBody title={__('Settings')} initialOpen={true}>
				<SelectControl
					label={__('Trigger')}
					help={__('Animation trigger. This will only work on the front-end.')}
					value={attributes.trigger}
					options={[
						{ label: __('None'), value: 'none' },
						{ label: __('Scroll'), value: 'scroll' },
						{ label: __('Hover'), value: 'hover' },
						{ label: __('Click'), value: 'click' },
					]}
					onChange={onChangeTrigger}
				/>

				{'scroll' !== attributes.trigger && (
					<Fragment>
						<ToggleControl
							label={__('Loop')}
							help={__('Whether to loop animation.')}
							checked={attributes.loop}
							onChange={toggleLoop}
						/>

						{attributes.loop && (
							<TextControl
								label={__('Numbers of loops')}
								help={__('Number of times to loop animation.')}
								type="number"
								value={attributes.count}
								onChange={onChangeLoopCount}
							/>
						)}

						<RangeControl
							label={__('Speed')}
							help={__('Animation speed.')}
							value={attributes.speed}
							onChange={onChangeSpeed}
							step={0.1}
							min={0.1}
							max={5}
						/>

						<ToggleControl
							label={__('Reverse')}
							help={__('Direction of animation.')}
							checked={attributes.direction}
							onChange={toggleDirection}
						/>
					</Fragment>
				)}

				<RangeControl
					label={__('Width')}
					help={__('Container width in pixels.')}
					value={attributes.width}
					onChange={onChangeWidth}
					min={100}
					max={1000}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
