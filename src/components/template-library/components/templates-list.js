/**
 * External dependencies
 */
import LazyLoad from 'react-lazy-load';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { BlockPreview } = wp.blockEditor;

const { Spinner } = wp.components;

const { useViewportMatch } = wp.compose;

/**
 * Internal dependencies
 */
import Template from './template.js';

const TemplatesList = ({
	preview,
	isLoaded,
	data,
	tab,
	selectedTemplateContent,
	selectedCategory,
	search,
	importPreview,
	importTemplate
}) => {
	const isLarger = useViewportMatch( 'large', '>=' );

	const isLarge = useViewportMatch( 'large', '<=' );

	const isSmall = useViewportMatch( 'small', '>=' );

	const isSmaller = useViewportMatch( 'small', '<=' );

	let viewportWidth = 1400;

	const isTablet = ! isLarger && ! isLarge && isSmall && ! isSmaller;

	const isMobile = ! isLarger && ! isLarge && ! isSmall && ! isSmaller;

	if ( isTablet ) {
		viewportWidth = 960;
	} else if ( isMobile ) {
		viewportWidth = 600;
	}

	if ( preview ) {
		return (
			<div className="library-modal-preview">
				<BlockPreview
					blocks={ selectedTemplateContent }
					viewportWidth={ viewportWidth }
				/>
			</div>
		);
	}

	if ( ! isLoaded ) {
		return (
			<div className="library-modal-loader">
				<Spinner/>
			</div>
		);
	}

	return (
		<div className="library-modal-content">
			{ data.map( i => {
				if (
					( i.template_url ) &&
						( 'all' === selectedCategory || i.categories && i.categories.includes( selectedCategory ) ) &&
						( ! search || i.keywords && i.keywords.some( o => o.toLowerCase().includes( search.toLowerCase() ) ) ) &&
						( tab === i.type )
				) {
					return (
						<Template
							template={ i }
							importPreview={ importPreview }
							importTemplate={ importTemplate }
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
};

export default TemplatesList;
