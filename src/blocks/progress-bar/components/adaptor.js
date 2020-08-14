import attributes from '../attributes';

const extractSettings = attributes => {
	return ({
		color: attributes.progressColor,
		strokeWidth: attributes.strokeWidth,
		trailColor: attributes.trailColor,
		trailWidth: attributes.trailWidth,
		duration: attributes.duration * 1000,
		easing: attributes.easing,
		from: {
			color: attributes.startColor
		},
		to: {
			color: attributes.endColor
		},
		warnings: attributes.warnings
	});
};

const extractAnimation = attributes => {
	return ({
		coloredProgress: attributes.coloredProgress,
		percentage: attributes.percentage
	});
};

const adaptor = attributes => {
	return ({
		settings: extractSettings( attributes ),
		animation: extractAnimation( animation )
	});
};

export default adaptor;
