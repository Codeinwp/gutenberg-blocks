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
				<Spinner/>
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
				<div className="components-placeholder__actions">
					<TextControl
						type="text"
						placeholder={ __( 'Google Maps API Key' ) }
						value={ api }
						className="components-placeholder__input"
						onChange={ changeAPI }
					/>

					<Button
						isLarge
						isSecondary
						type="submit"
						onClick={ saveAPIKey }
						isBusy={ isSaving }
						disabled={ '' === api }
					>
						{ __( 'Save' ) }
					</Button>
				</div>

				<div className="components-placeholder__learn-more">
					{ __( 'You need to activate Maps and Places API.' ) } <ExternalLink href="https://developers.google.com/maps/documentation/javascript/get-api-key">{ __( 'Need an API key? Get one here.' ) }</ExternalLink>
				</div>
			</Placeholder>
		);
	}
};

export default BlockPlaceholder;
