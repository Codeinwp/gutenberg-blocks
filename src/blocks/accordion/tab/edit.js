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

const { isEqual } = lodash;

const { RichText } = wp.blockEditor;

const { InnerBlocks } = wp.blockEditor;

const { useSelect } = wp.data;

const { getBlockTypes } = wp.blocks;


import defaultAttributes from './attributes.js';
import defaults from '../../../plugins/options/global-defaults/defaults.js';
import Inspector from './inspector.js';

const IDs = [];


const Edit = ({
	attributes,
	setAttributes,
	clientId,
	name,
	className
}) => {

	useEffect( () => {
		initBlock();
	}, []);

	useEffect( () => {
		setAttributes({
			htmlFor: attributes.id + '-toggler'
		});
	}, [ attributes.id ]);

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

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-accordion-tab-${ clientId.substr( 0, 8 ) }`;

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
			const instanceId = `wp-block-themeisle-blocks-accordion-tab-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};

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
				className={ className }
				id={ attributes.id }
				style={
					{ ...tabStyle }
				}
			>
				<input type="checkbox" id={ attributes.htmlFor } class="wp-block-themeisle-blocks-accordion-block-tab-toggle" checked disabled/>

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
						htmlFor={ attributes.htmlFor }
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
