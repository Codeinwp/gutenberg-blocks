import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { addCaptchaOnPage } from './captcha';

const TIME_UNTIL_REMOVE = 10_000;

/**
 * Send the date from the form to the server
 * @param {HTMLDivElement} form The element that contains all the inputs
 * @param {HTMLButtonElement} btn The submit button
 */
const collectAndSendInputFormData = ( form, btn ) => {
	const id = form?.id;
	const data = {};

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

	const query = `.protection #${ form.id || '' }_nonce_field`;
	const nonceFieldValue = form.querySelector( query )?.value;

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

	if ( 0 < elemsWithError.length || ( form?.classList?.contains( 'has-captcha' ) && id && ! window.themeisleGutenberg?.tokens[id].token ) ) {
		elemsWithError.forEach( input => {
			input?.reportValidity();
		});
		if (  form?.classList?.contains( 'has-captcha' ) && id && ! window.themeisleGutenberg?.tokens[id].token  ) {
			const msg = document.createElement( 'div' );
			msg.classList.add( 'wp-block-themeisle-blocks-form-server-msg' );
			if ( ! window.hasOwnProperty( 'grecaptcha' ) ) {
				msg.innerHTML = __( '⚠ Captcha is not loaded. Please check your browser plugins to allow the Google reCaptcha.', 'otter-blocks' );
			} else {
				msg.innerHTML = __( '⚠ Please check the captcha.', 'otter-blocks' );
			}
			msg.classList.add( 'warning' );
			addThenRemoveMsg( msg );
		}
		btn.disabled = false;
	} else {
		data.data = formFieldsData;
		if ( '' !== form?.dataset?.emailSubject ) {
			data.emailSubject = form?.dataset?.emailSubject;
		}
		if ( form?.dataset?.optionName ) {
			data.formOption = form?.dataset?.optionName;
		}

		if (  form?.classList?.contains( 'has-captcha' ) && id && window.themeisleGutenberg?.tokens?.[id].token ) {
			data.token = window.themeisleGutenberg?.tokens?.[id].token;
		}

		if ( form?.id ) {
			data.formId = form?.id;
		}

		if ( nonceFieldValue ) {
			data.nonceValue = nonceFieldValue;
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
				msg.innerHTML = __( 'Something went wrong! Try again.', 'otter-blocks' );
				msg.classList.add( 'error' );
				console.error( res?.error, res?.reasons );
			}

			addThenRemoveMsg( msg );

			if ( window.themeisleGutenberg?.tokens?.[id].reset ) {
				window.themeisleGutenberg?.tokens?.[id].reset();
			}
			btn.disabled = false;
		})?.catch( error => {
			msgAnchor?.classList.remove( 'loading' );

			console.error( error );

			const msg = document.createElement( 'div' );
			msg.classList.add( 'wp-block-themeisle-blocks-form-server-msg' );
			msg.innerHTML = __( 'Error. Something is wrong with the server! Try again later.', 'otter-blocks' );
			msg.classList.add( 'error' );

			addThenRemoveMsg( msg );
			if ( window.themeisleGutenberg?.tokens?.[id].reset ) {
				window.themeisleGutenberg?.tokens?.[id].reset();
			}
			btn.disabled = false;
		});
	}
};

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	addCaptchaOnPage( forms );

	forms.forEach( form => {
		const sendBtn = form.querySelector( 'button' );
		sendBtn?.addEventListener( 'click', ( event ) => {
			if ( ! sendBtn.disabled ) {
				event.preventDefault();
				sendBtn.disabled = true;
				collectAndSendInputFormData( form, sendBtn );
			}
		});
	});

});
