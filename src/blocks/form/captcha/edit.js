/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	Fragment,
	useState,
	useEffect,
	useRef
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import { blockInit } from '../../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import Placeholder from './placeholder.js';


const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId
}) => {

	const [ googleCaptchaAPISiteKey, setGoogleCaptchaAPISiteKey ] = useState( '' );
	const [ googleCaptchaAPISecretKey, setGoogleCaptchaAPISecretKey ] = useState( '' );
	const [ isAPILoaded, setAPILoaded ] = useState( false );
	const [ isAPISaved, setAPISaved ] = useState( false );
	const [ isSaving, setSaving ] = useState( false );
	const settingsRef = useRef( null );

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {

		const setApi = async() => {
			await wp.api.loadPromise.then( () => {
				settingsRef.current = new wp.api.models.Settings();
			});

			if ( false === Boolean( window.themeisleGutenberg.reCaptchaSiteKey ) || false === Boolean( window.themeisleGutenberg.reCaptchaSecretKey ) ) {
				if ( ! isAPILoaded ) {
					settingsRef.current.fetch().then( response => {
						setGoogleCaptchaAPISiteKey( response.themeisle_google_captcha_api_site_key );
						setGoogleCaptchaAPISecretKey( response.themeisle_google_captcha_api_secret_key );
						setAPILoaded( true );

						if ( '' !== response.themeisle_google_captcha_api_site_key && '' !== response.themeisle_google_captcha_api_secret_key ) {
							setAPISaved( true );
						}

						console.log( response );
					});
				}
			} else {
				if ( ! isAPILoaded ) {
					setAPILoaded( true );
					setAPISaved( true );
				}
			}
		};

		setApi();
	}, []);

	const saveAPIKey = () => {
		if ( false === Boolean( window.themeisleGutenberg.mapsAPI ) ) {
			setSaving( true );

			const model = new wp.api.models.Settings({
				// eslint-disable-next-line camelcase
				themeisle_google_captcha_api_site_key: googleCaptchaAPISiteKey,
				// eslint-disable-next-line camelcase
				themeisle_google_captcha_api_secret_key: googleCaptchaAPISecretKey
			});

			model.save().then( response => {
				let saved = false;

				if ( '' !== response.themeisle_google_captcha_api_site_key && '' !== response.themeisle_google_captcha_api_secret_key ) {
					saved = true;
				}

				setSaving( false );
				setAPISaved( saved );
				setGoogleCaptchaAPISecretKey( '' );
				setGoogleCaptchaAPISiteKey( '' );
			});
		}
	};

	if ( ! isAPILoaded || ! isAPISaved ) {
		return (
			<Placeholder
				className={ className }
				isAPILoaded={ isAPILoaded }
				isAPISaved={ isAPISaved }
				saveAPIKey={ saveAPIKey }
				siteKey={ googleCaptchaAPISiteKey }
				secretKey={ googleCaptchaAPISecretKey }
				setSiteKey={ setGoogleCaptchaAPISiteKey }
				setSecretKey={ setGoogleCaptchaAPISecretKey }
			/>
		);
	}

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div className={ className } >
				 {__( 'reCaptcha Field', 'otter-blocks' )}
			</div>
		</Fragment>
	);
};

export default Edit;