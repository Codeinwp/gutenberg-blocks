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

const icon = <Icon icon={ otterIcon } />;

registerPlugin( 'themeisle-blocks', {
	icon,
	render: Component
});
