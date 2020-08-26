import classnames from 'classnames';

const { ResizableBox } = wp.components;
const { useEffect, useRef, Fragment } = wp.element;

import Inspector from './inspector.js';

const ProgressBar = ({ attributes, setAttributes, isSelected, toggleSelection }) => {

	const barRef = useRef( null );

	useEffect( () => {
		if ( ! barRef.current ) {
			return;
		}

		barRef.current.style.width = '110px';

		barRef.current.animate(
			{
				width: `${ attributes.percentage }%`
			},
			{
				duration: attributes.duration * 1000,
				easing: 'linear',
				fill: 'forwards'
			}
		);
	}, [ attributes.percentage, attributes.duration ]);

	const onHeightChange = value => {
		setAttributes({ height: value});
	};

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes }/>
			<ResizableBox
				size={ {
					height: attributes.height
				} }
				minHeight="35"
				maxHeight="50"
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
				<div class="skillbar" data-percent={`${ attributes.percentage }%`} style={{background: attributes.backgroundColor, borderRadius: `${ attributes.borderRadius }px`, height: `${ attributes.height }px` }}>
					<div class={ classnames( 'skillbar-title', { 'transparent': ! attributes.highlightTitle})} style={{background: attributes.barBackgroundColor, height: `${ attributes.height }px`}}><span style={{height: `${ attributes.height }px`}}>{ `${ attributes.title }` }</span></div>
					<div class="skillbar-bar" ref={ barRef } style={{background: attributes.barBackgroundColor, borderRadius: `${ attributes.borderRadius }px`, height: `${ attributes.height }px`}}>
						{ 'inline' !== attributes.percentagePosition && (
							<span class="skillbar-tooltip"> {`${ attributes.percentage }%`} <span class="skillbar-arrow"></span></span>
						)}
					</div>
					{ 'inline' === attributes.percentagePosition && (
						<div class="skill-bar-percent">{ `${ attributes.percentage }%` }</div>
					)}
				</div>
			</ResizableBox>

		</Fragment>
	);
};

export default ProgressBar;
