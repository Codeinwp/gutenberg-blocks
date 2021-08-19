/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import { TextControl, PanelBody } from '@wordpress/components';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
				initialOpen={ true }
			>
				<TextControl
					label={ __( 'Email Title', 'otter-blocks' ) }
					placeholder={ __( 'A new submission', 'otter-blocks' ) }
					value={ attributes.emailTitle }
					onChange={ emailTitle => setAttributes({ emailTitle }) }
					help={ __( 'Customize the email title send by this form.', 'otter-blocks' ) }
				/>
	   		</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
