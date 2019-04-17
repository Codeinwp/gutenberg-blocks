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

const { withInstanceId } = wp.compose;

/**
 * Internal dependencies
 */
import './editor.scss';

const ResponsiveControl = ({ label, instanceId, changeViewType, view, children }) => {
	const id = `inspector-responsive-control-${ instanceId }`;

	return (
		<div id={ id } className="wp-block-themeisle-blocks-responsive-control">
			<div className="components-base-control__field">
				<div className="components-base-control__title">
					<label className="components-base-control__label">{ label }</label>
					<div className="floating-controls">
						<Dropdown
							position="top left"
							renderToggle={ ({ isOpen, onToggle }) => (
								<IconButton
									icon={ 'mobile' === view ? 'smartphone' : view }
									label={ __( 'Responsiveness Settings' ) }
									className="is-button"
									onClick={ onToggle }
									aria-expanded={ isOpen }
								/>
							) }
							renderContent={ ({ onToggle }) => (
								<div className="wp-block-themeisle-responsiveness-settings">
									<div className="responsiveness-title">
										{ __( 'Responsiveness Settings' ) }
									</div>

									<Button
										className={ classnames(
											'responsiveness-item',
											{ 'is-selected': 'desktop' === view }
										) }
										onClick={ () => {
											onToggle();
											changeViewType( 'desktop' );
										}}
									>
										<Dashicon icon="desktop" />
										<span className="popover-title">
											{ __( 'Desktop' ) }
										</span>
									</Button>

									<Button
										className={ classnames(
											'responsiveness-item',
											{ 'is-selected': 'tablet' === view }
										) }
										onClick={ () => {
											onToggle();
											changeViewType( 'tablet' );
										}}
									>
										<Dashicon icon="tablet" />
										<span className="popover-title">
											{ __( 'Tablet Devices' ) }
										</span>
									</Button>

									<Button
										className={ classnames(
											'responsiveness-item',
											{ 'is-selected': 'mobile' === view }
										) }
										onClick={ () => {
											onToggle();
											changeViewType( 'mobile' );
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

export default withInstanceId( ResponsiveControl );
