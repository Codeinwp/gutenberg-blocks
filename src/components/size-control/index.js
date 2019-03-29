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
	ButtonGroup,
	Dashicon,
	Dropdown,
	IconButton,
	RangeControl
} = wp.components;

const { withInstanceId } = wp.compose;

/**
 * Internal dependencies
 */
import './editor.scss';

const SizeControl = ({ label, instanceId, minus, responsive, changeViewType, changeType, changeValue, view, sizeType, typeDesktop, typeTablet, typeMobile, sizeValue, valueDesktop, valueTablet, valueMobile, children }) => {
	const id = `inspector-size-control-${ instanceId }`;
	let value, type;

	if ( responsive ) {
		if ( 'desktop' === view ) {
			value = valueDesktop;
			type = typeDesktop;
		} else if ( 'tablet' === view ) {
			value = valueTablet;
			type = typeTablet;
		} else if ( 'mobile' === view ) {
			value = valueMobile;
			type = typeMobile;
		}
	} else {
		value = sizeValue;
		type = sizeType;
	}

	return (
		<div id={ id } className="wp-block-themeisle-blocks-size-control">
			<div className="components-base-control__field">
				<div className="components-base-control__title">
					<label className="components-base-control__label">{ label }</label>
					{ responsive ? (
						<ButtonGroup className="linking-controls">
							<IconButton
								icon={ 'linked' === type ? 'admin-links' : 'editor-unlink' }
								label={ __( 'Link values together' ) }
								className={ classnames(
									'is-button',
									{ 'is-primary': 'linked' === type }
								) }
								onClick={ () => {
									changeType( 'linked' === type ? 'unlinked' : 'linked' );
								}}
							/>
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
						</ButtonGroup>
					) : (
						<div className="linking-controls">
							<IconButton
								icon={ 'linked' === type ? 'admin-links' : 'editor-unlink' }
								label={ __( 'Link values together' ) }
								className={ classnames(
									'is-button',
									{ 'is-primary': 'linked' === type }
								) }
								onClick={ () => {
									changeType( 'linked' === type ? 'unlinked' : 'linked' );
								}}
							/>
						</div>
					) }
				</div>

				{ 'linked' === type ? (
					<RangeControl
						beforeIcon="move"
						className="linked"
						value={ value }
						onChange={ changeValue }
						min={ minus ? -500 : 0 }
						max={ 500 }
					/>
				) :
					children
				}
			</div>
		</div>
	);
};

export default withInstanceId( SizeControl );
