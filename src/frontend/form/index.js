import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { addCaptchaOnPage } from './captcha';

const TIME_UNTIL_REMOVE = 10_000;

/**
 * Send the date from the form to the server
 * @param {HTMLDivElement} form The element that contains all the inputs
 */
const collectAndSendInputFormData = ( form ) => {
	const id = form?.id;
	const data = {};

	/** @type {Array.<HTMLDivElement>} */
	const messagesElem = [];

	/** @type {Array.<HTMLDivElement>} */
	const elemsWithError = [];

	const formFieldsData = [ { label: __( 'Form submission from', 'otter-blocks' ), value: window.location.href } ];

	const inputs = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-input' );
	const textarea = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-textarea' );


	[ ...inputs, ...textarea ]?.forEach( input => {
		const label = input.querySelector( '.wp-block-themeisle-blocks-form-input-label__label, .wp-block-themeisle-blocks-form-textarea-label__label' )?.innerHTML;
		const valueElem = input.querySelector( '.wp-block-themeisle-blocks-form-input-input, .wp-block-themeisle-blocks-form-textarea-input' );

		// TODO: use checkbox in the future versions
		const checked = input.querySelector( '.wp-block-themeisle-blocks-form-input-input[type="checkbox"]' )?.checked;

		if ( valueElem?.hasAttribute( 'required' ) &&  ! valueElem?.checkValidity() ) {
			elemsWithError.push( valueElem );
		}

		if ( label && valueElem?.value ) {
			formFieldsData.push({
				label,
				value: valueElem?.value,
				checked
			});
		};
	});

	const nonceFieldValue = form.querySelector( '#_nonce_field' )?.value;

	if ( 0 < elemsWithError.length || ( form?.classList?.contains( 'has-captcha' ) && id && ! window.themeisleGutenberg?.tokens[id]) ) {
		elemsWithError.forEach( input => {
			input?.reportValidity();
		});
	} else {
		data.data = formFieldsData;
		if ( '' !== form?.dataset?.emailSubject ) {
			data.emailSubject = form?.dataset?.emailSubject;
		}
		if ( form?.dataset?.optionName ) {
			data.formOption = form?.dataset?.optionName;
		}

		if (  form?.classList?.contains( 'has-captcha' ) && id && window.themeisleGutenberg?.tokens?.[id]) {
			data.token = window.themeisleGutenberg?.tokens?.[id];
		}

		if ( form?.id ) {
			data.formId = form?.id;
		}

		if ( nonceFieldValue ) {
			data.nonceValue = nonceFieldValue;
		}

		data.postUrl = window.location.href;

		const msgAnchor = form.querySelector( '.wp-block-button' );
		msgAnchor?.classList.add( 'has-submit-msg' );
		msgAnchor?.classList.add( 'loading' );

		/**
		 * Add the message to the anchor element then removed after a fixed time
		 * @param {HTMLDivElement} msg The message container
		 */
		const addThenRemoveMsg = ( msg ) => {

			// Remove old messages
			let _msg = messagesElem.pop();
			while ( _msg ) {
				if ( msgAnchor === _msg.parentNode ) {
					msgAnchor.removeChild( _msg );
				}
				_msg = messagesElem.pop();
			}

			// Add the new message to the page
			messagesElem.push( msg );
			msgAnchor.appendChild( msg );

			// Delete it after a fixed time
			setTimeout( () => {
				if ( msg && msgAnchor === msg.parentNode ) {
					msgAnchor.removeChild( msg );
				}
			},  TIME_UNTIL_REMOVE );
		};

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
				msg.innerHTML = __( 'Something went wrong! Try again.', 'otter-blocks' );
				msg.classList.add( 'error' );
				console.error( res?.error, res?.reasons );
			}

			addThenRemoveMsg( msg );
		})?.catch( error => {
			msgAnchor?.classList.remove( 'loading' );

			console.error( error );

			const msg = document.createElement( 'div' );
			msg.classList.add( 'wp-block-themeisle-blocks-form-server-msg' );
			msg.innerHTML = __( 'Error. Something is wrong with the server! Try again later.', 'otter-blocks' );
			msg.classList.add( 'error' );

			addThenRemoveMsg( msg );
		});
	}
};

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	addCaptchaOnPage( forms );

	forms.forEach( form => {
		const sendBtn = form.querySelector( 'button' );
		sendBtn?.addEventListener( 'click', ( event ) => {
			event.preventDefault();

			collectAndSendInputFormData( form );
		});
	});

});
