const { useEffect, useRef } = wp.element;

//import classname from "classnames";
import ProgressBar from 'progressbar.js';


const SimpleBar = ({ settings, animation, getValue }) => {

	const barRef = useRef( null );

	const init = () => {
		if ( barRef.current ) {
			barRef.current.innerHTML = '';
		}
	};

	useEffect( () => {
		const startAnimation = async() => {
			init();
			const bar = new ProgressBar.Line( barRef.current, {
				...settings,
				step: ( state, bar ) => {

					if ( animation.coloredProgress ) {
						bar.path.setAttribute( 'stroke', state.color );
					}

					getValue( Math.round( bar.value() * 100 ) );
				}
			});
			bar.animate( ( animation.percentage / 100 ).toFixed( 2 ) );
		};

		startAnimation();
	}, [ settings ]);

	return (
		<div ref={barRef} />
	);
};

export default SimpleBar;
