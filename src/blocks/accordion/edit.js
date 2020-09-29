/**
 * WordPress dependencies.
 */
// const { __ } = wp.i18n;

const { InnerBlocks } = wp.blockEditor;

const {
	Fragment

	//useEffect
} = wp.element;


import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes
}) => {

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<div
				className="wp-block-themeisle-blocks-accordion-block"
			>
				<div
					className="wp-block-themeisle-blocks-accordion-block-tabs"
				>
					<InnerBlocks
						allowedBlocks={ [ 'themeisle-blocks/accordion-tab' ] }
						__experimentalMoverDirection="vertical"
						orientation="vertical"
						template={ [ [ 'themeisle-blocks/accordion-tab' ] ] }
						renderAppender={ InnerBlocks.DefaultAppender }
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
