/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { times } = lodash;

/**
 * Internal dependencies
 */
import Button from './components/button-save.js';

const Save = ({
	attributes,
	className
}) => {
	const collapseClass = 'collapse-none' !== attributes.collapse && attributes.collapse;

	return (
		<div
			id={ attributes.id }
			className={ classnames(
				className,
				collapseClass,
				'wp-block-button'
			) }
		>
			{ times( attributes.buttons, i => (
				<Button
					index={ i }
					attributes={ attributes }
				/>
			) ) }
		</div>
	);
};

export default Save;
