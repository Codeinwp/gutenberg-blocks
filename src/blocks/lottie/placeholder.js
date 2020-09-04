/**
 * External dependencies
 */
import { video } from '@wordpress/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BlockIcon,
	MediaPlaceholder
} = wp.blockEditor;

const {
	Button,
	Modal,
	Placeholder
} = wp.components;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

const BlockPlaceholder = ({
	className,
	file,
	onChange
}) => {
	useEffect( () => {
		wp.api.loadPromise.then( () => {
			const settings = new wp.api.models.Settings();

			settings.fetch().then( response => {
				if ( response.themeisle_allow_json_upload ) {
					setJSONAllowed( response.themeisle_allow_json_upload );
				}
			});
		});
	}, []);

	const [ isJSONAllowed, setJSONAllowed ] = useState( false );
	const [ url, setURL ] = useState( null );
	const [ isOpen, setOpen ] = useState( false );
	const [ isLoading, setLoading ] = useState( false );

	const onChangeValue = e => {
		if ( e ) {
			e.preventDefault();
		}

		return onChange( url );
	};

	const onChangeOption = () => {
		setLoading( true );

		const settings = new wp.api.models.Settings({
			// eslint-disable-next-line camelcase
			themeisle_allow_json_upload: true
		});

		settings.save().then( response => {
			setLoading( false );
			setOpen( false );
			setJSONAllowed( response.themeisle_allow_json_upload );
		});
	};

	if ( isJSONAllowed && ! Boolean( themeisleGutenberg.isWPVIP ) ) {
		return (
			<MediaPlaceholder
				labels={ {
					title: __( 'Lottie' ),
					instructions: __( 'Add Lottie animations and files to your website.' )
				} }
				icon={ <BlockIcon icon={ video } />}
				accept={ [ 'application/json' ] }
				allowedTypes={ [ 'application/json' ] }
				value={ { ...file } }
				onSelectURL={ onChange }
				onSelect={ onChange }
			/>
		);
	}

	return (
		<Fragment>
			<Placeholder
				label={ __( 'Lottie' ) }
				instructions={ __( 'Add Lottie animations and files to your website.' ) }
				icon={ <BlockIcon icon={ video } />}
				className={ className }
			>
				<form onSubmit={ e => onChangeValue( e ) }>
					<input
						type="url"
						value={ url }
						className="components-placeholder__input"
						aria-label={ __( 'Lottie' ) }
						placeholder={ __( 'Enter URL to embed here…' ) }
						onChange={ e => setURL( e.target.value ) }
					/>

					<Button
						isPrimary
						disabled={ ! url }
						type="submit"
					>
						{ __( 'Embed' ) }
					</Button>

					{ ! Boolean( themeisleGutenberg.isWPVIP ) && (
						<Button
							isSecondary
							onClick={ () => setOpen( true ) }
						>
							{ __( 'Upload' ) }
						</Button>
					) }
				</form>
			</Placeholder>

			{ isOpen && (
				<Modal
					title={ __( 'Allow JSON Uploads' ) }
					closeLabel={ __( 'Close' ) }
					onRequestClose={ () => setOpen( false ) }
					overlayClassName="wp-block-themeisle-blocks-lottie-modal"
				>
					{ __( 'This file type is not permitted for security reasons. Would you still like to enable JSON uploads?' ) }

					<br/><br/>

					{ __( 'You can always enable/disable this option later from Settings > Otter.' ) }

					<div className="wp-block-themeisle-blocks-lottie-modal__actions">
						<Button
							isSecondary
							isLarge
							onClick={ () => setOpen( false ) }
						>
							{ __( 'Close' ) }
						</Button>

						<Button
							isPrimary
							isLarge
							isLoading={ isLoading }
							onClick={ onChangeOption }
						>
							{ __( 'Save' ) }
						</Button>
					</div>
				</Modal>
			) }
		</Fragment>
	);
};

export default BlockPlaceholder;
