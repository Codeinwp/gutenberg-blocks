/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const {
	startCase,
	toLower
} = lodash;

const { __ } = wp.i18n;

const {
	Button,
	Dashicon,
	Icon,
	TextControl,
	Tooltip,
	SelectControl
} = wp.components;

const { Component } = wp.element;

/**
 * Internal dependencies
 */
import { otterIcon } from '../../../helpers/icons.js';

class Header extends Component {
	constructor() {
		super( ...arguments );
		this.getOptions = this.getOptions.bind( this );
	}

	getOptions() {
		let categories = {};

		categories = ( 'block' === this.props.tab ? this.props.blocksCategories : this.props.templateCategories ).map( i => {
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
			<div className="library-modal-control-panel">
				<div className="library-modal-header">
					<div className="library-modal-header-logo">
						{ this.props.preview ? (
							<Button
								className="library-modal-header-tabs-button back-to-library"
								aria-label={ __( 'Back to Library' ) }
								onClick={ this.props.togglePreview }
							>
								<Dashicon icon="arrow-left-alt" /> { __( 'Back to Library' ) }
							</Button>
						) :
							<div className="library-modal-header-tabs-button">
								<Icon icon={ otterIcon } />
							</div>
						}
					</div>

					{ ! this.props.preview && (
						<div className="library-modal-header-tabs">
							<Button
								className={ classnames(
									'library-modal-header-tabs-button',
									{ 'is-selected': 'block' === this.props.tab }
								) }
								onClick={ () => this.props.changeTab( 'block' ) }
							>
								<Dashicon icon="screenoptions" />
								{ __( 'Blocks' ) }
							</Button>

							<Button
								className={ classnames(
									'library-modal-header-tabs-button',
									{ 'is-selected': 'template' === this.props.tab }
								) }
								onClick={ () => this.props.changeTab( 'template' ) }
							>
								<Dashicon icon="editor-table" />
								{ __( 'Templates' ) }
							</Button>
						</div>
					) }

					<div className="library-modal-header-actions">
						{ this.props.preview && (
							<Button
								className="library-modal-header-tabs-button insert-button"
								onClick={ () => this.props.importTemplate( this.props.selectedTemplate.template_url ) }
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

				{ ! this.props.preview && (
					<div className="library-modal-actions">
						<SelectControl
							className="library-modal-category-control"
							value={ 'all' === this.props.selectedCategory ? 'all' : this.props.selectedCategory }
							onChange={ this.props.selectCategory }
							options={ options }
						/>

						<TextControl
							type="text"
							value={ this.props.search || '' }
							placeholder={ __( 'Search' ) }
							className="library-modal-search-control"
							onChange={ this.props.changeSearch }
						/>
					</div>
				) }
			</div>
		);
	}
}

export default Header;
