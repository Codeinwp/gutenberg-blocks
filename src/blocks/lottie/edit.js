/**
 * External dependencies
 */
import { video } from '@wordpress/icons';

/**
 * Wordpress dependencies
 */
const { __ } = wp.i18n;

const {
	isEmpty,
	pick
} = lodash;

const {
	BlockIcon,
	MediaPlaceholder
} = wp.blockEditor;

const {
	Fragment,
	useEffect,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import LottiePlayer from './components/lottie-player.js';

const IDs = [];

const Edit = ({
	attributes,
	setAttributes,
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
		const obj = pick( value, [ 'id', 'url' ]);

		if ( isEmpty( obj ) ) {
			obj.url = value;
		}

		setAttributes({ file: { ...obj } });
	};

	if ( isEmpty( attributes.file ) ) {
		return (
			<MediaPlaceholder
				labels={ {
					title: __( 'Lottie' ),
					instructions: __( 'Add Lottie animations and files to your website.' )
				} }
				icon={ <BlockIcon icon={ video } />}
				accept={ [ 'application/json' ] }
				allowedTypes={ [ 'application/json' ] }
				value={ { ...attributes.file } }
				onSelectURL={ onChangeFile }
				onSelect={ onChangeFile }
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
				isSelected={ isSelected }
				playerRef={ playerRef }
			/>
		</Fragment>
	);
};

export default Edit;
