
const extractSettings = attributes => {

	let from, to;

	if ( attributes.coloredProgress ) {
		from = {
			...from,
			color: attributes.startColor
		};
		to = {
			...to,
			color: attributes.endColor
		};

	}

	if ( attributes.strokeAnimation ) {
		from = {
			...from,
			width: 0
		};
		to = {
			...to,
			width: attributes.strokeWidth
		};
	}


	return ({
		color: attributes.progressColor,
		strokeWidth: attributes.strokeWidth,
		trailColor: attributes.trailColor,
		trailWidth: attributes.trailWidth,
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

const extractAnimation = attributes => {
	return ({
		coloredProgress: attributes.coloredProgress,
		percentage: attributes.percentage,
		isAnimated: attributes.animated,
		strokeAnimation: attributes.strokeAnimation
	});
};

const adaptor = attributes => {
	return ({
		settings: extractSettings( attributes ),
		animation: extractAnimation( attributes )
	});
};

export default adaptor;
