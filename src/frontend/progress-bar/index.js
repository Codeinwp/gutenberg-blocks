const domReady = wp.domReady;

domReady( () => {
	const progressBars = document.querySelectorAll( '.wp-themeisle-progress-bar-block' );

	Array.from( progressBars ).forEach( progressBar => {

		const bar = progressBar.querySelector( '.wp-themeisle-progress-bar-skillbar-bar' );

		const percentage = progressBar.querySelector( '#percentage' );
		console.log( percentage );
		percentage.style.visibility = 'hidden';

		let attributes = {};
		Array.from( progressBar.attributes ).forEach( x => attributes[x.nodeName] = x.nodeValue );

		let options = {
			root: null,
			rootMargin: '0px',
			threshold: [ 0.6 ]
		};

		let observer = new IntersectionObserver( ( entries ) => {

			entries.forEach( entrie => {
				if ( entrie.isIntersecting ) {
					setTimeout( () => {
						percentage.style.visibility = 'unset';

					}, parseFloat( attributes['data-duration']) * 1000 );

					bar.animate(
						{
							width: `${ parseInt( attributes['data-percent']) }%`
						},
						{
							duration: parseFloat( attributes['data-duration']) * 1000,
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
