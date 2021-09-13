/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import {
	Fragment,
	useState,
	useEffect
} from '@wordpress/element';

import { TextControl, PanelBody, Button, SelectControl, Spinner, Notice } from '@wordpress/components';
import { getListIdOptionFrom } from './integrations';

const Inspector = ({
	attributes,
	setAttributes
}) => {

	const [ email, setEmail ] = useState( '' );
	const [ isEmailSaved, toggleEmailSaved ] = useState( false );

	const [ listIDOptions, setListIDOptions ] = useState([ { label: __( 'None', 'otter-blocks' ), value: '' } ]);
	const [ fetchListIdStatus, setFetchListIdStatus ] = useState( 'loading' );
	const [ fetchErrors, setFetchErrors ] = useState( '' );

	useEffect( () => {
		if ( attributes.optionName ) {
			( new wp.api.models.Settings() ).fetch().done( res => {
				res.themeisle_blocks_form_emails?.filter( ({ form }) => form === attributes.optionName )?.forEach( item => {
					setEmail( item?.email );
				});
			});

		}
	}, [ attributes.optionName ]);

	useEffect( () => {
		if ( attributes.apiKey && attributes.provider ) {
			getListIdOptionFrom( attributes.provider, attributes.apiKey,
				options => {
					options.splice( 0, 0, { label: __( 'None', 'otter-blocks' ), value: '' });
					setListIDOptions( options );
					setFetchListIdStatus( 'loaded' );
					setFetchErrors( '' );
				},
				err => {
					setFetchErrors( __( err?.error, 'otter-blocks' ) );
					setFetchListIdStatus( 'loaded' );
				}
			);
		}
	}, [ attributes.provider, attributes.apiKey ]);

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
			<PanelBody
				title={ __( 'Integration', 'otter-blocks' )}
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Select Provider', 'otter-blocks' ) }
					value={ attributes.provider }
					options={ [
						{ label: __( 'None', 'otter-blocks' ), value: '' },
						{ label: __( 'Mailchimp', 'otter-blocks' ), value: 'mailchimp' },
						{ label: __( 'Sendinblue', 'otter-blocks' ), value: 'sendingblue' }
					] }
					onChange={ provider => setAttributes({ provider }) }
				/>

				{
					attributes.provider && (
						<Fragment>
							<TextControl
								label={ __( 'API Key', 'otter-blocks' ) }
								help={ __( 'You can find the key in the provider\'s website', 'otter-blocks' ) }
								value={ attributes.apiKey }
								onChange={ apiKey => setAttributes({ apiKey })}
							/>

							{
								attributes.apiKey && (
									<Fragment>
										<SelectControl
											label={ __( 'List ID', 'otter-blocks' ) }
											value={ attributes.listId }
											options={ listIDOptions }
											onChange={ listId => setAttributes({ listId }) }
										/>
										{
											2 > listIDOptions.length && 'loading' === fetchListIdStatus && (
												<Fragment>
													<Spinner/>
													{ __( 'Fetch data from provider', 'otter-blocks' ) }
												</Fragment>
											)
										}
										{
											fetchErrors && (
												<Notice status="error" isDismissible={true} onDismiss={ () => setFetchErrors( '' ) }>
													<p>
														{ __( 'Error', 'otter-blocks' ) }: <code>{fetchErrors}</code>
													</p>
												</Notice>
											)
										}
										{
											2 >= listIDOptions.length && 'loaded' === fetchListIdStatus && (
												<SelectControl
													label={ __( 'Select Action', 'otter-blocks' ) }
													value={ attributes.action }
													options={ [
														{ label: __( 'None', 'otter-blocks' ), value: '' },
														{ label: __( 'Subscribe', 'otter-blocks' ), value: 'subscribe' }
													] }
													onChange={ action => setAttributes({ action }) }
												/>

											)
										}
									</Fragment>
								)
							}
						</Fragment>
					)
				}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
