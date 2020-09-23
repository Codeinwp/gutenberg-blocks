/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;
const { omit, clamp } = lodash;

const transform = {
	from: [
		{
			type: 'block',
			blocks: [ 'themeisle-blocks/progress-bar' ],
			transform: ( attributes ) => {
				const commonProps = omit( attributes, [ 'titleStyle', 'percentagePosition', 'height', 'borderRadius', 'barBackgroundColor', 'percentageColor' ]);

				return createBlock( 'themeisle-blocks/circle-counter', {
					...commonProps,
					progressColor: attributes.barBackgroundColor,
					height: clamp( attributes.height * 4, 0, 240 ),
					titleStyle: 'default'
				});
			}
		}
	],
	to: [
		{
			type: 'block',
			blocks: [ 'themeisle-blocks/progress-bar' ],
			transform: ( attributes ) => {
				const commonProps = omit( attributes, [ 'titleStyle', 'height', 'fontSize', 'strokeWidth', 'progressColor' ]);

				return createBlock( 'themeisle-blocks/progress-bar', {
					...commonProps,
					barBackgroundColor: attributes.progressColor,
					height: clamp( attributes.height / 4, 0, 100 ),
					titleStyle: 'default'
				});
			}
		}
	]
};

export default transform;
