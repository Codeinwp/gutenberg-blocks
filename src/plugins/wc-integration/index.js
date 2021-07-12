/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { select, useSelect } from '@wordpress/data';
import { COLLECTIONS_STORE_KEY } from '@woocommerce/block-data';

import { extractProductsData } from './utility';
import SelectProducts from './SelectProduct';

const { getCollection } = select( COLLECTIONS_STORE_KEY );
console.log( getCollection( '/wc/store', 'products' ) );

const withWooCommerceIntegrationExtension = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			if ( 'themeisle-blocks/review' === props.name ) {
				const productData = useSelect( select => {
					const { getCollection } = select( COLLECTIONS_STORE_KEY );
					return getCollection( '/wc/store', 'products' );
				}, [ props.attributes ]); //getCollection( '/wc/store', 'products' );
				const products = extractProductsData( productData );
				const selectedProduct = products?.filter( ({ id }) => id === props?.attributes?.postId )[0] || undefined;
				console.log( products, selectedProduct );
				return (
					<Fragment>
						<BlockEdit
							{...props}
							productAttributes={ props?.attributes?.postId && 0 < products?.length && selectedProduct?.product ? selectedProduct.product : undefined}
						/>

						<InspectorControls>
							<PanelBody
								title={__(
									'WooCommerce Integration',
									'otter-blocks'
								)}
								initialOpen={false}
							>
								<SelectProducts
									products={products}
									setAttributes={props.setAttributes}
									attributes={props.attributes}
								/>
							</PanelBody>
						</InspectorControls>
					</Fragment>
				);
			}

			return <BlockEdit {...props} />;
		};
	},
	'withWooCommerceIntegrationExtension'
);

addFilter(
	'editor.BlockEdit',
	'themeisle-gutenberg/woocommerce-integration-extension',
	withWooCommerceIntegrationExtension
);
