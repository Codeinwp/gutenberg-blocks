import { getIntervalFromUnix } from '../../helpers/helper-functions';
import { insertBetweenItems } from '../../helpers/helper-functions';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

const DisplayTimeComponent = ({ name, value, tag, key }) => {
	return (
		<div key={key} name ={ tag } className={ classnames( 'wp-block-themeisle-blocks-countdown-display-component', { 'is-main-component': 'separator' !==  tag }) }>
			<div className={ 'wp-block-themeisle-blocks-countdown-display-component_value' }>
				{ value }
			</div>
			<div className={ 'wp-block-themeisle-blocks-countdown-display-component_label'}>
				{ __( name, 'otter-blocks' ) }
			</div>
		</div>
	);
};


const DisplayTime = ({ time, hasSeparators }) => {

	const elemToDisplay = hasSeparators ? insertBetweenItems( time, { name: 'sep', value: ':', tag: 'separator' }) : time;

	const renderElem = elemToDisplay?.map( ( elem, key ) => <DisplayTimeComponent {...elem} key={key} /> );

	return time !== undefined ? (
		<div className={ 'wp-block-themeisle-blocks-countdown-container' }>
			<div className={  'wp-block-themeisle-blocks-countdown-display' }>
				{renderElem}
			</div>
		</div>
	) : (
		<Fragment></Fragment>
	);
};

const Save = ({ attributes, className }) => {
	return (
		<div className={ className } id={ attributes.id } data-date={ attributes.date }>
			<DisplayTime
				time={ getIntervalFromUnix( 0, {exclude: attributes?.exclude }) } hasSeparators={ attributes?.hasSeparators } />
		</div>
	);
};

export default Save;
