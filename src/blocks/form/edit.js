/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/block-editor';

import {
	Fragment,
	useState,
	useEffect,
	useRef
} from '@wordpress/element';

import {
	select,
	useSelect,
	useDispatch
} from '@wordpress/data';

import {
	createBlocksFromInnerBlocksTemplate
} from '@wordpress/blocks';

import {
	__experimentalBlockVariationPicker as VariationPicker
} from '@wordpress/block-editor';

import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { blockInit } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import Placeholder from './placeholder.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	name
}) => {

	const [ googleCaptchaAPISiteKey, setGoogleCaptchaAPISiteKey ] = useState( '' );
	const [ googleCaptchaAPISecretKey, setGoogleCaptchaAPISecretKey ] = useState( '' );
	const [ isAPILoaded, setAPILoaded ] = useState( false );
	const [ isAPISaved, setAPISaved ] = useState( false );
	// eslint-disable-next-line no-unused-vars
	const [ isSaving, setSaving ] = useState( false );
	const settingsRef = useRef( null );

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {
		if (  attributes.id && select( 'core/edit-widgets' ) ) {
			setAttributes({ optionName: `widget_${ attributes.id.slice( -8 ) }` });
		} else  if ( attributes.id && select( 'core/editor' )?.getCurrentPostId() ) {
			setAttributes({ optionName: `${ select( 'core/editor' ).getCurrentPostId() }_${ attributes.id.slice( -8 ) }` });
		}
	}, [ attributes.id ]);

	const hasInnerBlocks = useSelect(
		( select ) =>
			0 < select( 'core/block-editor' ).getBlocks( clientId ).length,
		[ clientId ]
	);

	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation
			} = select( 'core/blocks' );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				variations: getBlockVariations( name, 'block' )
			};
		},
		[ name ]
	);
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

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

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				className={ className }
				id={ attributes.id }
			>
				{
					hasInnerBlocks ? (
						<div className="wp-block-themeisle-blocks-form__container">
							<InnerBlocks
							/>

							<div className="wp-block-button">
								<button className="wp-block-button__link">
									{ __( 'Submit', 'otter-blocks' ) }
								</button>
							</div>
							{
								attributes.hasCaptcha && ( ! isAPILoaded || ! isAPISaved ) && (
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
								)
							}
						</div>
					) : (
						<VariationPicker
							icon={ get( blockType, [ 'icon', 'src' ]) }
							label={ get( blockType, [ 'title' ]) }
							variations={ variations }
							onSelect={ ( nextVariation = defaultVariation ) => {
								if ( nextVariation ) {
									replaceInnerBlocks(
										clientId,
										createBlocksFromInnerBlocksTemplate(
											nextVariation.attributes.innerBlocks
										),
										true
									);
								}
							} }
							allowSkip
						/>
					)
				}
			</div>
		</Fragment>
	);
};

export default Edit;
