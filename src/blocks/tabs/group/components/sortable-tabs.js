/**
 * External dependencies
*/
import {
	SortableElement,
	SortableHandle
} from 'react-sortable-hoc';

/**
 * WordPress dependencies
*/
const { __ } = wp.i18n;

const { Button } = wp.components;

const DragHandle = SortableHandle( () => {
	return (
		<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option__drag" tabIndex="0">
			<span></span>
		</div>
	);
});

export const SortableTab = SortableElement( ({ tab, deleteTab, selectTab }) => {
	return (
		<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option">
			<DragHandle/>

			<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option__name">
				{ tab.attributes.title || __( 'Untitled Tab' ) }
			</div>

			<Button
				icon="edit"
				label={ __( 'Edit Tab' ) }
				showTooltip={ true }
				className="wp-block-themeisle-blocks-tabs-inspector-tab-option__actions"
				onClick={ () => selectTab( tab.clientId ) }
			/>

			<Button
				icon="no-alt"
				label={ __( 'Remove Tab' ) }
				showTooltip={ true }
				className="wp-block-themeisle-blocks-tabs-inspector-tab-option__actions"
				onClick={ () => deleteTab( tab.clientId ) }
			/>
		</div>
	);
});


