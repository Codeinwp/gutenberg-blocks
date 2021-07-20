import DisplayTime from './components/DisplayTime';
import { getIntervalFromUnix } from '../../helpers/helper-functions';

const Save = ({ attributes }) => {
	return (
		<div className="wp-block-themeisle-blocks-countdown" id={ attributes.id } data-date={ attributes.date }>
			<DisplayTime
				time={ getIntervalFromUnix( 0, {exclude: attributes?.exclude }) } styleName={ attributes.style } />
		</div>
	);
};

export default Save;
