/**
 * WordPress dependencies
 */
const { Disabled } = wp.components;

const ServerSideRender = wp.serverSideRender;

const Edit = () => {
	return (
		<Disabled>
			<ServerSideRender block="themeisle-blocks/about-author" />
		</Disabled>
	);
};

export default Edit;
