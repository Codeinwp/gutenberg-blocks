/**
 * External dependencies
 */
import LazyLoad from 'react-lazy-load';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { BlockPreview } = wp.blockEditor;

const { Button } = wp.components;

const Template = ({
	template,
	importPreview,
	importTemplate
}) => {
	return (
		<div
			aria-label={ template.title || __( 'Untitled Gutenberg Template' ) }
			className="library-modal-content__item"
			tabindex="0"
		>
			<div className="library-modal-content__preview">
				<LazyLoad>
					<img src={ template.screenshot_url || 'https://raw.githubusercontent.com/Codeinwp/gutenberg-templates/master/assets/images/default.jpg' } />
				</LazyLoad>
			</div>

			<div className="library-modal-content__footer">
				<div className="library-modal-content__footer_meta">
					<h4 className="library-modal-content__footer_meta_area">
						{ ( template.title ) && (
							template.title + ( template.author && __( ' by ' ) + template.author )
						) }

						{ ( ! template.title && template.author ) && (
							__( 'Author: ' ) + template.author
						) }
					</h4>
				</div>

				<div className="library-modal-content__footer_actions">
					{ BlockPreview && (
						<Button
							isDefault
							isLarge
							className="library-modal-overlay__actions"
							onClick={ () => importPreview( template ) }
							tabindex="0"
						>
							{ __( 'Preview' ) }
						</Button>
					) }

					<Button
						isPrimary
						isLarge
						className="library-modal-overlay__actions"
						onClick={ () => importTemplate( template.template_url ) }
						tabindex="0"
					>
						{ __( 'Insert' ) }
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Template;
