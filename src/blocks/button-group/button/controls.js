/**
 * WordPress dependencies...
 */
// const { __ } = wp.i18n;

const { BlockControls } = wp.blockEditor;

/**
 * Internal dependencies
 */
import LinkControl from '../../../components/link-control/index.js';

const Controls = ({
	attributes,
	setAttributes,
	isSelected
}) => {
	return (
		<BlockControls>
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
