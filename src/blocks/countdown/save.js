import DisplayTime from './components/DisplayTime';
import { getIntervalFromUnix } from '../../helpers/helper-functions';

const Save = ({ attributes, className }) => {
	return (
		<div className={ className } id={ attributes.id } data-date={ attributes.date }>
			<DisplayTime
				time={ getIntervalFromUnix( 0, {exclude: attributes?.exclude }) } hasSeparators={ attributes?.hasSeparators } />
		</div>
	);
};

export default Save;
