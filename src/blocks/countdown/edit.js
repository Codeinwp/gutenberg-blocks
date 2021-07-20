/* eslint-disable no-unused-vars */
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
			<div className="wp-block-themeisle-blocks-countdown" id={ attributes.id }>
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
				<DisplayTime time={ getIntervalFromUnix( unixTime, {exclude: attributes?.exclude }) || time} />
			</div>
		</Fragment>
	);
};

export default Edit;
