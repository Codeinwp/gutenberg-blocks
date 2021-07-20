/* eslint-disable no-unused-vars */
import { Fragment } from '@wordpress/element';
import { insertBetweenItems } from '../../../helpers/helper-functions';
import classnames from 'classnames';


const DisplayTimeComponent = ({ name, value, tag, key, styleName }) => {
	return (
		<div key={key} name ={ tag } className={classnames( 'wp-block-themeisle-blocks-countdown-display-component', styleName  )}>
			<div className={classnames( 'wp-block-themeisle-blocks-countdown-display-component_value', styleName )}>
				{ value }
			</div>
			<div className={classnames( 'wp-block-themeisle-blocks-countdown-display-component_label', styleName )}>
				{ name }
			</div>
		</div>
	);
};


const DisplayTime = ({ time, ignoreSeperator, styleName }) => {

	const elemToDisplay = ! ignoreSeperator ? insertBetweenItems( time, { name: ' ', value: ':', tag: 'separator' }) : time;

	const renderElem = elemToDisplay?.map( ( elem, key ) => <DisplayTimeComponent {...elem} key={key} styleName={styleName} /> );

	return time !== undefined ? (
		<div className={classnames( 'wp-block-themeisle-blocks-countdown-container', styleName )}>
			<div className={classnames( 'wp-block-themeisle-blocks-countdown-display', styleName )}>
				{renderElem}
			</div>
		</div>
	) : (
		<Fragment></Fragment>
	);
};

export default DisplayTime;
