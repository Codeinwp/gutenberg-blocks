/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

const {
	Fragment,
	useEffect
} = wp.element;


/**
 * Internal dependencies
 */
import { addBlockId } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes,
	clientId,
	name,
	className
}) => {

	useEffect( () => {
		const unsubscribe = addBlockId({
			attributes,
			setAttributes,
			clientId,
			name,
			idPrefix: 'wp-block-themeisle-blocks-icon-list-',
			defaultAttributes
		});
		return () => unsubscribe();
	}, []);

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				id={ attributes.id }
				className={ className }
			>
				<InnerBlocks
					allowedBlocks={ [ 'themeisle-blocks/icon-list-item' ] }
					__experimentalMoverDirection="vertical"
					orientation="vertical"
					template={ [ [ 'themeisle-blocks/icon-list-item' ] ] }
					renderAppender={ InnerBlocks.DefaultAppender }
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
