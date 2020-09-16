
const CircularProgressBar = ({
	size,
	percentage,
	strokeWidth,
	backgroundStroke,
	progressStroke,
	progressRef,
	valueRef
}) => {

	const center = size / 2;
	const radius = size / 2 - strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;

	//const progressOffSet = ( ( 100 - percentage ) / 100 ) * circumference;

	const fontSize = size * 0.30;

	return (
		<div
			className="wp-block-themeisle-blocks-circular-progress-bar__bar"
			style={{
				height: size + 'px'
			}}
		>
			<svg
				className="wp-block-themeisle-blocks-circular-progress-bar-container"
				width={ size }
				height={ size }
			>
				<circle
					className="wp-block-themeisle-blocks-circular-progress-bar-bg"
					cx={ center }
					cy={ center }
					r={ radius }
					strokeWidth={ strokeWidth }
					style={{
						stroke: backgroundStroke
					}}
				/>
				<circle
					ref={ progressRef }
					className="wp-block-themeisle-blocks-circular-progress-bar-progress"
					cx={ center }
					cy={ center }
					r={ radius }
					strokeWidth={ strokeWidth }
					strokeDasharray={ circumference }

					//strokeDashoffset={ progressOffSet }
					style={{
						stroke: progressStroke
					}}
				/>
				<text
					ref={ valueRef }
					className="wp-block-themeisle-blocks-circular-progress-bar-text"
					x="50%"
					y="50%"
					style={{
						fill: progressStroke,
						fontSize: fontSize + 'px'
					}}
				>
					{ percentage }%
				</text>
			</svg>
		</div>
	);
};

export default CircularProgressBar;
