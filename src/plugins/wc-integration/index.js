/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { PanelBody } from '@wordpress/components';

import { createHigherOrderComponent } from '@wordpress/compose';

import { InspectorControls } from '@wordpress/block-editor';

import { Fragment } from '@wordpress/element';

import { addFilter } from '@wordpress/hooks';
import { extractProductsData } from './fetch-data';

import SelectProducts from './selectProduct';

let products = [];

extractProductsData().then( ( resp ) => products = resp );

const withWooCommerceIntegrationExtension = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			if ( 'themeisle-blocks/review' === props.name ) {
				return (
					<Fragment>
						<BlockEdit {...props} />

						<InspectorControls>
							<PanelBody
								title={__( 'WooCommerce Integration', 'otter-blocks' )}
								initialOpen={false}
							>
								<SelectProducts products={ products } setAttributes={ props.setAttributes } />
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
