
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import attributes from './attributes';

const result = registerBlockType( 'themeisle-blocks/typescript-text', {
	title: __( 'Test Typescript' ),
	description: __( 'Put the logo maker on the site.' ),
	category: 'widgets', icon: 'smiley',
	attributes: attributes,
	edit: edit,
	save: save
});

console.log( result );

