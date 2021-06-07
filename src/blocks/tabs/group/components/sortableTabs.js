import { SortableElement } from 'react-sortable-hoc';
const { Button } = wp.components;
const { __ } = wp.i18n;

export const SortableTab = SortableElement( ({ tab, deleteTab, selectTab }) => {
	return (
		<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option">
			<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option__name">
				<p>{ tab.title }</p>
			</div>
			<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option__actions">
				<Button isLink isTertiary onClick={ () => selectTab( tab.id ) }>
					{ __( 'Edit' ) }
				</Button>
				<Button isLink isTertiary isDestructive onClick={() => deleteTab( tab.id )}>
					{ __( 'Delete' ) }
				</Button>
			</div>
		</div>
	);
});


