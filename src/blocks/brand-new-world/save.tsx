import { RichText } from '@wordpress/block-editor';
import { BlockSaveProps } from '@wordpress/blocks';
import * as React from 'react';
import { BrandNewWorldAttrs } from './attributes';

const save: React.FunctionComponent<BlockSaveProps<BrandNewWorldAttrs>> = ({ attributes }) => {
	return (
		<RichText.Content
			value={ attributes.text }
		/>
	);
};

export default save;
