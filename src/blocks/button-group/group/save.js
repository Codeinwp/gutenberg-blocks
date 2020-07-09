/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { InnerBlocks } = wp.blockEditor;

const Save = ({
	attributes,
	className
}) => {
	const collapseClass = 'collapse-none' !== attributes.collapse ? attributes.collapse : '';

	return (
		<div
			id={ attributes.id }
			className={ classnames(
				className,
				collapseClass,
				'wp-block-buttons',
				{
					[ `align-${ attributes.align }` ]: attributes.align
				}
			) }
		>
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
