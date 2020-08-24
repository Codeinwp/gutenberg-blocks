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

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const playerRef = useRef( null );

	const initBlock = () => {
		if ( attributes.id === undefined ) {
			const instanceId = `wp-block-themeisle-blocks-lottie-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-lottie-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
		}
	};

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
