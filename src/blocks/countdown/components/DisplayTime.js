import { Fragment } from '@wordpress/element';
import { insertBetweenItems } from '../../../helpers/helper-functions';

const DisplayTimeComponent = ({ name, value, tag, key }) => {
	return (
		<div key={key} name ={ tag }className="wp-block-themeisle-blocks-countdown-display-component">
			<div className="wp-block-themeisle-blocks-countdown-display-component_value">
				{ value }
			</div>
			<div className="wp-block-themeisle-blocks-countdown-display-component_name">
				{ name }
			</div>
		</div>
	);
};


const DisplayTime = ({ time }) => {

	const elemToDisplay = insertBetweenItems( time, {name: ' ', value: ':'});

	const renderElem = elemToDisplay?.map( ( elem, key ) => <DisplayTimeComponent {...elem} key={key} /> );

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
