/**
 * External dependencies
 */
import LazyLoad from 'react-lazy-load';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Spinner } = wp.components;

const { Component } = wp.element;

/**
 * Internal dependencies
 */
import Template from './Template.js';

class TemplatesList extends Component {
	render() {
		if ( this.props.preview ) {
			return (
				<div className="library-modal-preview">
					<iframe src={ this.props.selectedTemplate.demo_url }/>
				</div>
			);
		}

		if ( ! this.props.isLoaded ) {
			return (
				<div className="library-modal-loader">
					<Spinner/>
				</div>
			);
		}

		return (
			<div className="library-modal-content">
				{ this.props.data.map( i => {
					if (
						( i.template_url ) &&
						( 'all' === this.props.selectedCategory || i.categories && i.categories.includes( this.props.selectedCategory ) ) &&
						( ! this.props.search || i.keywords && i.keywords.some( o => o.toLowerCase().includes( this.props.search.toLowerCase() ) ) ) &&
						( this.props.tab === i.type )
					) {
						return (
							<Template
								template={ i }
								togglePreview={ this.props.togglePreview }
								importTemplate={ this.props.importTemplate }
							/>
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
		);
	}
}

export default TemplatesList;
