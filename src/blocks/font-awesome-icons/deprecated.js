const deprecated = [ {
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
} ];

export default deprecated;
