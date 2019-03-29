/**
 * External dependencies
 */
import arrayMove from 'array-move';

import classnames from 'classnames';

import {
	SortableContainer,
	SortableElement,
	SortableHandle
} from 'react-sortable-hoc';

/**
 * WordPress dependencies
 */
const {
	startCase,
	toLower
} = lodash;

const { __ } = wp.i18n;

const { IconButton } = wp.components;

const {
	Component,
	Fragment
} = wp.element;

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
		const DragHandle = SortableHandle( () => {
			return (
				<div className="wp-block-themeisle-blocks-posts-grid-builder-handle">
					<span></span>
				</div>
			);
		});

		const SortableItem = SortableElement( ({ value, disabled }) => {
			const label = startCase( toLower( value ) );
			let icon = 'hidden';
			let message = __( `Display ${ label }` );

			if ( this.props.getFields( value ) ) {
				icon = 'visibility';
				message = __( `Hide ${ label }` );
			}

			return (
				<div className="wp-block-themeisle-blocks-posts-grid-builder-item">
					<DragHandle />

					<div className="wp-block-themeisle-blocks-posts-grid-builder-label">
						{ label }
					</div>

					<IconButton
						icon={ icon }
						label={ message }
						className="wp-block-themeisle-blocks-posts-grid-builder-button"
						onClick={ () => this.props.toggleFields( value ) }
					/>
				</div>
			);
		});

		const SortableList = SortableContainer( ({ template }) => {
			return (
				<div>
					{ template.map( ( value, index ) => (
						<SortableItem
							key={`item-${ index }`}
							index={ index } value={ value }
						/>
					) ) }
				</div>
			);
		});

		return (
			<Fragment>
				<div
					className={ classnames(
						'wp-block-themeisle-blocks-posts-grid-builder',
						this.props.attributes.style
					) }
				>
					<div className="wp-block-themeisle-blocks-posts-grid-builder-item disabled">

						<div className="wp-block-themeisle-blocks-posts-grid-builder-label">
							{ __( 'Featured Image' ) }
						</div>

						<IconButton
							icon={ this.props.getFields( 'image' ) ? 'visibility' : 'hidden' }
							label={ this.props.getFields( 'image' ) ? __( 'Hide Featured Image' ) : __( 'Display Featured Image' ) }
							className="wp-block-themeisle-blocks-posts-grid-builder-button"
							onClick={ () => this.props.toggleFields( 'image' ) }
						/>
					</div>

					<SortableList
						template={ this.props.attributes.template }
						onSortEnd={ this.onSortEnd }
						useDragHandle
					/>
				</div>
			</Fragment>
		);
	}
}

export default LayoutBuilder;
