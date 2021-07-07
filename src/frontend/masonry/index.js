/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady( () => {
	const galleries = document.getElementsByClassName( 'wp-block-themeisle-blocks-masonry' );

	Array.from( galleries ).forEach( gallery => {
		const container = gallery.querySelector( '.wp-block-gallery' );
		const pattern = /columns-(\d)/;

		const margin = Number( gallery.dataset.margin ) || 0;

		let columns = Array.from( container.classList ).find( className => {
			const res = pattern.exec( className );
			if ( null !== res ) {
				return true;
			}
		});

		columns = pattern.exec( columns );
		columns = columns ? Number( columns[1]) : 3;

		container.className = '';

		Macy({
			container: gallery.querySelector( '.blocks-gallery-grid' ),
			trueOrder: false,
			waitForImages: false,
			margin,
			columns
		});
	});
});
