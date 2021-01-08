/**
 * WordPress dependencies
 */
const { Disabled } = wp.components;

const { Fragment } = wp.element;

const ServerSideRender = wp.serverSideRender;

/**
 * Internal dependencies
 */
import Controls from './controls.js';

const Edit = ({ attributes, setAttributes }) => {
	return (
		<Fragment>
			<Controls attributes={attributes} setAttributes={setAttributes} />

			<Disabled>
				<ServerSideRender block="themeisle-blocks/sharing-icons" attributes={{ ...attributes }} />
			</Disabled>
		</Fragment>
	);
};

export default Edit;
