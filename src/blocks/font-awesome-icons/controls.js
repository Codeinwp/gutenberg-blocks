/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const {
	AlignmentToolbar,
	BlockControls
} = wp.blockEditor;

const Controls = ({
	attributes,
	setAttributes
}) => {
	const changeAlignment = value => {
		setAttributes({ align: value });
	};

	return (
		<BlockControls>
			<AlignmentToolbar
				value={ attributes.align }
				onChange={ changeAlignment }
				alignmentControls={ [
					{
						icon: 'editor-alignleft',
						title: __( 'Align left' ),
						align: 'left'
					},
					{
						icon: 'editor-aligncenter',
						title: __( 'Align center' ),
						align: 'center'
					},
					{
						icon: 'editor-alignright',
						title: __( 'Align right' ),
						align: 'right'
					}
				] }
			/>
		</BlockControls>
	);
};

export default Controls;
