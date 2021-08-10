/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';

const collectInputFormData = ( form ) => {
	const exportData = [];
	const inputs = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-business-form__container__content .wp-block-themeisle-blocks-form-input' );

	inputs?.forEach( input => {
		const label = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__label' )?.innerHTML;
		const value = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__input' )?.value;
		const checked = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__input[type="checkbox"]' )?.checked;

		console.log( checked, value );

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

const sendData = ( url, data ) => {
	if ( url && data ) {

		jQuery?.post( url, { action: 'get_otter_form', data }, ( res ) => {
			console.log( res );
		});

		fetch( url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ action: 'get_otter_form', data })
		}).then( resp => console.log( resp ) );
	}
};

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	forms.forEach( form => {
		console.log( form?.dataset?.url );
		const submit = form.querySelector( '.wp-block-themeisle-blocks-form__container__submit' );

		submit?.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			sendData( form?.dataset?.url, collectInputFormData( form ) );
		});
	});

});
