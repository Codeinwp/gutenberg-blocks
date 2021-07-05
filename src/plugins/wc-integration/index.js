/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { PanelBody } from '@wordpress/components';

import { createHigherOrderComponent } from '@wordpress/compose';

import { InspectorControls } from '@wordpress/block-editor';

import { Fragment, useState, useEffect } from '@wordpress/element';

import { addFilter } from '@wordpress/hooks';
import { extractProductsData } from './fetch-data';


const withWooCommerceIntegrationExtension = createHigherOrderComponent( BlockEdit => {
	return ( props ) => {

		if ( 'themeisle-blocks/review' === props.name ) {
			const [ wcData, setWCData ] = useState([]);

			useEffect( () => {
				extractProductsData().then( resp => setWCData( resp ) );
			}, []);

			useEffect( () => {
				console.log( wcData );
			}, [ wcData ]);


			return (
				<Fragment>
					 <BlockEdit { ...props } />


					<InspectorControls>
							 <PanelBody
							title={ __( 'Images', 'otter-blocks' ) }
							initialOpen={ false }
						>

							 </PanelBody>
					</InspectorControls>

				 </Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withWooCommerceIntegrationExtension' );

addFilter( 'editor.BlockEdit', 'themeisle-gutenberg/woocommerce-integration-extension', withWooCommerceIntegrationExtension );


