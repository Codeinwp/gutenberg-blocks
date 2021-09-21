/* eslint-disable no-unused-vars */
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

import { createBlock } from '@wordpress/blocks';

import api from '@wordpress/api';

/**
 * Internal dependencies
 */
import { blockInit } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import Placeholder from './placeholder.js';

import {
	dispatch
} from '@wordpress/data';


const Edit = ({
	attributes,
	setAttributes,
	className,
	clientId,
	name
}) => {

	const { createNotice } = dispatch( 'core/notices' );

	const [ googleCaptchaAPISiteKey, setGoogleCaptchaAPISiteKey ] = useState( '' );
	const [ googleCaptchaAPISecretKey, setGoogleCaptchaAPISecretKey ] = useState( '' );
	const [ isAPILoaded, setAPILoaded ] = useState( false );
	const [ isAPISaved, setAPISaved ] = useState( false );

	const settingsRef = useRef( null );
	const [ areSettingsAvailable, setSettingsStatus ] = useState( false );

	const {
		insertBlock,
		removeBlock
	} = useDispatch( 'core/block-editor' );

	const children = useSelect( select => {
		const {
			getBlock
		} = select( 'core/block-editor' );
		return getBlock( clientId ).innerBlocks;
	});

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

	useEffect( () => {
		if ( children ) {
			const verificationBlocks = children.filter( ({ name }) => 'themeisle-blocks/form-nonce' === name );

			if ( 2 <= verificationBlocks.length ) {
				verificationBlocks.slice( 1 ).forEach( block => {
					removeBlock( block.clientId, false );
				});
			} else if ( 0 === verificationBlocks.length ) {
				const nonceBlock = createBlock( 'themeisle-blocks/form-nonce' );
				insertBlock?.( nonceBlock, ( children?.length ) || 0, clientId, false );
			}
		}
	}, [ children ]);

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
		api.loadPromise.then( () => {
			console.info( 'LOADED' );
			settingsRef.current = new api.models.Settings();
			setSettingsStatus( true );
		});
	}, []);

	/**
	 * Save the captcha setting
	 */
	useEffect( () => {

		settingsRef?.current?.fetch().done( res => {
			const emails = res.themeisle_blocks_form_emails ? res.themeisle_blocks_form_emails : [];
			let isMissing = true;
			let hasChanged = false;

			emails?.forEach( ({ form }, index )=> {
				if ( form === attributes.optionName ) {
					if ( emails[index].hasCaptcha !== attributes.hasCaptcha ) {
						hasChanged = true;
					}
					emails[index].hasCaptcha = attributes.hasCaptcha; // update the value
					isMissing = false;
				}
			});

			if ( isMissing ) {
				emails.push({
					form: attributes.optionName,
					hasCaptcha: attributes.hasCaptcha
				});
			}

			if ( isMissing || hasChanged ) {
				const model = new api.models.Settings({
					// eslint-disable-next-line camelcase
					themeisle_blocks_form_emails: emails
				});

				model.save();

				createNotice(
					'info',
					__( 'Form preference has been saved!', 'otter-blocks' ),
					{
						isDismissible: true,
						type: 'snackbar'
					}
				);
			}
		});
	}, [ attributes.hasCaptcha, settingsRef.current ]);

	useEffect( () => {

		const getAPIData = async() => {
			if ( ! isAPILoaded ) {
				console.log( 'GET DATA' );
				settingsRef?.current?.fetch().then( response => {
					setGoogleCaptchaAPISiteKey( response.themeisle_google_captcha_api_site_key );
					setGoogleCaptchaAPISecretKey( response.themeisle_google_captcha_api_secret_key );
					setAPILoaded( true );

					if ( '' !== response.themeisle_google_captcha_api_site_key && '' !== response.themeisle_google_captcha_api_secret_key ) {
						setAPISaved( true );
					}
				});
			}
		};

		if ( areSettingsAvailable ) {
			console.log( 'Ref Loaded' );
			if ( false === Boolean( googleCaptchaAPISiteKey ) || false === Boolean( googleCaptchaAPISecretKey ) ) {
				getAPIData();
			} else {
				if ( ! isAPILoaded ) {
					setAPILoaded( true );
					setAPISaved( true );
				}
			}

		}

		console.count( 'CHECKING' );
	}, [ areSettingsAvailable, googleCaptchaAPISiteKey, googleCaptchaAPISecretKey, isAPILoaded ]);

	const saveAPIKey = () => {

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

			setAPISaved( saved );
			setGoogleCaptchaAPISecretKey( '' );
			setGoogleCaptchaAPISiteKey( '' );

			createNotice(
				'info',
				__( 'API Keys has been saved!', 'otter-blocks' ),
				{
					isDismissible: true,
					type: 'snackbar'
				}
			);
		});

	};

	console.log( 'INNER BLOCKS', attributes.innerBlocks, variations, name );

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
					( hasInnerBlocks ) ? (
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
											nextVariation.innerBlocks
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
