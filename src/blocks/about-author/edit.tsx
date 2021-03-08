/**
 * WordPress dependencies
 */


import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ServerSideRender from '@wordpress/server-side-render';
import { Disabled } from '@wordpress/components';

const Edit: React.FunctionComponent<unknown> = () => {
	return (
		<Disabled>
			<ServerSideRender block="themeisle-blocks/about-author"/>
		</Disabled>
	);
};

export default Edit;
