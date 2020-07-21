/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	debounce,
	max
} = lodash;

const {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck
} = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
	ToggleControl
} = wp.components;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import ImageGrid from './components/ImageGrid.js';

const Inspector = ({
	attributes,
	setAttributes,
	slider,
	changePerView,
	onSelectImages
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
	};

	const changeDelay = value => {
		setAttributes({ delay: value });
	};

	const toggleArrows = value => {
		setAttributes({ hideArrows: value });
	};

	const toggleBullets = value => {
		setAttributes({ hideBullets: value });
	};

	const selectImages = debounce( onSelectImages, 250 );

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Images' ) }
				initialOpen={ false }
			>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ selectImages }
						allowedTypes={ [ 'image' ] }
						multiple
						addToGallery={ true }
						gallery
						value={ attributes.images.map( ({ id }) => id ) }
						render={ ({ open }) => (
							<ImageGrid
								attributes={ attributes }
								open={ open }
								onSelectImages={ onSelectImages }
							/>
						) }
					/>
				</MediaUploadCheck>
			</PanelBody>

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

						{ attributes.autoplay && (
							<RangeControl
								label={ __( 'Delay' ) }
								help={ __( 'Delay in slide change (in seconds).' ) }
								value={ attributes.delay }
								onChange={ changeDelay }
								min={ 1 }
								max={ 10 }
							/>
						) }

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
