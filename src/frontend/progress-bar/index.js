const domReady = wp.domReady;

/*
	Settings
*/

const INTERSECTION_THRESHOLD = [ 0.6 ];

export const BarType = {
	BAR: 'BAR',
	CIRCLE: 'CIRCLE',
	SEMICIRCLE: 'SEMICIRCLE'
};


const extractSettings = attributes => {
	return ({
		color: attributes.progresscolor,
		strokeWidth: parseFloat( attributes.strokewidth ),
		trailColor: attributes.trailcolor,
		trailWidth: parseFloat( attributes.trailwidth ),
		svgStyle: {
			display: 'block',
			width: '100%',
			height: `${attributes.height}px`
		},
		warnings: 'true' === attributes.warnings
	});
};

const extractAnimation = attributes => {
	let from, to;

	if ( 'true' === attributes.coloredprogress ) {
		from = {
			...from,
			color: attributes.startcolor
		};
		to = {
			...to,
			color: attributes.endcolor
		};

	}

	if ( 'true' === attributes.strokeanimation ) {
		from = {
			...from,
			width: 0
		};
		to = {
			...to,
			width: parseFloat( attributes.strokewidth )
		};
	}

	return ({
		coloredProgress: 'true' === attributes.coloredprogress,
		percentage: parseFloat( attributes.percentage ),
		isAnimated: 'true' === attributes.animated,
		strokeAnimation: 'true' === attributes.strokeanimation,
		hideValue: 'true' === attributes.hidevalue,
		options: {
			duration: attributes.duration * 1000,
			easing: attributes.easing,
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
			value.innerText = `${ percentage }%`;

			if ( ! animation.hideValue ) {
				if ( 0 === percentage ) {
					bar.setText( '' );
				} else {
					bar.setText( `${percentage}%` );
				}
			}

			console.log( bar.value() );
		};

		let bar;

		switch ( attributes.type ) {
		case BarType.BAR:
			bar = new ProgressBar.Line( container, {
				...settings,
				step,
				text: {
					style: {
						color: attributes.textcolor,
						position: 'absolute',
						padding: 0,
						margin: 0,
						transform: null,
						fontSize: `${ attributes.height * 0.8 }px`
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
					value: '',
					autoStyleContainer: false
				}
			});
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = `${attributes.height / 4 }px`;
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
			bar.text.style.fontSize = `${attributes.height / 4 }px`;
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
			value.innerText = '0%';
			let observer = new IntersectionObserver( ( entries ) => {

				entries.forEach( entrie => {
					if ( entrie.isIntersecting && 0 ===  Math.round( bar.value() * 100 ) ) {
						if ( animation.isAnimated  ) {

							bar.animate( ( animation.percentage / 100 ).toFixed( 2 ), animation.options, () => {
								value.innerText = `${ animation.percentage }%`;
								bar.setText( `${ animation.percentage }%` );
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

