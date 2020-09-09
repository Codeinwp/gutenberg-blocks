/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

/**
 * Internal dependencies
 */
import { range, linear } from './utils.js';

domReady( () => {
	const progressBars = document.querySelectorAll( '.wp-block-themeisle-blocks-progress-bar' );

	Array.from( progressBars ).forEach( progressBar => {
		const duration = progressBar.dataset.duration * 1000;
		const bar = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__area__bar' );
		const borderRadius = window.getComputedStyle( bar ).borderTopLeftRadius.replace( 'px', '' );
		const number = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__number' );
		const tooltip = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__area__tooltip' );
		const inline = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__progress' );
		const outerTitle = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__outer__title' );
		const innerTitle = progressBar.querySelector( '.wp-block-themeisle-blocks-progress-bar__area__title' );

		let titleWidth;
		if ( outerTitle ) {
			titleWidth = outerTitle.getBoundingClientRect().width;
		} else if ( innerTitle ) {
			titleWidth = innerTitle.getBoundingClientRect().width;
		}

		const numberWidth = number.getBoundingClientRect().width;

		let options = {
			root: null,
			rootMargin: '0px',
			threshold: [ 0.6 ]
		};

		if ( 0 === duration ) {
			bar.style.width = `${ parseInt( number.innerText ) }%`;
			number.innerText = `${ parseInt( number.innerText ) }%`;
			if ( tooltip ) {
				tooltip.style.opacity = 1;
			}
			if ( inline ) {
				inline.style.opacity = 1;
			}
		} else {
			let observer = new IntersectionObserver( entries => {
				entries.forEach( entry => {
					if ( entry.isIntersecting ) {
						if ( number ) {

							let interval;

							if ( interval ) {
								clearInterval( interval );
							}

							const step = 10; // for a more smother animation, decrease the value
							const totalPercent =  parseInt( number.innerText );
							const percentPerTime = range( 0, duration, step ).map( x => linear( x  / duration ) * totalPercent ).reverse();

							interval = setInterval( () => {
								const value = percentPerTime.pop();
								bar.style.width = `${ value }%`;
								number.innerText = `${ Math.ceil( value ) }%`;

								const currentWidth = bar.getBoundingClientRect().width;

								if ( currentWidth < borderRadius ) {
									bar.style.visibility = 'hidden';
								} else {
									bar.style.visibility = 'unset';
								}

								if ( tooltip ) {
									if ( outerTitle ) {
										if ( currentWidth > titleWidth + 10 ) {
											tooltip.style.opacity = 1;
										}
									} else {
										tooltip.style.opacity = 1;
									}
								}

								if ( inline ) {
									if ( innerTitle ) {
										if ( currentWidth > titleWidth + numberWidth + 5 ) {
											inline.style.opacity = 1;
										}
									} else {
										if ( 4 <=  value ) {
											inline.style.opacity = 1;
										}
									}
								}


								if ( ! percentPerTime.length ) {
									observer.unobserve( bar );
									clearInterval( interval );
								}
							}, step );
						}
					}
				});
			}, options );

			setTimeout( () => observer.observe( bar ), 100 );
		}
	});
});
