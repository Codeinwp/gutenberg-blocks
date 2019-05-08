/**
 * External dependencies
 */
import LazyLoad from 'react-lazy-load';
import classnames from 'classnames';
import uuidv4 from 'uuid';

/**
 * WordPress dependencies
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
	Icon,
	TextControl,
	Tooltip,
	Modal,
	Notice,
	SelectControl,
	Spinner
} = wp.components;

const { compose } = wp.compose;

const {
	withSelect,
	withDispatch
} = wp.data;

const { Component } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

import { otterIcon } from '../../../../helpers/icons.js';

class Library extends Component {
	constructor() {
		super( ...arguments );

		this.changeTab = this.changeTab.bind( this );
		this.removeError = this.removeError.bind( this );
		this.removeMissing = this.removeMissing.bind( this );
		this.selectCategory = this.selectCategory.bind( this );
		this.changeSearch = this.changeSearch.bind( this );
		this.changeClientId = this.changeClientId.bind( this );
		this.validateBlocks = this.validateBlocks.bind( this );
		this.importTemplate = this.importTemplate.bind( this );
		this.getOptions = this.getOptions.bind( this );

		this.state = {
			tab: 'block',
			isLoaded: false,
			isError: false,
			isMissing: false,
			selectedCategory: 'all',
			search: '',
			blocksCategories: [],
			templateCategories: [],
			data: [],
			preview: false,
			selectedTemplate: null,
			missingBlocks: []
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
			selectedCategory: 'all',
			search: ''
		});
	}

	removeError() {
		this.setState({
			isError: false
		});
	}

	removeMissing() {
		this.setState({
			isMissing: false
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

	changeClientId( data ) {
		if ( Array.isArray( data ) ) {
			data.map( i => this.changeClientId( i ) );
		} else if ( 'object' === typeof data ) {
			Object.keys( data ).map( k => {
				if ( 'clientId' === k ) {
					data[k] = uuidv4();
				}

				if ( 'innerBlocks' === k ) {
					data[k].map( i => {
						this.changeClientId( i );
					});
				}
			});
		}

		return data;
	}

	validateBlocks( data ) {
		let status = false;
		let missingBlocks = [];

		if ( Array.isArray( data ) ) {
			data.map( i => this.validateBlocks( i ) );
		} else if ( 'object' === typeof data ) {
			Object.keys( data ).some( k => {
				if ( 'name' === k ) {
					const exists = this.props.availableBlocks.find( i => {
						return i.name === data.name;
					});

					if ( undefined === exists ) {
						missingBlocks.push( data.name );
						status = true;
					}
				}

				if ( 'innerBlocks' === k ) {
					data[k].map( i => this.validateBlocks( i  ) );
				}
			});
		}

		missingBlocks = this.state.missingBlocks
			.concat( missingBlocks )
			.filter( ( v, i, a ) => a.indexOf( v ) === i );

		this.setState({ missingBlocks });

		return status;
	}

	async importTemplate( url ) {
		this.setState({
			preview: false,
			isLoaded: false,
			missingBlocks: []
		});

		let data = await apiFetch({ path: `themeisle-gutenberg-blocks/v1/import_template?url=${ url }` });

		data = this.changeClientId( data );

		if ( null !== data ) {
			this.setState({
				isLoaded: true
			});

			if ( ! this.validateBlocks( data ) ) {
				this.props.import( data );
			} else {
				this.setState({
					isMissing: true
				});
			}
		} else {
			this.setState({
				isLoaded: true,
				isError: true
			});
		}
	}

	getOptions() {
		let categories = {};

		categories = ( 'block' === this.state.tab ? this.state.blocksCategories : this.state.templateCategories ).map( i => {
			return i = {
				label: startCase( toLower( i ) ),
				value: i
			};
		});

		const options = [
			{ label: __( 'All Categories' ), value: 'all' },
			...categories
		];

		return options;
	}

	render() {
		const options = this.getOptions();

		return (
			<Modal
				className={ classnames(
					'themeisle-library-modal',
					{ 'is-preview': this.state.preview }
				) }
				onRequestClose={ this.props.close }
				isDismissable={ false }
				shouldCloseOnClickOutside={ false }
			>
				<div className="library-modal-control-panel">
					<div className="library-modal-header">
						<div className="library-modal-header-logo">
							{ this.state.preview ? (
								<Button
									className="library-modal-header-tabs-button back-to-library"
									aria-label={ __( 'Back to Library' ) }
									onClick={ () => this.setState({ preview: false }) }
								>
									<Dashicon icon="arrow-left-alt" /> { __( 'Back to Library' ) }
								</Button>
							) :
								<div className="library-modal-header-tabs-button">
									<Icon icon={ otterIcon } />
								</div>
							}
						</div>

						{ ! this.state.preview && (
							<div className="library-modal-header-tabs">
								<Button
									className={ classnames(
										'library-modal-header-tabs-button',
										{ 'is-selected': 'block' === this.state.tab }
									) }
									onClick={ () => this.changeTab( 'block' ) }
								>
									<Dashicon icon="screenoptions" />
									{ __( 'Blocks' ) }
								</Button>

								<Button
									className={ classnames(
										'library-modal-header-tabs-button',
										{ 'is-selected': 'template' === this.state.tab }
									) }
									onClick={ () => this.changeTab( 'template' ) }
								>
									<Dashicon icon="editor-table" />
									{ __( 'Templates' ) }
								</Button>
							</div>
						) }

						<div className="library-modal-header-actions">
							{ this.state.preview && (
								<Button
									className="library-modal-header-tabs-button insert-button"
									onClick={ () => this.importTemplate( this.state.selectedTemplate.template_url ) }
									tabindex="0"
								>
									<Dashicon icon="arrow-down-alt" size={ 16 } />
									{ __( 'Insert' ) }
								</Button>
							) }

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

					{ ! this.state.preview && (
						<div className="library-modal-actions">
							<SelectControl
								className="library-modal-category-control"
								value={ 'all' === this.state.selectedCategory ? 'all' : this.state.selectedCategory }
								onChange={ this.selectCategory }
								options={ options }
							/>

							<TextControl
								type="text"
								value={ this.state.search || '' }
								placeholder={ __( 'Search' ) }
								className="library-modal-search-control"
								onChange={ this.changeSearch }
							/>
						</div>
					) }
				</div>

				{ ! Boolean( themeisleGutenberg.isCompatible ) && (
					<div className="library-modal-error">
						<Notice
							status="warning"
							isDismissible={ false }
							className="version-warning"
							actions={ [
								{
									label: __( 'Update Now' ),
									url: themeisleGutenberg.updatePath
								}
							] }
						>
							{ __( 'You are using an older version of Otter. Use the latest version of Otter to have maximum compatibility with Template Library.' ) }
						</Notice>
					</div>
				) }

				{ this.state.isError && (
					<div className="library-modal-error">
						<Notice
							status="error"
							onRemove={ this.removeError }
						>
							{ __( 'There seems to be an error. Please try again.' ) }
						</Notice>
					</div>
				) }

				{ this.state.isMissing && (
					<div className="library-modal-error">
						<Notice
							status="warning"
							className="library-modal-missing"
							onRemove={ this.removeMissing }
						>
							{ __( 'You seem to be missing some blocks that are required by your selected template.' ) }
							<details>
								<summary>{ __( 'View Missing Blocks' ) }</summary>

								<ul>
									{ this.state.missingBlocks.map( i => <li>{ i }</li> ) }
								</ul>
							</details>
						</Notice>
					</div>
				) }

				{ this.state.preview ? (
					<div className="library-modal-preview">
						<iframe src={ this.state.selectedTemplate.demo_url }/>
					</div>
				) :
					this.state.isLoaded ? (
						<div className="library-modal-content">
							{ this.state.data.map( i => {
								if (
									( i.template_url ) &&
									( 'all' === this.state.selectedCategory || i.categories && i.categories.includes( this.state.selectedCategory ) ) &&
									( ! this.state.search || i.keywords && i.keywords.some( o => o.toLowerCase().includes( this.state.search.toLowerCase() ) ) ) &&
									( this.state.tab === i.type )
								) {
									return (
										<div
											aria-label={ i.title || __( 'Untitled Gutenberg Template' ) }
											className="library-modal-content__item"
											tabindex="0"
										>
											<div className="library-modal-content__preview">
												<LazyLoad>
													<img src={ i.screenshot_url || 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/assets/images/default.jpg' } />
												</LazyLoad>
											</div>

											<div className="library-modal-content__footer">
												<div className="library-modal-content__footer_meta">
													{ ( i.title && 'template' === i.type ) && (
														<h4 className="library-modal-content__footer_meta_title">{ i.title }{ i.author && __( ' by ' ) + i.author } </h4>
													) }

													{ ( i.author && 'block' === i.type ) && (
														<h4 className="library-modal-content__footer_meta_author">{ __( 'Author:' ) } { i.author }</h4>
													) }
												</div>

												<div className="library-modal-content__footer_actions">
													{ i.demo_url && (
														<Button
															isDefault
															isLarge
															className="library-modal-overlay__actions"
															onClick={ () => this.setState({
																preview: true,
																selectedTemplate: i
															}) }
															tabindex="0"
														>
															{ __( 'Preview' ) }
														</Button>
													) }

													<Button
														isPrimary
														isLarge
														className="library-modal-overlay__actions"
														onClick={ () => this.importTemplate( i.template_url ) }
														tabindex="0"
													>
														{ __( 'Insert' ) }
													</Button>
												</div>
											</div>
										</div>
									);
								}
							}) }
							<div
								aria-label={ __( 'Coming Soon' ) }
								className="library-modal-content__item"
							>
								<div className="library-modal-content__preview">
									<LazyLoad>
										<img src={ 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/assets/images/coming-soon.jpg' } />
									</LazyLoad>
								</div>
							</div>
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
		const { getBlockTypes } = select( 'core/blocks' );
		const block = getBlock( clientId );
		const availableBlocks = getBlockTypes();
		return {
			block,
			availableBlocks
		};
	}),

	withDispatch( ( dispatch, { block }) => ({
		import: ( content ) => dispatch( 'core/editor' ).replaceBlocks(
			block.clientId,
			content,
		)
	}) ),
)( Library );
