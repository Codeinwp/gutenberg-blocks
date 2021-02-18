/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;
const { omit } = lodash;

const transform = {
	to: [
		{
			type: 'block',
			blocks: [ 'themeisle-blocks/leaflet-map-block' ],
			transform: ( attributes ) => {
				const commonProps = omit( attributes, [ 'style', 'mapTypeControl', 'fullscreenControl', 'streetViewControl' ]);

				return createBlock( 'themeisle-blocks/leaflet-map-block', {
					...commonProps
				});
			}
		}
	]
};

export default transform;
