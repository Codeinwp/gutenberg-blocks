import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { useSelect, useDispatch } = wp.data;
const { InnerBlocks, RichText } = wp.blockEditor;
const { __ } = wp.i18n;

const {
	Fragment,
	useEffect,
	useRef
} = wp.element;

import Inspector from './inspector.js';
import { blockInit } from '../../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
const Tabs = ({ attributes, setAttributes, clientId }) => {

	const contentRef = useRef( null );

	const {
		parentClientId
	} = useSelect( select => {
		const {
			getBlock,
			getBlockRootClientId
		} = select( 'core/block-editor' );

		const parentClientId = getBlockRootClientId( clientId );
		const parentBlock = getBlock( parentClientId );

		return {
			parentClientId: parentBlock.clientId
		};
	}, []);

	const { selectBlock } = useDispatch( 'core/block-editor' );

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	const switchActiveState = ( parentClientId ) => {
		const tabs = document.querySelectorAll( `#block-${parentClientId} .wp-block-themeisle-blocks-tabs-content .wp-block-themeisle-blocks-tabs-item` );
		if ( tabs ) {
			tabs.forEach( tab => {
				tab.querySelector( '.wp-block-themeisle-blocks-tabs-item-header' )?.classList.remove( 'active' );
				tab.querySelector( '.wp-block-themeisle-blocks-tabs-item-content' )?.classList.remove( 'active' );
			});
		}

		if ( contentRef.current ) {
			contentRef.current.querySelector( '.wp-block-themeisle-blocks-tabs-item-header' )?.classList.add( 'active' );
			contentRef.current.querySelector( '.wp-block-themeisle-blocks-tabs-item-content' )?.classList.add( 'active' );
		}
	};

	const selectParent = () => {
		selectBlock( parentClientId );
	};

	return (
		<Fragment>
			<Inspector attributes={attributes} setAttributes={setAttributes} selectParent={ selectParent } />
			<div ref={ contentRef } id={ attributes.id } className="wp-block-themeisle-blocks-tabs-item">
				<div className="wp-block-themeisle-blocks-tabs-item-header" onClick={() => switchActiveState( parentClientId )}>
					<RichText
						placeholder={ __( 'Add title…' ) }
						value={ attributes.title }
						onChange={ value => setAttributes({ title: value }) }
						tagName="div"
						withoutInteractiveFormatting
					/>
				</div>
				<div  className={classnames( 'wp-block-themeisle-blocks-tabs-item-content' )}>
					<InnerBlocks template={ [ [ 'core/paragraph', { placeholder: __( 'Insert some text' ) } ] ] } />
				</div>
			</div>
		</Fragment>
	);
};

export default Tabs;
