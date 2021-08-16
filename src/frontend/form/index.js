/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';

const collectInputFormData = ( form ) => {
	const exportData = [];
	const inputs = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-business-form__container__content .wp-block-themeisle-blocks-form-input' );

	inputs?.forEach( input => {
		const label = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__label' )?.innerHTML;
		const value = input.querySelector( '.wp-block-themeisle-blocks-form-input-input' )?.value;
		const checked = input.querySelector( '.wp-block-themeisle-blocks-form-input-input[type="checkbox"]' )?.checked;

		if ( label && value ) {
			exportData.push({
				label,
				value,
				checked
			});
		}
	});

	console.log( inputs );

	console.log( exportData );

	return exportData;
};

// FIXME: Make this to work with the PHP backend
const sendData = ( url, data ) => {
	if ( url && data ) {

		// BUG: the request is succesful, but it return always 0
		jQuery?.post( url, { action: 'get_otter_form', data }, ( res ) => {
			console.log( res );
		});

		// BUG: this does not work like the jQuery version, it gives code 400 [Bad Request]
		// fetch( url, {
		// 	method: 'POST',
		// 	mode: 'cors',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({ action: 'get_otter_form', data })
		// }).then( resp => console.log( resp ) );
	}
};

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	forms.forEach( form => {
		console.log( form?.dataset?.url );
		const submit = form.querySelector( '.wp-block-themeisle-blocks-form__container__submit' );

		submit?.addEventListener( 'submit', ( event ) => {
			event.preventDefault();
			sendData( form?.dataset?.url, collectInputFormData( form ) );
		});
	});

});
