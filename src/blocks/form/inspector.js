/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import {
	useState,
	useEffect
} from '@wordpress/element';

import { TextControl, PanelBody, Button, ToggleControl } from '@wordpress/components';

const Inspector = ({
	attributes,
	setAttributes
}) => {

	const [ email, setEmail ] = useState( '' );
	const [ isEmailSaved, toggleEmailSaved ] = useState( false );

	useEffect( () => {
		if ( attributes.optionName ) {
			( new wp.api.models.Settings() ).fetch().done( res => {
				res.themeisle_blocks_form_emails?.filter( ({ form }) => form === attributes.optionName )?.forEach( item => {
					setEmail( item?.email );
				});
			});

		}
	}, [ attributes.optionName ]);

	const saveEmail = () => {
		( new wp.api.models.Settings() ).fetch().done( res => {
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

			const model = new wp.api.models.Settings({
				// eslint-disable-next-line camelcase
				themeisle_blocks_form_emails: emails
			});

			toggleEmailSaved( false );

			model.save().then( response => {
				if ( 0 < response.themeisle_blocks_form_emails?.filter( ({ form }) => form === attributes.optionName )?.length ) {
					toggleEmailSaved( true );
				}
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
				>
					{
						__( 'Save', 'otter-blocks' )
					}
				</Button>

				<ToggleControl
					label={ __( 'Add captcha', 'otter-blocks' ) }
					checked={ attributes.hasCaptcha }
					onChange={ hasCaptcha => setAttributes({ hasCaptcha }) }
					help={ __( 'Add Google reCaptcha for protection againts bots.', 'otter-blocks' ) }
				/>

				{
					isEmailSaved && (
						<p style={{ color: 'green '}}>
							{
								__( 'The email was saved!', 'otter-blocks' )
							}
						</p>
					)
				}
	   		</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
