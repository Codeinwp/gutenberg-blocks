/**
 * WordPress dependencies
 */

import { InnerBlocks } from '@wordpress/block-editor';
import { BlockEditProps, TemplateArray } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import React from 'react';

const TEMPLATE: TemplateArray = [
	[ 'core/image', {
		align: 'center'
	} ],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( 'John Doe' ),
		align: 'center',
		fontSize: 24,
		tag: 'h3',
		marginTop: 25,
		marginBottom: 10,
		marginTopTablet: 25,
		marginTopMobile: 25
	} ],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( 'Jedi Master' ),
		align: 'center',
		fontSize: 14,
		tag: 'h4',
		marginTop: 10,
		marginBottom: 10
	} ],
	[ 'themeisle-blocks/advanced-heading', {
		content: __( '"What is the point of being alive if you don’t at least try to do something remarkable?"' ),
		align: 'center',
		color: '#999999',
		tag: 'p',
		fontSize: 14,
		marginTop: 10,
		marginBottom: 20
	} ]
];

const Edit: React.FunctionComponent<BlockEditProps<Record<string, unknown>>> = ({ className } : BlockEditProps<Record<string, unknown>> ) => {
	return (
		<div className={className} >
			<InnerBlocks
				template={TEMPLATE}
			/>
		</div>
	);
};

export default Edit;

