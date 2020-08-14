/**
 * External dependencies
 */
import {
	Controls,
	Player
} from '@lottiefiles/react-lottie-player';

import {
	Icon,
	video
} from '@wordpress/icons';

/**
 * Wordpress dependencies
 */
const { __ } = wp.i18n;

const {
	isEmpty,
	pick
} = lodash;

const { MediaPlaceholder } = wp.blockEditor;

const {
	Fragment,
	useEffect,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import { LOOP_OPTIONS } from './constants.js';

const IDs = [];

const LottiePlayer = ({
	attributes,
	setAttributes,
	isSelected,
	clientId
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	useEffect( () => {
		if ( playerRef.current ) {
			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
			setLoopToPlayer( playerRef );
		}

		if ( playerRef.current ) {
			const { playerState } = playerRef.current.state;
			if ( playerState ) {
				if ( 'error' === playerState ) {
					setAttributes({ file: undefined });
					console.log( 'WiP: Error' );
				}
			}
		}
	}, [ attributes ]);

	useEffect( () => {
		if ( playerRef.current ) {
			if ( ! isSelected ) {
				playerRef.current.stop();
			}
		}
	}, [ isSelected ]);

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

	const getLoop = () => {
		switch ( attributes.loopType ) {
		case LOOP_OPTIONS.NONE:
			return false;
		case LOOP_OPTIONS.CONTINUOUS:
			return true;
		case LOOP_OPTIONS.COUNTED:
			return attributes.loopCount - 1;
		}
	};

	const setLoopToPlayer = ()  => {
		if ( ! playerRef.current.state.instance ) {
			return;
		}

		const { instance } = playerRef.current.state;
		instance.loop = getLoop();
		playerRef.current.setState({ instance: instance });
	};

	const eventHandeler = event => {
		if ( 'load' === event ) {
			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
			setLoopToPlayer();
		}

		if ( 'error' === event ) {
			console.log( 'WiP: Error' );
		}
	};

	if ( isEmpty( attributes.file ) ) {
		return (
			<MediaPlaceholder
				labels={ {
					title: __( 'Lottie' ),
					instructions: __( 'Add Lottie animations and files to your website.' )
				} }
				icon={ <Icon icon={ video } />}
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
			/>

			<Player
				id={ attributes.id }
				ref={ playerRef }
				src={ attributes.file.url }
				style={ {
					height: `${ attributes.height }px`,
					width: `${ attributes.width }px`
				} }
				hover={ attributes.hover }
				loop={ getLoop() }
				direction={ attributes.direction }
				controls={ attributes.controls }
				autoplay={ attributes.autoplay }
				renderer={ attributes.renderer }
				onEvent={ eventHandeler }
			>
				<Controls
					visible={ isSelected }
					buttons={ [ 'play', 'stop' ] }
				/>
			</Player>
		</Fragment>
	);
};

export default LottiePlayer;

