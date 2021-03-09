/**
 * WordPress dependencies
 */

import { InnerBlocks } from '@wordpress/block-editor';
import React from 'react';

const Save: React.FunctionComponent<unknown> = () => {
	return (
		<div >
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;

