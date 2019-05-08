/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

import { mapIcon } from '../../helpers/icons.js';

import Editor from './components/Editor.js';

registerBlockType( 'themeisle-blocks/google-map', {
	title: __( 'Google Map' ),
	description: __( 'Display a Google Map on your website with Google Map block.' ),
	icon: mapIcon,
	category: 'themeisle-blocks',
	keywords: [
		'map',
		'google',
		'orbitfox'
	],
	attributes: {
		id: {
			type: 'string'
		},
		location: {
			type: 'string',
			default: 'La Sagrada Familia, Barcelona, Spain'
		},
		latitude: {
			type: 'string'
		},
		longitude: {
			type: 'string'
		},
		type: {
			type: 'string',
			default: 'roadmap'
		},
		zoom: {
			type: 'number',
			default: 15
		},
		height: {
			type: 'number',
			default: 400
		},
		draggable: {
			type: 'boolean',
			default: true
		},
		mapTypeControl: {
			type: 'boolean',
			default: true
		},
		zoomControl: {
			type: 'boolean',
			default: true
		},
		fullscreenControl: {
			type: 'boolean',
			default: true
		},
		streetViewControl: {
			type: 'boolean',
			default: true
		},
		markers: {
			type: 'array',
			default: []
		}
	},

	supports: {
		align: [ 'wide', 'full' ],
		html: false
	},

	edit: Editor,

	save: () => {
		return null;
	}
});
