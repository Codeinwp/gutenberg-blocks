const Save = ({
	attributes,
	className
}) => {
	return (
		<lottie-player
			id={ attributes.id }
			className={ className }
			src={ attributes.file.url }
			autoplay
			count={ attributes.count }
			speed={ attributes.speed }
			direction={ attributes.direction ? -1 : 1 }
			style={ {
				width: attributes.width,
				height: 'auto'
			} }
			mode="normal"
		>
		</lottie-player>
	);
};

export default Save;
