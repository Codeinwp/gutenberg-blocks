import { BlockAttribute } from '@wordpress/blocks';

type Attributes = {
    slug: BlockAttribute<string>,
}

export type PluginCardAttrs = {
   slug?: string
}

const attributes: Attributes  = {
	slug: {
		type: 'string'
	}
};

export default attributes;
