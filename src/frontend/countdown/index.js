/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import { getIntervalFromUnix } from '../../helpers/helper-functions';

/**
 * Get an object with the update function for every component
 * @param {HTMLDivElement} root
 * @returns {Object.<string, Function>}
 */
const getComponentsUpdate = ( root ) => {
	return [ 'second', 'minute', 'hour', 'day' ].reduce( ( acc, componentName ) => {
		const elem = root.querySelector( `div[name=${ componentName }]` );
		if ( elem ) {
			const labelElem = elem.querySelector( '.wp-block-themeisle-blocks-countdown-display-component_label' );
			const valueElem = elem.querySelector( '.wp-block-themeisle-blocks-countdown-display-component_value' );
			acc[componentName] = ( labelName, value ) => {
				if ( parseInt( valueElem.innerHTML ) !== value ) {
					valueElem.innerHTML = value;
				}
				labelElem.innerHTML = labelName;
			};
		}

		return acc;
	}, {});
};

/**
 *
 * @param {*} date The deadline of the countdown
 * @param {*} updateComponents The object with the update functions
 * @returns {Function} Function that update the countdown every time it is called. You can send a callback to be triggered when is finised.
 */
const updateTime = ( date, updateComponents, serverTimezone ) => {

	const minuteDiff = moment( ).utcOffset( ) - Number( serverTimezone ) * 60;
	const _date = moment( date );

	if ( 0 <= minuteDiff )  {
		_date.subtract( minuteDiff, 'm' );
	} else {
		_date.add( Math.abs( minuteDiff ), 'm' );
	}

	return ( onFinishCb ) => {
		const time = getIntervalFromUnix( _date - new Date() ) ;
		time.forEach( ({ tag, value, name}) => {
			updateComponents[tag]?.( name, value );
		});

		if ( 0 >= time ) {
			onFinishCb();
		}
	};
};

domReady( () => {
	const countdowns = document.querySelectorAll( '.wp-block-themeisle-blocks-countdown' );

	countdowns.forEach( countdown => {
		const date = countdown.dataset?.date;
		const serverTimezone = countdown.dataset?.serverTimezone;

		if ( date ) {
			const update = updateTime( date, getComponentsUpdate( countdown ), serverTimezone );
			const interval = setInterval( () => {
				update( () => clearInterval( interval ) );
			}, 500 );
		}
	});
});
