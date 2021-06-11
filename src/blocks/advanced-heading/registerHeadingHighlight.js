/**
 * External dependencies.
 */
import { brush } from '@wordpress/icons';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	registerFormatType,
	toggleFormat
} = wp.richText;

const {
	RichTextShortcut,
	RichTextToolbarButton
} = wp.blockEditor;

const { Fragment } = wp.element;

const name = 'themeisle-blocks/highlight';

registerFormatType( name, {
	name,
	title: __( 'Highlight', 'otter-blocks' ),
	tagName: 'span',
	className: 'highlight',

	edit: ({ isActive, value, onChange }) => {
		const onToggle = () => onChange( toggleFormat( value, { type: name }) );

		return (
			<Fragment>
				<RichTextShortcut
					type="primary"
					character="h"
					onUse={ onToggle }
				/>

				<RichTextToolbarButton
					icon={ brush }
					title={ __( 'Highlight', 'otter-blocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
					shortcutType="access"
					shortcutCharacter="h"
				/>
			</Fragment>
		);
	}
});
