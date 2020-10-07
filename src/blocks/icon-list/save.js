
import classnames from 'classnames';

const { InnerBlocks } = wp.blockEditor;

const Edit = ({
	attributes,
	className
}) => {

	return (
		<div
			className={ className }
			id={ attributes.id }
		>
			<div
				className={
					classnames(
						'wp-block-themeisle-blocks-icon-list-items',
						{ 'is-vertical': 'vertical' === attributes.listStyle },
						{ 'is-horizontal': 'horizontal' === attributes.listStyle }
					)
				}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Edit;