/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';

const collectInputFormData = ( form ) => {
	const exportData = [];
	const inputs = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-business-form__container__content .wp-block-themeisle-blocks-form-input' );

	inputs?.forEach( input => {
		const label = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__label' )?.innerHTML;
		const value = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__input' )?.value;

		if ( label && value ) {
			exportData.push({
				label,
				value
			});
		}
	});

	console.log( inputs );

	console.log( exportData );

	return exportData;
};

const sendData = ( data ) => {
	if ( themeisleGutenberg?.form_url ) {
		jQuery?.post( themeisleGutenberg?.form_url, data, ( res ) => {
			console.log( res );
		});
	}
};

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	forms.forEach( form => {
		const submit = form.querySelector( '.wp-block-themeisle-blocks-form__container__submit' );

		submit?.addEventListener( 'submit', ( event ) => {
			event.preventDefault();
			collectInputFormData( form );
		});
	});

});
