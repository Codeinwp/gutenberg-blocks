/**
 * External dependencies
 */
import { Player, Controls } from '@lottiefiles/react-lottie-player';

/**
 * Wordpress dependencies
 */
const { Fragment, useEffect, useRef } = wp.element;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';

const LottiePlayer = ({ attributes, setAttributes }) => {

	const playerRef = useRef( null );

	useEffect( () => {
		if ( playerRef ) {
			console.log( playerRef, attributes.speed );
			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
		}
	});

	const setSrc = ( src ) => {
		attributes.src = src;
		setAttributes({
			...attributes
		});
	};

	const renderPlayer = () => {

		// if ( ! attributes.src ) {
		// 	return (

		// 	)
		// }

		return (
			<Player
				ref= { playerRef }
				style={{ height: '300px', width: '300px' }}
				{ ...attributes }
			>
				<Controls visible={ attributes.controls } buttons={[ 'play', 'repeat', 'debug' ]} />
			</Player>
		);
	};

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes }/>
			{ renderPlayer() }
		</Fragment>
	);
};

export default LottiePlayer;

