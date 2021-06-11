/** @jsx jsx */
/* eslint-disable no-unused-vars */
/**
 * External dependencies
 */
import { plus, plusCircle } from '@wordpress/icons';
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
import Toolbar from './toolbar.js';

const Tabs = ({ clientId, attributes, setAttributes }) => {

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

	const { updateBlockAttributes, insertBlock, removeBlock, selectBlock } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		const newHeaders = children?.map( block => {
			return { id: block.attributes.id, title: block.attributes.title };
		});
		setAttributes({
			headers: newHeaders
		});
	}, [ children ]);


	const switchActiveState = ( blockId ) => {
		if ( contentRef.current ) {
			children.forEach( block => {
				const blockContent = contentRef.current.querySelector( `#block-${block.clientId} .wp-block-themeisle-blocks-tabs-item-content` );
				blockContent?.classList.toggle( 'active', block.attributes.id === blockId );
			});
			setActiveTab( blockId );
		}
	};

	useEffect( () => {
		if ( 0 < children?.length ) {
			if ( ( '' === activeTab || 0 === children?.filter( block => block.attributes.id === activeTab ).length  )  && 0 < attributes.headers?.length ) {
				switchActiveState( children[0].attributes.id );
			}
		}
	}, [ activeTab, attributes.headers, children ]);

	const selectTab = ( blockId ) => {
		if ( 0 < children?.length ) {
			const block = children.filter( block => block.attributes.id === blockId )[0];
			selectBlock( block.clientId );
		}
	};

	const deleteTab = ( blockId ) => {
		if ( 0 < children?.length ) {
			const block = children.filter( block => block.attributes.id === blockId )[0];
			removeBlock( block.clientId );
			if ( activeTab === blockId ) {
				console.log( 'Delete', activeTab );
				setActiveTab( '' );
			} else {
				console.log( activeTab, blockId );
			}
		}
	};

	const addTab = () => {
		if ( canInsert ) {
			const itemBlock = createBlock( 'themeisle-blocks/tabs-item' );
			insertBlock( itemBlock, ( attributes.headers?.length ) || 0, clientId, false );
		}
	};

	const tabStyle = css`
		.wp-block-themeisle-blocks-tabs-header.active {
			background-color: ${ attributes.tabColor || 'red' };
		}
		.wp-block-themeisle-blocks-tabs-header.active, .wp-block-themeisle-blocks-tabs-header.active::before, .wp-block-themeisle-blocks-tabs-header.active::after {
			border-width: ${ attributes.borderWidth !== undefined ? attributes.borderWidth : 3 }px;
		}
	`;

	const contentStyle = css`
		.wp-block-themeisle-blocks-tabs-item-heade, .wp-block-themeisle-blocks-tabs-item-content {
			background-color: ${ attributes.tabColor || 'red' };
			border-width: ${ attributes.borderWidth !== undefined ? attributes.borderWidth : 3 }px;
		}
	`;

	const renderTabHeader = ( title, onClick, active ) => {
		return (
			<div className={classnames( 'wp-block-themeisle-blocks-tabs-header', {'active': active})}>
				<div onClick={onClick}>{title}</div>
			</div>
		);
	};

	const renderAddTab = () => {
		return (
			<div className={classnames( 'wp-block-themeisle-blocks-tabs-header' )}>
				<div style={{ width: 30, height: 24 }} onClick={addTab}> <Icon icon={ plusCircle } size={ 24 }/> </div>
			</div>
		);
	};

	return (
		<Fragment>
			<Toolbar attributes={ attributes } setAttributes={ setAttributes } selectedTab={ activeTab } />
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				tabs={ attributes.headers }
				deleteTab={ deleteTab }
				selectTab={ selectTab }
				addTab={ addTab }
			/>
			<div className="wp-block-themeisle-blocks-tabs" style={{ borderColor: attributes.borderColor }}>
				<div css={tabStyle} className="wp-block-themeisle-blocks-tabs-headers">
					{
						attributes.headers?.map( tabHeader => {
							return renderTabHeader( tabHeader.title || 'Insert Title H', () => {
								switchActiveState( tabHeader.id );
							}, tabHeader.id === activeTab );
						})
					}
					{renderAddTab()}
				</div>
				<div ref={ contentRef } className="wp-block-themeisle-blocks-tabs-content" css={contentStyle}>
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/tabs-item' ] }
						template={ [ [ 'themeisle-blocks/tabs-item' ] ] }
						orientation="vertical"
						renderAppender={ '' }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Tabs;
