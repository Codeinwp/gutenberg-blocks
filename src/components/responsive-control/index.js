/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Button,
	Dropdown,
	Icon,
	IconButton
} = wp.components;

const {
	compose,
	withInstanceId
} = wp.compose;

const {
	withSelect,
	withDispatch
} = wp.data;

const { withViewportMatch } = wp.viewport;

/**
 * Internal dependencies
 */
import './editor.scss';

import { checkIcon } from '../../helpers/icons.js';

const ResponsiveControl = ({
	instanceId,
	label,
	className,
	children,
	view,
	updateView
}) => {
	const id = `inspector-responsive-control-${ instanceId }`;

	return (
		<div
			id={ id }
			className={ classnames(
				'wp-block-themeisle-blocks-responsive-control',
				className
			) }
		>
			<div className="components-base-control__field">
				<div className="components-base-control__title">
					<label className="components-base-control__label">{ label }</label>
					<div className="floating-controls">
						<Dropdown
							position="top left"
							renderToggle={ ({ isOpen, onToggle }) => (
								<IconButton
									icon={ 'Mobile' === view ? 'smartphone' : view.toLowerCase() }
									label={ __( 'Responsiveness Settings' ) }
									className="is-button"
									onClick={ onToggle }
									aria-expanded={ isOpen }
								/>
							) }
							renderContent={ () => (
								<div className="wp-block-themeisle-blocks-responsive-control-settings">
									<div className="wp-block-themeisle-blocks-responsive-control-settings-title">
										{ __( 'View' ) }
									</div>

									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-responsive-control-settings-item',
											{ 'is-selected': 'Desktop' === view }
										) }
										onClick={ () => updateView( 'Desktop' ) }
									>
										{ 'Desktop' === view && <Icon icon={ checkIcon } /> }
										<span className="popover-title">
											{ __( 'Desktop' ) }
										</span>
									</Button>

									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-responsive-control-settings-item',
											{ 'is-selected': 'Tablet' === view }
										) }
										onClick={ () => updateView( 'Tablet' ) }
									>
										{ 'Tablet' === view && <Icon icon={ checkIcon } /> }
										<span className="popover-title">
											{ __( 'Tablet' ) }
										</span>
									</Button>

									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-responsive-control-settings-item',
											{ 'is-selected': 'Mobile' === view }
										) }
										onClick={ () => updateView( 'Mobile' ) }
									>
										{ 'Mobile' === view && <Icon icon={ checkIcon } /> }
										<span className="popover-title">
											{ __( 'Mobile' ) }
										</span>
									</Button>
								</div>
							) }
						/>
					</div>
				</div>
				{ children }
			</div>
		</div>
	);
};

export default compose(
	withInstanceId,

	withViewportMatch({
		isLarger: '>= large',
		isLarge: '<= large',
		isSmall: '>= small',
		isSmaller: '<= small'
	}),

	withSelect( ( select, props ) => {
		const { getView } = select( 'themeisle-gutenberg/data' );
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );
		const isMobile = ! props.isLarger && ! props.isLarge && ! props.isSmall && ! props.isSmaller;

		return {
			view: __experimentalGetPreviewDeviceType && ! isMobile ? __experimentalGetPreviewDeviceType() : getView()
		};
	}),

	withDispatch( ( dispatch, props ) => {
		const { updateView } = dispatch( 'themeisle-gutenberg/data' );
		const { __experimentalSetPreviewDeviceType } = dispatch( 'core/edit-post' );
		const isMobile = ! props.isLarger && ! props.isLarge && ! props.isSmall && ! props.isSmaller;

		return {
			updateView: __experimentalSetPreviewDeviceType && ! isMobile ? __experimentalSetPreviewDeviceType : updateView
		};
	})
)( ResponsiveControl );
