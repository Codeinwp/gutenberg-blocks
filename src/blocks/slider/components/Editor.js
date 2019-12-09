/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	debounce,
	filter,
	max
} = lodash;

const {
	InspectorControls,
	MediaPlaceholder
} = wp.blockEditor || wp.editor;

const {
	PanelBody,
	Path,
	RangeControl,
	ResizableBox,
	SVG,
	ToggleControl
} = wp.components;

const {
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import Slide from './Slide.js';

class Editor extends Component {
	constructor() {
		super( ...arguments );
		this.initSlider = this.initSlider.bind( this );
		this.onSelectImagesDebounced = debounce( this.onSelectImages, 250 );
		this.changeCaption = this.changeCaption.bind( this );
		this.onMove = this.onMove.bind( this );
		this.onMoveForward = this.onMoveForward.bind( this );
		this.onMoveBackward = this.onMoveBackward.bind( this );
		this.onRemoveImage = this.onRemoveImage.bind( this );
		this.changePerView = this.changePerView.bind( this );
		this.changeGap = this.changeGap.bind( this );
		this.changePeek = this.changePeek.bind( this );
		this.changeHeight = this.changeHeight.bind( this );
		this.changeAutoplay = this.changeAutoplay.bind( this );

		this.slider;

		this.state = {
			selectedImage: null
		};
	}

	async componentDidMount() {
		if ( this.props.attributes.id === undefined || this.props.attributes.id.substr( this.props.attributes.id.length - 8 ) !== this.props.clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-slider-${ this.props.clientId.substr( 0, 8 ) }`;
			await this.props.setAttributes({ id: instanceId });
		}

		if ( this.props.attributes.images.length ) {
			this.initSlider();
		}
	}

	componentWillUnmount() {
		if ( this.props.attributes.images.length ) {
			this.slider.destroy();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.attributes.images.length ) {
			if ( ( ! this.props.isSelected && prevProps.isSelected ) || ( this.props.attributes.align !== prevProps.attributes.align ) ) {
				this.setState({
					selectedImage: null
				});

				if ( undefined !== this.slider ) {
					this.slider.destroy();
					this.initSlider();
				}
			}

			if ( this.props.attributes.perView > this.props.attributes.images.length ) {
				this.changePerView( max([ Math.round( this.props.attributes.images.length / 2 ), 1 ]) );
			}
		}
	}

	initSlider() {
		this.slider = new Glide( `#${ this.props.attributes.id }`, {
			type: 'carousel',
			keyboard: false,
			perView: this.props.attributes.perView,
			gap: this.props.attributes.gap,
			peek: this.props.attributes.peek,
			autoplay: false,
			breakpoints: {
				800: {
					perView: 1,
					peek: 0,
					gap: 0
				}
			}
		}).mount();
	}

	onSelectImages( images ) {
		this.props.setAttributes({
			images: images.map( image => ({
				id: image.id,
				url: image.url,
				alt: image.alt,
				caption: image.caption
			}) )
		});

		if ( undefined !== this.slider ) {
			this.slider.destroy();
		}

		this.initSlider();
	}

	changeCaption( value, index ) {
		const images = [ ...this.props.attributes.images ];
		images[index].caption = value;
		this.props.setAttributes({ images });
	}

	onMove( oldIndex, newIndex ) {
		const images = [ ...this.props.attributes.images ];
		images.splice( newIndex, 1, this.props.attributes.images[ oldIndex ]);
		images.splice( oldIndex, 1, this.props.attributes.images[ newIndex ]);
		this.setState({ selectedImage: newIndex });
		this.props.setAttributes({ images });
	}

	onMoveForward( oldIndex ) {
		if ( oldIndex === this.props.attributes.images.length - 1 ) {
			return;
		}
		this.onMove( oldIndex, oldIndex + 1 );
	}

	onMoveBackward( oldIndex ) {
		if ( 0 === oldIndex ) {
			return;
		}
		this.onMove( oldIndex, oldIndex - 1 );
	}

	onRemoveImage( index ) {
		const images = filter( this.props.attributes.images, ( img, i ) => index !== i );
		this.setState({ selectedImage: null });
		this.props.setAttributes({ images });
	}

	changePerView( value ) {
		this.props.setAttributes({ perView: Number( value ) });
		this.slider.update({ perView: Number( value ) });
		if ( 1 === value ) {
			this.props.setAttributes({
				gap: 0,
				peek: 0
			});

			this.slider.update({
				gap: 0,
				peek: 0
			});
		}
	}

	changeGap( value ) {
		this.props.setAttributes({ gap: Number( value ) });
		this.slider.update({ gap: Number( value ) });
	}

	changePeek( value ) {
		this.props.setAttributes({ peek: Number( value ) });
		this.slider.update({ peek: Number( value ) });
	}

	changeHeight( value ) {
		this.props.setAttributes({ height: Number( value ) });
	}

	changeAutoplay( value ) {
		this.props.setAttributes({ autoplay: value });
		this.slider.update({ autoplay: value ? 2000 : false });
	}

	render() {
		if ( Array.isArray( this.props.attributes.images ) && ! this.props.attributes.images.length ) {
			return (
				<MediaPlaceholder
					labels={ {
						title: __( 'Slider' ),
						instructions: __( 'Drag images, upload new ones or select files from your library.' )
					} }
					icon="images-alt2"
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					onSelect={ e => this.onSelectImagesDebounced( e ) }
					multiple
				/>
			);
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Settings' ) }
					>
						{ this.props.attributes.images.length && (
							<Fragment>
								<RangeControl
									label={ __( 'Slides Per Page' ) }
									help={ __( 'A number of visible slides.' ) }
									value={ this.props.attributes.perView }
									onChange={ this.changePerView }
									min={ 1 }
									max={ max([ Math.round( this.props.attributes.images.length / 2 ), 1 ]) }
								/>

								{ 1 < this.props.attributes.perView && (
									<Fragment>
										<RangeControl
											label={ __( 'Gap' ) }
											help={ __( 'A size of the space between slides.' ) }
											value={ this.props.attributes.gap }
											onChange={ this.changeGap }
											min={ 0 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Peek' ) }
											help={ __( 'The value of the future slides which have to be visible in the current slide.' ) }
											value={ this.props.attributes.peek }
											onChange={ this.changePeek }
											min={ 0 }
											max={ 100 }
										/>
									</Fragment>
								) }

								<RangeControl
									label={ __( 'Height' ) }
									help={ __( 'Slider height in pixels.' ) }
									value={ this.props.attributes.height }
									onChange={ this.changeHeight }
									min={ 100 }
									max={ 1400 }
								/>

								<ToggleControl
									label={ __( 'Autoplay' ) }
									help={ __( 'Autoplay slider in the front.' ) }
									checked={ this.props.attributes.autoplay }
									onChange={ this.changeAutoplay }
								/>
							</Fragment>
						) }
					</PanelBody>
				</InspectorControls>

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
						'wp-block-themeisle-blocks-slider-resizer',
						{ 'is-focused': this.props.isSelected }
					) }
				>
					<div
						id={ this.props.attributes.id }
						className={ classnames(
							'wp-block-themeisle-blocks-slider',
							'glide',
							this.props.className
						) }
					>
						<div className="glide__track" data-glide-el="track">
							<div
								className="glide__slides"
								style={{
									height: `${ this.props.attributes.height }px`
								}}
							>
								{ this.props.attributes.images.map( ( image, index ) => (
									<Slide
										image={ image }
										index={ index }
										isFirstItem={ 0 === index }
										isLastItem={ ( index + 1 ) === this.props.attributes.images.length }
										isSelected={ this.props.isSelected && image.id === this.state.selectedImage }
										onSelect={ () => this.setState({ selectedImage: image.id }) }
										onMoveBackward={ this.onMoveBackward }
										onMoveForward={ this.onMoveForward }
										onRemoveImage={ this.onRemoveImage }
										changeCaption={ this.changeCaption }
									/>
								) ) }
							</div>

							<div className="glide__arrows" data-glide-el="controls">
								<button className="glide__arrow glide__arrow--left" data-glide-dir="<">
									<SVG
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 100 100"
									>
										<Path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></Path>
									</SVG>
								</button>
								<button className="glide__arrow glide__arrow--right" data-glide-dir=">">
									<SVG
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 100 100"
									>
										<Path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z"></Path>
									</SVG>
								</button>
							</div>

							<div className="glide__bullets" data-glide-el="controls[nav]">
								{ this.props.attributes.images.map( ( image, index ) => (
									<button className="glide__bullet" data-glide-dir={ `=${ index }` }></button>
								) ) }
							</div>
						</div>
					</div>
				</ResizableBox>

				{ this.props.isSelected && (
					<MediaPlaceholder
						labels={ {
							title: '',
							instructions: ''
						} }
						isAppender={ true }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						className="wp-block-themeisle-blocks-slider-uploader"
						value={ this.props.attributes.images }
						onSelect={ e => this.onSelectImagesDebounced( e ) }
						multiple
					/>
				) }
			</Fragment>
		);
	}
}

export default Editor;
