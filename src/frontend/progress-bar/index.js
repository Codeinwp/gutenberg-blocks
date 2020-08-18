
//import adaptor from './../../blocks/progress-bar/adaptor.js';
//import ProgressBar from 'progressbar.js';

const domReady = wp.domReady;

const extractSettings = attributes => {

	let from, to;

	if ( attributes.coloredprogress ) {
		from = {
			...from,
			color: attributes.startcolor
		};
		to = {
			...to,
			color: attributes.endcolor
		};

	}

	if ( attributes.strokeanimation ) {
		from = {
			...from,
			width: 0
		};
		to = {
			...to,
			width: attributes.strokewidth
		};
	}


	return ({
		color: attributes.progresscolor,
		strokeWidth: attributes.strokewidth,
		trailColor: attributes.trailcolor,
		trailWidth: attributes.trailwidth,
		duration: attributes.duration * 1000,
		easing: attributes.easing,
		to,
		from,
		svgStyle: {
			display: 'block',
			width: '100%',
			height: `${attributes.height}px`
		},
		warnings: attributes.warnings
	});
};

export const BarType = {
	BAR: 'BAR',
	CIRCLE: 'CIRCLE',
	SEMICIRCLE: 'SEMICIRCLE'
};

export const barsRef = [];

domReady( () => {
	const bars = document.getElementsByTagName( 'PROGRESS-BAR' );

	console.log( bars );

	Array.from( bars ).forEach( element => {


		const container = element.querySelector( '#container' );

		//const value = element.querySelector( 'value' );

		let attributes = {};
		Array.from( element.attributes ).forEach( x => attributes[x.nodeName] = x.nodeValue );
		console.log( attributes );
		console.log( container );

		const settings  = extractSettings( attributes );

		console.log( settings );

		let bar;

		switch ( attributes.type ) {
		case BarType.BAR:
			bar = new ProgressBar.Line( container, {
				...settings,
				//step
			});
			break;
		case BarType.CIRCLE:
			bar = new ProgressBar.Circle( container, {
				...settings,
				step
			});
			break;
		case BarType.SEMICIRCLE:
			bar = new ProgressBar.SemiCircle( container, {
				...settings,
				step
			});
			break;
		}

		barsRef.push( bar );
	});
});

