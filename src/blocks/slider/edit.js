/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { max } = lodash;

const { ResizableBox } = wp.components;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

import Placeholder from './placeholder.js';
import Inspector from './inspector.js';
import Slide from './components/Slide.js';
import SliderControls from './components/slider-controls.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	isSelected,
	toggleSelection
}) => {
	useEffect( () => {
		initBlock();

		return () => {
			if ( attributes.images.length ) {
				sliderRef.current.destroy();
			}
		};
	}, []);

	useEffect( () => {
		if ( attributes.images.length ) {
			setSelectedImage( null );

			if ( null !== sliderRef.current ) {
				sliderRef.current.destroy();
				initSlider();
			}
		}
	}, [ isSelected, attributes.align ]);

	useEffect( () => {
		if ( attributes.images.length && attributes.perView > attributes.images.length ) {
			changePerView( max([ Math.round( attributes.images.length / 2 ), 1 ]) );
		}
	}, [ attributes.images ]);

	const sliderRef = useRef( null );
	const instanceIdRef = useRef( null );

	const [ selectedImage, setSelectedImage ] = useState( null );

	const initBlock = async() => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			const instanceId = `wp-block-themeisle-blocks-slider-${ clientId.substr( 0, 8 ) }`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
			instanceIdRef.current = instanceId;
			blockIDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-slider-${ clientId.substr( 0, 8 ) }`;
			await setAttributes({ id: instanceId });
			IDs.push( instanceId );
			instanceIdRef.current = instanceId;
		} else {
			IDs.push( attributes.id );
			instanceIdRef.current = attributes.id;
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];

		if ( attributes.images.length ) {
			initSlider();
		}
	};

	const initSlider = () => {
		sliderRef.current = new Glide( `#${ attributes.id || instanceIdRef.current }`, {
			type: 'carousel',
			keyboard: false,
			perView: attributes.perView,
			gap: attributes.gap,
			peek: attributes.peek,
			autoplay: false,
			breakpoints: {
				800: {
					perView: 1,
					peek: 0,
					gap: 0
				}
			}
		}).mount();
	};

	const onSelectImages = images => {
		setAttributes({
			images: images.map( image => ({
				id: image.id,
				url: image.url,
				alt: image.alt,
				caption: image.caption
			}) )
		});

		if ( null !== sliderRef.current ) {
			sliderRef.current.destroy();
		}

		initSlider();
	};

	const changePerView = value => {
		setAttributes({ perView: Number( value ) });
		sliderRef.current.update({ perView: Number( value ) });
		if ( 1 === value ) {
			setAttributes({
				gap: 0,
				peek: 0
			});

			sliderRef.current.update({
				gap: 0,
				peek: 0
			});
		}
	};

	if ( Array.isArray( attributes.images ) && ! attributes.images.length ) {
		return (
			<Placeholder
				labels={ {
					title: __( 'Slider' ),
					instructions: __( 'Drag images, upload new ones or select files from your library.' )
				} }
				icon="images-alt2"
				onSelectImages={ onSelectImages }
			/>
		);
	}

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				slider={ sliderRef.current }
				changePerView={ changePerView }
			/>

			<ResizableBox
				size={ {
					height: attributes.height
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
					toggleSelection( false );
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes({
						height: parseInt( attributes.height + delta.height, 10 )
					});
					toggleSelection( true );
				} }
				className={ classnames(
					'wp-block-themeisle-blocks-slider-resizer',
					{ 'is-focused': isSelected }
				) }
			>
				<div
					id={ attributes.id }
					className={ classnames(
						'wp-block-themeisle-blocks-slider',
						'glide',
						className
					) }
				>
					<div className="glide__track" data-glide-el="track">
						<div
							className="glide__slides"
							style={{
								height: `${ attributes.height }px`
							}}
						>
							{ attributes.images.map( ( image, index ) => (
								<Slide
									images={ attributes.images }
									image={ image }
									index={ index }
									isFirstItem={ 0 === index }
									isLastItem={ ( index + 1 ) === attributes.images.length }
									isSelected={ isSelected && image.id === selectedImage }
									setAttributes={ setAttributes }
									setSelectedImage={ setSelectedImage }
								/>
							) ) }
						</div>

						<SliderControls attributes={ attributes } />
					</div>
				</div>
			</ResizableBox>

			{ isSelected && (
				<Placeholder
					labels={ {
						title: '',
						instructions: ''
					} }
					icon={ null }
					onSelectImages={ onSelectImages }
					isAppender={ true }
					value={ attributes.images }
				/>
			) }
		</Fragment>
	);
};

export default Edit;
