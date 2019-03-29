/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { BaseControl } = wp.components;

const { withInstanceId } = wp.compose;

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
						<div
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
						</div>
					);
				}) }
			</div>
		</BaseControl>
	);
};

export default withInstanceId( StyleSwitcherControl );
