/**
 * External dependencies
 */
import { Player, Controls } from '@lottiefiles/react-lottie-player';

/**
 * Wordpress dependencies
 */
const { __ } = wp.i18n;

const { TextControl, Placeholder } = wp.components;

const { Fragment, useEffect, useRef } = wp.element;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';

const LottiePlayer = ({ attributes, setAttributes }) => {

	const playerRef = useRef( null );

	useEffect( () => {
		if ( playerRef.current ) {
			playerRef.current.setPlayerDirection( attributes.direction );
			playerRef.current.setPlayerSpeed( attributes.speed );
		}
	});

	const setSrc = ( value ) => {
		setAttributes({
			src: value
		});
	};

	const renderPlayer = () => {

		if ( ! attributes.src ) {
			return (
				<Placeholder
					label={ 'Lottie Animation URL' }
					className="wp-block-embed"
					instructions={ __(
						'Paste a link to the content you want to display on your site.'
					) }
				>
					<TextControl
						help={ __( 'Ex: https://assets1.lottiefiles.com/datafiles/jEgAWaDrrm6qdJx/data.json' ) }
						type='text'
						value={ attributes.src }
						onChange={ setSrc }
					/>
				</Placeholder>
			);
		}

		return (
			<Player
				ref= { playerRef }
				style={{ height: `${ attributes.height }px`, width: `${ attributes.width }px`, background: attributes.background }}
				{ ...attributes }
			>
				<Controls visible={ attributes.controls } buttons={[ 'play', 'repeat', 'debug' ]} />
			</Player>
		);
	};

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } setSrc= { setSrc }/>
			{ renderPlayer() }
		</Fragment>
	);
};

export default LottiePlayer;

