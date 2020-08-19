const domReady = wp.domReady;

const extractSettings = attributes => {

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
		color: attributes.progresscolor,
		strokeWidth: parseFloat( attributes.strokewidth ),
		trailColor: attributes.trailcolor,
		trailWidth: parseFloat( attributes.trailwidth ),
		duration: attributes.duration * 1000,
		easing: attributes.easing,
		to,
		from,
		svgStyle: {
			display: 'block',
			width: '100%',
			height: `${attributes.height}px`
		},
		warnings: 'true' === attributes.warnings
	});
};

const extractAnimation = attributes => {
	return ({
		coloredProgress: 'true' === attributes.coloredprogress,
		percentage: parseFloat( attributes.percentage ),
		isAnimated: 'true' === attributes.animated,
		strokeAnimation: 'true' === attributes.strokeanimation
	});
};

export const BarType = {
	BAR: 'BAR',
	CIRCLE: 'CIRCLE',
	SEMICIRCLE: 'SEMICIRCLE'
};


domReady( () => {
	const bars = document.getElementsByTagName( 'PROGRESS-BAR' );

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

		let bar;

		const step = ( state, bar ) => {

			if ( animation.coloredProgress ) {
				bar.path.setAttribute( 'stroke', state.color );
			}

			if ( animation.strokeAnimation ) {
				bar.path.setAttribute( 'stroke-width', state.width );
			}

			value.innerHTML = `${ Math.round( bar.value() * 100 ) }%`;
			console.log( bar.value() );
		};

		switch ( attributes.type ) {
		case BarType.BAR:
			bar = new ProgressBar.Line( container, {
				...settings,
				step
			});
			break;
		case BarType.CIRCLE:
			bar = new ProgressBar.Circle( container, {
				...settings
			});
			break;
		case BarType.SEMICIRCLE:
			bar = new ProgressBar.SemiCircle( container, {
				...settings
			});
			break;
		}

		if ( animation.isAnimated ) {
			bar.animate( ( animation.percentage / 100 ).toFixed( 2 ) );
		} else {
			bar.set( ( animation.percentage / 100 ).toFixed( 2 ) );
		}
	});
});

