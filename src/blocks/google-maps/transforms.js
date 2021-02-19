/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;
const { omit } = lodash;

const transform = {
	to: [
		{
			type: 'block',
			blocks: [ 'themeisle-blocks/leaflet-map' ],
			transform: ( attributes ) => {
				const commonProps = omit( attributes, [ 'style', 'mapTypeControl', 'fullscreenControl', 'streetViewControl' ]);

				return createBlock( 'themeisle-blocks/leaflet-map', {
					...commonProps
				});
			}
		}
	]
};

export default transform;
