import * as React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { BlockSaveProps } from '@wordpress/blocks';

const Save: React.FunctionComponent<BlockSaveProps<Record<string, unknown>>> = ({  } : BlockSaveProps<Record<string, unknown>> ) => {
	return (
		<div >
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
