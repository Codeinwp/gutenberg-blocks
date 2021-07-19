/**
 * WordPress dependencies
 */
import { Icon } from '@wordpress/components';

import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import './editor.scss';
import { otterIcon } from '../helpers/icons.js';
import Options from './options/index.js';
import './css-handler/index.js';
import './data/index.js';
import './data-logging/index.js';
import './galley-extension/index.js';
import './wc-integration/index.js';
import './masonry-extension/index.js';

const icon = <Icon icon={ otterIcon } />;

registerPlugin( 'themeisle-blocks', {
	icon,
	render: Options
});
