/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transform = {
	to: [
		{
			type: 'block',
			blocks: [ 'themeisle-blocks/google-map' ],
			transform: ( attributes ) => {
				const commonProps = attributes;

				return createBlock( 'themeisle-blocks/google-map', {
					...commonProps
				});
			}
		}
	]
};

export default transform;
