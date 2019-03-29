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
	SVG,
	Tooltip
} = wp.components;

const { withInstanceId } = wp.compose;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';

const LayoutControl = ({ label, instanceId, onClick, layout, layoutTablet, layoutMobile, columns, changeViewType, view }) => {
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

				{ 1 === columns && (
					<Tooltip text={ __( 'Single Row' ) } >
						<Button
							className={ classnames(
								'wp-block-themeisle-blocks-advanced-column-layout',
								{ 'selected': 'equal' === value }
							) }
							onClick={ () => onClick( 'equal' ) }
						>
							<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
								<Path d="M100,0V50H0V0Z"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M49,0V50H0V0Z M100,0V50H51V0Z"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M32.6667,0V50H0V0Z M100,0V50H34.6667V0Z"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M65.3333,0V50H0V0Z M100,0V50H67.3333V0Z"></Path>
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
									<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
										<Path d="M 0 0 L 100 0 L 100 24 L 0 24 L 0 0"></Path>
										<Path d="M 0 26 L 100 26 L 100 50 L 0 50 L 0 26"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M32,0V50H0V0Z M66,0V50H34V0Z M100,0V50H68V0Z"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M24,0V50H0V0Z M50,0V50H26V0Z M100,0V50H52V0Z"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M48,0V50H0V0Z M74,0V50H50V0Z M100,0V50H76V0Z"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M24,0V50H0V0Z M74,0V50H26V0Z M100,0V50H76V0Z"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M20,0V50H0V0Z M78,0V50H22V0Z M100,0V50H80V0Z"></Path>
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
									<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
										<Path d="M 0 0 L 100 0 L 100 24 L 0 24 L 0 0"></Path>
										<Path d="M 0 26 L 100 26 L 100 50 L 0 50 L 0 26"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M23.5,0V50H0V0Z M49,0V50H25.5V0Z M74.5,0V50H51V0Z M100,0V50H76.5V0Z"></Path>
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
										<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M 0 0 L 50 0 L 50 24 L 0 24 L 0 0"></Path>
											<Path d="M 51 0 L 100 0 L 100 24 L 51 24 L 51 0"></Path>
											<Path d="M 0 26 L 50 26 L 50 50 L 0 50 L 0 26"></Path>
											<Path d="M 51 26 L 100 26 L 100 60 L 51 60 L 51 26"></Path>
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
										<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M 0 0 L 100 0 L 100 24 L 0 24 L 0 0"></Path>
											<Path d="M 0 26 L 100 26 L 100 50 L 0 50 L 0 26"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M18.4,0V50H0V0Z M38.8,0V50H20.4V0Z M59.2,0V50H40.8V0Z M79.6,0V50H61.2V0Z M100,0V50H81.6V0Z"></Path>
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
									<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
										<Path d="M 0 0 L 100 0 L 100 24 L 0 24 L 0 0"></Path>
										<Path d="M 0 26 L 100 26 L 100 50 L 0 50 L 0 26"></Path>
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
								<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
									<Path d="M15,0V50H0V0Z M32,0V50H17V0Z M49,0V50H34V0Z M66,0V50H51V0Z M83,0V50H68V0Z M100,0V50H85V0Z"></Path>
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
										<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M 0 0 L 50 0 L 50 16 L 0 16 L 0 0"></Path>
											<Path d="M 51 0 L 100 0 L 100 16 L 51 16 L 51 0"></Path>
											<Path d="M 0 17 L 50 17 L 50 33 L 0 33 L 0 17"></Path>
											<Path d="M 51 17 L 100 17 L 100 33 L 51 33 L 51 17"></Path>
											<Path d="M 0 34 L 50 34 L 50 50 L 0 50 L 0 34"></Path>
											<Path d="M 51 34 L 100 34 L 100 50 L 51 50 L 51 34"></Path>
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
										<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M 0 0 L 33 0 L 33 24 L 0 24 L 0 0"></Path>
											<Path d="M 34 0 L 66 0 L 66 24 L 34 24 L 34 0"></Path>
											<Path d="M 67 0 L 100 0 L 100 24 L 67 24 L 67 0"></Path>
											<Path d="M 0 26 L 33 26 L 33 50 L 0 50 L 0 26"></Path>
											<Path d="M 34 26 L 66 26 L 66 60 L 34 60 L 34 26"></Path>
											<Path d="M 67 26 L 100 26 L 100 60 L 67 60 L 67 26"></Path>
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
										<SVG viewBox="0 0 100 50" xmlns="http://www.w3.org/1999/xlink">
											<Path d="M 0 0 L 100 0 L 100 24 L 0 24 L 0 0"></Path>
											<Path d="M 0 26 L 100 26 L 100 50 L 0 50 L 0 26"></Path>
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
