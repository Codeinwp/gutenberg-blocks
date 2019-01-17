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
} = wp.editor;

const { Fragment } = wp.element;

const name = 'themeisle-blocks/heading-highlight';

registerFormatType( name, {
	name,
	title: __( 'Highlight' ),
	tagName: 'mark',
	className: null,

	edit: ({ isActive, value, onChange }) => {
		const onToggle = () => onChange( toggleFormat( value, { type: name }) );

		return (
			<Fragment>
				<RichTextShortcut
					type="primary"
					character="m"
					onUse={ onToggle }
				/>

				<RichTextToolbarButton
					name="mark"
					icon="admin-customizer"
					title={ __( 'Highlight' ) }
					onClick={ onToggle }
					isActive={ isActive }
					shortcutType="access"
					shortcutCharacter="m"
				/>
			</Fragment>
		);
	}
});
