/* eslint-disable no-unused-vars */
/** @jsx jsx */
import {
	jsx,
	css
} from '@emotion/react';
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { DateTimePicker, Button } from '@wordpress/components';
import { blockInit } from '../../helpers/block-utility';
import defaultAttributes from './attributes.js';
import DisplayTime from './components/DisplayTime';
import Controls from './controls.js';
import Inspector from './inspector';
import { getIntervalFromUnix } from '../../helpers/helper-functions';

const time = [
	{
		name: 'day',
		value: '1'
	},
	{
		name: 'hour',
		value: '30'
	},
	{
		name: 'minute',
		value: '12'
	},
	{
		name: 'seconds',
		value: '59'
	}
];

const Edit = ({ attributes, setAttributes, clientId }) => {

	const [ date, setDate ] = useState( attributes.date );
	const [ unixTime, setUnixTime ] = useState( 0 );
	const [ isEditing, setEdit ] = useState( true );

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {
		const interval = setInterval( () => {
			setUnixTime( new Date( date ) - new Date() );
		}, 500 );

		return () => {
			clearInterval( interval );
		};
	}, [ date ]);

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
	`;

	const blockStyle = {
		ignoreSeperator: false,
		styleName: 'block-style',
		dynamicCSS: css`
		.wp-block-themeisle-blocks-countdown-display .wp-block-themeisle-blocks-countdown-display-component.block-style {
			background-color: ${ attributes.backgroundColor || 'crimson' };
			height: ${ attributes.width || 80 }px;
			width: ${ attributes.height || 80 }px;
			border-radius: ${ attributes.borderRadius || 10 }px;
			border-width: ${ attributes.borderWidth }px;
			border-style: ${ 0 < attributes.borderRadius ? 'solid' : 'unset' }
		}
		`
	};

	const defaultStyle = {
		ignoreSeperator: false,
		styleName: 'default-style',
		dynamicCSS: css``
	};


	return (
		<Fragment>
			<Controls
				isEditing={ isEditing }
				setEdit={ setEdit }
			/>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div css={[ baseCSS, blockStyle.dynamicCSS ]} className="wp-block-themeisle-blocks-countdown" id={ attributes.id }>
				{
					( ! attributes?.date || isEditing ) && (
						<div className="wp-block-themeisle-blocks-countdown-date-picker">
							<div className="wp-block-themeisle-blocks-countdown-date-picker__container">
								<DateTimePicker
									currentDate={ date }
									onChange={ setDate }
									is12Hour={ false }
								/>
							</div>
							<Button
								isPrimary
								onClick={ () => {
									setAttributes({ date });
									setEdit( false );
								} }
							>
								{ __( 'Save Date', 'otter-blocks' ) }
							</Button>
							<br/>
						</div>
					)
				}
				<DisplayTime time={ getIntervalFromUnix( unixTime, {exclude: attributes?.exclude }) || time} {...blockStyle}/>
			</div>
		</Fragment>
	);
};

export default Edit;
