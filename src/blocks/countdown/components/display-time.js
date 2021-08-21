/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { insertBetweenItems } from '../../../helpers/helper-functions.js';

const DisplayTimeComponent = ({
	name,
	value,
	tag,
	key,
	styles
}) => {
	const compStyle = 'sep' !== name ? { ...styles.allComponents, ...styles.mainComponents } : styles.allComponents;

	return (
		<div
			key={ key }
			style={ compStyle }
			name={ tag }
			className={ classnames(
				'wp-block-themeisle-blocks-countdown__display-area',
				{
					'is-main-component': 'separator' !==  tag
				}
			) }
		>
			<div
				style={ styles.value }
				className="wp-block-themeisle-blocks-countdown__display-area__value"
			>
				{ value }
			</div>
			<div
				style={ styles.label }
				className="wp-block-themeisle-blocks-countdown__display-area__label"
			>
				{ name }
			</div>
		</div>
	);
};

const DisplayTime = ({
	time,
	hasSeparators,
	styles
}) => {
	const elemToDisplay = hasSeparators ?
		insertBetweenItems( time, {
			name: 'sep',
			value: ':',
			tag: 'separator'
		}) :
		time;

	const renderElem = elemToDisplay?.map( ( elem, key ) => (
		<DisplayTimeComponent { ...elem } key={ key } styles={ styles } />
	) );

	return time !== undefined ? (
		<div className="wp-block-themeisle-blocks-countdown__container">
			<div style={ styles.display } className="wp-block-themeisle-blocks-countdown__display">{ renderElem }</div>
		</div>
	) : (
		<Fragment></Fragment>
	);
};

export default DisplayTime;
