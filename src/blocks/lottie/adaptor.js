/**
 * WordPress dependencies
 */
const { omit } = lodash;

/**
 * Internal dependencies
 */
import { LOOP_OPTIONS } from './constants.js';

export const playerProps = props => {
	const { loopType, loopCount, height, width } = props;

	const getLoopOptions = () => {
		switch ( loopType ) {
		case LOOP_OPTIONS.NONE:
			return { loop: false };
		case LOOP_OPTIONS.CONTINUOUS:
			return { loop: true };
		case LOOP_OPTIONS.COUNTED:
			return { loop: true, count: loopCount - 1 };
		}
	};

	const pureProps = omit( props, [ 'loop', 'loopType', 'loopCount', 'height', 'width', 'file' ]);

	return {
		...pureProps,
		...getLoopOptions(),
		style: { height: `${ height }px`, width: `${ width }px` },
		src: props.file.url
	};
};
