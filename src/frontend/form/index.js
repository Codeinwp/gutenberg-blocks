/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';

const collectAndSendInputFormData = ( form ) => {
	const exportData = [];
	const inputs = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-input' );
	const textarea = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-textarea' );
	const errors = [];

	[ ...inputs, ...textarea ]?.forEach( input => {
		const label = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__label, .wp-block-themeisle-blocks-form-textarea-label__label' )?.innerHTML;
		const valueElem = input.querySelector( '.wp-block-themeisle-blocks-form-input-input, .wp-block-themeisle-blocks-form-textarea-input' );

		// TODO: use checkbox in the future versions
		const checked = input.querySelector( '.wp-block-themeisle-blocks-form-input-input[type="checkbox"]' )?.checked;

		if ( valueElem?.checkValidity() ) {
			if ( label && valueElem?.value ) {
				exportData.push({
					label,
					value: valueElem?.value,
					checked
				});
			};
		} else {
			errors.push( valueElem );
		}
	});

	if ( 0 < errors.length ) {
		console.log( 'Errors', errors, exportData );
		errors.forEach( input => {
			input?.reportValidity();
		});
	} else {
		console.log( 'Send Email', exportData );
		apiFetch({
			path: 'themeisle-gutenberg-blocks/v1/forms',
			method: 'POST',
			data: exportData
		}).then( res => {
			console.log( res );
		});
	}
};

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	forms.forEach( form => {
		const sendBtn = form.querySelector( 'button' );
		sendBtn?.addEventListener( 'click', ( event ) => {
			event.preventDefault();

			collectAndSendInputFormData( form );
		});
	});

});
