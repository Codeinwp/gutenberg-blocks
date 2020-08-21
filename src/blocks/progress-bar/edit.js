
import ProgressBar from 'progressbar.js';
import classnames from 'classnames';

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

		const percentage = Math.round( bar.value() * 100 );

		if ( ! animation.hideValue ) {
			if ( 0 === percentage ) {
				bar.setText( '' );
			} else {
				bar.setText( `${percentage}%` );
			}
		}

		setValue( percentage );
	};

	const create = () => {

		if ( ! progressBarRef.current ) {
			return;
		}

		if ( progressBar ) {
			progressBar.destroy();
		}

		let bar;

		switch ( attributes.type ) {
		case BarType.BAR:
			bar = new ProgressBar.Line( progressBarRef.current, {
				...settings,
				text: {
					style: {
						color: attributes.textColor,
						position: 'absolute',
						padding: 0,
						margin: 0,
						transform: null,
						fontSize: `${ attributes.height * 0.8 }px`
					},
					autoStyleContainer: false,
					alignToBottom: false
				},
				step
			});
			break;

		case BarType.CIRCLE:
			bar = new ProgressBar.Circle( progressBarRef.current, {
				...settings,
				step,
				text: {
					autoStyleContainer: false
				}
			});
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = `${attributes.height / 4 }px`;
			break;

		case BarType.SEMICIRCLE:
			bar = new ProgressBar.SemiCircle( progressBarRef.current, {
				...settings,
				step,
				text: {
					value: '',
					alignToBottom: false
				}
			});
			bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
			bar.text.style.fontSize = `${attributes.height / 4 }px`;
			bar.text.style.bottom = '12%';
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

					<span id="value" className="wp-themeisle-block-progress-bar__value">
						{
							! attributes.hideValue && `Testing: ${ value }%`
						}
					</span>

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
					<div style={{ height: `${attributes.height}px` }}>
						<div
							ref={ progressBarRef }
							id="container"
							className={ classnames ( 'wp-themeisle-block-progress-bar__bar', { 'is-bar': attributes.type === BarType.BAR }) }
						></div>
					</div>
				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default ProgressBarComponent;
