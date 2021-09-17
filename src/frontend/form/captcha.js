export const addCaptchaOnPage = ( forms ) => {
	if ( window?.grecaptcha === undefined && window?.themeisleGutenbergForm?.reRecaptchaSitekey ) {
		const script = document.createElement( 'script' );
		script.src = 'https://www.google.com/recaptcha/api.js';
		script.id = 'recaptcha';
		document.body.appendChild( script );

		script.onload = () => {
			setTimeout( () => {
				forms.forEach( form => {
					if ( form?.classList?.contains( 'has-captcha' ) ) {
						renderCapthcaOn( form );
					}
				});
			}, 500 );
		};
	}
};

/**
 * Render the captcha component on form
 * @param {HTMLDivElement} form The form container
 */
const renderCapthcaOn = form => {
	const id = form.id;

	const captchaNode = document.createElement( 'div' );
	const container = form.querySelector( '.wp-block-themeisle-blocks-form__container' );
	container?.insertBefore( captchaNode, container.lastChild );

	window.grecaptcha?.render(
		captchaNode,
		{
			sitekey: window?.themeisleGutenbergForm?.reRecaptchaSitekey,
			callback: ( token ) => {
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
};
