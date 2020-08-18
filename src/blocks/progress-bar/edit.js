
import ProgressBar from 'progressbar.js';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;
const { ResizableBox } = wp.components;
const { useRef, useState, useEffect } = wp.element;

import Inspector from './inspector.js';
import adaptor from './adaptor.js';

export const BarType = {
	BAR: 'BAR',
	CIRCLE: 'CIRCLE',
	SEMICIRCLE: 'SEMICIRCLE'
};

const ProgressBarComponent = ({ attributes, setAttributes, toggleSelection }) => {

	const progressBarRef = useRef( null );

	const [ progressBar, setProgressBar ] = useState( null );
	const [ value, setValue ] = useState( null );

	const { settings, animation } = adaptor( attributes );

	useEffect( () => {
		create();
	}, [ attributes ]);

	const onTextChange = value => {
		setAttributes({ text: value });
	};

	const step = ( state, bar ) => {
		if ( animation.coloredProgress ) {
			bar.path.setAttribute( 'stroke', state.color );
		}

		if ( animation.strokeAnimation ) {
			bar.path.setAttribute( 'stroke-width', state.width );
		}

		setValue( Math.round( bar.value() * 100 ) );
	};

	const create = () => {

		if ( ! progressBarRef.current ) {
			return;
		}

		if ( progressBar ) {
			progressBar.destroy();
		}

		console.log({ ...settings });

		let bar;

		switch ( attributes.type ) {
		case BarType.BAR:
			bar = new ProgressBar.Line( progressBarRef.current, {
				...settings,
				step
			});
			break;
		case BarType.CIRCLE:
			bar = new ProgressBar.Circle( progressBarRef.current, {
				...settings,
				step
			});
			break;
		case BarType.SEMICIRCLE:
			bar = new ProgressBar.SemiCircle( progressBarRef.current, {
				...settings,
				step
			});
			break;
		}

		if ( animation.isAnimated ) {
			bar.animate( ( animation.percentage / 100 ).toFixed( 2 ) );
		} else {
			bar.set( ( animation.percentage / 100 ).toFixed( 2 ) );
		}

		setProgressBar( bar );
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div className="wp-themeisle-block-progress-bar">
				<div className="wp-themeisle-block-progress-bar__content">
					<RichText
						tagName="p"
						className="wp-themeisle-block-progress-bar__title"
						placeholder={ __( 'Write a title…' ) }
						value={ attributes.text }
						onChange={ onTextChange }
						multiline={ false }
					/>

					{
						! attributes.hideValue && value
					}

				</div>
				<ResizableBox
					size={ {
						height: attributes.height
					} }
					minHeight="20"
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes({
							height: parseInt( attributes.height + delta.height, 10 )
						});
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
					<div style={{ height: attributes.height }}>
						<div ref={ progressBarRef }></div>
					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default ProgressBarComponent;
