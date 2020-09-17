/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { range } = lodash;

const { ResizableBox } = wp.components;

const {
	Fragment,
	useEffect,
	useState,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */
import Inspector from './inspector.js';
import CircularProgressBar from './components/CircularProgressBar.js';

const CircularProgressBarBlock = ({
	attributes,
	setAttributes,
	isSelected,
	toggleSelection,
	className
}) => {
	const progressRef = useRef( null );
	const valueRef = useRef( null );
	const [ interval, changeInterval ] = useState({});

	const center = attributes.height / 2;
	const radius = center - attributes.strokeWidth / 2;
	const circumference = 2 * Math.PI * radius;


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
	}, [ attributes.percentage ]);

	const onHeightChange = value => {
		setAttributes({ height: value });
	};

	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				onFontSizeChange={ onHeightChange }
			/>
			<div
				className={ classnames( className, 'wp-block-themeisle-blocks-circular-progress-bar' ) }
			>
				{
					( 'default' === attributes.titleStyle ) && (
						<div
							className="wp-block-themeisle-blocks-circular-progress-bar-title__area"
						>
							<span
								className="wp-block-themeisle-blocks-circular-progress-bar-title__value"
								style={{
									color: attributes.titleColor,
									fontSize: attributes.height * 0.3 + 'px'
								}}
							>
								{ attributes.title }
							</span>
						</div>
					)
				}
				<ResizableBox
					size={ {
						height: attributes.height
					} }
					minHeight={ 5 }
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
						percentage={ attributes.percentage }
						size={ attributes.height }
						strokeWidth={ attributes.strokeWidth }
						progressStroke={ attributes.progressColor }
						backgroundStroke={ attributes.backgroundColor }
						progressRef={ progressRef }
						valueRef={ valueRef }
					/>
				</ResizableBox>

			</div>
		</Fragment>

	);
};

export default CircularProgressBarBlock;
