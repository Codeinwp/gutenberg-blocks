const Save = ({
	attributes,
	className
}) => {
	const containerStyle = {
		borderRadius: attributes.borderRadius + '%',
		borderStyle: 'solid',
		borderWidth: attributes.borderSize + 'px',
		display: 'inline-block',
		margin: attributes.margin + 'px'
	};

	const iconStyle = {
		borderRadius: attributes.borderRadius + '%',
		fontSize: attributes.fontSize + 'px',
		padding: attributes.padding + 'px'
	};

	const IconElement = () => {
		return (
			<i
				className={ `${ attributes.prefix } fa-${ attributes.icon }` }
				style={ iconStyle }
			>
			</i>
		);
	};

	return (
		<p
			className={ className }
			id={ attributes.id }
			style={{ textAlign: attributes.align }}
		>
			<span
				className="wp-block-themeisle-blocks-font-awesome-icons-container"
				style={ containerStyle }
			>
				{ ( attributes.link ) ? (
					<a
						href={ attributes.link }
						target={ attributes.newTab ? '_blank' : '_self' }
						style={{
							color: attributes.textColor
						}}
						rel="noopener noreferrer"
					>
						<IconElement />
					</a>
				) : (
					<IconElement />
				) }
			</span>
		</p>
	);
};

export default Save;
