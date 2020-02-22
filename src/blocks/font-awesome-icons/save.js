const Save = ({
	attributes,
	className
}) => {
	return (
		<p
			className={ className }
			id={ attributes.id }
		>
			<span className="wp-block-themeisle-blocks-font-awesome-icons-container">
				{ ( attributes.link ) ? (
					<a
						href={ attributes.link }
						target={ attributes.newTab ? '_blank' : '_self' }
						rel="noopener noreferrer"
					>
						<i className={ `${ attributes.prefix } fa-${ attributes.icon }` }></i>
					</a>
				) : (
					<i className={ `${ attributes.prefix } fa-${ attributes.icon }` }></i>
				) }
			</span>
		</p>
	);
};

export default Save;
