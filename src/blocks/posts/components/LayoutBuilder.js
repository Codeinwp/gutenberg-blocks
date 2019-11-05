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
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import { SortableItem, SortableList } from './Sortable.js';

class LayoutBuilder extends Component {
	constructor() {
		super( ...arguments );
		this.onSortEnd = this.onSortEnd.bind( this );

		this.state = {
			isOpen: false
		};
	}

	onSortEnd({ oldIndex, newIndex })  {
		const template = arrayMove( this.props.attributes.template, oldIndex, newIndex );
		this.props.setAttributes({ template });
	};

	render() {
		return (
			<Fragment>
				<div
					className={ classnames(
						'wp-block-themeisle-blocks-posts-grid-builder',
						this.props.attributes.style
					) }
				>
					<SortableItem
						value={ __( 'image' ) }
						disabled={ true }
						getFields={ this.props.getFields }
						toggleFields={ this.props.toggleFields }
						imageSize={ this.props.imageSize }
					/>

					<SortableList
						template={ this.props.attributes.template }
						onSortEnd={ this.onSortEnd }
						getFields={ this.props.getFields }
						toggleFields={ this.props.toggleFields }
						excerptLimit={ this.props.excerptLimit }
						useDragHandle
					/>
				</div>
			</Fragment>
		);
	}
}

export default LayoutBuilder;
