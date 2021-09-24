import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';

const TIME_UNTIL_REMOVE = 10_000;

/**
 * Send the date from the form to the server
 * @param {HTMLDivElement} form The element that contains all the inputs
 * @param {HTMLButtonElement} btn The submit button
 */
const collectAndSendInputFormData = ( form, btn ) => {
	const exportData = [ { label: __( 'Form submission from', 'otter-blocks' ), value: window.location.href } ];
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


	const msgAnchor = form.querySelector( '.wp-block-button' );
	msgAnchor?.classList.add( 'has-submit-msg' );

	/**
	 * Add the message to the anchor element then removed after a fixed time
	 * @param {HTMLDivElement} msg The message container
	 */
	const addThenRemoveMsg = ( msg ) => {

		// Remove old messages
		msgAnchor.querySelectorAll( '.wp-block-themeisle-blocks-form-server-msg' ).forEach( _msg => msgAnchor.removeChild( _msg ) );

		// Add the new message to the page
		msgAnchor.appendChild( msg );

		// Delete it after a fixed time
		setTimeout( () => {
			if ( msg && msgAnchor === msg.parentNode ) {
				msgAnchor.removeChild( msg );
			}
		},  TIME_UNTIL_REMOVE );
	};

	if ( 0 < errors.length ) {
		errors.forEach( input => {
			input?.reportValidity();
		});
		btn.disabled = false;
	} else {
		data.data = exportData;
		if ( '' !== form?.dataset?.emailSubject ) {
			data.emailSubject = form?.dataset?.emailSubject;
		}
		if ( form?.dataset?.optionName ) {
			data.formOption = form?.dataset?.optionName;
		}

		const msgAnchor = form.querySelector( '.wp-block-button' );
		msgAnchor?.classList.add( 'has-submit-msg' );

		if ( form?.id ) {
			data.formId = form?.id;
		}

		if ( form.classList.contains( 'is-subscription' ) ) {
			data.action = 'subscribe';
		}

		if ( form.classList.contains( 'can-submit-and-subscribe' ) ) {
			data.action = 'submit-subscribe';
			data.consent = form.querySelector( '.wp-block-themeisle-blocks-form-consent input' )?.checked || false;
		}

		data.postUrl = window.location.href;

		msgAnchor?.classList.add( 'loading' );


		apiFetch({
			path: 'themeisle-gutenberg-blocks/v1/forms',
			method: 'POST',
			data
		}).then( res => {
			msgAnchor?.classList.remove( 'loading' );
			const msg = document.createElement( 'div' );
			msg.classList.add( 'wp-block-themeisle-blocks-form-server-msg' );
			if ( res?.success ) {
				msg.innerHTML = __( 'Success', 'otter-blocks' );
				msg.classList.add( 'success' );
			} else {
				msg.innerHTML = __( 'Error. Something is wrong with the server! Try again later.', 'otter-blocks' );
				msg.classList.add( 'error' );
			}

			addThenRemoveMsg( msg );
			btn.disabled = false;
		})?.catch( error => {
			msgAnchor?.classList.remove( 'loading' );

			console.error( error );

			const msg = document.createElement( 'div' );
			msg.classList.add( 'wp-block-themeisle-blocks-form-server-msg' );
			msg.innerHTML = __( 'Error. Something is wrong with the server! Try again later.', 'otter-blocks' );
			msg.classList.add( 'error' );

			addThenRemoveMsg( msg );
			btn.disabled = false;
		});
	}
};

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	forms.forEach( form => {
		const sendBtn = form.querySelector( 'button' );
		sendBtn?.addEventListener( 'click', ( event ) => {
			event.preventDefault();
			sendBtn.disabled = true;
			collectAndSendInputFormData( form, sendBtn );
		});
	});

});
