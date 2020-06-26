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

const attributes = {
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
};

const deprecated = [ {
	attributes,

	save: ({
		attributes,
		className
	}) => {
		const collapseClass = 'collapse-none' !== attributes.collapse ? attributes.collapse : '';

		const style = {
			fontSize: `${ attributes.fontSize }px`,
			fontFamily: attributes.fontFamily,
			fontWeight: attributes.fontVariant,
			fontStyle: attributes.fontStyle,
			textTransform: attributes.textTransform,
			lineHeight: attributes.lineHeight && `${ attributes.lineHeight }px`
		};

		const button = i => {
			const buttonStyle = {
				...style,
				borderWidth: `${ attributes.data[i].borderSize }px`,
				borderRadius: `${ attributes.data[i].borderRadius }px`,
				padding: `${ attributes.data[i].paddingTopBottom }px ${ attributes.data[i].paddingLeftRight }px`
			};

			return (
				<Fragment>
					<a
						href={ attributes.data[i].link }
						target={ attributes.data[i].newTab ? '_blank' : '_self' }
						className={ classnames(
							'wp-block-themeisle-blocks-button',
							`wp-block-themeisle-blocks-button-${ i }`
						) }
						style={ buttonStyle }
					>
						{ ( 'left' === attributes.data[i].iconType || 'only' === attributes.data[i].iconType ) && (
							<i className={ classnames(
								attributes.data[i].prefix,
								'fa-fw',
								`fa-${ attributes.data[i].icon }`,
								{ 'margin-right': 'left' === attributes.data[i].iconType }
							) }>
							</i>
						) }

						{ 'only' !== attributes.data[i].iconType && (
							<RichText.Content
								tagName="span"
								value={ attributes.data[i].text }
							/>
						) }

						{ 'right' === attributes.data[i].iconType && (
							<i className={ `${ attributes.data[i].prefix } fa-fw fa-${ attributes.data[i].icon } margin-left` }></i>
						) }
					</a>
				</Fragment>
			);
		};

		return (
			<div
				id={ attributes.id }
				className={ classnames(
					className,
					collapseClass
				) }
				style={ {
					justifyContent: attributes.align,
					alignItems: attributes.align ? attributes.align : 'flex-start'
				} }
			>
				{ times( attributes.buttons, i => button( i ) ) }
			</div>
		);
	}
}, {
	attributes,

	save: ({
		attributes,
		className
	}) => {
		const collapseClass = 'collapse-none' !== attributes.collapse ? attributes.collapse : '';

		const style = {
			fontSize: `${ attributes.fontSize }px`,
			fontFamily: attributes.fontFamily,
			fontWeight: attributes.fontVariant,
			fontStyle: attributes.fontStyle,
			textTransform: attributes.textTransform,
			lineHeight: attributes.lineHeight && `${ attributes.lineHeight }px`
		};

		const button = i => {
			const buttonStyle = {
				...style,
				borderWidth: `${ attributes.data[i].borderSize }px`,
				borderRadius: `${ attributes.data[i].borderRadius }px`,
				padding: `${ attributes.data[i].paddingTopBottom }px ${ attributes.data[i].paddingLeftRight }px`
			};

			return (
				<Fragment>
					<a
						href={ attributes.data[i].link }
						target={ attributes.data[i].newTab ? '_blank' : '_self' }
						className={ classnames(
							'wp-block-themeisle-blocks-button',
							`wp-block-themeisle-blocks-button-${ i }`
						) }
						style={ buttonStyle }
						rel="noopener noreferrer"
					>
						{ ( 'left' === attributes.data[i].iconType || 'only' === attributes.data[i].iconType ) && (
							<i className={ classnames(
								attributes.data[i].prefix,
								'fa-fw',
								`fa-${ attributes.data[i].icon }`,
								{ 'margin-right': 'left' === attributes.data[i].iconType }
							) }>
							</i>
						) }

						{ 'only' !== attributes.data[i].iconType && (
							<RichText.Content
								tagName="span"
								value={ attributes.data[i].text }
							/>
						) }

						{ 'right' === attributes.data[i].iconType && (
							<i className={ `${ attributes.data[i].prefix } fa-fw fa-${ attributes.data[i].icon } margin-left` }></i>
						) }
					</a>
				</Fragment>
			);
		};

		return (
			<div
				id={ attributes.id }
				className={ classnames(
					className,
					collapseClass
				) }
				style={ {
					justifyContent: attributes.align,
					alignItems: attributes.align ? attributes.align : 'flex-start'
				} }
			>
				{ times( attributes.buttons, i => button( i ) ) }
			</div>
		);
	}
} ];

export default deprecated;
