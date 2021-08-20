/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';

/** @type {Array.<HTMLDivElement>} */
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
	const data = {};

	[ ...inputs, ...textarea ]?.forEach( input => {
		const label = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__label, .wp-block-themeisle-blocks-form-textarea-label__label' )?.innerHTML;
		const valueElem = input.querySelector( '.wp-block-themeisle-blocks-form-input-input, .wp-block-themeisle-blocks-form-textarea-input' );

		// TODO: use checkbox in the future versions
		const checked = input.querySelector( '.wp-block-themeisle-blocks-form-input-input[type="checkbox"]' )?.checked;

		if ( valueElem?.hasAttribute( 'required' ) &&  ! valueElem?.checkValidity() ) {
			errors.push( valueElem );
		}

		if ( label && valueElem?.value ) {
			exportData.push({
				label,
				value: valueElem?.value,
				checked
			});
		};
	});

	if ( 0 < errors.length ) {
		console.log( 'Errors', errors, exportData );
		errors.forEach( input => {
			input?.reportValidity();
		});
	} else {
		data.data = exportData;
		if ( form?.dataset?.emailTitle ) {
			data.emailTitle = form?.dataset?.emailTitle;
		}

		console.log( 'Send Email', data );
		apiFetch({
			path: 'themeisle-gutenberg-blocks/v1/forms',
			method: 'POST',
			data
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
				if ( form === _msg.parentNode ) {
					form.removeChild( _msg );
				}
				_msg = msgs.pop();
			}

			// Add the new message to the page
			msgs.push( msg );
			form.appendChild( msg );

			// Delete it after a fixed time
			setTimeout( () => {
				if ( msg && form === msg.parentNode ) {
					form.removeChild( msg );
				}
			}, 10000 );
		})?.catch( error => {
			console.error( error );
			const msg = document.createElement( 'div' );
			msg.classList.add( 'wp-block-themeisle-blocks-form-server-msg' );
			msg.innerHTML = __( 'Error. Something is wrong with the server! Try again later.', 'otter-blocks' );
			msg.classList.add( 'error' );

			// Add the new message to the page
			msgs.push( msg );
			form.appendChild( msg );

			// Delete it after a fixed time
			setTimeout( () => {
				if ( msg && form === msg.parentNode ) {
					form.removeChild( msg );
				}
			}, 10000 );
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
