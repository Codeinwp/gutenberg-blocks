/* eslint-disable no-unused-vars */

import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;
const { useSelect, useDispatch } = wp.data;
const { createBlock } = wp.blocks;
const { __ } = wp.i18n;

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
				const blockContent = contentRef.current.querySelector( `#${block.attributes.id} .wp-block-themeisle-blocks-tabs-item-content` );
				blockContent?.classList.remove( 'active' );
			});

			const ownBlockContent = contentRef.current.querySelector( `#${blockId} .wp-block-themeisle-blocks-tabs-item-content` );
			if ( ownBlockContent ) {
				ownBlockContent.classList.add( 'active' );
			}
			setActiveTab( blockId );
		}
	};

	useEffect( () => {
		if ( ( '' === activeTab || 0 === children?.filter( block => block.attributes.id === activeTab ).length  )  && 0 < attributes.headers?.length && 0 < children?.length ) {
			switchActiveState( attributes.headers[0].id );
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
				<div onClick={addTab}> {__( 'Add Tab' )} </div>
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
			<div className="wp-block-themeisle-blocks-tabs">
				<div className="wp-block-themeisle-blocks-tabs-headers">
					{
						attributes.headers?.map( tabHeader => {
							return renderTabHeader( tabHeader.title || 'Insert Title H', () => {
								switchActiveState( tabHeader.id );
							}, tabHeader.id === activeTab );
						})
					}
					{renderAddTab()}
				</div>
				<div ref={ contentRef } className="wp-block-themeisle-blocks-tabs-content">
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
