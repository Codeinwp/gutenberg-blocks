/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import domReady from '@wordpress/dom-ready';
import { getIntervalFromUnix } from '../../helpers/helper-functions';

/**
 *
 * @param {HTMLDivElement} root
 * @returns
 */
const getComponentsUpdate = ( root ) => {
	return [ 'second', 'minute', 'hour', 'day' ].reduce( ( acc, componentName ) => {
		const elem = root.querySelector( `div[name=${ componentName }]` );
		if ( elem ) {
			const valueElem = elem.querySelector( '.wp-block-themeisle-blocks-countdown-display-component_value' );
			acc[componentName] = ( value ) => {
				valueElem.innerHTML = value;
			};
		}

		return acc;
	}, {});
};

const updateTime = ( date, updateComponents ) => {
	const _date = new Date( date );
	return () => {
		const time = getIntervalFromUnix( _date - Date.now() );
		time.forEach( ({ tag, value}) => {
			updateComponents[tag]( value );
		});
	};
};

domReady( () => {
	const countdowns = document.querySelectorAll( '.wp-block-themeisle-blocks-countdown' );

	countdowns.forEach( countdown => {
		const date = countdown.dataset.date;

		if ( date ) {
			const update = updateTime( date, getComponentsUpdate( countdown ) );
			const interval = setInterval( () => {
				update();
			}, 500 );
		}
	});
});
