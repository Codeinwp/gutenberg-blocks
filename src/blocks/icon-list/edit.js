/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

const {
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import { initBlock } from '../../helpers/blocks-helpers.js';

const Edit = ({
	attributes,
	setAttributes,
	clientId,
	name,
	className
}) => {

	initBlock( attributes, setAttributes, clientId, 'wp-block-themeisle-blocks-icon-list-', name, defaultAttributes );

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
