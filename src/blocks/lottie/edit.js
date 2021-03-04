/**
 * Wordpress dependencies
 */
const {
	isEmpty,
	pick
} = lodash;

const {
	Fragment,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */
import Placeholder from './placeholder.js';
import Inspector from './inspector.js';
import LottiePlayer from './components/lottie-player.js';
import { initBlock } from '../../helpers/blocks-helpers.js';


const Edit = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId
}) => {

	initBlock( attributes, setAttributes, clientId, 'wp-block-themeisle-blocks-icon-list-' );

	const playerRef = useRef( null );
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
