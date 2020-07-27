/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Button } = wp.components;

const {
	Fragment,
	useEffect
} = wp.element;

const Map = ({
	attributes,
	className,
	displayMap,
	initMap
}) => {
	useEffect( () => {
		if ( displayMap ) {
			initMap();
		}
	}, [ displayMap ]);

	return (
		<Fragment>
			<div
				id={attributes.id}
				className={classnames(
					className

					//					{ 'is-selecting-marker': isSelectingMarker }
				)}
				style={{
					height: attributes.height + 'px'
				}}
			>
			</div>
		</Fragment>
	);
};

export default Map;
