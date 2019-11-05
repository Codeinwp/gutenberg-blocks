/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const {
	BaseControl,
	Button,
	Dropdown,
	IconButton,
	Toolbar
} = wp.components;

const { withInstanceId } = wp.compose;

const { BlockControls } = wp.blockEditor || wp.editor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const StyleSwitcherControl = ({ instanceId, label, value, options, onChange }) => {
	const id = `inspector-style-switcher-control-${ instanceId }`;
	const onChangeValue = value => onChange( value );

	return (
		<BaseControl
			id={ id }
			label={ label }
		>
			<div className="wp-block-themeisle-blocks-style-switcher">
				{ options.map( option => {
					return (
						<Button
							className={ classnames(
								'blocks-style-switcher-item',
								{ 'is-active': option.value === value }
							) }
							tabIndex="0"
							onClick={ () => onChangeValue( option.value ) }
						>
							<div className="blocks-style-switcher-item-preview">
								<img src={ option.image } />
							</div>
							<div className="blocks-style-switcher-item-label">
								{ option.label }
							</div>
						</Button>
					);
				}) }
			</div>
		</BaseControl>
	);
};

export const StyleSwitcherInspectorControl = withInstanceId( StyleSwitcherControl );

export const StyleSwitcherBlockControl = ({ label, value, options, onChange }) => {
	const onChangeValue = value => onChange( value );

	return (
		<BlockControls>
			<Toolbar
				className="wp-themesiel-blocks-block-styles-components-toolbar"
			>
				<Dropdown
					contentClassName="wp-themesiel-blocks-block-styles-popover-content"
					position="bottom center"
					renderToggle={ ({ isOpen, onToggle }) => (
						<IconButton
							className="components-dropdown-menu__toggle"
							icon={ 'admin-appearance' }
							onClick={ onToggle }
							aria-haspopup="true"
							aria-expanded={ isOpen }
							label={ label }
							tooltip={ label }
						>
							<span className="components-dropdown-menu__indicator" />
						</IconButton>
					) }
					renderContent={ () => (
						<Fragment>
							<div className="wp-block-themeisle-blocks-style-switcher">
								{ options.map( option => {
									return (
										<Button
											className={ classnames(
												'blocks-style-switcher-item',
												{ 'is-active': option.value === value }
											) }
											tabIndex="0"
											onClick={ () => onChangeValue( option.value ) }
										>
											<div className="blocks-style-switcher-item-preview">
												<img src={ option.image } />
											</div>
											<div className="blocks-style-switcher-item-label">
												{ option.label }
											</div>
										</Button>
									);
								}) }
							</div>
						</Fragment>
					) }
				/>
			</Toolbar>
		</BlockControls>
	);
};
