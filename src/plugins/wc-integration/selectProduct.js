/* eslint-disable no-unused-vars */

import { Fragment, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	SelectControl
} from '@wordpress/components';


const SelectProducts = ({ products, setAttributes }) => {

	const [ productId, setProductId ] = useState( -1 );

	const options = [ {label: __( 'None', 'otter-blocks' ), value: -1}, ...products.map( ({id, product}) => {
		return {
			label: product.title,
			value: id
		};
	}) ];

	console.log( options, productId );

	useEffect( () => {
		const selectedProduct = products?.filter( ({ id }) => id === productId );
		if ( 0 < selectedProduct?.length ) {
			setAttributes( selectedProduct[0]?.product );
		}
	}, [ productId ]);

	return 0 < products.length ? (
		<Fragment>
			<SelectControl
				label={ __( 'Select product', 'otter-blocks' ) }
				value={ productId }
				options={ options }
				onChange={ e => setProductId( parseInt( e ) ) }
			/>
		</Fragment>
	) : (
		<div>

		</div>
	);
};

export default SelectProducts;
