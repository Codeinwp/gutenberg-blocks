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
	IconButton,
	Path,
	Rect,
	SVG,
	Tooltip
} = wp.components;

const { withInstanceId } = wp.compose;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const LayoutControl = ({
	label,
	instanceId,
	onClick,
	layout,
	layoutTablet,
	layoutMobile,
	columns,
	changeViewType,
	view
}) => {
	const id = `inspector-layout-control-${ instanceId }`;

	let value;

	if ( 'desktop' === view ) {
		value = layout;
	} else if ( 'tablet' === view ) {
		value = layoutTablet;
	} else if ( 'mobile' === view ) {
		value = layoutMobile;
	}

	return (
		<div id={ id } className="wp-block-themeisle-blocks-advanced-columns-layout-control">
			<div className="components-base-control__field">
				<div className="components-base-control__title">
					<label className="components-base-control__label">{ label }</label>
					<div className="linking-controls">
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
								<div className="wp-block-themeisle-blocks-responsive-control-settings">
									<div className="wp-block-themeisle-blocks-responsive-control-settings-title">
										{ __( 'Responsiveness Settings' ) }
									</div>

									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-responsive-control-settings-item',
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
											'wp-block-themeisle-blocks-responsive-control-settings-item',
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
											'wp-block-themeisle-blocks-responsive-control-settings-item',
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

				{ 1 === columns && (
					<Tooltip text={ __( 'Single Row' ) } >
						<Button
							className={ classnames(
								'wp-block-themeisle-blocks-advanced-column-layout',
								{ 'selected': 'equal' === value }
							) }
							onClick={ () => onClick( 'equal' ) }
						>
							<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
							</SVG>
						</Button>
					</Tooltip>
				) || 2 === columns && (
					<Fragment>
						<Tooltip text={ __( 'Equal' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'equal' === value }
								) }
								onClick={ () => onClick( 'equal' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="22.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						<Tooltip text={ __( '1:2' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'oneTwo' === value }
								) }
								onClick={ () => onClick( 'oneTwo' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="16.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						<Tooltip text={ __( '2:1' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'twoOne' === value }
								) }
								onClick={ () => onClick( 'twoOne' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="28.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						{ ( 'mobile' == view || 'tablet' == view ) && (
							<Tooltip text={ __( 'Collapsed Rows' ) } >
								<Button
									className={ classnames(
										'wp-block-themeisle-blocks-advanced-column-layout',
										{ 'selected': 'collapsedRows' === value }
									) }
									onClick={ () => onClick( 'collapsedRows' ) }
								>
									<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
										<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
										<Rect x="6" y="22.9" width="36" height="2.2"/>
									</SVG>
								</Button>
							</Tooltip>
						) }
					</Fragment>
				) || 3 === columns && (
					<Fragment>
						<Tooltip text={ __( 'Equal' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'equal' === value }
								) }
								onClick={ () => onClick( 'equal' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="28.9" y="13" width="2.2" height="22"/>
									<Rect x="16.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						<Tooltip text={ __( '1:1:2' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'oneOneTwo' === value }
								) }
								onClick={ () => onClick( 'oneOneTwo' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="22.9" y="13" width="2.2" height="22"/>
									<Rect x="12.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						<Tooltip text={ __( '2:1:1' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'twoOneOne' === value }
								) }
								onClick={ () => onClick( 'twoOneOne' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="22.9" y="13" width="2.2" height="22"/>
									<Rect x="32.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						<Tooltip text={ __( '1:2:1' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'oneTwoOne' === value }
								) }
								onClick={ () => onClick( 'oneTwoOne' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="13.9" y="13" width="2.2" height="22"/>
									<Rect x="31.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						<Tooltip text={ __( '1:3:1' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'oneThreeOne' === value }
								) }
								onClick={ () => onClick( 'oneThreeOne' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="11.9" y="13" width="2.2" height="22"/>
									<Rect x="33.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						{ ( 'mobile' == view || 'tablet' == view ) && (
							<Tooltip text={ __( 'Collapsed Rows' ) } >
								<Button
									className={ classnames(
										'wp-block-themeisle-blocks-advanced-column-layout',
										{ 'selected': 'collapsedRows' === value }
									) }
									onClick={ () => onClick( 'collapsedRows' ) }
								>
									<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
										<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
										<Rect x="6" y="22.9" width="36" height="2.2"/>
									</SVG>
								</Button>
							</Tooltip>
						) }
					</Fragment>
				) || 4 === columns && (
					<Fragment>
						<Tooltip text={ __( 'Equal' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'equal' === value }
								) }
								onClick={ () => onClick( 'equal' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="13.9" y="13" width="2.2" height="22"/>
									<Rect x="32.9" y="13" width="2.2" height="22"/>
									<Rect x="22.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						{ ( 'mobile' == view || 'tablet' == view ) && (
							<Fragment>
								<Tooltip text={ __( 'Two Column Grid' ) } >
									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-advanced-column-layout',
											{ 'selected': 'twoColumnGrid' === value }
										) }
										onClick={ () => onClick( 'twoColumnGrid' ) }
									>
										<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
											<Rect x="4" y="22.9" width="40" height="2.2"/>
											<Rect x="22.9" y="13" width="2.2" height="22"/>
										</SVG>
									</Button>
								</Tooltip>

								<Tooltip text={ __( 'Collapsed Rows' ) } >
									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-advanced-column-layout',
											{ 'selected': 'collapsedRows' === value }
										) }
										onClick={ () => onClick( 'collapsedRows' ) }
									>
										<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
											<Rect x="6" y="22.9" width="36" height="2.2"/>
										</SVG>
									</Button>
								</Tooltip>
							</Fragment>
						) }
					</Fragment>
				) || 5 === columns && (
					<Fragment>
						<Tooltip text={ __( 'Equal' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'equal' === value }
								) }
								onClick={ () => onClick( 'equal' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="10.9" y="13" width="2.2" height="22"/>
									<Rect x="34.9" y="13" width="2.2" height="22"/>
									<Rect x="26.9" y="13" width="2.2" height="22"/>
									<Rect x="18.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						{ ( 'mobile' == view || 'tablet' == view ) && (
							<Tooltip text={ __( 'Collapsed Rows' ) } >
								<Button
									className={ classnames(
										'wp-block-themeisle-blocks-advanced-column-layout',
										{ 'selected': 'collapsedRows' === value }
									) }
									onClick={ () => onClick( 'collapsedRows' ) }
								>
									<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
										<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
										<Rect x="6" y="22.9" width="36" height="2.2"/>
									</SVG>
								</Button>
							</Tooltip>
						) }
					</Fragment>
				) || 6 === columns && (
					<Fragment>
						<Tooltip text={ __( 'Equal' ) } >
							<Button
								className={ classnames(
									'wp-block-themeisle-blocks-advanced-column-layout',
									{ 'selected': 'equal' === value }
								) }
								onClick={ () => onClick( 'equal' ) }
							>
								<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
									<Rect x="10.4" y="13" width="2.2" height="22"/>
									<Rect x="35.9" y="13" width="2.2" height="22"/>
									<Rect x="29.4" y="13" width="2.2" height="22"/>
									<Rect x="16.4" y="13" width="2.2" height="22"/>
									<Rect x="22.9" y="13" width="2.2" height="22"/>
								</SVG>
							</Button>
						</Tooltip>

						{ ( 'mobile' == view || 'tablet' == view ) && (
							<Fragment>
								<Tooltip text={ __( 'Two Column Grid' ) } >
									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-advanced-column-layout',
											{ 'selected': 'twoColumnGrid' === value }
										) }
										onClick={ () => onClick( 'twoColumnGrid' ) }
									>
										<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
											<Rect x="4" y="18.9" width="40" height="2.2"/>
											<Rect x="22.9" y="13" width="2.2" height="22"/>
											<Rect x="4" y="26.9" width="40" height="2.2"/>
										</SVG>
									</Button>
								</Tooltip>

								<Tooltip text={ __( 'Three Column Grid' ) } >
									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-advanced-column-layout',
											{ 'selected': 'threeColumnGrid' === value }
										) }
										onClick={ () => onClick( 'threeColumnGrid' ) }
									>
										<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
											<Rect x="4" y="22.9" width="40" height="2.2"/>
											<Rect x="28.9" y="13" width="2.2" height="22"/>
											<Rect x="16.9" y="13" width="2.2" height="22"/>
										</SVG>
									</Button>
								</Tooltip>

								<Tooltip text={ __( 'Collapsed Rows' ) } >
									<Button
										className={ classnames(
											'wp-block-themeisle-blocks-advanced-column-layout',
											{ 'selected': 'collapsedRows' === value }
										) }
										onClick={ () => onClick( 'collapsedRows' ) }
									>
										<SVG viewBox="0 0 48 48" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M41.8,13.2V34.8H6.2V13.2H41.8M42,11H6a2,2,0,0,0-2,2V35a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V13a2,2,0,0,0-2-2Z"/>
											<Rect x="6" y="22.9" width="36" height="2.2"/>
										</SVG>
									</Button>
								</Tooltip>
							</Fragment>
						) }
					</Fragment>
				) }
			</div>
		</div>
	);
};

export default withInstanceId( LayoutControl );
