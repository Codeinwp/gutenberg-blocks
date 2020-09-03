/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

import { range, linear } from './utils.js';

domReady( () => {
	const progressBars = document.querySelectorAll( '.wp-block-themeisle-blocks-progress-bar' );

	Array.from( progressBars ).forEach( progressBar => {
		const duration = progressBar.dataset.duration * 1000;
		const bar = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__area__bar' );
		const number = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__number' );

		let options = {
			root: null,
			rootMargin: '0px',
			threshold: [ 0.6 ]
		};

		let observer = new IntersectionObserver( entries => {
			entries.forEach( entry => {
				if ( entry.isIntersecting ) {
					if ( number ) {
						const step = 10; // for a more smother animation, decrease the value
						const totalPercent =  parseInt( number.innerText );
						const percentPerTime = range( 0, duration, step ).map( x => linear( x  / duration ) * totalPercent ).reverse();

						let interval = setInterval( () => {
							const value = percentPerTime.pop();
							bar.style.width = `${ value }%`;
							number.innerText = `${ Math.ceil( value ) }%`;
							if ( ! percentPerTime.length ) {
								clearInterval( interval );
							}
						}, step );
					}
				}
			});
		}, options );

		observer.observe( bar );
	});
});
