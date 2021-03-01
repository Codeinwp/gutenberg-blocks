import * as React from 'react';
import { BlockControls } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { Button, Dashicon, Toolbar, Tooltip } from '@wordpress/components';
import { PluginCardAttrs } from './attributes';
import { __ } from '@wordpress/i18n/build-types';

type Controls = Pick<BlockEditProps<PluginCardAttrs>, 'setAttributes'>

const controls: React.FunctionComponent<Controls> = ({ setAttributes } : Controls ) => {
	return (
		<BlockControls>
			<Toolbar>
				<Tooltip text={ __( 'Edit' ) }>
					<Button
						className="components-icon-button components-toolbar__control wp-block-themeisle-blocks-plugin-cards-edit-plugin-card"
						onClick={ () => setAttributes({ slug: undefined }) }
					>
						<Dashicon icon="edit" />
					</Button>
				</Tooltip>
			</Toolbar>
		</BlockControls>
	);
};

export default controls;
