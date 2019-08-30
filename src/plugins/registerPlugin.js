/**
 * WordPress dependencies
 */
const { Icon } = wp.components;

const { Fragment } = wp.element;

const { registerPlugin } = wp.plugins;

/**
 * Internal dependencies
 */
import './editor.scss';

import { otterIcon } from '../helpers/icons.js';
import Options from './options/index.js';
import './css-handler/index.js';

const Component = () => (
	<Fragment>
		<Options />
	</Fragment>
);

const icon = <Icon icon={ otterIcon } />;

registerPlugin( 'themeisle-blocks', {
	icon,
	render: Component
});
