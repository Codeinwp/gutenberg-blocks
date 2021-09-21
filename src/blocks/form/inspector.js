/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import {
	useState,
	useEffect,
	Fragment
} from '@wordpress/element';

import { TextControl, PanelBody, Button, ToggleControl, Spinner } from '@wordpress/components';

import {
	dispatch
} from '@wordpress/data';


import api from '@wordpress/api';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	const { createNotice } = dispatch( 'core/notices' );

	const [ savedEmail, setSavedEmail ] = useState( '' );
	const [ email, setEmail ] = useState( '' );
	const [ isEmailLoaded, setEmailLoading ] = useState( true );

	useEffect( () => {
		if ( attributes.optionName ) {
			( new api.models.Settings() ).fetch().done( res => {
				res.themeisle_blocks_form_emails?.filter( ({ form }) => form === attributes.optionName )?.forEach( item => {
					setEmailLoading( true );
					setEmail( item?.email );
					setSavedEmail( item?.email );
				});
			});

		}
	}, [ attributes.optionName ]);

	const saveEmail = () => {
		( new api.models.Settings() ).fetch().done( res => {
			const emails = res.themeisle_blocks_form_emails ? res.themeisle_blocks_form_emails : [];
			let isMissing = true;

			emails?.forEach( ({ form }, index )=> {
				if ( form === attributes.optionName ) {
					emails[index].email = email; // update the value
					isMissing = false;
				}
			});

			if ( isMissing ) {
				emails.push({
					form: attributes.optionName,
					email: email
				});
			}

			const model = new api.models.Settings({
				// eslint-disable-next-line camelcase
				themeisle_blocks_form_emails: emails
			});

			setEmailLoading( false );

			model.save().then( response => {
				response.themeisle_blocks_form_emails?.filter( ({ form }) => form === attributes.optionName ).forEach( item => {
					{
						setEmailLoading( true );
						setSavedEmail( item?.email );

						createNotice(
							'info',
							__( 'Email has been saved!', 'otter-blocks' ),
							{
								isDismissible: true,
								type: 'snackbar'
							}
						);
					}
				});
			});
		});
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
				initialOpen={ true }
			>
				<TextControl
					label={ __( 'Email Subject', 'otter-blocks' ) }
					placeholder={ __( 'A new submission', 'otter-blocks' ) }
					value={ attributes.subject }
					onChange={ subject => setAttributes({ subject }) }
					help={ __( 'Customize the email title send by this form.', 'otter-blocks' ) }
				/>

				<TextControl
					label={ __( 'Email To', 'otter-blocks' ) }
					placeholder={ __( 'Default is to admin site', 'otter-blocks' ) }
					value={ email }
					onChange={ email => setEmail( email ) }
					help={ __( 'Send form data to another email. (Admin is default).', 'otter-blocks' ) }
				/>

				<Button
					isPrimary
					onClick={ saveEmail }
					disabled={ email === savedEmail }
				>
					<Fragment>
						{
							! isEmailLoaded && (
								<Spinner />
							)
						}
						{
							__( 'Save', 'otter-blocks' )
						}
					</Fragment>
				</Button>

				<ToggleControl
					label={ __( 'Add captcha', 'otter-blocks' ) }
					checked={ attributes.hasCaptcha }
					onChange={ hasCaptcha => setAttributes({ hasCaptcha }) }
					help={ __( 'Add Google reCaptcha for protection againts bots.', 'otter-blocks' ) }
				/>

				{
					attributes.hasCaptcha && (
						__( 'You can change the API Keys in Settings > Otter', 'otter-blocks' )
					)
				}

	   		</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
