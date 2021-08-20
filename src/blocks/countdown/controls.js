/**
 * External dependencies.
 */
import { edit } from '@wordpress/icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { BlockControls } from '@wordpress/block-editor';

import {
	ToolbarButton,
	ToolbarGroup
} from '@wordpress/components';

const Controls = ({
	isEditing,
	setEdit
}) => {
	return (
		<BlockControls>
			<ToolbarGroup label={ __( 'Edit', 'otter-blocks' ) }>
				<ToolbarButton
					label={ __( 'Edit', 'otter-blocks' ) }
					icon={ edit }
					iconSize={ 24 }
					className="wp-block-themeisle-blocks-tabs-toolbar-edit"
					onClick={ () => setEdit( ! isEditing ) }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};

export default Controls;
