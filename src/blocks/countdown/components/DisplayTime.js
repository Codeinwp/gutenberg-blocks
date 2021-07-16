/* eslint-disable no-unused-vars */

import { Fragment } from '@wordpress/element';
import { insertBetweenItems } from '../../../helpers/helper-functions';

const DisplayTimeComponent = ({ name, value, key }) => {
	return (
		<div key={key} className="wp-block-themeisle-blocks-countdown-display-component">
			<div className="wp-block-themeisle-blocks-countdown-display-component_value">
				{ value }
			</div>
			<div className="wp-block-themeisle-blocks-countdown-display-component_name">
				{ name }
			</div>
		</div>
	);
};

/**
 *
 * @param {Array} time
 * @param {Object} settings
 * @returns
 */
const applySettings = ( time, settings ) => {
	return time.fillter( ({ name }) => ! settings.excluded.includes( name ) );
};

const DisplayTime = ({ time, settings }) => {

	const elemToDisplay = insertBetweenItems( time, {name: 'asf', value: ':'});

	const renderElem = elemToDisplay?.map( ( elem, key ) => <DisplayTimeComponent {...elem} key={key} /> );
	console.log( renderElem, insertBetweenItems( renderElem, <DisplayTime name=':' value='' />  ) );

	return time !== undefined ? (
		<div className="wp-block-themeisle-blocks-countdown-container">
			<div className="wp-block-themeisle-blocks-countdown-display">
				{renderElem}
			</div>
		</div>
	) : (
		<Fragment></Fragment>
	);
};

export default DisplayTime;
