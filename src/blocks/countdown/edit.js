import { Fragment, useState, useEffect } from '@wordpress/element';
import { blockInit } from '../../helpers/block-utility';
import defaultAttributes from './attributes.js';
import DisplayTime from './components/DisplayTime';
import Inspector from './inspector';
import { getIntervalFromUnix } from '../../helpers/helper-functions';
import { useSelect } from '@wordpress/data';
import { useViewportMatch } from '@wordpress/compose';

const Edit = ({ attributes, setAttributes, className, clientId }) => {

	const [ unixTime, setUnixTime ] = useState( 0 );

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {
		const interval = setInterval( () => {
			if ( attributes.date ) {
				setUnixTime( new Date( attributes.date ) - new Date() );
			}
		}, 500 );

		return () => {
			clearInterval( interval );
		};
	}, [ attributes.date ]);

	const {
		isViewportAvailable,
		isPreviewDesktop,
		isPreviewTablet,
		isPreviewMobile
	} = useSelect( select => {

		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return {
			isViewportAvailable: __experimentalGetPreviewDeviceType ? true : false,
			isPreviewDesktop: __experimentalGetPreviewDeviceType ? 'Desktop' === __experimentalGetPreviewDeviceType() : false,
			isPreviewTablet: __experimentalGetPreviewDeviceType ? 'Tablet' === __experimentalGetPreviewDeviceType() : false,
			isPreviewMobile: __experimentalGetPreviewDeviceType ? 'Mobile' === __experimentalGetPreviewDeviceType() : false
		};
	}, []);

	const isLarger = useViewportMatch( 'large', '>=' );

	const isLarge = useViewportMatch( 'large', '<=' );

	const isSmall = useViewportMatch( 'small', '>=' );

	const isSmaller = useViewportMatch( 'small', '<=' );


	let isDesktop = isLarger && ! isLarge && isSmall && ! isSmaller;

	let isTablet = ! isLarger && ! isLarge && isSmall && ! isSmaller;

	let isMobile = ! isLarger && ! isLarge && ! isSmall && ! isSmaller;

	if ( isViewportAvailable && ! isMobile ) {

		isDesktop = isPreviewDesktop;
		isTablet = isPreviewTablet;
		isMobile = isPreviewMobile;
	}


	let styles = {};

	if ( isTablet ) {
		styles = {
			value: {
				color: attributes.valueColor,
				fontSize: attributes.valueFontSizeTablet + 'px'
			},
			label: {
				color: attributes.labelColor,
				fontSize: attributes.labelFontSizeTablet + 'px'
			},
			display: {
				gapTablet: attributes.gapTablet + 'px'
			},
			allComponents: {
				height: attributes.heightTablet + 'px'
			},
			mainComponents: {
				backgroundColor: attributes.backgroundColor,
				width: attributes.widthTablet,
				borderWidth: attributes.borderWidth,
				borderColor: attributes.borderColor
			}
		};
	} else if ( isMobile ) {
		styles = {
			value: {
				color: attributes.valueColor,
				fontSize: attributes.valueFontSizeMobile + 'px'
			},
			label: {
				color: attributes.labelColor,
				fontSize: attributes.labelFontSizeMobile + 'px'
			},
			display: {
				gap: attributes.gapMobile + 'px'
			},
			allComponents: {
				height: attributes.heightMobile + 'px'
			},
			mainComponents: {
				backgroundColor: attributes.backgroundColor,
				width: attributes.widthMobile,
				borderWidth: attributes.borderWidthMobile,
				borderColor: attributes.borderColor
			}
		};
	} else if ( isDesktop ) {
		styles = {
			value: {
				color: attributes.valueColor,
				fontSize: attributes.valueFontSize + 'px'
			},
			label: {
				color: attributes.labelColor,
				fontSize: attributes.labelFontSize + 'px'
			},
			display: {
				gap: attributes.gap + 'px'
			},
			allComponents: {
				height: attributes.height + 'px'
			},
			mainComponents: {
				backgroundColor: attributes.backgroundColor,
				width: attributes.width,
				borderWidth: attributes.borderWidth,
				borderColor: attributes.borderColor
			}
		};
	}


	styles.mainComponents.borderRadius = 'linked' === attributes.borderRadiusType ? attributes.borderRadius + '%' : `${ attributes.borderRadiusTopLeft }% ${ attributes.borderRadiusTopRight }% ${ attributes.borderRadiusBottomRight }% ${ attributes.borderRadiusBottomLeft }%`;

	return (
		<Fragment>
			{/* <Controls
				isEditing={ isEditing }
				setEdit={ setEdit }
			/> */}
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				className={ className }
			/>
			<div className={ className } id={ attributes.id }>
				<DisplayTime
					time={ getIntervalFromUnix( unixTime, {exclude: attributes?.exclude }) }
					styles={ styles }
					hasSeparators={ attributes.hasSeparators }
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
