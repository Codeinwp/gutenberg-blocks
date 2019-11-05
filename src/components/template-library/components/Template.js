/**
 * External dependencies
 */
import LazyLoad from 'react-lazy-load';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const { Component } = wp.element;

class Template extends Component {
	render() {
		return (
			<div
				aria-label={ this.props.template.title || __( 'Untitled Gutenberg Template' ) }
				className="library-modal-content__item"
				tabindex="0"
			>
				<div className="library-modal-content__preview">
					<LazyLoad>
						<img src={ this.props.template.screenshot_url || 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/assets/images/default.jpg' } />
					</LazyLoad>
				</div>

				<div className="library-modal-content__footer">
					<div className="library-modal-content__footer_meta">
						{ ( this.props.template.title && 'template' === this.props.template.type ) && (
							<h4 className="library-modal-content__footer_meta_title">{ this.props.template.title }{ this.props.template.author && __( ' by ' ) + this.props.template.author } </h4>
						) }

						{ ( this.props.template.author && 'block' === this.props.template.type ) && (
							<h4 className="library-modal-content__footer_meta_author">{ __( 'Author:' ) } { this.props.template.author }</h4>
						) }
					</div>

					<div className="library-modal-content__footer_actions">
						{ this.props.template.demo_url && (
							<Button
								isDefault
								isLarge
								className="library-modal-overlay__actions"
								onClick={ () => this.props.togglePreview( i ) }
								tabindex="0"
							>
								{ __( 'Preview' ) }
							</Button>
						) }

						<Button
							isPrimary
							isLarge
							className="library-modal-overlay__actions"
							onClick={ () => this.props.importTemplate( this.props.template.template_url ) }
							tabindex="0"
						>
							{ __( 'Insert' ) }
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default Template;
