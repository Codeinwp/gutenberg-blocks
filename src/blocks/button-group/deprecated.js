/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { times } = lodash;

const { RichText } = wp.editor;

const { Fragment } = wp.element;

const deprecated = [ {
	attributes: {
		id: {
			type: 'string'
		},
		buttons: {
			type: 'number',
			default: 2
		},
		align: {
			type: 'string'
		},
		spacing: {
			type: 'number',
			default: 20
		},
		collapse: {
			type: 'string',
			default: 'collapse-none'
		},
		fontSize: {
			type: 'number',
			default: 18
		},
		fontFamily: {
			type: 'string'
		},
		fontVariant: {
			type: 'string'
		},
		textTransform: {
			type: 'string'
		},
		fontStyle: {
			type: 'string',
			default: 'normal'
		},
		lineHeight: {
			type: 'number'
		},
		data: {
			type: 'array',
			default: [
				{
					text: '',
					link: '',
					newTab: false,
					color: '#ffffff',
					background: '#32373c',
					border: '',
					hoverColor: '',
					hoverBackground: '',
					hoverBorder: '',
					borderSize: 0,
					borderRadius: 0,
					boxShadow: false,
					boxShadowColor: '',
					boxShadowColorOpacity: 50,
					boxShadowBlur: 5,
					boxShadowSpread: 1,
					boxShadowHorizontal: 0,
					boxShadowVertical: 0,
					hoverBoxShadowColor: '',
					hoverBoxShadowColorOpacity: 50,
					hoverBoxShadowBlur: 5,
					hoverBoxShadowSpread: 1,
					hoverBoxShadowHorizontal: 0,
					hoverBoxShadowVertical: 0,
					iconType: 'none',
					prefix: '',
					icon: '',
					paddingTopBottom: 12,
					paddingLeftRight: 24
				},
				{
					text: '',
					link: '',
					newTab: false,
					color: '#ffffff',
					background: '#32373c',
					border: '',
					hoverColor: '',
					hoverBackground: '',
					hoverBorder: '',
					borderSize: 0,
					borderRadius: 0,
					boxShadow: false,
					boxShadowColor: '',
					boxShadowColorOpacity: 50,
					boxShadowBlur: 5,
					boxShadowSpread: 1,
					boxShadowHorizontal: 0,
					boxShadowVertical: 0,
					hoverBoxShadowColor: '',
					hoverBoxShadowColorOpacity: 50,
					hoverBoxShadowBlur: 5,
					hoverBoxShadowSpread: 1,
					hoverBoxShadowHorizontal: 0,
					hoverBoxShadowVertical: 0,
					iconType: 'none',
					prefix: '',
					icon: '',
					paddingTopBottom: 12,
					paddingLeftRight: 24
				}
			]
		}
	},
	save: props => {
		const {
			id,
			buttons,
			align,
			collapse,
			fontSize,
			fontFamily,
			fontStyle,
			fontVariant,
			textTransform,
			lineHeight,
			data
		} = props.attributes;

		const style = {
			fontSize: `${ fontSize }px`,
			fontFamily: fontFamily,
			fontWeight: fontVariant,
			fontStyle: fontStyle,
			textTransform: textTransform,
			lineHeight: lineHeight && `${ lineHeight }px`
		};

		const button = i => {
			const buttonStyle = {
				...style,
				borderWidth: `${ data[i].borderSize }px`,
				borderRadius: `${ data[i].borderRadius }px`,
				padding: `${ data[i].paddingTopBottom }px ${ data[i].paddingLeftRight }px `
			};

			return (
				<Fragment>
					<a
						href={ data[i].link }
						target={ data[i].newTab ? '_blank' : '_self' }
						className={ classnames(
							'wp-block-themeisle-blocks-button',
							`wp-block-themeisle-blocks-button-${ i }`
						) }
						style={ buttonStyle }
					>
						{ ( 'left' === data[i].iconType || 'only' === data[i].iconType ) && (
							<i className={ classnames(
								data[i].prefix,
								'fa-fw',
								`fa-${ data[i].icon }`,
								{ 'margin-right': 'left' === data[i].iconType }
							) }>
							</i>
						) }

						{ 'only' !== data[i].iconType && (
							<RichText.Content
								tagName="span"
								value={ data[i].text }
							/>
						) }

						{ 'right' === data[i].iconType && (
							<i className={ `${ data[i].prefix } fa-fw fa-${ data[i].icon } margin-left` }></i>
						) }
					</a>
				</Fragment>
			);
		};

		const collapseClass = 'collapse-none' !== collapse ? collapse : '';

		return (
			<div
				id={ id }
				className={ classnames(
					props.className,
					collapseClass
				) }
				style={ {
					justifyContent: align,
					alignItems: align ? align : 'flex-start'
				} }
			>
				{ times( buttons, i => button( i ) ) }
			</div>
		);
	}
} ];

export default deprecated;
