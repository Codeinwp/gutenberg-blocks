/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	RangeControl,
	SelectControl
} from '@wordpress/components';

import {
	InspectorControls
} from '@wordpress/block-editor';

const Inspector = ({ attributes, setAttributes }) => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
				initialOpen={ true }
			>

			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
