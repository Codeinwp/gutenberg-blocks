/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { max } = lodash;

const { InspectorControls } = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
	ToggleControl
} = wp.components;

const { Fragment } = wp.element;

const Inspector = ({
	attributes,
	setAttributes,
	slider,
	changePerView
}) => {
	const changeGap = value => {
		setAttributes({ gap: Number( value ) });
		slider.update({ gap: Number( value ) });
	};

	const changePeek = value => {
		setAttributes({ peek: Number( value ) });
		slider.update({ peek: Number( value ) });
	};

	const changeHeight = value => {
		setAttributes({ height: Number( value ) });
	};

	const toggleAutoplay = value => {
		setAttributes({ autoplay: value });
		slider.update({ autoplay: value ? 2000 : false });
	};

	const toggleArrows = value => {
		setAttributes({ hideArrows: value });
	};

	const toggleBullets = value => {
		setAttributes({ hideBullets: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings' ) }
			>
				{ attributes.images.length && (
					<Fragment>
						<RangeControl
							label={ __( 'Slides Per Page' ) }
							help={ __( 'A number of visible slides.' ) }
							value={ attributes.perView }
							onChange={ changePerView }
							min={ 1 }
							max={ max([ Math.round( attributes.images.length / 2 ), 1 ]) }
						/>

						{ 1 < attributes.perView && (
							<Fragment>
								<RangeControl
									label={ __( 'Gap' ) }
									help={ __( 'A size of the space between slides.' ) }
									value={ attributes.gap }
									onChange={ changeGap }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Peek' ) }
									help={ __( 'The value of the future slides which have to be visible in the current slide.' ) }
									value={ attributes.peek }
									onChange={ changePeek }
									min={ 0 }
									max={ 100 }
								/>
							</Fragment>
						) }

						<RangeControl
							label={ __( 'Height' ) }
							help={ __( 'Slider height in pixels.' ) }
							value={ attributes.height }
							onChange={ changeHeight }
							min={ 100 }
							max={ 1400 }
						/>

						<ToggleControl
							label={ __( 'Autoplay' ) }
							help={ __( 'Autoplay slider in the front.' ) }
							checked={ attributes.autoplay }
							onChange={ toggleAutoplay }
						/>

						<ToggleControl
							label={ __( 'Hide Arrows' ) }
							help={ __( 'Hide navigation arrows.' ) }
							checked={ attributes.hideArrows }
							onChange={ toggleArrows }
						/>

						<ToggleControl
							label={ __( 'Hide Bullets' ) }
							help={ __( 'Hide navigation bullets.' ) }
							checked={ attributes.hideBullets }
							onChange={ toggleBullets }
						/>
					</Fragment>
				) }
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
