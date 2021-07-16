/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { DateTimePicker, Button } from '@wordpress/components';
import { blockInit } from '../../helpers/block-utility';
import defaultAttributes from './attributes.js';
import DisplayTime from './components/DisplayTime';

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

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	console.table( time );

	return (
		<Fragment>
			<div className="wp-block-themeisle-blocks-countdown" id={ attributes.id }>
				{
					! attributes?.date && (
						<div className="wp-block-themeisle-blocks-countdown-date-picker">
							<div className="wp-block-themeisle-blocks-countdown-date-picker__container">
								<DateTimePicker
									currentDate={ date }
									onChange={ setDate }
									is12Hour={ true }
								/>
							</div>
							<Button
								isPrimary
								onClick={ () => setAttributes({ date }) }
							>
								{ __( 'Save Date', 'otter-blocks' ) }
							</Button>
						</div>
					)
				}
				<DisplayTime time={time} />
			</div>
		</Fragment>
	);
};

export default Edit;
