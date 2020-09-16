/**
 * External dependencies
 */
//import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { range } = lodash;

const { ResizableBox } = wp.components;

const {
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
	toggleSelection
}) => {
	const progressRef = useRef( null );
	const valueRef = useRef( null );
	const [ interval, changeInterval ] = useState({});
	const [ percentageValues, setPercentageValues ] = useState([]);

	useEffect( () => {

		if ( ! progressRef.current || ! progressRef.current || 0 === attributes.duration ) {
			return;
		}

		const step = 20; // miliseconds
		const ratio =  attributes.percentage / ( attributes.duration * 1000 ) ;
		setPercentageValues( range( 0, attributes.duration * 1000 + step, step ).map( x => x * ratio ).reverse() );


	}, [ attributes.duration ]);

	useEffect( () => {
		if ( interval ) {
			clearInterval( interval );
		}

		const step = 20; // miliseconds
		const center = attributes.height / 2;
		const radius = center - attributes.strokeWidth / 2;
		const circumference = 2 * Math.PI * radius;


		progressRef.current.style.strokeDashoffset = circumference;
		valueRef.current.innerText = '0%';

		const interv = setInterval( () => {
			const percentage = Math.round( percentageValues.pop() );
			console.log( percentage );
			progressRef.current.style.strokeDashoffset = ( ( 100 - percentage ) / 100 ) * circumference;
			valueRef.current.innerHTML = percentage + '%';
			if ( 0 === percentageValues.length || ! progressRef.current || ! progressRef.current ) {
				console.log( 'clear' );
				clearInterval( interv );
			}
		}, step );
		changeInterval( interv );
	}, [ percentageValues ]);

	useEffect( () => {
		if ( ! progressRef.current || ! progressRef.current ) {
			return;
		}

		const center = attributes.height / 2;
		const radius = center - attributes.strokeWidth / 2;
		const circumference = 2 * Math.PI * radius;


		progressRef.current.style.strokeDashoffset = ( ( 100 - attributes.percentage ) / 100 ) * circumference;
		valueRef.current.innerText = attributes.percentage + '%';

		clearInterval( interval );
	}, [ attributes.percentage ]);

	const onHeightChange = value => {
		setAttributes({ height: value });
	};

	return (
		<div
			className="wp-block-themeisle-blocks-circular-progress-bar"
		>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				onFontSizeChange={ onHeightChange }
			/>
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
					progressStroke={ attributes.barBackgroundColor }
					backgroundStroke={ attributes.backgroundColor }
					progressRef={ progressRef }
					valueRef={ valueRef }
				/>
			</ResizableBox>

		</div>
	);
};

export default CircularProgressBarBlock;
