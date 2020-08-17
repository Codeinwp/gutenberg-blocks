const { useEffect, useRef } = wp.element;

//import classname from "classnames";
import ProgressBar from 'progressbar.js';


const SemicircleBar = ({ settings, animation, getValue }) => {

	const semicircleRef = useRef( null );

	const init = () => {
		if ( semicircleRef.current ) {
			semicircleRef.current.innerHTML = '';
		}
	};

	useEffect( () => {
		const startAnimation = async() => {
			init();
			console.log({ ...settings });
			const semicircle = new ProgressBar.SemiCircle( semicircleRef.current, {
				...settings,
				step: ( state, semicircle ) => {

					if ( animation.coloredProgress ) {
						semicircle.path.setAttribute( 'stroke', state.color );
					}

					if ( animation.strokeAnimation ) {
						semicircle.path.setAttribute( 'stroke-width', state.width );
					}

					getValue( Math.round( semicircle.value() * 100 ) );
				}
			});
			if ( animation.isAnimated ) {
				semicircle.animate( ( animation.percentage / 100 ).toFixed( 2 ) );
			} else {
				semicircle.set( ( animation.percentage / 100 ).toFixed( 2 ) );
			}
		};

		if ( semicircleRef.current ) {
			startAnimation();
		}

	}, [ settings ]);

	return (
		<div ref={semicircleRef} />
	);
};

export default SemicircleBar;
