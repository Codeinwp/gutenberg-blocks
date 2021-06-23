import { SortableElement, SortableHandle } from 'react-sortable-hoc';
const { Button } = wp.components;
const { __ } = wp.i18n;

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
			<DragHandle  />
			<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option__name">
				{tab.title}
			</div>
			<Button className="wp-block-themeisle-blocks-tabs-inspector-tab-option__actions" icon="edit" onClick={() => selectTab( tab.id )}/>

			<Button className="wp-block-themeisle-blocks-tabs-inspector-tab-option__actions" label={__( 'Remove Tab' )} icon="no-alt" showTooltip={true} onClick={() => deleteTab( tab.id )} />

		</div>
	);
});


