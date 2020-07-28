const deprecated = [ {
	attributes: {
		prefix: {
			type: 'string',
			default: 'fab'
		},
		icon: {
			type: 'string',
			default: 'themeisle'
		},
		fontSize: {
			type: 'number',
			default: 16
		},
		padding: {
			type: 'number',
			default: 5
		},
		margin: {
			type: 'number',
			default: 5
		},
		backgroundColor: {
			type: 'string'
		},
		textColor: {
			type: 'string'
		},
		borderColor: {
			type: 'string'
		},
		borderSize: {
			type: 'number',
			default: 0
		},
		borderRadius: {
			type: 'number',
			default: 0
		}
	},

	supports: {
		align: [ 'left', 'center', 'right' ]
	},

	migrate: ( attributes ) => {
		let align = 'center';

		if ( attributes.className.includes( 'alignleft' ) ) {
			align = 'left';
		}

		if ( attributes.className.includes( 'aligncenter' ) ) {
			align = 'center';
		}

		if ( attributes.className.includes( 'alignright' ) ) {
			align = 'right';
		}

		return {
			...attributes,
			align: align,
			className: ''
		};
	},

	save: props => {
		const iconStyle = {
			borderRadius: props.attributes.borderRadius + '%',
			fontSize: props.attributes.fontSize + 'px',
			padding: props.attributes.padding + 'px'
		};

		const containerStyle = {
			color: props.attributes.textColor,
			backgroundColor: props.attributes.backgroundColor,
			borderColor: props.attributes.borderColor,
			borderRadius: props.attributes.borderRadius + '%',
			borderStyle: 'solid',
			borderWidth: props.attributes.borderSize + 'px',
			display: 'inline-block',
			margin: props.attributes.margin + 'px'
		};

		return (
			<p
				className={ props.className }
				style={{ textAlign: props.attributes.align }}
			>
				<span
					className={ `${ props.className }-container` }
					style={ containerStyle }
				>
					<i
						className={ `${ props.attributes.prefix } fa-${ props.attributes.icon }` }
						style={ iconStyle }
					>
					</i>
				</span>
			</p>
		);
	}
}, {
	attributes: {
		align: {
			type: 'string'
		},
		prefix: {
			type: 'string',
			default: 'fab'
		},
		icon: {
			type: 'string',
			default: 'themeisle'
		},
		fontSize: {
			type: 'number',
			default: 16
		},
		padding: {
			type: 'number',
			default: 5
		},
		margin: {
			type: 'number',
			default: 5
		},
		backgroundColor: {
			type: 'string'
		},
		textColor: {
			type: 'string'
		},
		borderColor: {
			type: 'string'
		},
		borderSize: {
			type: 'number',
			default: 0
		},
		borderRadius: {
			type: 'number',
			default: 0
		}
	},

	save: props => {
		const iconStyle = {
			borderRadius: props.attributes.borderRadius + '%',
			fontSize: props.attributes.fontSize + 'px',
			padding: props.attributes.padding + 'px'
		};

		const containerStyle = {
			color: props.attributes.textColor,
			backgroundColor: props.attributes.backgroundColor,
			borderColor: props.attributes.borderColor,
			borderRadius: props.attributes.borderRadius + '%',
			borderStyle: 'solid',
			borderWidth: props.attributes.borderSize + 'px',
			display: 'inline-block',
			margin: props.attributes.margin + 'px'
		};

		return (
			<p
				className={ props.className }
				style={{ textAlign: props.attributes.align }}
			>
				<span
					className="undefined-container"
					style={ containerStyle }
				>
					<i
						className={ `${ props.attributes.prefix } fa-${ props.attributes.icon }` }
						style={ iconStyle }
					>
					</i>
				</span>
			</p>
		);
	}
}, {
	attributes: {
		id: {
			type: 'string'
		},
		align: {
			type: 'string'
		},
		prefix: {
			type: 'string',
			default: 'fab'
		},
		icon: {
			type: 'string',
			default: 'themeisle'
		},
		link: {
			type: 'string'
		},
		newTab: {
			type: 'boolean',
			default: false
		},
		fontSize: {
			type: 'number',
			default: 16
		},
		padding: {
			type: 'number',
			default: 5
		},
		margin: {
			type: 'number',
			default: 5
		},
		backgroundColor: {
			type: 'string'
		},
		textColor: {
			type: 'string'
		},
		borderColor: {
			type: 'string'
		},
		backgroundColorHover: {
			type: 'string'
		},
		textColorHover: {
			type: 'string'
		},
		borderColorHover: {
			type: 'string'
		},
		borderSize: {
			type: 'number',
			default: 0
		},
		borderRadius: {
			type: 'number',
			default: 0
		}
	},

	save: ({
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
	}
} ];

export default deprecated;
