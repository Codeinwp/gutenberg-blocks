/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import Controls from './controls.js';
import socialList from './services.js';

const Edit = ({ attributes, setAttributes, className }) => {
	return (
		<Fragment>
			<Controls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div
				className={ classnames(
					className,
					{ 'has-label': ( attributes.className ? ! attributes.className.includes( 'is-style-icons' ) : true ) }
				) }
			>
				{ Object.keys( socialList ).map( ( item, i ) => {
					if ( true === attributes[item]) {
						return (
							<a className={ `social-icon is-${item}` }>
								<i className={ `fab fa-${ socialList[item].icon }` }></i>
								{ ( attributes.className ? ! attributes.className.includes( 'is-style-icons' ) : true ) && socialList[item].label }
							</a>
						);
					}
				}) }
			</div>
		</Fragment>
	);
};

export default Edit;
