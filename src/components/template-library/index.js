/**
 * External dependencies
 */
import classnames from 'classnames';
import uuidv4 from 'uuid';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { apiFetch } = wp;

const { Modal } = wp.components;

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

import Header from './components/Header.js';
import Notices from './components/Notices.js';
import TemplatesList from './components/TemplatesList.js';

class Library extends Component {
	constructor() {
		super( ...arguments );
		this.changeTab = this.changeTab.bind( this );
		this.togglePreview = this.togglePreview.bind( this );
		this.removeError = this.removeError.bind( this );
		this.removeMissing = this.removeMissing.bind( this );
		this.selectCategory = this.selectCategory.bind( this );
		this.changeSearch = this.changeSearch.bind( this );
		this.changeClientId = this.changeClientId.bind( this );
		this.validateBlocks = this.validateBlocks.bind( this );
		this.importTemplate = this.importTemplate.bind( this );

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

	togglePreview( template = null ) {
		this.setState({
			preview: ! this.state.preview,
			selectedTemplate: template
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

	render() {

		return (
			<Modal
				className={ classnames(
					'wp-block-themeisle-library-modal',
					{ 'is-preview': this.state.preview }
				) }
				onRequestClose={ this.props.close }
				isDismissable={ false }
				shouldCloseOnClickOutside={ false }
			>
				<Header
					preview={ this.state.preview }
					tab={ this.state.tab }
					changeTab={ this.changeTab }
					blocksCategories={ this.state.blocksCategories }
					templateCategories={ this.state.templateCategories }
					selectedTemplate={ this.state.selectedTemplate }
					selectedCategory={ this.state.selectedCategory }
					search={ this.state.search }
					togglePreview={ this.togglePreview }
					close={ this.props.close }
					importTemplate={ this.importTemplate }
					selectCategory={ this.selectCategory }
					changeSearch={ this.changeSearch }
				/>

				<Notices
					isError={ this.state.isError }
					isMissing={ this.state.isMissing }
					missingBlocks={ this.state.missingBlocks }
					removeError={ this.removeError }
					removeMissing={ this.removeMissing }
				/>

				<TemplatesList
					preview={ this.state.preview }
					isLoaded={ this.state.isLoaded }
					data={ this.state.data }
					tab={ this.state.tab }
					selectedTemplate={ this.state.selectedTemplate }
					selectedCategory={ this.state.selectedCategory }
					search={ this.state.search }
					togglePreview={ this.togglePreview }
					importTemplate={ this.importTemplate }
				/>
			</Modal>
		);
	}
}

export default compose(
	withSelect( ( select, { clientId }) => {
		const { getBlock } = select( 'core/block-editor' ) || select( 'core/editor' );
		const { getBlockTypes } = select( 'core/blocks' );
		const block = getBlock( clientId );
		const availableBlocks = getBlockTypes();
		return {
			block,
			availableBlocks
		};
	}),

	withDispatch( ( dispatch, { block }) => {
		const { replaceBlocks } = dispatch( 'core/block-editor' ) || dispatch( 'core/editor' );
		return {
			import: ( content ) => replaceBlocks(
				block.clientId,
				content
			)
		};
	})
)( Library );
