/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	isEqual,
	range
} = lodash;

const { ResizableBox } = wp.components;

const {
	Fragment,
	useEffect,
	useState,
	useRef
} = wp.element;

const { RichText } = wp.blockEditor;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import Inspector from './inspector.js';
import CircularProgressBar from './components/CircleCounter.js';
import defaults from '../../plugins/options/global-defaults/defaults.js';

const IDs = [];

const CircularProgressBarBlock = ({
	attributes,
	setAttributes,
	isSelected,
	clientId,
	toggleSelection,
	className
}) => {
	useEffect( () => {
		initBlock();
	}, []);

	const progressRef = useRef( null );
	const valueRef = useRef( null );
	const [ interval, changeInterval ] = useState({});

	const center = attributes.height / 2;
	const radius = center - attributes.strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;

	const initBlock = () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( attributes.id === undefined ) {
			let attrs;
			const instanceId = `wp-block-themeisle-blocks-circle-counter-${ clientId.substr( 0, 8 ) }`;

			const globalDefaults = window.themeisleGutenberg.globalDefaults ? window.themeisleGutenberg.globalDefaults : undefined;

			if ( undefined !== globalDefaults ) {
				if ( ! isEqual( defaults[ name ], window.themeisleGutenberg.globalDefaults[ name ]) ) {
					attrs = { ...window.themeisleGutenberg.globalDefaults[ name ] };

					Object.keys( attrs ).map( i => {
						if ( attributes[i] !== attrs[i] && ( undefined !== defaultAttributes[i].default && attributes[i] !== defaultAttributes[i].default ) ) {
							return delete attrs[i];
						}
					});
				}
			}

			setAttributes({
				...attrs,
				id: instanceId
			});

			IDs.push( instanceId );
			blockIDs.push( instanceId );
		} else if ( IDs.includes( attributes.id ) ) {
			const instanceId = `wp-block-themeisle-blocks-circle-counter-${ clientId.substr( 0, 8 ) }`;
			setAttributes({ id: instanceId });
			IDs.push( instanceId );
		} else {
			IDs.push( attributes.id );
			blockIDs.push( attributes.id );
		}

		window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	};


	useEffect( () => {
		if ( ! progressRef.current || ! progressRef.current || 0 === attributes.duration ) {
			return;
		}

		const step = 20; // miliseconds
		const ratio =  attributes.percentage / ( attributes.duration * 1000 ) ;
		const percentageValues = range( 0, attributes.duration * 1000 + step, step ).map( x => x * ratio ).reverse();

		if ( interval ) {
			clearInterval( interval );
		}

		progressRef.current.style.strokeDashoffset = circumference;
		valueRef.current.innerText = '0%';

		const interv = setInterval( () => {
			const percentage = Math.round( percentageValues.pop() );

			progressRef.current.style.strokeDashoffset = ( ( 100 - percentage ) / 100 ) * circumference;
			valueRef.current.innerHTML = percentage + '%';

			if ( 0 === percentageValues.length || ! progressRef.current || ! progressRef.current ) {
				clearInterval( interv );
			}
		}, step );

		changeInterval( interv );
	}, [ attributes.duration ]);

	useEffect( () => {
		if ( ! progressRef.current || ! progressRef.current ) {
			return;
		}

		progressRef.current.style.strokeDashoffset = ( ( 100 - attributes.percentage ) / 100 ) * circumference;
		valueRef.current.innerHTML = attributes.percentage + '%';

		clearInterval( interval );
	}, [ attributes.percentage, attributes.height ]);

	const onHeightChange = value => {
		const innerTextFontSizeRatio = ( attributes.fontSizePercent || 27 ) / attributes.height;
		const titleFontSizeRatio = ( attributes.fontSizeTitle || 37 ) / attributes.height;

		setAttributes({
			height: value,
			fontSizePercent: Math.round( value * innerTextFontSizeRatio ),
			fontSizeTitle: Math.round( value * titleFontSizeRatio )
		});
	};

	const onTitleChange = value => {
		setAttributes({ title: value });
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				onHeightChange={ onHeightChange }
			/>

			<div
				className={ classnames( className ) }
				id={ attributes.id }
			>
				{ ( 'default' === attributes.titleStyle ) && (
					<div className="wp-block-themeisle-blocks-circle-counter-title__area">
						<RichText
							tagName="span"
							className="wp-block-themeisle-blocks-circle-counter-title__value"
							placeholder={ isSelected ? __( 'Write caption…' ) : null }
							value={ attributes.title }
							onChange={ onTitleChange }
							multiline={ false }
							style={ {
								color: attributes.titleColor,
								fontSize: attributes.fontSizeTitle + 'px'
							} }
						/>
					</div>
				) }

				<ResizableBox
					size={ {
						height: attributes.height,
						width: attributes.height
					} }
					minHeight={ 0 }
					maxHeight={ 240 }
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false
					} }
					showHandle={ isSelected }
					onResizeStop={ ( event, direction, elt, delta ) => {
						onHeightChange( parseInt( attributes.height + delta.height, 10 ) );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
				>
					<CircularProgressBar
						attributes={ attributes }
						progressRef={ progressRef }
						valueRef={ valueRef }
					/>
				</ResizableBox>

				{ ( 'bottom' === attributes.titleStyle ) && (
					<div className="wp-block-themeisle-blocks-circle-counter-title__area">
						<RichText
							tagName="span"
							className="wp-block-themeisle-blocks-circle-counter-title__value"
							placeholder={ isSelected ? __( 'Write caption…' ) : null }
							value={ attributes.title }
							onChange={ onTitleChange }
							multiline={ false }
							style={ {
								color: attributes.titleColor,
								fontSize: attributes.fontSizeTitle + 'px'
							} }
						/>
					</div>
				) }
			</div>
		</Fragment>

	);
};

export default CircularProgressBarBlock;
