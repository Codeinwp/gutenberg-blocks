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
	useEffect
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import themeIsleIcons from './../../../helpers/themeisle-icons.js';
import { addBlockId } from '../../../helpers/block-utility.js';

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
		const unsubscribe = addBlockId({
			attributes,
			setAttributes,
			clientId,
			name,
			idPrefix: 'wp-block-themeisle-blocks-icon-list-item-',
			defaultAttributes
		});
		return () => unsubscribe();
	}, []);

	const Icon = themeIsleIcons.icons[ attributes.icon ];
	const  iconClassName = `${ attributes.iconPrefix || parentAttributes.defaultIconPrefix } fa-${ attributes.icon || parentAttributes.defaultIcon }`;
	const contentStyle = {
		color: attributes.contentColor || parentAttributes.defaultContentColor,
		fontSize: parentAttributes.defaultSize + 'px'
	};
	const iconStyle = {
		color: attributes.iconColor || parentAttributes.defaultIconColor,
		fill: attributes.iconColor || parentAttributes.defaultIconColor,
		fontSize: parentAttributes.defaultSize + 'px'
	};
	const itemStyle = {
		marginRight: parentClass.includes( 'is-style-horizontal' ) ? parentAttributes.gap + 'px'  :  parentAttributes.gap + 'px'
	};

	/**
	 * Add the missing components from parent's attributes
	 */
	if ( hasParent && ( ! attributes.iconPrefix || ! attributes.library ) ) {
		setAttributes({
			library: attributes.library || parentAttributes.defaultLibrary,
			icon: attributes.icon || parentAttributes.defaultIcon,
			iconPrefix: attributes.iconPrefix || parentAttributes.defaultIconPrefix
		});
	};

	const changeContent = value => {
		setAttributes({ content: value });
	};


	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				className={ className }
				style={ itemStyle }
			>
				{ 'themeisle-icons' === attributes.library && attributes.icon && Icon !== undefined ? (
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
