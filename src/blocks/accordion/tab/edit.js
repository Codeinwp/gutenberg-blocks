import { Icon, chevronRight } from '@wordpress/icons';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	Fragment,
	useEffect
} = wp.element;

const { uniqueId } = lodash;

const { RichText } = wp.blockEditor;


import Inspector from './inspector.js';

const Edit = ({
	attributes,
	setAttributes
}) => {

	const ratio = 36 / 20;

	useEffect( () => {
		if ( attributes.id === undefined ) {

			let id = uniqueId( 'wp-block-themeisle-blocks-accordion-block-tab-' );

			while ( document.querySelector( '#' + id ) ) {
				id = uniqueId( 'wp-block-themeisle-blocks-accordion-block-tab-' );
			}

			setAttributes({ id: id });
		}
	}, []);

	const changeTitle = value => {
		setAttributes({ title: value });
	};

	const changeContent = value => {
		setAttributes({ content: value });
	};

	const titleStyle = {
		color: attributes.titleColor,
		fontSize: attributes.titleFontSize
	};

	const contentStyle = {
		color: attributes.contentColor,
		fontSize: attributes.contentFontSize
	};

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<div
				className="wp-block-themeisle-blocks-accordion-block-tab"
				style={{
					backgroundColor: attributes.titleBackgroundColor
				}}
			>
				<input type="checkbox" id={ attributes.id } class="wp-block-themeisle-blocks-accordion-block-tab-toggle" checked disabled/>

				<div className="wp-block-themeisle-blocks-accordion-block-tab-title">
					<Icon
						icon={ chevronRight }
						style={{ fill: attributes.titleColor }}
						size={ attributes.titleFontSize * ratio || 36 }
					/>
					<RichText
						tagName="label"
						placeholder={ __( 'Write a title…' ) }
						className="wp-block-themeisle-blocks-accordion-block-tab-label"
						htmlFor={ attributes.id }
						value={ attributes.title }
						onChange={ changeTitle }
						multiline={ false }
						keepPlaceholderOnFocus={ true }
						style={
							{ ...titleStyle }
						}
					/>
				</div>
				<div
					className="wp-block-themeisle-blocks-accordion-block-tab-content"
					style={{
						backgroundColor: attributes.contentBackgroundColor
					}}
				>
					<RichText
						tagName="p"
						placeholder={ __( 'Write some content…' ) }
						value={ attributes.content }
						onChange={ changeContent }
						keepPlaceholderOnFocus={ true }
						style={
							{ ...contentStyle }
						}
					/>
				</div>
			</div>
		</Fragment>

	);
};

export default Edit;
