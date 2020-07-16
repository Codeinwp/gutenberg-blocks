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
	Toolbar
} = wp.components;

const { useInstanceId } = wp.compose;

const { BlockControls } = wp.blockEditor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const StyleSwitcherControl = ({
	label,
	value,
	options,
	onChange
}) => {
	const instanceId = useInstanceId( StyleSwitcherControl );

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
								'wp-block-themeisle-blocks-style-switcher-item',
								{ 'is-active': option.value === value }
							) }
							tabIndex="0"
							onClick={ () => onChangeValue( option.value ) }
						>
							<div className="wp-block-themeisle-blocks-style-switcher-item-preview">
								<img src={ option.image } />
							</div>
							<div className="wp-block-themeisle-blocks-style-switcher-item-label">
								{ option.label }
							</div>
						</Button>
					);
				}) }
			</div>
		</BaseControl>
	);
};

export const StyleSwitcherInspectorControl = StyleSwitcherControl;

export const StyleSwitcherBlockControl = ({
	label,
	value,
	options,
	onChange
}) => {
	const onChangeValue = value => onChange( value );

	return (
		<BlockControls>
			<Toolbar>
				<Dropdown
					contentClassName="wp-themesiel-blocks-block-styles-popover-content"
					position="bottom center"
					renderToggle={ ({ isOpen, onToggle }) => (
						<Button
							className="components-dropdown-menu__toggle"
							icon={ 'admin-appearance' }
							onClick={ onToggle }
							aria-haspopup="true"
							aria-expanded={ isOpen }
							label={ label }
							showTooltip={ true }
						>
							<span className="components-dropdown-menu__indicator" />
						</Button>
					) }
					renderContent={ () => (
						<Fragment>
							<div className="wp-block-themeisle-blocks-style-switcher">
								{ options.map( option => {
									return (
										<Button
											className={ classnames(
												'wp-block-themeisle-blocks-style-switcher-item',
												{ 'is-active': option.value === value }
											) }
											tabIndex="0"
											onClick={ () => onChangeValue( option.value ) }
										>
											<div className="wp-block-themeisle-blocks-style-switcher-item-preview">
												<img src={ option.image } />
											</div>
											<div className="wp-block-themeisle-blocks-style-switcher-item-label">
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
