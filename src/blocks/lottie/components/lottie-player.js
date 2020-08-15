/**
 * Wordpress dependencies
 */
const { isEmpty } = lodash;

const { useEffect } = wp.element;

const LottiePlayer = ({
	attributes,
	playerRef
}) => {
	useEffect( () => {
		if ( ! isEmpty( attributes.file ) && attributes.loop && playerRef.current ) {
			playerRef.current.addEventListener( 'complete', initLoop );
		}
	}, []);

	const initLoop = () => {
		if ( playerRef.current ) {
			playerRef.current.setLooping( attributes.loop );
			playerRef.current.play();
			playerRef.current.removeEventListener( 'complete', initLoop );
		}
	};

	return (
		<lottie-player
			id={ attributes.id }
			className={ attributes.className }
			ref={ playerRef }
			src={ attributes.file.url }
			autoplay
			count={ attributes.count }
			speed={ attributes.speed }
			direction={ attributes.direction ? -1 : 1 }
			style={ {
				width: attributes.width,
				height: 'auto'
			} }
			mode="normal"
		>
		</lottie-player>
	);
};

export default LottiePlayer;
