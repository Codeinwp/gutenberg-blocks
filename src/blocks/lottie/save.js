const { Fragment } = wp.element;

import { playerProps } from './adaptor.js';

const Save = ({ attributes }) => {

	return (
		<Fragment>
			{/* <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script> */}
			<lottie-player
				{...playerProps( attributes )}
			></lottie-player>
		</Fragment>
	);
};

export default Save;
