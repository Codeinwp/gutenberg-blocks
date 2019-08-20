/**
 * External dependencies
 */
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

const DragHandle = SortableHandle( () => {
	return (
		<div className="wp-block-themeisle-blocks-posts-grid-builder-handle">
			<span></span>
		</div>
	);
});

export const SortableItem = ({ value, disabled, getFields, toggleFields }) => {
	const label = startCase( toLower( value ) );
	let icon = 'hidden';
	let message = __( `Display ${ label }` );

	if ( getFields( value ) ) {
		icon = 'visibility';
		message = __( `Hide ${ label }` );
	}

	return (
		<div
			className={ classnames(
				'wp-block-themeisle-blocks-posts-grid-builder-item',
				{
					'disabled': disabled,
					'hidden': ! getFields( value )
				}
			) }
		>
			{ ! disabled && <DragHandle /> }

			<div className="wp-block-themeisle-blocks-posts-grid-builder-label">
				{ label }
			</div>

			<IconButton
				icon={ icon }
				label={ message }
				className="wp-block-themeisle-blocks-posts-grid-builder-button"
				onClick={ () => toggleFields( value ) }
			/>
		</div>
	);
};

const SortableItemContainer = SortableElement( ({ value, disabled, getFields, toggleFields }) => {
	return (
		<SortableItem
			value={ value }
			disabled={ disabled }
			getFields={ getFields }
			toggleFields={ toggleFields }
		/>
	);
});

export const SortableList = SortableContainer( ({ template, getFields, toggleFields }) => {
	return (
		<div>
			{ template.map( ( value, index ) => (
				<SortableItemContainer
					key={`item-${ index }`}
					index={ index }
					value={ value }
					getFields={ getFields }
					toggleFields={ toggleFields }
				/>
			) ) }
		</div>
	);
});
