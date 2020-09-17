/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

/**
 * Internal dependencies
 */
import { range, linear } from './utils.js';

domReady( () => {
	const progressBars = document.querySelectorAll( '.wp-block-themeisle-blocks-circular-progress-bar' );

	Array.from( progressBars ).forEach( progressBar => {

		const duration = progressBar.dataset.duration * 1000;
		const circumference = progressBar.dataset.circumference;
		const percentage = progressBar.dataset.percentage;

		const progressRef = progressBar.querySelector( '.wp-block-themeisle-blocks-circular-progress-bar-progress' );
		const valueRef = progressBar.querySelector( '.wp-block-themeisle-blocks-circular-progress-bar-text' );

		if ( ! duration || ! circumference || ! percentage || ! progressRef || ! valueRef ) {
			return;
		}

		if ( 0 === duration ) {
			progressRef.style.strokeDashoffset = ( ( 100 - percentage ) / 100 ) * circumference;
			valueRef.current.innerText = percentage + '%';
		} else {

			progressRef.style.strokeDashoffset = circumference;
			valueRef.innerText = '0%';

			let options = {
				root: null,
				rootMargin: '0px',
				threshold: [ 0.6 ]
			};

			let interval;

			let observer = new IntersectionObserver( entries => {
				entries.forEach( entry => {
					if ( entry.isIntersecting ) {


						if ( interval ) {
							clearInterval( interval );
						}

						const step = 20; // for a more smother animation, decrease the value
						const totalPercent =  parseInt( percentage );
						const percentPerTime = range( 0, duration, step ).map( x => linear( x  / duration ) * totalPercent ).reverse();

						interval = setInterval( () => {
							const value =  Math.round( percentPerTime.pop() );
							console.log( value );
							progressRef.style.strokeDashoffset = ( ( 100 - value ) / 100 ) * circumference;
							valueRef.innerHTML = value + '%';
							if ( ! percentPerTime.length ) {
								observer.unobserve( progressBar );
								clearInterval( interval );
							}
						}, step );

					}
				});
			}, options );

			setTimeout( () => observer.observe( progressBar ), 100 );
		}
	});
});
