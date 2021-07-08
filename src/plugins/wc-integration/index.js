/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { select } from '@wordpress/data';
import { COLLECTIONS_STORE_KEY } from '@woocommerce/block-data';

import { extractProductsData } from './utility';
import SelectProducts from './selectProduct';

const { getCollection } = select( COLLECTIONS_STORE_KEY );


const withWooCommerceIntegrationExtension = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			if ( 'themeisle-blocks/review' === props.name ) {
				const productData =  getCollection( '/wc/store', 'products' );
				return (
					<Fragment>
						<BlockEdit {...props} />

						<InspectorControls>
							<PanelBody
								title={__( 'WooCommerce Integration', 'otter-blocks' )}
								initialOpen={false}
							>
								<SelectProducts products={ extractProductsData( productData ) } setAttributes={ props.setAttributes } />
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
