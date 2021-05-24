/* eslint-disable no-unused-vars */

import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;
const { useSelect } = wp.data;

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
		children
	} = useSelect( select => {
		const {
			getBlock
		} = select( 'core/block-editor' );

		const children = getBlock( clientId ).innerBlocks;

		return {
			children
		};
	}, []);

	useEffect( () => {
		const newHeaders = children?.map( block => {
			return { id: block.attributes.id, title: block.attributes.block };
		});
		setAttributes({
			headers: newHeaders
		});
	}, children );

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

	return (
		<Fragment>
			{/* <Inspector /> */}
			<div className="wp-block-themeisle-blocks-tabs">
				<div className="wp-block-themeisle-blocks-tabs-headers">
					{
						children?.map( block => {
							return renderTabHeader( block.attributes?.title || 'Insert Title H', () => {
								switchActiveState( block.clientId );
							}, block.clientId === activeTab );
						})
					}
				</div>
				<div ref={ contentRef } className="wp-block-themeisle-blocks-tabs-content">
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/tabs-item' ] }
						template={ [ [ 'themeisle-blocks/tabs-item' ] ] }
						renderAppender={ InnerBlocks.ButtonBlockAppender }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Tabs;
