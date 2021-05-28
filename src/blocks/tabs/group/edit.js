/* eslint-disable no-unused-vars */

import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;
const { useSelect, useDispatch } = wp.data;
const { getBlockType, createBlock } = wp.blocks;
const { __ } = wp.i18n;

const {
	Fragment,
	useEffect,
	useState,
	useRef
} = wp.element;

import Inspector from './inspector.js';

const Tabs = ({ isSelected, clientId, attributes, setAttributes }) => {

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
		if ( children && 0 < children.length && ! ( children.map( ({clientId}) => clientId ) ).includes( activeTab ) ) {
			switchActiveState( children[0].clientId );
		}
	}, [ activeTab, children ]);

	useEffect( () => {
		console.log( children );
		const newHeaders = children?.map( block => {
			return { id: block.attributes.id, title: block.attributes.title, clientId: block.clientId };
		});
		setAttributes({
			headers: newHeaders
		});
	}, [ children ]);

	console.log( attributes );

	// console.log( children );
	// console.log( children?.map( ({attributes}) => attributes ) );
	// console.log( 'Ref', contentRef.current );

	const switchActiveState = ( clientId ) => {
		if ( contentRef.current ) {
			children.forEach( block => {
				const blockContent = contentRef.current.querySelector( `#block-${block.clientId} .wp-block-themeisle-blocks-tabs-item-content` );
				blockContent?.classList.remove( 'active' );
			});

			const ownBlockContent = contentRef.current.querySelector( `#block-${clientId} .wp-block-themeisle-blocks-tabs-item-content` );
			console.log( 'Own block', ownBlockContent, contentRef );
			if ( ownBlockContent ) {
				ownBlockContent.classList.add( 'active' );
			}
			setActiveTab( clientId );
		} else {
			console.log( contentRef.current );
		}
	};

	const renderTabHeader = ( title, onClick, active ) => {
		return ( <div className={classnames( 'wp-block-themeisle-blocks-tabs-header', {'active': active})}>
			<div onClick={onClick}>{title}</div>
		</div> );
	};

	const renderAddTab = () => {
		const addTab = () => {
			if ( canInsert ) {
				const itemBlock = createBlock( 'themeisle-blocks/tabs-item' );
				console.log( itemBlock );
				insertBlock( itemBlock, ( children?.length - 1 ) || 0, clientId );
			}
		};
		return (
			<div className={classnames( 'wp-block-themeisle-blocks-tabs-header' )}>
				<div onClick={addTab}> {__( 'Add Tab' )} </div>
			</div>
		);
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				tabs={ attributes.headers }
				deleteTab={ removeBlock }
				selectTab={ selectBlock }
			/>
			<div className="wp-block-themeisle-blocks-tabs">
				<div className="wp-block-themeisle-blocks-tabs-headers">
					{
						attributes.headers?.map( tabHeader => {
							return renderTabHeader( tabHeader.title || 'Insert Title H', () => {
								switchActiveState( tabHeader.clientId );
							}, tabHeader.clientId === activeTab );
						})
					}
					{renderAddTab()}
				</div>
				<div ref={ contentRef } className="wp-block-themeisle-blocks-tabs-content">
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/tabs-item' ] }
						template={ [ [ 'themeisle-blocks/tabs-item' ] ] }
						renderAppender={ '' }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Tabs;
