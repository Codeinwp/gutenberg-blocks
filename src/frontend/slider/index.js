/**
 * WordPress dependencies
 */
const { omit } = lodash;

const domReady = wp.domReady;

domReady( () => {
	const sliders = document.querySelectorAll( '.wp-block-themeisle-blocks-slider' );
	sliders.forEach( slider => {
		const options = omit({ ...slider.dataset }, [ 'autoplay' ]);
		Object.keys( options ).map( option => options[option] = Number( options[option]) );
		new Glide( `#${ slider.id }`, {
			type: 'carousel',
			keyboard: true,
			autoplay: 'true' === slider.dataset.autoplay ? 2000 : false,
			hoverpause: true,
			...options,
			breakpoints: {
				800: {
					perView: 1,
					peek: 0,
					gap: 0
				}
			}
		}).mount();
	});
});
