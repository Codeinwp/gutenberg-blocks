import { BlockAttribute } from '@wordpress/blocks';

type Attributes = {
    id: BlockAttribute<string>,
    text: BlockAttribute<string>
}

export type BrandNewWorldAttrs = {
    id: string,
    text: string
}

const attributes: Attributes  = {
	id: {
		type: 'string'
	},
	text: {
		type: 'string',
		default: 'Hallo'
	}
};

export default attributes;
