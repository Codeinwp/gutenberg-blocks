/**
 * External dependencies
 */
import arrayMove from 'array-move';

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import { SortableItem, SortableList } from './sortable.js';

const LayoutBuilder = ({
	attributes,
	setAttributes,
	getFields,
	toggleFields,
	imageSize,
	titleTag,
	excerptLimit
}) => {
	const [ isOpen, setOpen ] = useState( false );

	const onSortEnd = ({ oldIndex, newIndex })  => {
		const template = arrayMove( attributes.template, oldIndex, newIndex );
		setAttributes({ template });
	};

	return (
		<Fragment>
			<div
				className={ classnames(
					'wp-block-themeisle-blocks-posts-grid-builder',
					attributes.style
				) }
			>
				<SortableItem
					value={ __( 'image' ) }
					disabled={ true }
					getFields={ getFields }
					toggleFields={ toggleFields }
					imageSize={ imageSize }
				/>

				<SortableList
					template={ attributes.template }
					onSortEnd={ onSortEnd }
					getFields={ getFields }
					toggleFields={ toggleFields }
					titleTag={ titleTag }
					excerptLimit={ excerptLimit }
					useDragHandle
				/>
			</div>
		</Fragment>
	);
};

export default LayoutBuilder;