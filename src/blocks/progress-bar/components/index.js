import adaptor from './adaptor.js';
import SimpleBar from './SimpleBar.js';
import CircleBar from './CircleBar.js';
import SemicircleBar from './SemicircleBar.js';


const ProgressBar = ({ type, attributes, getValue }) => {

	const { settings, animation } = adaptor( attributes );

	switch ( type ) {
	case 'bar':
		return (
			<SimpleBar settings={ settings } animation={ animation } getValue={ getValue }/>
		);
	case 'circle':
		return (
			<CircleBar settings={ settings } animation={ animation } getValue={ getValue }/>
		);
	case 'semicircle':
		return (
			<SemicircleBar settings={ settings } animation={ animation } getValue={ getValue }/>
		);
	}

	return null;
};

export default ProgressBar;
