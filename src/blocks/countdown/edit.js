import { Fragment, useState, useEffect } from '@wordpress/element';
import { blockInit } from '../../helpers/block-utility';
import defaultAttributes from './attributes.js';
import DisplayTime from './components/DisplayTime';
import Inspector from './inspector';
import { getIntervalFromUnix } from '../../helpers/helper-functions';

const Edit = ({ attributes, setAttributes, className, clientId }) => {

	const [ unixTime, setUnixTime ] = useState( 0 );

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);

	useEffect( () => {
		const interval = setInterval( () => {
			if ( attributes.date ) {
				setUnixTime( new Date( attributes.date ) - new Date() );
			}
		}, 500 );

		return () => {
			clearInterval( interval );
		};
	}, [ attributes.date ]);

	const styles = {
		value: {
			color: attributes.valueColor,
			fontSize: attributes.valueFontSize + 'px'
		},
		label: {
			color: attributes.labelColor,
			fontSize: attributes.labelFontSize + 'px'
		},
		display: {
			gap: attributes.gap + 'px'
		},
		allComponents: {
			height: attributes.height + 'px'
		},
		mainComponents: {
			backgroundColor: attributes.backgroundColor,
			width: attributes.width,
			borderRadius: attributes.borderRadius,
			borderWidth: attributes.borderWidth,
			borderColor: attributes.borderColor
		}
	};

	return (
		<Fragment>
			{/* <Controls
				isEditing={ isEditing }
				setEdit={ setEdit }
			/> */}
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				className={ className }
			/>
			<div className={ className } id={ attributes.id }>
				<DisplayTime
					time={ getIntervalFromUnix( unixTime, {exclude: attributes?.exclude }) }
					styles={ styles }
					hasSeparators={ attributes.hasSeparators }
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
