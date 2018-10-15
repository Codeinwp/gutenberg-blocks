/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

const { RichText } = wp.editor;

const { Notice } = wp.components;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

registerBlockType( 'themeisle-blocks/notice', {
	title: __( 'Notice' ),
	description: __( 'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.' ),
	icon: 'info',
	category: 'themeisle-blocks',
	keywords: [
		'notice',
		'info'
	],
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: '.components-notice__content'
		}
	},

	supports: {
		align: [ 'wide', 'full' ]
	},

	styles: [
		{ name: 'sucess', label: __( 'Success' ), isDefault: true },
		{ name: 'info', label: __( 'Info' ) },
		{ name: 'warning', label: __( 'Warning' ) },
		{ name: 'error', label: __( 'Error' ) }
	],

	edit: props => {
		let status = 'success';
		if ( props.attributes.className && props.attributes.className.includes( 'is-style-info' ) ) {
			status = '';
		} else if ( props.attributes.className && props.attributes.className.includes( 'is-style-warning' ) ) {
			status = 'warning';
		} else if ( props.attributes.className && props.attributes.className.includes( 'is-style-error' ) ) {
			status = 'error';
		}
		return (
			<Notice
				className={ props.className }
				isDismissible={ false }
				status={ status }
			>
				<RichText
					tagName="p"
					placeholder={ __( 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' ) }
					value={ props.attributes.content }
					className="components-notice__content"
					onChange={ content => props.setAttributes({ content }) }
					keepPlaceholderOnFocus="true"
				/>
			</Notice>
		);
	},
	save: props => {
		let status = 'success';
		if ( props.attributes.className && props.attributes.className.includes( 'is-style-info' ) ) {
			status = '';
		} else if ( props.attributes.className && props.attributes.className.includes( 'is-style-warning' ) ) {
			status = 'warning';
		} else if ( props.attributes.className && props.attributes.className.includes( 'is-style-error' ) ) {
			status = 'error';
		}
		return (
			<Notice
				className="themeisle-block-notice"
				isDismissible={ false }
				status={ status }
			>
				<RichText.Content
					tagName="p"
					className="components-notice__content"
					value={ props.attributes.content }
				/>
			</Notice>
		);
	}
});
