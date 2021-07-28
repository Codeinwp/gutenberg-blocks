/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

const extractImageData = ( image ) => {
	return {
		id: image.id,
		alt: image.alt,
		url: image.src
	};
};

export const extractProductData = rawProduct => {
	return {
		title: rawProduct?.name,
		description: rawProduct?.short_description,
		price: ( wc.priceFormat.formatPrice( Number( rawProduct?.prices?.price ) ) ).replace( /[^0-9.-]+/g, '' ),
		discounted: rawProduct?.prices?.price !== rawProduct?.prices?.sale_price ? Number( rawProduct?.prices?.sale_price ) : undefined,
		currency: rawProduct?.prices?.currency_code,
		links: [ { label: __( 'Buy Now', 'otter-blocks' ), href: rawProduct?.add_to_cart?.url, isSpoonsored: 'external' === rawProduct?.type } ],
		image: 0 < rawProduct?.images?.length ? extractImageData( rawProduct?.images[0]) : undefined
	};
};
