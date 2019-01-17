/**
 * External dependencies
 */
import LazyLoad from 'react-lazy-load';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';

import { themeisleIcon } from '../../../utils/icons.js';

/**
 * WordPress dependencies...
 */
const {
	startCase,
	toLower
} = lodash;

const { __ } = wp.i18n;

const { apiFetch } = wp;

const {
	Button,
	Dashicon,
	Dropdown,
	Icon,
	TextControl,
	Tooltip,
	MenuGroup,
	MenuItem,
	Modal,
	Notice,
	Spinner
} = wp.components;

const { compose } = wp.compose;

const {
	withSelect,
	withDispatch
} = wp.data;

const { Component } = wp.element;

class Library extends Component {
	constructor() {
		super( ...arguments );

		this.changeTab = this.changeTab.bind( this );
		this.removeError = this.removeError.bind( this );
		this.selectCategory = this.selectCategory.bind( this );
		this.changeSearch = this.changeSearch.bind( this );
		this.importTemplate = this.importTemplate.bind( this );

		this.state = {
			tab: 'block',
			isLoaded: false,
			isError: false,
			selectedCategory: null,
			search: '',
			blocksCategories: [],
			templateCategories: [],
			data: []
		};
	}

	async componentDidMount() {
		let data = await apiFetch({ path: 'themeisle-gutenberg-blocks/v1/fetch_templates' });

		let blocksCategories = [];
		let templateCategories = [];

		data.map( i => {
			if ( i.categories && i.template_url ) {
				if ( 'block' === i.type ) {
					i.categories.map( o => {
						blocksCategories.push( o );
					});
				}

				if ( 'template' === i.type ) {
					i.categories.map( o => {
						templateCategories.push( o );
					});
				}
			}
		});

		blocksCategories = blocksCategories.filter( ( item, i, ar ) => ar.indexOf( item ) === i ).sort();
		templateCategories = templateCategories.filter( ( item, i, ar ) => ar.indexOf( item ) === i ).sort();

		this.setState({
			blocksCategories,
			templateCategories,
			data,
			isLoaded: true
		});
	}

	changeTab( value ) {
		this.setState({
			tab: value,
			selectedCategory: null,
			search: ''
		});
	}

	removeError() {
		this.setState({
			isError: false
		});
	}

	selectCategory( value ) {
		this.setState({
			selectedCategory: value
		});
	}

	changeSearch( value ) {
		this.setState({
			search: value
		});
	}

	async importTemplate( url ) {
		this.setState({
			isLoaded: false
		});

		let data = await apiFetch({ path: `themeisle-gutenberg-blocks/v1/import_template?url=${ url }` });

		if ( null !== data ) {
			this.setState({
				isLoaded: true
			});

			this.props.import( data );
		} else {
			this.setState({
				isLoaded: true,
				isError: true
			});
		}
	}

	render() {
		return (
			<Modal
				className="themeisle-library-modal"
				onRequestClose={ this.props.close }
				isDismissable={ false }
				shouldCloseOnClickOutside={ false }
			>
				<div className="library-modal-header">
					<div className="library-modal-header-logo">
						<div className="library-modal-header-tabs-button">
							<Icon icon={ themeisleIcon } />
						</div>
					</div>

					<div className="library-modal-header-tabs">
						<Button
							className={ classnames(
								'library-modal-header-tabs-button',
								{ 'is-selected': 'block' === this.state.tab }
							)}
							onClick={ () => this.changeTab( 'block' ) }
						>
							<Dashicon icon="screenoptions" />
							{ __( 'Blocks' ) }
						</Button>

						<Button
							className={ classnames(
								'library-modal-header-tabs-button',
								{ 'is-selected': 'template' === this.state.tab }
							)}
							onClick={ () => this.changeTab( 'template' ) }
						>
							<Dashicon icon="editor-table" />
							{ __( 'Templates' ) }
						</Button>
					</div>

					<div className="library-modal-header-actions">
						<Tooltip text={ __( 'Close' ) }>
							<Button
								className="library-modal-header-tabs-button"
								aria-label={ __( 'Close settings' ) }
								onClick={ this.props.close }
							>
								<Dashicon icon="no-alt" />
							</Button>
						</Tooltip>
					</div>
				</div>

				<div className="library-modal-actions">
					<Dropdown
						className="library-modal-category-control"
						contentClassName="library-modal-category-selector"
						position="bottom center"
						renderToggle={ ({ isOpen, onToggle }) => (
							<Button
								isLarge
								onClick={ onToggle }
								aria-expanded={ isOpen }
							>
								{ null === this.state.selectedCategory ? __( 'All Categories' ) : startCase( toLower( this.state.selectedCategory ) ) }
							</Button>
						) }
						renderContent={ ({ onToggle }) => (
							<MenuGroup label={ __( 'Categories' ) }>
								<MenuItem
									icon={ null === this.state.selectedCategory && 'yes' }
									onClick={ () => {
										onToggle();
										this.selectCategory( null );
									}}
								>
									{ __( 'All Categories' ) }
								</MenuItem>
								{ ( 'block' === this.state.tab ? this.state.blocksCategories : this.state.templateCategories ).map( i => {
									return (
										<MenuItem
											icon={ i === this.state.selectedCategory && 'yes' }
											onClick={ () => {
												onToggle();
												this.selectCategory( i );
											}}
										>
											{ startCase( toLower( i ) ) }
										</MenuItem>
									);
								})}
							</MenuGroup>
						) }
					/>
					<TextControl
						type="text"
						value={ this.state.search || '' }
						placeholder={ __( 'Search' ) }
						onChange={ this.changeSearch }
					/>
				</div>

				{ this.state.isError && (
					<div className="library-modal-error">
						<Notice
							status="error"
							onRemove={ this.removeError }
						>
							{ __( 'There seems to be an error. Please try again.' ) }
						</Notice>
					</div>
				)}

				{ this.state.isLoaded ? (
					<div className="library-modal-content">
						{ this.state.data.map( i => {
							if (
								( i.template_url ) &&
								( null === this.state.selectedCategory || i.categories && i.categories.includes( this.state.selectedCategory ) ) &&
								( ! this.state.search || i.keywords && i.keywords.some( o => o.toLowerCase().includes( this.state.search.toLowerCase() ) ) ) &&
								( this.state.tab === i.type )
							) {
								return (
									<Button
										aria-label={ i.title || __( 'Untitled Gutenberg Template' ) }
										onClick={ () => this.importTemplate( i.template_url ) }
									>
										<LazyLoad>
											<img src={ i.screenshot_url || 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/assets/images/default.jpg' } />
										</LazyLoad>
										<div className="library-modal-overlay">
											<Dashicon icon="plus" size="36"/>
										</div>
									</Button>
								);
							}
						})}
						<Button
							aria-label={ __( 'Coming Soon' ) }
						>
							<LazyLoad>
								<img src={ 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/assets/images/coming-soon.jpg' } />
							</LazyLoad>
							<div className="library-modal-overlay">
								<Dashicon icon="smiley" size="36"/>
							</div>
						</Button>
					</div>
				) :
					<div className="library-modal-loader">
						<Spinner/>
					</div>
				}
			</Modal>
		);
	}
}

export default compose(
	withSelect( ( select, { clientId }) => {
		const { getBlock } = select( 'core/editor' );
		const block = getBlock( clientId );
		return {
			block
		};
	}),

	withDispatch( ( dispatch, { block }) => ({
		import: ( content ) => dispatch( 'core/editor' ).replaceBlocks(
			block.clientId,
			content,
		)
	}) ),
)( Library );
