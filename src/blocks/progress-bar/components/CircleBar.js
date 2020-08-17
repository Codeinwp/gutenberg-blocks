const { useEffect, useRef } = wp.element;

//import classname from "classnames";
import ProgressBar from 'progressbar.js';


const CircleBar = ({ settings, animation, getValue }) => {

	const circleRef = useRef( null );

	const init = () => {
		if ( circleRef.current ) {
			circleRef.current.innerHTML = '';
		}
	};

	useEffect( () => {
		const startAnimation = async() => {
			init();
			console.log({ ...settings });
			const circle = new ProgressBar.Circle( circleRef.current, {
				...settings,
				step: ( state, circle ) => {

					if ( animation.coloredProgress ) {
						circle.path.setAttribute( 'stroke', state.color );
					}

					if ( animation.strokeAnimation ) {
						circle.path.setAttribute( 'stroke-width', state.width );
					}

					getValue( Math.round( circle.value() * 100 ) );
				}
			});
			if ( animation.isAnimated ) {
				circle.animate( ( animation.percentage / 100 ).toFixed( 2 ) );
			} else {
				circle.set( ( animation.percentage / 100 ).toFixed( 2 ) );
			}
		};

		if ( circleRef.current ) {
			startAnimation();
		}

	}, [ settings ]);

	return (
		<div ref={circleRef} />
	);
};

export default CircleBar;
