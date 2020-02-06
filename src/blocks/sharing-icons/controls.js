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

/**
 * Internal dependencies
 */
import socialList from './services.js';
import SocialIcons from './icons.js';

const Controls = ({ attributes, setAttributes }) => {
	const toggleIcons = ( item ) => {
		setAttributes({ [ item ]: ! attributes[item] });
	};

	return (
		<BlockControls>
			<Toolbar>
				{ Object.keys( socialList ).map( ( item ) => {
					let prop = attributes[item];

					return (
						<Tooltip text={ __( `Display ${ socialList[item].label }` )	}>
							<Button
								className={ classnames(
									'components-icon-button',
									'components-toolbar__control',
									{ 'is-active': prop }
								) }
								onClick={ () => toggleIcons( item ) }
							>
								<SocialIcons icon={ item }/>
							</Button>
						</Tooltip>
					);
				}) }
			</Toolbar>
		</BlockControls>
	);
};

export default Controls;
