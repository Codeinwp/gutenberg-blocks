/** @jsx jsx */
/**
 * External dependencies
 */
import { plus } from '@wordpress/icons';
import classnames from 'classnames';
import {
	css,
	jsx
} from '@emotion/react';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;
const { useSelect, useDispatch } = wp.data;
const { createBlock } = wp.blocks;
const { __ } = wp.i18n;
const { Icon } = wp.components;
const {
	Fragment,
	useEffect,
	useState,
	useRef
} = wp.element;


import Inspector from './inspector.js';
import Toolbar from './controls.js';
import { blockInit } from '../../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';


const Tabs = ({ clientId, attributes, setAttributes, isSelected }) => {

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	const contentRef = useRef( null );
	const [ activeTab, setActiveTab ] = useState( '' );

	const {
		children,
		canInsert
	} = useSelect( select => {
		const {
			getBlock,
			canInsertBlockType
		} = select( 'core/block-editor' );

		return {
			children: getBlock( clientId ).innerBlocks,
			canInsert: canInsertBlockType( 'themeisle-blocks/tabs-item', clientId )
		};
	}, []);

	// Reference: https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/
	const { insertBlock, removeBlock, selectBlock, moveBlockToPosition } = useDispatch( 'core/block-editor' );

	/**
	 * Create headers based on the blocks from InnberBlocks
	 */
	useEffect( () => {
		const newHeaders = children?.map( block => {
			return { id: block.attributes.id, title: block.attributes.title };
		});
		setAttributes({
			headers: newHeaders
		});
	}, [ children ]);


	const toggleActiveTab = ( blockId ) => {
		if ( contentRef.current ) {
			children.forEach( block => {
				const blockHeader = contentRef.current.querySelector( `#block-${block.clientId} .wp-block-themeisle-blocks-tabs-item-header` );
				const blockContent = contentRef.current.querySelector( `#block-${block.clientId} .wp-block-themeisle-blocks-tabs-item-content` );
				blockHeader?.classList.toggle( 'active', block.attributes.id === blockId );
				blockContent?.classList.toggle( 'active', block.attributes.id === blockId );
			});
			setActiveTab( blockId );
		}
	};

	/**
	 * Activate the first tab when no tabs are selected.
	 */
	useEffect( () => {
		if ( 0 < children?.length ) {
			if ( ( '' === activeTab || 0 === children?.filter( block => block.attributes.id === activeTab ).length  )  && 0 < attributes.headers?.length ) {
				toggleActiveTab( children[0].attributes.id );
			}
		}
	}, [ activeTab, attributes.headers, children ]);

	/**
	 * ------------ Tab Actions ------------
	 */
	const selectTab = ( blockId ) => {
		if ( 0 < children?.length ) {
			const block = children.filter( block => block.attributes.id === blockId )[0];
			selectBlock( block.clientId );
		}
	};

	const moveTab = ( blockId, position ) => {
		const blockClienId = children.filter( block => block.attributes.id === blockId )[0]?.clientId;
		if ( blockClienId ) {
			moveBlockToPosition( blockClienId, clientId, clientId, position );
		}
	};

	const deleteTab = ( blockId ) => {
		if ( 0 < children?.length ) {
			const block = children.filter( block => block.attributes.id === blockId )[0];
			removeBlock( block.clientId, false );
			if ( activeTab === blockId ) {
				setActiveTab( '' );
			}
		}
	};

	const addTab = () => {
		if ( canInsert ) {
			const itemBlock = createBlock( 'themeisle-blocks/tabs-item' );
			insertBlock( itemBlock, ( attributes.headers?.length ) || 0, clientId, false );
		}
	};

	/**
	 * ------------ Tab Dynamic CSS ------------
	 */
	const tabStyle = css`
		.wp-block-themeisle-blocks-tabs-header.active {
			background-color: ${ attributes.tabColor };
		}

		.wp-block-themeisle-blocks-tabs-header.active div {
			color: ${ attributes.activeTitleColor };
		}

		.wp-block-themeisle-blocks-tabs-header, .wp-block-themeisle-blocks-tabs-header.active, .wp-block-themeisle-blocks-tabs-header.active::before, .wp-block-themeisle-blocks-tabs-header.active::after {
			border-width: ${ attributes.borderWidth !== undefined ? attributes.borderWidth : 3 }px;
		}
	`;

	const contentStyle = css`
		.wp-block-themeisle-blocks-tabs-item-header, .wp-block-themeisle-blocks-tabs-item-content {
			border-width: ${ attributes.borderWidth !== undefined ? attributes.borderWidth : 3 }px;
		}

		.wp-block-themeisle-blocks-tabs-item-header.active, .wp-block-themeisle-blocks-tabs-item-content.active {
			background-color: ${ attributes.tabColor };
			border-width: ${ attributes.borderWidth !== undefined ? attributes.borderWidth : 3 }px;
		}

		.wp-block-themeisle-blocks-tabs-item-header.active div {
			color: ${ attributes.activeTitleColor };
		}
	`;

	const tabHeaderStyle = css`
		display: flex;
		width: 30px;
		height: 30px;
		align-items: center;
	`;

	/**
	 * ------------ Tab Components ------------
	 */
	const TabHeader = ({ title, onClick, active }) => {
		return (
			<div className={classnames( 'wp-block-themeisle-blocks-tabs-header', {'active': active})}>
				<div onClick={onClick}>{title}</div>
			</div>
		);
	};

	const TabHeaders = ({ headers }) => {
		return headers?.map( tabHeader => {
			return (
				<TabHeader
					title={ tabHeader.title || __( 'Insert Title' ) }
					active={tabHeader.id === activeTab}
					onClick={() => toggleActiveTab( tabHeader.id )}
				/>
			);
		}) || (
			<Fragment></Fragment>
		);
	};

	const AddTab = () => {
		return (
			<div className={classnames( 'wp-block-themeisle-blocks-tabs-header' )}>
				<div css={tabHeaderStyle} onClick={addTab}> <Icon icon={ plus } /> </div>
			</div>
		);
	};

	return (
		<Fragment>
			<Toolbar attributes={ attributes } setAttributes={ setAttributes } selectedTab={ activeTab } selectTab={ selectTab } moveTab={ moveTab }/>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				tabs={ attributes.headers }
				deleteTab={ deleteTab }
				selectTab={ selectTab }
				moveTab={ moveTab }
				addTab={ addTab }
			/>
			<div id={ attributes.id } className="wp-block-themeisle-blocks-tabs" style={{ borderColor: attributes.borderColor }}>
				<div css={tabStyle} className="wp-block-themeisle-blocks-tabs-headers">
					<TabHeaders headers={attributes.headers} />
					{
						isSelected ? ( <AddTab /> ) : ( <Fragment></Fragment> )
					}
				</div>
				<div ref={ contentRef } className="wp-block-themeisle-blocks-tabs-content" css={contentStyle}>
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/tabs-item' ] }
						template={ [ [ 'themeisle-blocks/tabs-item' ] ] }
						orientation="horizontal"
						renderAppender={ '' }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Tabs;
