/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { PanelBody } = wp.components;

const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor;

const { Fragment } = wp.element;

const { addFilter } = wp.hooks;

/**
 * Internal dependencies.
 */
import ImageGrid from './../../components/image-grid/index.js';

const withGalleryExtension = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const onSelectImages = (images) => {
			props.setAttributes({
				images: images.map((image) => ({
					id: image.id,
					url: image.url,
					alt: image.alt,
					caption: image.caption,
				})),
			});
		};

		if ('core/gallery' === props.name) {
			return (
				<Fragment>
					<BlockEdit {...props} />

					{!!props.attributes.images.length && (
						<InspectorControls>
							<PanelBody title={__('Images')} initialOpen={false}>
								<ImageGrid attributes={props.attributes} onSelectImages={onSelectImages} />
							</PanelBody>
						</InspectorControls>
					)}
				</Fragment>
			);
		}

		return <BlockEdit {...props} />;
	};
}, 'withGalleryExtension');

addFilter('editor.BlockEdit', 'themeisle-gutenberg/gallery-extension', withGalleryExtension);
