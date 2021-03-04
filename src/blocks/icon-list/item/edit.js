/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { RichText } = wp.blockEditor;

const { createBlock } = wp.blocks;

const { useSelect } = wp.data;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import themeIsleIcons from './../../../helpers/themeisle-icons.js';
import { initBlock } from '../../../helpers/blocks-helpers.js';


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

	initBlock( attributes, setAttributes, clientId, 'wp-block-themeisle-blocks-icon-list-item-', name, defaultAttributes );

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

	let iconClassName;
	let contentStyle;
	let iconStyle;
	let itemStyle;

	if ( hasParent ) {
		if ( ! hasCustomIcon || ! attributes.library ) {
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
