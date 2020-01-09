/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Button,
	ExternalLink,
	Placeholder,
	Spinner,
	TextControl
} = wp.components;

const BlockPlaceholder = ({
	className,
	api,
	isAPILoaded,
	isAPISaved,
	isSaving,
	changeAPI,
	saveAPIKey
}) => {
	if ( ! isAPILoaded ) {
		return (
			<Placeholder>
				<Spinner></Spinner>
				{ __( 'Loading…' ) }
			</Placeholder>
		);
	}

	if ( ! isAPISaved ) {
		return (
			<Placeholder
				icon="admin-site"
				label={ __( 'Google Maps' ) }
				instructions={ __( 'A Google Maps API key is required, please enter one below.' ) }
				className={ className }
			>
				<TextControl
					type="text"
					placeholder={ __( 'Google Maps API Key' ) }
					value={ api }
					className="components-placeholder__input"
					onChange={ changeAPI }
				/>

				<Button
					isLarge
					type="submit"
					onClick={ saveAPIKey }
					isBusy={ isSaving }
					disabled={ '' === api }
				>
					{ __( 'Save API Key' ) }
				</Button>

				<div className="components-placeholder__instructions">
					<p className="components-placeholder__text">
						{ __( 'Need an API key? Get one ' ) }
						<ExternalLink href="https://developers.google.com/maps/documentation/javascript/get-api-key">{ __( 'here.' ) }</ExternalLink>
					</p>
					<p className="components-placeholder__text">{ __( 'You need to activate Maps and Places API.' ) }</p>
				</div>
			</Placeholder>
		);
	}
};

export default BlockPlaceholder;
