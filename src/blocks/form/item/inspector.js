/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	SelectControl
} from '@wordpress/components';

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
					label={ __( 'Label', 'otter-blocks' ) }
					value={ attributes.label }
					onChange={ label => setAttributes({ label }) }
				/>
				<SelectControl
					label={ __( 'Type', 'otter-blocks' ) }
					value={ attributes.type }
					options={ [
						{ label: __( 'Email', 'otter-blocks' ), value: 'email' },
						{ label: __( 'Date', 'otter-blocks' ), value: 'date' },
						{ label: __( 'Text', 'otter-blocks' ), value: 'text' },
						{ label: __( 'Text Area', 'otter-blocks' ), value: 'textarea' },
						{ label: __( 'Number', 'otter-blocks' ), value: 'number' },
						{ label: __( 'Password', 'otter-blocks' ), value: 'password' }
					] }
					onChange={ type => setAttributes({ type }) }
				/>
				<TextControl
					label={ __( 'Placeholder', 'otter-blocks' ) }
					value={ attributes.placeholer }
					onChange={ placeholder => setAttributes({ placeholder }) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
