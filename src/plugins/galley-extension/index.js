/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { PanelBody } = wp.components;

const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor || wp.editor;

const { Fragment } = wp.element;

const { addFilter } = wp.hooks;

/**
 * Internal dependencies.
 */
import ImageGrid from './../../components/image-grid';

const withImageGrid = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		const { attributes, setAttributes } = props;

		const onSelectImages = images => {
			setAttributes({
				images: images.map( image => ({
					id: image.id,
					url: image.url,
					alt: image.alt,
					caption: image.caption
				}) )
			});
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Images' ) }
						initialOpen={ false }
					>
						<ImageGrid
							attributes={ attributes }
							onSelectImages={ onSelectImages }
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withImageGrid' );

addFilter( 'editor.BlockEdit', 'core/gallery', withImageGrid );

