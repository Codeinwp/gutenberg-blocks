
/**
  * Internal dependencies
  */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { servicesIcon as icon } from '../../../helpers/icons';
import edit from './edit';
import save from './save';

registerBlockType( 'themeisle-blocks/service', {
	title: __( 'Service' ),
	description: __( 'Use this Service block to showcase services your website offers.' ),
	icon,
	attributes: {},
	category: 'themeisle-blocks',
	keywords: [
		'services',
		'icon',
		'features'
	],
	edit,
	save
});
