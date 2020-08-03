/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const {
	AlignmentToolbar,
	BlockControls
} = wp.blockEditor;

/**
 * Internal dependencies
 */
import LinkControl from '../../components/link-control/index.js';

const Controls = ({
	attributes,
	setAttributes,
	isSelected
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

			<LinkControl
				isSelected={ isSelected }
				setAttributes={ setAttributes }
				url={ attributes.link }
				opensInNewTab={ attributes.newTab }
			/>
		</BlockControls>
	);
};

export default Controls;
