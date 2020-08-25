const domReady = wp.domReady;

/*
	Settings
*/

const INTERSECTION_THRESHOLD = [ 0.6 ];

const BarType = {
	BAR: 'BAR',
	CIRCLE: 'CIRCLE',
	SEMICIRCLE: 'SEMICIRCLE'
};


const extractSettings = attributes => {
	return ({
		color: attributes['data-progress-color'],
		strokeWidth: parseFloat( attributes['data-stroke-width']),
		trailColor: attributes['data-trail-color'],
		trailWidth: parseFloat( attributes['data-trail-width']),
		textColor: attributes['data-text-color'],
		svgStyle: {
			display: 'block',
			width: '100%',
			height: `${attributes['data-height']}px`
		},
		warnings: 'true' === attributes['data-warnings']
	});
};

const extractAnimation = attributes => {
	let from, to;

	if ( 'true' === attributes['data-colored-progress']) {
		from = {
			...from,
			color: attributes['data-start-color']
		};
		to = {
			...to,
			color: attributes['data-end-color']
		};
	}

	if ( 'true' === attributes['data-stroke-animation']) {
		from = {
			...from,
			width: 0
		};
		to = {
			...to,
			width: parseFloat( attributes['data-stroke-width'])
		};
	}

	return ({
		coloredProgress: 'true' === attributes['data-colored-progress'],
		percentage: parseFloat( attributes['data-percentage']),
		isAnimated: 'true' === attributes['data-animated'],
		strokeAnimation: 'true' === attributes['data-stroke-animation'],
		hideValue: 'true' === attributes['data-hide-value'],
		options: {
			duration: attributes['data-duration'] * 1000,
			easing: attributes['data-easing'],
			to,
			from
		}
	});
};


domReady( () => {
	const bars = document.querySelectorAll( '.wp-themeisle-block-progress-bar' );

	console.log( bars );

	Array.from( bars ).forEach( element => {


		const container = element.querySelector( '#container' );

		const value = element.querySelector( '#value' );

		let attributes = {};
		Array.from( element.attributes ).forEach( x => attributes[x.nodeName] = x.nodeValue );
		console.log( element.attributes );

		//console.log( container );
		//console.log( value );

		const settings  = extractSettings( attributes );
		const animation = extractAnimation( attributes );

		console.log( settings );
		console.log( animation );


		const step = ( state, bar ) => {

			if ( animation.coloredProgress ) {
				bar.path.setAttribute( 'stroke', state.color );
			}

			if ( animation.strokeAnimation ) {
				bar.path.setAttribute( 'stroke-width', state.width );
			}

			const percentage = Math.round( bar.value() * 100 );
			if ( value ) {
				value.innerText = `Testing: ${ percentage }%`;
			}

			if ( ! animation.hideValue ) {
				if ( 0 === percentage ) {
					bar.setText( '' );
				} else {
					bar.setText( `${percentage}%` );
				}
			}
		};

		let bar;

		switch ( attributes['data-type']) {
		case BarType.BAR:
			bar = new ProgressBar.Line( container, {
				...settings,
				step,
				text: {
					style: {
						color: settings.textColor,
						position: 'absolute',
						padding: 0,
						margin: 0,
						right: '1%',
						transform: null,
						fontSize: `${ attributes['data-height'] * 0.8 }px`
					},
					autoStyleContainer: false,
					alignToBottom: false
				}
			});
			break;

		case BarType.CIRCLE:
			bar = new ProgressBar.Circle( container, {
				...settings,
				step,
				text: {
					autoStyleContainer: false
				}
			});
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = `${attributes['data-height'] / 4 }px`;
			break;

		case BarType.SEMICIRCLE:
			bar = new ProgressBar.SemiCircle( container, {
				...settings,
				step,
				text: {
					value: '',
					alignToBottom: false
				}
			});
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = `${attributes['data-height'] / 4 }px`;
			bar.text.style.bottom = '12%';
			break;
		}

		bar.set( 0 );

		setTimeout( () => {
			let options = {
				root: null,
				rootMargin: '0px',
				threshold: INTERSECTION_THRESHOLD
			};
			if ( value ) {
				value.innerText = `Testing: ${ percentage }%`;
			}
			let observer = new IntersectionObserver( ( entries ) => {

				entries.forEach( entrie => {
					if ( entrie.isIntersecting && 0 ===  Math.round( bar.value() * 100 ) ) {
						if ( animation.isAnimated  ) {

							bar.animate( ( animation.percentage / 100 ).toFixed( 2 ), animation.options, () => {

								// value.innerText = `${ animation.percentage }%`;
								// bar.setText( `${ animation.percentage }%` );
							});
						} else {
							bar.set( ( animation.percentage / 100 ).toFixed( 2 ) );
						}
					}
				});
			}, options );

			observer.observe( container );
		}, 1000 );


	});
});

