const extractImageData = ( image ) => {
	return {
		id: image.id,
		alt: image.alt,
		url: image.src
	};
};

// const cleanDescription = ( description ) => {
// 	return $( '<p>' ).html( description ).find( 'img' ).remove().end().text();
// };

const extractProductData = rawProduct => {
	return {
		title: rawProduct?.name,
		description: rawProduct?.short_description,
		price: Number( rawProduct?.prices?.price ),
		discounted: rawProduct?.prices?.price !== rawProduct?.prices?.sale_price ? Number( rawProduct?.prices?.sale_price ) : undefined,
		currency: rawProduct?.prices?.currency_code,
		links: [ { label: 'Buy Now', href: rawProduct?.add_to_cart?.url, isSpoonsored: 'external' === rawProduct?.type } ],
		image: 0 < rawProduct?.images?.length ? extractImageData( rawProduct?.images[0]) : undefined
	};
};

export const extractProductsData = ( rawData ) => {
	return rawData.map( product => {
		return { id: product.id, product: extractProductData( product ) };
	});
};
