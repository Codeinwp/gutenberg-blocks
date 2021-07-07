/* eslint-disable no-unused-vars */
import apiFetch from '@wordpress/api-fetch';

/**
 * Get the data from the WC endpoints
 * @returns {Promise.<object>}
 */
const getWCProductData = async() => {

	return new Promise( ( resolve, reject ) => {
		apiFetch({ path: 'wc/v3/products' }).then( resp => resolve( resp ) ).catch( err => reject( err ) );
	});
};

const extractImageData = ( image ) => {
	return {
		id: image.id,
		alt: image.alt,
		url: image.src
	};
};

const cleanDescription = ( description ) => {
	return $( '<p>' ).html( description ).find( 'img' ).remove().end().text();
};

const extractProductData = rawProduct => {
	return {
		title: rawProduct?.name,
		description: cleanDescription( rawProduct?.description ),
		price: rawProduct?.price,
		discounted: rawProduct?.sale_price,
		links: [ { label: 'Test', href: rawProduct?.external_url, isSpoonsored: false } ],
		image: 0 < rawProduct?.images?.length ? extractImageData( rawProduct?.images[0]) : undefined
	};
};

export const extractProductsData = async() => {
	return new Promise( async( resolve, reject ) => {
		const rawData = await getWCProductData();
		resolve( rawData.map( product => {
			return { id: product.id, product: extractProductData( product ) };
		}) );
	});
};
