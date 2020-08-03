/** @jsx jsx */

/**
 * External dependencies
 */
import { css, jsx } from '@emotion/core';
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { isEqual } = lodash;

const { RichText } = wp.blockEditor;

const { useSelect } = wp.data;

const {
	Fragment,
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import Controls from './controls.js';
import Inspector from './inspector.js';
import defaults from '../../../plugins/options/global-defaults/defaults.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	name,
	clientId
}) => {
	const {
		hasParent,
		parentAttributes,
		isLastChild
	} = useSelect( select => {
		const {
			getBlock,
			getBlockRootClientId
		} = select( 'core/block-editor' );

		const parentClientId = getBlockRootClientId( clientId );
		const parentBlock = getBlock( parentClientId );

		return {
			hasParent: parentBlock ? true : false,
			parentAttributes: parentBlock ? parentBlock.attributes : {},
			isLastChild: parentBlock ? clientId === parentBlock.innerBlocks[ parentBlock.innerBlocks.length - 1 ].clientId : true
		};
	}, []);

	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-button-${ clientId.substr( 0, 8 ) }`;

			const globalDefaults = window.themeisleGutenberg.globalDefaults ? window.themeisleGutenberg.globalDefaults : undefined;

			if ( undefined !== globalDefaults ) {
				if ( ! isEqual( defaults[ name ], window.themeisleGutenberg.globalDefaults[ name ]) ) {
					attrs = { ...window.themeisleGutenberg.globalDefaults[ name ] };

					Object.keys( attrs ).map( i => {
						if ( attributes[i] !== attrs[i] && ( undefined !== defaultAttributes[i].default && attributes[i] !== defaultAttributes[i].default ) ) {
							return delete attrs[i];
						}
					});
				}
			}

			setAttributes({
				...attrs,
				id: instanceId
			});

			IDs.push( instanceId );
			blockIDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-button-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};

	let boxShadowStyle = {};

	let buttonStyle = {};

	let buttonStyleParent = {};

	if ( attributes.boxShadow ) {
		boxShadowStyle = {
			boxShadow: `${ attributes.boxShadowHorizontal }px ${ attributes.boxShadowVertical }px ${ attributes.boxShadowBlur }px ${ attributes.boxShadowSpread }px ${  hexToRgba( ( attributes.boxShadowColor ? attributes.boxShadowColor : '#000000' ), attributes.boxShadowColorOpacity ) }`
		};
	}

	if ( hasParent ) {
		buttonStyleParent = {
			marginRight: ! isLastChild && `${ parentAttributes.spacing }px`
		};

		buttonStyle = {
			paddingTop: `${ parentAttributes.paddingTopBottom }px`,
			paddingBottom: `${ parentAttributes.paddingTopBottom }px`,
			paddingLeft: `${ parentAttributes.paddingLeftRight }px`,
			paddingRight: `${ parentAttributes.paddingLeftRight }px`,
			fontSize: parentAttributes.fontSize && `${ parentAttributes.fontSize }px`,
			fontFamily: parentAttributes.fontFamily,
			fontWeight: parentAttributes.fontVariant,
			fontStyle: parentAttributes.fontStyle,
			textTransform: parentAttributes.textTransform,
			lineHeight: parentAttributes.lineHeight && `${ parentAttributes.lineHeight }px`
		};
	}

	const styles = {
		color: attributes.color,
		background: attributes.background || attributes.backgroundGradient,
		border: `${ attributes.borderSize }px solid ${ attributes.border }`,
		borderRadius: attributes.borderRadius,
		...boxShadowStyle,
		...buttonStyle
	};

	const hoverStyles = css`
		&:hover {
			color: ${ attributes.hoverColor } !important;
			background: ${ attributes.hoverBackground || attributes.hoverBackgroundGradient } !important;
			border-color: ${ attributes.hoverBorder } !important;
			${ attributes.boxShadow && `box-shadow: ${ attributes.hoverBoxShadowHorizontal }px ${ attributes.hoverBoxShadowVertical }px ${ attributes.hoverBoxShadowBlur }px ${ attributes.hoverBoxShadowSpread }px ${  hexToRgba( ( attributes.hoverBoxShadowColor ? attributes.hoverBoxShadowColor : '#000000' ), attributes.hoverBoxShadowColorOpacity ) } !important;` }
		}
	`;

	return (
		<Fragment>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
			/>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				id={ attributes.id }
				className={ classnames(
					className,
					'wp-block-button'
				) }
				style={ buttonStyleParent }
			>
				{ 'none' !== attributes.iconType ? (
					<div
						className="wp-block-button__link"
						style={ styles }
						css={ hoverStyles }
					>
						{ ( 'left' === attributes.iconType || 'only' === attributes.iconType ) && (
							<i
								className={ classnames(
									attributes.prefix,
									'fa-fw',
									`fa-${ attributes.icon }`,
									{ 'margin-right': 'left' === attributes.iconType }
								) }
							>
							</i>
						) }

						{ 'only' !== attributes.iconType && (
							<RichText
								placeholder={ __( 'Add text…' ) }
								value={ attributes.text }
								onChange={ value => setAttributes({ text: value }) }
								tagName="div"
								withoutInteractiveFormatting
							/>
						) }

						{ 'right' === attributes.iconType && (
							<i className={ `${ attributes.prefix } fa-fw fa-${ attributes.icon } margin-left` }></i>
						) }
					</div>
				) : (
					<RichText
						placeholder={ __( 'Add text…' ) }
						value={ attributes.text }
						onChange={ value => setAttributes({ text: value }) }
						tagName="div"
						withoutInteractiveFormatting
						className="wp-block-button__link"
						style={ styles }
						css={ hoverStyles }
					/>
				) }
			</div>
		</Fragment>
	);
};

export default Edit;
