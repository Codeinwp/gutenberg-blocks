/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { createBlock } = wp.blocks;

const { useSelect } = wp.data;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

const { isEqual } = lodash;

const { RichText } = wp.blockEditor;

import defaultAttributes from './attributes.js';
import defaults from '../../../plugins/options/global-defaults/defaults.js';
import Inspector from './inspector.js';
import themeIsleIcons from './../../../helpers/themeisle-icons.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	name,
	clientId,
	onReplace,
	onRemove,
	mergeBlocks
}) => {
	const [ hasCustomIcon, setHasCustomIcon ] = useState( false );

	const {
		hasParent,
		parentClass,
		parentAttributes
	} = useSelect( select => {
		const {
			getBlock,
			getBlockRootClientId
		} = select( 'core/block-editor' );

		const parentClientId = getBlockRootClientId( clientId );
		const parentBlock = getBlock( parentClientId );

		return {
			hasParent: parentBlock ? true : false,
			parentClass: parentBlock.attributes.className || '',
			parentAttributes: parentBlock ? parentBlock.attributes : {}
		};
	}, []);

	useEffect( () => {
		initBlock();
	}, []);

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-icon-list-item-${ clientId.substr( 0, 8 ) }`;

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
			const instanceId = `wp-block-themeisle-blocks-icon-list-item-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};

	let iconClassName;
	let contentStyle;
	let iconStyle;
	let itemStyle;

	if ( hasParent ) {
		if ( ! hasCustomIcon && ! attributes.library ) {
			iconClassName =  `${ parentAttributes.defaultIconPrefix } fa-${ parentAttributes.defaultIcon }`;

			setAttributes({
				library: parentAttributes.defaultLibrary,
				icon: parentAttributes.defaultIcon,
				iconPrefix: parentAttributes.defaultIconPrefix
			});
		} else {
			iconClassName = `${ attributes.iconPrefix } fa-${ attributes.icon }`;
		}

		contentStyle = {
			color: attributes.contentColor || parentAttributes.defaultContentColor,
			fontSize: parentAttributes.defaultSize + 'px'
		};

		iconStyle = {
			color: attributes.iconColor || parentAttributes.defaultIconColor,
			fill: attributes.iconColor || parentAttributes.defaultIconColor,
			fontSize: parentAttributes.defaultSize + 'px'
		};

		if ( parentClass.includes( 'is-style-horizontal' ) ) {
			itemStyle = {
				marginRight: parentAttributes.gap + 'px'
			};
		} else {
			itemStyle = {
				marginBottom: parentAttributes.gap + 'px'
			};
		}
	};

	const changeContent = value => {
		setAttributes({ content: value });
	};

	const Icon = themeIsleIcons.icons[ attributes.icon ];

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				setHasCustomIcon={ setHasCustomIcon }
			/>

			<div
				className={ className }
				style={ itemStyle }
			>
				{ 'themeisle-icons' === attributes.library && attributes.icon ? (
					<Icon
						className={ classnames(
							iconClassName,
							{ 'wp-block-themeisle-blocks-icon-list-item-icon': ! attributes.iconColor },
							{ 'wp-block-themeisle-blocks-icon-list-item-icon-custom': attributes.iconColor }
						) }
						style={ {
							...iconStyle,
							width: parentAttributes.defaultSize + 'px'
						} }
					/>
				) : (
					<i
						className={ classnames(
							iconClassName,
							{ 'wp-block-themeisle-blocks-icon-list-item-icon': ! attributes.iconColor },
							{ 'wp-block-themeisle-blocks-icon-list-item-icon-custom': attributes.iconColor }
						) }
						style={ iconStyle }
					></i>
				) }

				<RichText
					identifier="content"
					tagName="p"
					placeholder={ __( 'Write your content…' ) }
					className={ classnames(
						{ 'wp-block-themeisle-blocks-icon-list-item-content': ! attributes.contentColor },
						{ 'wp-block-themeisle-blocks-icon-list-item-content-custom': attributes.contentColor }
					) }
					style={ contentStyle }
					value={ attributes.content }
					onChange={ changeContent }
					onSplit={ ( value ) => {
						if ( ! value ) {
							return createBlock( name );
						}

						return createBlock( name, {
							...attributes,
							content: value
						});
					} }
					onMerge={ mergeBlocks }
					onReplace={ onReplace }
					onRemove={ onRemove }
					keepPlaceholderOnFocus={ true }
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
