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
	useRef,
	useState
} = wp.element;

const { PluginMoreMenuItem } = wp.editPost;

/**
 * Internal dependencies
 */
import './editor.scss';

const Options = () => {
	useEffect( async() => {
		let data = await apiFetch({ path: 'wp/v2/users/me?context=edit' });

		if ( data.capabilities.manage_options ) {
			setCanUser( true );

			await wp.api.loadPromise.then( () => {
				settingsRef.current = new wp.api.models.Settings();
			});

			if ( false === isAPILoaded ) {
				settingsRef.current.fetch().then( response => {
					setDefault( Boolean( response.themeisle_blocks_settings_default_block ) );
					setAPILoaded( false );
				});
			}
		}
	}, []);

	const settingsRef = useRef( null );

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
				settingsRef.current.fetch();
				setDefault( Boolean( response.themeisle_blocks_settings_default_block ) );
			}

			if ( 'error' === status ) {
				console.log( response );
			}

			settingsRef.current.fetch();
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
