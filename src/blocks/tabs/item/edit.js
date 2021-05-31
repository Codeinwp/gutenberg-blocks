import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { useSelect, useDispatch } = wp.data;
const { isEqual } = lodash;
const { InnerBlocks, RichText } = wp.blockEditor;
const { __ } = wp.i18n;

const {
	Fragment,
	useEffect,
	useRef
} = wp.element;

import Inspector from './inspector.js';
import defaultAttributes from './attributes.js';
import defaults from '../../../plugins/options/global-defaults/defaults.js';

const IDs = [];

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
		initBlock();
	}, []);

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-tabs-${ clientId.substr( 0, 8 ) }`;

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
			const instanceId = `wp-block-themeisle-blocks-tabs-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};

	const switchActiveState = ( parentClientId ) => {
		const tabs = document.querySelectorAll( `#block-${parentClientId} .wp-block-themeisle-blocks-tabs-content .wp-block-themeisle-blocks-tabs-item-content` );
		console.log( tabs );
		if ( tabs ) {
			tabs.forEach( tab => {
				tab.classList.remove( 'active' );
			});
		}

		if ( contentRef.current ) {
			contentRef.current.classList.add( 'active' );
		}
	};

	const selectParent = () => {
		selectBlock( parentClientId );
	};

	return (
		<Fragment>
			<Inspector attributes={attributes} setAttributes={setAttributes} selectParent={ selectParent } />
			<div className="wp-block-themeisle-blocks-tabs-item">
				<div className="wp-block-themeisle-blocks-tabs-item-header" onClick={() => switchActiveState( parentClientId )}>
					<RichText
						placeholder={ __( 'Add title…' ) }
						value={ attributes.title }
						onChange={ value => setAttributes({ title: value }) }
						tagName="div"
						withoutInteractiveFormatting
					/>
				</div>
				<div ref={ contentRef } className={classnames( 'wp-block-themeisle-blocks-tabs-item-content' )}>
					<InnerBlocks template={ [ [ 'core/paragraph', { placeholder: __( 'Insert some text' ) } ] ] } renderAppender={ InnerBlocks.ButtonBlockAppender } />
				</div>
			</div>
		</Fragment>
	);
};

export default Tabs;
