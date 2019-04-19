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
	Component,
	Fragment
} = wp.element;

const { PluginMoreMenuItem } = wp.editPost;

/**
 * Internal dependencies
 */
import './editor.scss';

class Options extends Component {
	constructor() {
		super( ...arguments );

		this.changeOptions = this.changeOptions.bind( this );

		this.settings;

		this.state = {
			canUser: false,
			isAPILoaded: false,
			isDefault: false,
			isOpen: false
		};
	}

	async componentDidMount() {
		let data = await apiFetch({ path: 'wp/v2/users/me?context=edit' });

		if ( data.capabilities.manage_options ) {
			this.setState({ canUser: true });

			wp.api.loadPromise.then( () => {
				this.settings = new wp.api.models.Settings();
			});

			if ( false === this.state.isAPILoaded ) {
				this.settings.fetch().then( response => {
					this.setState({
						isDefault: Boolean( response.themeisle_blocks_settings_default_block ),
						isAPILoaded: true
					});
				});
			}
		}
	}

	changeOptions() {
		const model = new wp.api.models.Settings({
			// eslint-disable-next-line camelcase
			themeisle_blocks_settings_default_block: ! Boolean( this.state.isDefault )
		});

		const save = model.save();

		save.success( ( response, status ) => {
			if ( 'success' === status ) {
				this.settings.fetch();
				this.setState({
					isDefault: Boolean( response.themeisle_blocks_settings_default_block )
				});
			}

			if ( 'error' === status ) {
				console.log( response );
			}

			this.settings.fetch();
		});

		save.error( ( response, status ) => {
			console.log( response );
		});
	}

	render() {
		return (
			<Fragment>
				{ ( this.state.canUser && undefined !== PluginMoreMenuItem ) && (
					<PluginMoreMenuItem
						onClick={ () => this.setState({ isOpen: true }) }
					>
						{ __( 'Otter Options' ) }
					</PluginMoreMenuItem>
				) }

				{ this.state.isOpen && (
					<Modal
						title={ __( 'Otter Options' ) }
						overlayClassName="themeisle-blocks-options"
						onRequestClose={ () => this.setState({ isOpen: false }) }
					>
						<BaseControl>
							<CheckboxControl
								label={ __( 'Make Section block your default block for Pages?' ) }
								checked={ this.state.isDefault }
								onChange={ this.changeOptions }
							/>
						</BaseControl>
					</Modal>
				) }
			</Fragment>
		);
	}
}

export default Options;
