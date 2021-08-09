/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { Button } from '@wordpress/components';

import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

const PanelTab = ({
	label,
	onDelete,
	children
}) => {
	const [ isOpen, setOpen ] = useState( false );

	return (
		<div className="wp-block-themeisle-blocks-panel-tab">
			<div className="wp-block-themeisle-blocks-panel-tab__header">
				<div className="wp-block-themeisle-blocks-panel-tab__header__label">{ label }</div>

				<Button
					icon={ isOpen ? 'arrow-up-alt2' : 'arrow-down-alt2' }
					label={ isOpen ? __( 'Close Settings', 'otter-blocks' ) : __( 'Open Settings', 'otter-blocks' ) }
					showTooltip={ true }
					onClick={ () => setOpen( ! isOpen ) }
				/>

				<Button
					icon="no-alt"
					label={ __( 'Delete', 'otter-blocks' ) }
					showTooltip={ true }
					onClick={ onDelete }
				/>
			</div>

			{ isOpen && <div className="wp-block-themeisle-blocks-panel-tab__content">{ children }</div> }
		</div>
	);
};

export default PanelTab;
