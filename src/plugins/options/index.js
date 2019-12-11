/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { apiFetch } = wp;

const {
	BaseControl,
	CheckboxControl,
	Modal
} = wp.components;

const {
	Fragment,
	useEffect,
	useState
} = wp.element;

const { PluginMoreMenuItem } = wp.editPost;

/**
 * Internal dependencies
 */
import './editor.scss';

let settings = null;

const Options = () => {
	useEffect( async() => {
		let data = await apiFetch({ path: 'wp/v2/users/me?context=edit' });

		if ( data.capabilities.manage_options ) {
			setCanUser( true );

			await wp.api.loadPromise.then( () => {
				settings = new wp.api.models.Settings();
			});

			if ( false === isAPILoaded ) {
				settings.fetch().then( response => {
					setDefault( Boolean( response.themeisle_blocks_settings_default_block ) );
					setAPILoaded( false );
				});
			}
		}
	}, []);

	const [ canUser, setCanUser ] = useState( false );
	const [ isAPILoaded, setAPILoaded ] = useState( false );
	const [ isDefault, setDefault ] = useState( false );
	const [ isOpen, setOpen ] = useState( false );

	const changeOptions = () => {
		const model = new wp.api.models.Settings({
			// eslint-disable-next-line camelcase
			themeisle_blocks_settings_default_block: ! Boolean( isDefault )
		});

		const save = model.save();

		save.success( ( response, status ) => {
			if ( 'success' === status ) {
				settings.fetch();
				setDefault( Boolean( response.themeisle_blocks_settings_default_block ) );
			}

			if ( 'error' === status ) {
				console.log( response );
			}

			settings.fetch();
		});

		save.error( ( response, status ) => {
			console.log( response );
		});
	};

	return (
		<Fragment>
			{ ( canUser ) && (
				<PluginMoreMenuItem
					onClick={ () => setOpen( true ) }
				>
					{ __( 'Otter Options' ) }
				</PluginMoreMenuItem>
			) }

			{ isOpen && (
				<Modal
					title={ __( 'Otter Options' ) }
					overlayClassName="wp-block-themeisle-blocks-options"
					onRequestClose={ () => setOpen( false ) }
				>
					<BaseControl>
						<CheckboxControl
							label={ __( 'Make Section block your default block for Pages?' ) }
							checked={ isDefault }
							onChange={ changeOptions }
						/>
					</BaseControl>
				</Modal>
			) }
		</Fragment>
	);
};

export default Options;
