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
			loop
			count={ attributes.direction ? attributes.count * -1 : attributes.count }
			speed={ attributes.speed }
			direction={ attributes.direction ? -1 : 1 }
			trigger={ attributes.trigger }
			width={ attributes.width }
			data-loop={ attributes.loop }
			mode="normal"
		>
		</lottie-player>
	);
};

export default Save;
