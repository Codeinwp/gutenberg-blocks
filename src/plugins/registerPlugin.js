/**
 * WordPress dependencies
 */
const { Icon } = wp.components;

const { registerPlugin } = wp.plugins;

/**
 * Internal dependencies
 */
import './editor.scss';

import { otterIcon } from '../helpers/icons.js';

import Options from './options/index.js';

const Component = () => (
	<Options />
);


registerPlugin( 'themeisle-blocks', {
	icon: <Icon icon={ otterIcon } />,
	render: Component
});
