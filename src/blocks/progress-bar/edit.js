import classnames from 'classnames';

const { ResizableBox } = wp.components;
const { useEffect, useRef, Fragment } = wp.element;

import Inspector from './inspector.js';


const fontRatio = 0.342;

const ProgressBar = ({ attributes, setAttributes, isSelected, toggleSelection }) => {

	const barRef = useRef( null );

	useEffect( () => {
		if ( ! barRef.current ) {
			return;
		}

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
		if ( 35 > value ) {
			setAttributes({
				height: value,
				titleStyle: 'outer',
				percentagePosition: 'outer'
			});
		} else {
			setAttributes({ height: value });
		}
	};

	return (
		<Fragment>
			<Inspector attributes={ attributes } setAttributes={ setAttributes }/>
			<div className="wp-themeisle-progress-bar-block">

				<div className="wp-themeisle-progress-bar-outer-content">
					{'outer' === attributes.titleStyle && (
						<h3 className="wp-themeisle-block-progress-bar-outer-content__title">
							{`${ attributes.title }`}
						</h3>
					)}
					{ 'outer' === attributes.percentagePosition && (
						<div className={ classnames( 'wp-themeisle-skill-bar-percent', 'wp-themeisle-block-progress-bar-outer-content__value' )} >{ `${ attributes.percentage }%` }</div>
					)}
				</div>


				<ResizableBox
					size={ {
						height: attributes.height
					} }
					minHeight="10"
					maxHeight="100"
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

					<div className="wp-themeisle-skillbar" data-percent={`${ attributes.percentage }%`} style={{background: attributes.backgroundColor, borderRadius: `${ attributes.borderRadius }px`, height: `${ attributes.height }px` }}>
						{
							( 'default' === attributes.titleStyle || 'simple' === attributes.titleStyle ) && (
								<div className={ classnames( 'wp-themeisle-skillbar-title', { 'transparent': 'simple' === attributes.titleStyle})} style={{fontSize: `${ attributes.height * fontRatio }px`, background: attributes.barBackgroundColor, height: `${ attributes.height }px`, borderRadius: `${ attributes.borderRadius }px`}}>
									<span style={{height: `${ attributes.height }px`, borderRadius: `${ attributes.borderRadius }px 0px 0px ${ attributes.borderRadius }px`}}>
								  		{`${ attributes.title }`}
									</span>
								</div>
							)
						}

						<div className="wp-themeisle-skillbar-bar" ref={ barRef } style={{background: attributes.barBackgroundColor, borderRadius: `${ attributes.borderRadius }px`, height: `${ attributes.height }px`}}>
							{ 'tooltip' === attributes.percentagePosition && (
								<span className="wp-themeisle-skillbar-tooltip"> {`${ attributes.percentage }%`} <span className="wp-themeisle-skillbar-arrow"></span></span>
							)}
						</div>
						{ 'inline' === attributes.percentagePosition && (
							<div className="wp-themeisle-skill-bar-percent" style={{fontSize: `${ attributes.height * fontRatio }px`, height: `${ attributes.height }px` }}>{ `${ attributes.percentage }%` }</div>
						)}
					</div>


				</ResizableBox>
			</div>
		</Fragment>
	);
};

export default ProgressBar;
