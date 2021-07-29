
/** @jsx jsx */
import {
	jsx,
	css
} from '@emotion/react';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { blockInit } from '../../helpers/block-utility';
import defaultAttributes from './attributes.js';
import DisplayTime from './components/DisplayTime';
import Inspector from './inspector';
import { getIntervalFromUnix } from '../../helpers/helper-functions';

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

	const baseCSS = css`
	.wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_value {
		color: ${ attributes.valueColor };
		font-size: ${ attributes.valueFontSize }px !important;
	}

	.wp-block-themeisle-blocks-countdown-display-component .wp-block-themeisle-blocks-countdown-display-component_label {
		color: ${ attributes.labelColor };
		font-size: ${ attributes.labelFontSize }px !important;
	}

	.wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display {
		gap: ${ attributes.gap }px;
	}

	.wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component {
		height: ${ attributes.height }px !important;
	}

	.wp-block-themeisle-blocks-countdown-container .wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component:not([name="separator"]) {
		background-color: ${ attributes.backgroundColor };
		width: ${ attributes.width }px !important;
		border-radius: ${ attributes.borderRadius }px;
		border-width: ${ attributes.borderWidth }px !important;
		border-color: ${ attributes.borderColor } !important;
	}
	`;

	const styles = {
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
			borderRadius: attributes.borderRadius,
			borderWidth: attributes.borderWidth,
			borderColor: attributes.borderColor
		}
	};

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
			<div css={[ baseCSS ]} className={ className } id={ attributes.id }>
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
