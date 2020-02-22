/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	return (
		<RichText.Content
			tagName={ attributes.tag }
			value={ attributes.content }
			id={ attributes.id }
			className={ classnames(
				attributes.id,
				className
			) }
		/>
	);
};

export default Save;
