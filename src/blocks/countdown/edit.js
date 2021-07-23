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

const Edit = ({ attributes, setAttributes, className, clientId }) => {

	const [ date, setDate ] = useState( attributes.date );
	const [ unixTime, setUnixTime ] = useState( 0 );
	const [ isEditing, setEdit ] = useState( false );

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {
		const interval = setInterval( () => {
			setUnixTime( new Date( attributes.date || date ) - new Date() );
		}, 500 );

		return () => {
			clearInterval( interval );
		};
	}, [ date, attributes.date ]);

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
		background-color: ${ attributes.backgroundColor };
		height: ${ attributes.height }px !important;
		width: ${ attributes.width }px !important;
		border-radius: ${ attributes.borderRadius }px;
		border-width: ${ attributes.borderWidth }px;
		border-color: ${ attributes.borderColor };
	}
	`;

	// border-style: ${ 0 < attributes.borderRadius ? 'solid' : 'unset' };
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
			<div css={[ baseCSS ]} className={ className } id={ attributes.id }>
				{

					( isEditing ) && (
						<div className="wp-block-themeisle-blocks-countdown-date-picker">
							<div className="wp-block-themeisle-blocks-countdown-date-picker__container">
								<DateTimePicker
									currentDate={ date }
									onChange={ setDate }
									is12Hour={ attributes?.is12Hour }
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
				<DisplayTime time={ getIntervalFromUnix( unixTime, {exclude: attributes?.exclude }) || time} hasSeparators={ attributes.hasSeparators }/>
			</div>
		</Fragment>
	);
};

export default Edit;
