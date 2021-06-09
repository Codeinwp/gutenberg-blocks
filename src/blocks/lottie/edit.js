/**
 * Wordpress dependencies
 */
const {
	isEmpty,
	pick
} = lodash;

const {
	Fragment,
	useEffect,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */
import Placeholder from './placeholder.js';
import Inspector from './inspector.js';
import LottiePlayer from './components/lottie-player.js';
import { addBlockId } from '../../helpers/block-utility.js';
import defaultAttributes from './attributes.js';

const Edit = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
	name
}) => {

	const playerRef = useRef( null );

	useEffect( () => {
		const unsubscribe = addBlockId({
			attributes,
			setAttributes,
			clientId,
			name,
			idPrefix: 'wp-block-themeisle-blocks-lottie-',
			defaultAttributes
		});
		return () => unsubscribe();
	}, []);

	const onChangeFile = value => {
		if ( '' === value || null === value ) {
			return;
		}

		const obj = pick( value, [ 'id', 'url' ]);

		if ( isEmpty( obj ) ) {
			obj.url = value;
		}

		setAttributes({ file: { ...obj } });
	};

	if ( isEmpty( attributes.file ) ) {
		return (
			<Placeholder
				className={ className }
				value={ attributes.file }
				onChange={ onChangeFile }
			/>
		);
	}

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				playerRef={ playerRef }
			/>

			<LottiePlayer
				attributes={ attributes }
				className={ className }
				isSelected={ isSelected }
				playerRef={ playerRef }
			/>
		</Fragment>
	);
};

export default Edit;
