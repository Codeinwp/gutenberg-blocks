import { Fragment, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	SelectControl,
	Spinner,
	ToggleControl
} from '@wordpress/components';


const SelectProducts = ({ products, setAttributes, attributes }) => {

	const [ productId, setProductId ] = useState( attributes?.postId || -1 );

	const options = [ {label: __( 'None', 'otter-blocks' ), value: -1}, ...products.map( ({id, product}) => {
		return {
			label: product.title,
			value: id
		};
	}) ];

	const saveProduct = ( targetId ) => {
		const selectedProduct = products?.filter( ({ id }) => id === targetId );
		if ( 0 < selectedProduct?.length ) {
			setAttributes( selectedProduct[0]?.product );
		}
	};

	useEffect( () => {
		const selectedProduct = products?.filter( ({ id }) => id === productId );
		if ( 0 < selectedProduct?.length ) {
			setAttributes({
				postId: selectedProduct[0]?.id,
				currency: selectedProduct[0]?.product?.currency
			});
		} else {
			setAttributes({
				postId: undefined,
				isSync: false
			});
		}
	}, [ productId ]);

	return 0 < products.length ? (
		<Fragment>
			{ __( 'By selecting a product, the current product information will the replaced with the ones provided by WooCommerce. Deselecting the products will return to the original settings if a desynchronization was not performed', 'otter-blocks' ) }
			<SelectControl
				label={ __( 'Select product', 'otter-blocks' ) }
				value={ productId }
				options={ options }
				onChange={ e => setProductId( parseInt( e ) ) }
			/>
			{
				attributes.postId && (
					<ToggleControl
						label={ __( 'Sync Data', 'otter-blocks' ) }
						help={ __( 'Desynching will save the current information. The features for changing the product data will be available', 'otter-blocks' ) }
						checked={ attributes.postId !== undefined }
						onChange={ value => {
							if ( false === value ) {
								setAttributes({ postId: undefined });
								saveProduct( productId );
							}
						} }
					/>
				)
			}
		</Fragment>
	) : (
		<div>
			<Spinner />
		</div>
	);
};

export default SelectProducts;
