import { AttributeSource, BlockAttribute } from '@wordpress/blocks';

type Attributes = {
    id: BlockAttribute<string>,
    text: BlockAttribute<string>,
	number: BlockAttribute<number>
}

export type BrandNewWorldAttrs = {
    id?: string,
    text?: string,
	number?: number
}

const attributes: Attributes  = {
	id: {
		type: 'string'
	},
	text: {
		type: 'string',
		default: 'Hallo'
	},
	number: {
		type: 'number',
		default: 0
	}
};

export default attributes;
