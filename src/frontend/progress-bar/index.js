/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

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
						let num = 0;
						const target = parseInt( number.innerText );
						const time = duration / target;
						let interval = setInterval( () => {
							number.innerText = `${ num }%`;
							if ( num >= target ) {
								clearInterval( interval );
							}
							num++;
						}, time );
					}

					bar.animate(
						{
							width: `${ progressBar.dataset.percent }%`
						},
						{
							duration: duration,
							easing: 'linear',
							fill: 'forwards'
						}
					);
				}
			});
		}, options );

		observer.observe( bar );
	});
});
