import { Icon, chevronRight } from '@wordpress/icons';
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	Fragment,
	useEffect
} = wp.element;

const { uniqueId } = lodash;

const { RichText } = wp.blockEditor;

const { InnerBlocks } = wp.blockEditor;

const { useSelect } = wp.data;

const { getBlockTypes } = wp.blocks;


import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes,
	clientId
}) => {

	const {
		hasParent,
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
			parentAttributes: parentBlock ? parentBlock.attributes : {}
		};
	}, []);

	const ratio = 36 / 20;

	useEffect( () => {
		if ( attributes.id === undefined ) {

			let id = uniqueId( 'wp-block-themeisle-blocks-accordion-block-tab-' );

			while ( document.querySelector( '#' + id ) ) {
				id = uniqueId( 'wp-block-themeisle-blocks-accordion-block-tab-' );
			}

			setAttributes({ id: id });
		}
	}, []);

	const changeTitle = value => {
		setAttributes({ title: value });
	};

	let titleStyle;
	let tabStyle;
	let iconStyle;
	let iconSize;
	let iconStylePosition = 'default';

	if ( hasParent ) {
		titleStyle = {
			color: parentAttributes.tabsTitleColor,
			fontSize: parentAttributes.tabsTitleFontSize + 'px'
		};

		tabStyle = {
			border: 'solid ' + parentAttributes.tabsBorderSize + 'px',
			borderColor: parentAttributes.tabsBorderColor,
			borderRadius: parentAttributes.tabsBorderRadius + 'px',
			marginBottom: parentAttributes.tabsGap + 'px'
		};

		iconStyle = {
			fill: parentAttributes.tabsTitleColor
		};

		iconSize = parentAttributes.tabsTitleFontSize * ratio;

		iconStylePosition = parentAttributes.iconStyle || iconStylePosition;

		setAttributes({ parentAttributes: parentAttributes });
	};

	const getAllowedTypeBlocks = () => {

		const bannedBlocks = [
			'themeisle-blocks/progress-bar',
			'themeisle-blocks/circular-counter'
		];

		return getBlockTypes()
			.map( block => block.name )
			.filter( blockType => ! bannedBlocks.includes( blockType ) );
	};

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<div
				className="wp-block-themeisle-blocks-accordion-block-tab__container"
				style={
					{ ...tabStyle }
				}
			>
				<input type="checkbox" id={ attributes.id } class="wp-block-themeisle-blocks-accordion-block-tab-toggle" checked disabled/>

				<div className="wp-block-themeisle-blocks-accordion-block-tab-title"
					style={{
						backgroundColor: attributes.titleBackgroundColor
					}}
				>

					{ ( 'default' === iconStylePosition ) && (
						<Icon
							icon={ chevronRight }
							style={{ ...iconStyle }}
							size={ iconSize || 36 }
							className="wp-block-themeisle-blocks-accordion-block-tab-title__icon__start"
						/>
					)}
					<RichText
						tagName="label"
						placeholder={ __( 'Write a title…' ) }
						className={
							classnames( 'wp-block-themeisle-blocks-accordion-block-tab-label', {'no-front-icon': 'default' !== iconStylePosition})
						}
						htmlFor={ attributes.id }
						value={ attributes.title }
						onChange={ changeTitle }
						multiline={ false }
						keepPlaceholderOnFocus={ true }
						style={{
							...titleStyle,
							backgroundColor: attributes.titleBackgroundColor
						}}
					/>
					{ ( 'end' === iconStylePosition ) && (
						<Icon
							icon={ chevronRight }
							style={{ ...iconStyle }}
							size={ iconSize || 36 }
							className="wp-block-themeisle-blocks-accordion-block-tab-title__icon__end"
						/>
					)}
				</div>
				<div
					className="wp-block-themeisle-blocks-accordion-block-tab-content"
					style={{
						backgroundColor: attributes.contentBackgroundColor
					}}
				>
					<InnerBlocks
						allowedBlocks={ getAllowedTypeBlocks() }
						__experimentalMoverDirection="vertical"
						orientation="vertical"
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</Fragment>

	);
};

export default Edit;
