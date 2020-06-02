/**
 * WordPress dependencies
 */
const {
	Button,
	Dropdown
} = wp.components;

const { useInstanceId } = wp.compose;

/**
 * Internal dependencies
 */
import './editor.scss';

const ControlPanelControl = ({
	label,
	children
}) => {
	const instanceId = useInstanceId( ControlPanelControl );

	const id = `inspector-control-panel-control-${ instanceId }`;

	return (
		<div className="wp-block-themeisle-blocks-control-panel-control">
			<div className="components-base-control__field">
				<div className="components-base-control__title">
					<label
						className="components-base-control__label"
						for={ id }
					>
						{ label }
					</label>

					<div className="floating-controls">
						<Dropdown
							position="top left"
							headerTitle={ label }
							expandOnMobile={ true }
							renderToggle={ ({ isOpen, onToggle }) => (
								<Button
									id={ id }
									icon="admin-settings"
									label={ label }
									shotTooltip={ true }
									className="is-button"
									onClick={ onToggle }
									aria-expanded={ isOpen }
								/>
							) }
							renderContent={ () => (
								<div className="wp-block-themeisle-popover-settings">
									{ children }
								</div>
							) }
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ControlPanelControl;
