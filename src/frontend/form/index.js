/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';

const msgs = [];

/**
 * Send the date from the form to the server
 * @param {HTMLDivElement} form The element that contains all the inputs
 */
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
			const msg = document.createElement( 'div' );
			msg.classList.add( 'wp-block-themeisle-blocks-form-server-msg' );
			if ( res?.success ) {
				msg.innerHTML = __( 'Succes', 'otter-blocks' );
				msg.classList.add( 'success' );
			} else {
				msg.innerHTML = __( 'Error. Something is wrong with the server! Try again later.', 'otter-blocks' );
				msg.classList.add( 'error' );
			}

			// Remove old messages
			let _msg = msgs.pop();
			while ( _msg ) {
				form.removeChild( _msg );
				_msg = msgs.pop();
			}

			// Add the new message to the page
			msgs.push( msg );
			form.appendChild( msg );

			// Delete it after a fixed time
			setTimeout( () => {
				form.removeChild( msg );
			}, 5000 );
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
