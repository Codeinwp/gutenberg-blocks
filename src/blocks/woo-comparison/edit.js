/**
 * WordPress dependencies
 */
import { Disabled } from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';

const Edit = () => {
	return (
		<Disabled>
			<ServerSideRender block="themeisle-blocks/woo-comparison"/>
		</Disabled>
	);
};

export default Edit;
