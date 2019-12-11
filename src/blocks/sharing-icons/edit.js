/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { BlockControls } = wp.blockEditor;

const {
	Toolbar,
	Button,
	Tooltip
} = wp.components;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import socialList from './services.js';
import SocialIcons from './icons.js';

const Edit = ({ attributes, setAttributes, className }) => {
	const toggleIcons = ( item ) => {
		setAttributes({ [ item ]: ! attributes[item] });
	};

	return (
		<Fragment>
			<BlockControls key="toolbar-controls">
				<Toolbar className="components-toolbar">
					{ Object.keys( socialList ).map( ( item, i ) => {
						let prop = attributes[item];

						return (
							<Tooltip text={ __( `Display ${ socialList[item].label }` )	}>
								<Button
									className={ classnames(
										'components-icon-button',
										'components-toolbar__control',
										{ 'is-active': prop }
									) }
									onClick={ ( e ) => toggleIcons( item ) }
								>
									<SocialIcons icon={ item }/>
								</Button>
							</Tooltip>
						);
					}) }
				</Toolbar>
			</BlockControls>

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
