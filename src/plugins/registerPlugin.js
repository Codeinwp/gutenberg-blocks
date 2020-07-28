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
import './css-handler/index.js';
import './data/index.js';
import './galley-extension/index.js';

const icon = <Icon icon={ otterIcon } />;

registerPlugin( 'themeisle-blocks', {
	icon,
	render: Options
});
