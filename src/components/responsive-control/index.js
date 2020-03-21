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
	Dashicon,
	Dropdown,
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

/**
 * Internal dependencies
 */
import './editor.scss';

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
							renderContent={ ({ onToggle }) => (
								<div className="wp-block-themeisle-blocks-responsive-control-settings">
									<div className="wp-block-themeisle-blocks-responsive-control-settings-title">
										{ __( 'Responsiveness Settings' ) }
									</div>

									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-responsive-control-settings-item',
											{ 'is-selected': 'Desktop' === view }
										) }
										onClick={ () => {
											onToggle();
											updateView( 'Desktop' );
										}}
									>
										<Dashicon icon="desktop" />
										<span className="popover-title">
											{ __( 'Desktop' ) }
										</span>
									</Button>

									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-responsive-control-settings-item',
											{ 'is-selected': 'Tablet' === view }
										) }
										onClick={ () => {
											onToggle();
											updateView( 'Tablet' );
										}}
									>
										<Dashicon icon="tablet" />
										<span className="popover-title">
											{ __( 'Tablet Devices' ) }
										</span>
									</Button>

									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-responsive-control-settings-item',
											{ 'is-selected': 'Mobile' === view }
										) }
										onClick={ () => {
											onToggle();
											updateView( 'Mobile' );
										}}
									>
										<Dashicon icon="smartphone" />
										<span className="popover-title">
											{ __( 'Smartphones' ) }
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

	withSelect( ( select ) => {
		const { getView } = select( 'themeisle-gutenberg/data' );
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return {
			view: __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : getView()
		};
	}),

	withDispatch( dispatch => {
		const { updateView } = dispatch( 'themeisle-gutenberg/data' );
		const { __experimentalSetPreviewDeviceType } = dispatch( 'core/edit-post' );

		return {
			updateView: __experimentalSetPreviewDeviceType ? __experimentalSetPreviewDeviceType : updateView
		};
	})
)( ResponsiveControl );
