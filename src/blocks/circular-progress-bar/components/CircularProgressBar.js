
const CircularProgressBar = ({
	attributes,
	progressRef,
	valueRef
}) => {
	const size = attributes.height;
	const center = size / 2;
	const radius = size / 2 - attributes.strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;

	//const progressOffSet = ( ( 100 - percentage ) / 100 ) * circumference;

	return (
		<div
			className="wp-block-themeisle-blocks-circular-progress-bar__bar"
			style={{
				height: size + 'px',
				width: size + 'px'
			}}
		>
			<svg
				className="wp-block-themeisle-blocks-circular-progress-bar-container"
				width={ size }
				height={ size }
				preserveAspectRatio="xMidYMid meet"
			>
				<circle
					className="wp-block-themeisle-blocks-circular-progress-bar-bg"
					cx={ center }
					cy={ center }
					r={ radius }
					strokeWidth={ attributes.strokeWidth }
					style={{
						stroke: attributes.backgroundColor
					}}
				/>
				<circle
					ref={ progressRef }
					className="wp-block-themeisle-blocks-circular-progress-bar-progress"
					cx={ center }
					cy={ center }
					r={ radius }
					strokeWidth={ attributes.strokeWidth }
					strokeDasharray={ circumference }

					//strokeDashoffset={ progressOffSet }
					style={{
						stroke: attributes.progressColor
					}}
				/>
				<text
					ref={ valueRef }
					className="wp-block-themeisle-blocks-circular-progress-bar-text"
					x="50%"
					y="50%"
					style={{
						fill: attributes.progressColor,
						fontSize: attributes.fontSize + 'px'
					}}
				>
					{ attributes.percentage }%
				</text>
			</svg>
		</div>
	);
};

export default CircularProgressBar;
