/* eslint-disable camelcase */
/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { select } from '@wordpress/data';
import { extractProductsData } from './utility';
import SelectProducts from './SelectProduct';

const wcBlocksData = import( '@woocommerce/block-data' );

const PRODUCTS_PER_PAGE = 100;
const MAX_PRODUCT_REQUESTS = 30;

const sortByName = ( a, b ) => {
	return a.name.localeCompare( b.name );
};

let wcProductData = [];
let countRetrive = 0;
let wcLoaded = false;

wcBlocksData?.then( ( blocksData ) => {
	const { COLLECTIONS_STORE_KEY } = blocksData;
	wcProductData = select( COLLECTIONS_STORE_KEY )?.getCollection( '/wc/store', 'products', { per_page: PRODUCTS_PER_PAGE, orderBy: 'title' }).sort( sortByName );

	/**
	 * If the list of products is still empty, make a request once a second.
	 * After 30 tries, delete de interval
	 */
	const retrieveData = setInterval( () => {
		if ( MAX_PRODUCT_REQUESTS > countRetrive ) {
			console.warn( __( '[Otter][Review-WC] Products are unavailable!' ), 'otter-blocks' );
		}
		if ( 0 < wcProductData?.length || MAX_PRODUCT_REQUESTS < countRetrive ) {
			clearInterval( retrieveData );
		} else {
			wcProductData = select( COLLECTIONS_STORE_KEY ).getCollection( '/wc/store', 'products', { per_page: PRODUCTS_PER_PAGE, orderBy: 'title' }).sort( sortByName );
			countRetrive += 1;
		}
	}, 1000 );

	wcLoaded = true;
});


const withWooCommerceIntegrationExtension = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			if ( 'themeisle-blocks/review' === props.name && '1' === window?.themeisleGutenberg?.hasNevePro && wcLoaded ) {

				const products = extractProductsData( wcProductData );
				const selectedProduct = products?.filter( ({ id }) => id === props?.attributes?.postId )[0] || undefined;

				useEffect( () => {

					// Empty useEffect for triggering the refresh
				}, [ wcProductData ]);

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
									products={  products }
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
