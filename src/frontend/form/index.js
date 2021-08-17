/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';

const collectInputFormData = ( form ) => {
	const exportData = [];
	const inputs = form?.querySelectorAll( '.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-input' );

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

domReady( () => {
	const forms = document.querySelectorAll( '.wp-block-themeisle-blocks-form' );

	forms.forEach( form => {
		console.log( form?.dataset?.url );
		const sendBtn = form.querySelector( 'button' );

		sendBtn?.addEventListener( 'click', ( event ) => {
			event.preventDefault();

			// sendData( form?.dataset?.url, collectInputFormData( form ) );

			apiFetch({
				path: 'themeisle-gutenberg-blocks/v1/forms',
				method: 'POST',
				data: collectInputFormData( form )
			}).then( res => {
				console.log( res );
			});
		});
	});

});
