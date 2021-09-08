
import apiFetch from '@wordpress/api-fetch';

export const loadCapthaScriptThen = ( callback ) => {
	window.isCaptchaScriptAdded = true;
	const script = document.createElement( 'script' );
	script.src = 'https://www.google.com/recaptcha/api.js';
	script.id = 'recaptcha';
	document.body.appendChild( script );

	script.onload = () => {
		apiFetch({
			path: 'themeisle-gutenberg-blocks/v1/forms',
			method: 'GET'
		}).then( resp => {
			const { sitekey } = resp;
			document.body.querySelectorAll( '.wp-block-themeisle-blocks-form-captcha' ).forEach( captchaTarget => {
				if ( grecaptcha ) {
					const id = captchaTarget.parentNode?.parentNode?.id;
					grecaptcha?.render(
						captchaTarget,
						{
							sitekey,
							callback: ( token ) => {
								console.log( token, 'id', id );
								if ( ! window.themeisleGutenberg?.tokens ) {
									window.themeisleGutenberg = {};
									window.themeisleGutenberg.tokens = {};
								}
								window.themeisleGutenberg.tokens[id] = token;
							},
							'expired-callback': () => {
								if ( ! window.themeisleGutenberg?.tokens ) {
									window.themeisleGutenberg = {};
									window.themeisleGutenberg.tokens = {};
								}
								window.themeisleGutenberg.tokens[id] = null;
							}
						}
					);
				}
			});
			if ( callback ) {
				callback();
			}
		});
	};
};
