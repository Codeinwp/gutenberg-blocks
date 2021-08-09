/* eslint-disable no-unused-vars */
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */


const { RichText } = wp.editor;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import defaultAttributes from './attributes.js';
import { blockInit } from '../../helpers/block-utility.js';
import Inspector from './inspector.js';
import Controls from './controls.js';

const ProgressBar = ({
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId
}) => {

	useEffect( () => {
		const unsubscribe = blockInit( clientId, defaultAttributes );
		return () => unsubscribe();
	}, [ attributes.id ]);


	return (
		<Fragment>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				className={ classnames( className ) }
				id={ attributes.id }
			>

			</div>
		</Fragment>
	);
};

export default ProgressBar;
