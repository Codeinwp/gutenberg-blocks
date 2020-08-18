/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

domReady( () => {
	const animations = document.querySelectorAll( '.wp-block-themeisle-blocks-lottie' );

	animations.forEach( animation => {
		animation.addEventListener( 'load', () => {
			if ( 'false' === animation.dataset.loop ) {
				animation.setLooping( false );

				if ( -1 === animation.__direction ) {
					animation.seek( '100%' );
				}
			}

			if ( -1 === animation.__direction && 'true' === animation.dataset.loop ) {
				animation.setLooping( true );

				if ( Boolean( animation.__count ) ) {
					animation.addEventListener( 'frame', e => {
						if ( e.target.getLottie().playCount === animation.__count && e.target.getLottie().currentFrame ) {
							animation.stop();
						}
					});
				}
			}

			if ( animation.getAttribute( 'width' ) ) {
				animation.style.width = `${ animation.getAttribute( 'width' ) }px`;
				animation.style.height = 'auto';
			}
		});
	});
});
