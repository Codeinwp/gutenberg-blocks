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
import { COLLECTIONS_STORE_KEY } from '@woocommerce/block-data';

import { extractProductsData } from './utility';
import SelectProducts from './SelectProduct';

const PRODUCTS_PER_PAGE = 100;

const sortByName = ( a, b ) => {
	return a.name.localeCompare( b.name );
};

let wcProductData = select( COLLECTIONS_STORE_KEY ).getCollection( '/wc/store', 'products', { per_page: PRODUCTS_PER_PAGE, orderBy: 'title' }).sort( sortByName );
let countRetrive = 0;

/**
 * If the list of products is still empty, make a request once a second.
 * After 30 tries, delete de interval
 */
const retrieveData = setInterval( () => {
	if ( 0 < wcProductData?.length || 30 < countRetrive ) {
		clearInterval( retrieveData );
	} else {
		wcProductData = select( COLLECTIONS_STORE_KEY ).getCollection( '/wc/store', 'products', { per_page: PRODUCTS_PER_PAGE, orderBy: 'title' }).sort( sortByName );
		countRetrive += 1;
	}
}, 1000 );


const withWooCommerceIntegrationExtension = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			if ( 'themeisle-blocks/review' === props.name ) {

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
