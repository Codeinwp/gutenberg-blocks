/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	QueryControls,
	RangeControl
} = wp.components;

const { InspectorControls } = wp.blockEditor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import LayoutBuilder from './components/layout-builder.js';
import { StyleSwitcherInspectorControl } from '../../components/style-switcher-control/index.js';
import Layout from './components/layout/index.js';

const Inspector = ({
	attributes,
	setAttributes,
	changeStyle,
	categoriesList
}) => {
	const changeColumns = value => {
		setAttributes({ columns: value });
	};

	const getFields = field => {
		if ( 'image' === field ) {
			return attributes.displayFeaturedImage;
		}

		if ( 'category' === field ) {
			return attributes.displayCategory;
		}

		if ( 'title' === field ) {
			return attributes.displayTitle;
		}

		if ( 'meta' === field ) {
			return attributes.displayMeta;
		}

		if ( 'description' === field ) {
			return attributes.displayDescription;
		}

		if ( 'date' === field ) {
			return attributes.displayDate;
		}

		if ( 'author' === field ) {
			return attributes.displayAuthor;
		}
	};

	const toggleFields = field => {
		if ( 'image' === field ) {
			setAttributes({ displayFeaturedImage: ! attributes.displayFeaturedImage });
		}

		if ( 'category' === field ) {
			setAttributes({ displayCategory: ! attributes.displayCategory });
		}

		if ( 'title' === field ) {
			setAttributes({ displayTitle: ! attributes.displayTitle });
		}

		if ( 'meta' === field ) {
			setAttributes({ displayMeta: ! attributes.displayMeta });
		}

		if ( 'description' === field ) {
			setAttributes({ displayDescription: ! attributes.displayDescription });
		}

		if ( 'date' === field ) {
			setAttributes({ displayDate: ! attributes.displayDate });
		}

		if ( 'author' === field ) {
			setAttributes({ displayAuthor: ! attributes.displayAuthor });
		}
	};

	const changeImageSize = value => {
		setAttributes({ imageSize: value });
	};

	const changeTitleTag = value => {
		setAttributes({ titleTag: value });
	};

	const changeExcerptLength = value => {
		setAttributes({ excerptLength: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Styles' ) }
				initialOpen={ false }
			>
				<StyleSwitcherInspectorControl
					value={ attributes.style }
					options={ [
						{
							label: __( 'Grid' ),
							value: 'grid',
							image: themeisleGutenberg.assetsPath + '/icons/posts-grid.jpg'
						},
						{
							label: __( 'List' ),
							value: 'list',
							image: themeisleGutenberg.assetsPath + '/icons/posts-list.jpg'
						}
					] }
					onChange={ changeStyle }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Settings' ) }
			>
				{ 'grid' === attributes.style && (
					<RangeControl
						label={ __( 'Columns' ) }
						value={ attributes.columns }
						onChange={ changeColumns }
						min={ 1 }
						max={ 5 }
					>
					</RangeControl>
				) }

				<QueryControls
					order={ attributes.order }
					orderBy={ attributes.orderBy }
					numberOfItems={ attributes.postsToShow }
					categoriesList={ categoriesList }
					selectedCategoryId={ attributes.categories }
					onOrderChange={ value => setAttributes({ order: value }) }
					onOrderByChange={ value => setAttributes({ orderBy: value }) }
					onCategoryChange={ value => setAttributes({ categories: '' !== value ? value : undefined }) }
					onNumberOfItemsChange={ value => setAttributes({ postsToShow: value }) }
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Design & Layout' ) }
				initialOpen={ false }
			>
				<LayoutBuilder
					attributes={ attributes }
					getFields={ getFields }
					toggleFields={ toggleFields }
					setAttributes={ setAttributes }
					imageSize={ {
						value: attributes.imageSize,
						onChange: changeImageSize
					} }
					titleTag={ {
						value: attributes.titleTag,
						onChange: changeTitleTag
					} }
					excerptLimit={ {
						value: attributes.excerptLength,
						onChange: changeExcerptLength
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
