/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { times } = lodash;

const {
	BaseControl,
	Button,
	ButtonGroup,
	Dashicon,
	Dropdown,
	MenuGroup,
	MenuItem,
	Icon,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	ToggleControl
} = wp.components;

const {
	ColorPalette,
	InspectorControls
} = wp.blockEditor;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import { buttonsIcon } from '../../helpers/icons.js';
import { unescapeHTML } from '../../helpers/helper-functions.js';
import ColorBaseControl from '../../components/color-base-control/index.js';
import GoogleFontsControl from '../../components/google-fonts-control/index.js';
import ControlPanelControl from '../../components/control-panel-control/index.js';
const IconPickerControl = React.lazy( () => import( '../../components/icon-picker-control/index.js' ) );
import LinkControl from '../../components/link-control/index.js';
import SizingControl from '../../components/sizing-control/index.js';

const Inspector = ({
	attributes,
	setAttributes,
	selectedButton,
	wait,
	changeButtons,
	changeButton,
	updateButton,
	changeFontSize,
	changeFontFamily,
	changeFontVariant,
	changeFontStyle,
	changeTextTransform,
	changeLineHeight
}) => {
	const [ tab, setTab ] = useState( 'buttons' );
	const [ hover, setHover ] = useState( false );

	const changePadding = ( type, value, index ) => {
		if ( 'top' === type || 'bottom' === type ) {
			updateButton({ paddingTopBottom: value }, index );
		}

		if ( 'left' === type || 'right' === type ) {
			updateButton({ paddingLeftRight: value }, index );
		}
	};

	const changeSpacing = value => {
		setAttributes({ spacing: value });
	};

	const changeCollapse = value => {
		setAttributes({ collapse: value });
	};

	return (
		<InspectorControls>
			<PanelBody className="wp-block-themeisle-blocks-button-group-header-panel">
				<Button
					className={ classnames(
						'header-tab',
						{ 'is-selected': 'buttons' === tab }
					) }
					onClick={ () => setTab( 'buttons' ) }
				>
					<span>
						<Icon
							icon={ buttonsIcon }
						/>
						{ __( 'Buttons' ) }
					</span>
				</Button>

				<Button
					className={ classnames(
						'header-tab',
						{ 'is-selected': 'group' === tab }
					) }
					onClick={ () => setTab( 'group' ) }
				>
					<span>
						<Dashicon icon="admin-generic"/>
						{ __( 'Group Settings' ) }
					</span>
				</Button>
			</PanelBody>

			{ 'buttons' === tab && (

				<Fragment>
					<PanelBody
						opened={ true }
					>
						<RangeControl
							label={ __( 'Number of Buttons' ) }
							value={ attributes.buttons }
							onChange={ changeButtons }
							min={ 1 }
							max={ 5 }
						/>

						<BaseControl
							label={ __( 'Edit Button' ) }
							className="wp-block-themeisle-blocks-select-button-container"
						>
							<Dropdown
								contentClassName="wp-block-themeisle-blocks-select-button-popover"
								position="bottom center"
								renderToggle={ ({ isOpen, onToggle }) => (
									<Button
										isLarge
										className="wp-block-themeisle-blocks-select-button-button"
										onClick={ onToggle }
										aria-expanded={ isOpen }
									>
										{ __( 'Button' ) + ' ' + ( selectedButton + 1 ) + ': ' + unescapeHTML( attributes.data[selectedButton].text ) }
									</Button>
								) }
								renderContent={ ({ onToggle }) => (
									<MenuGroup>
										{ times( attributes.buttons, n => {
											return (
												<MenuItem
													onClick={ () => {
														changeButton( n );
														onToggle();
													}}
												>
													{ __( 'Button' ) + ' ' + ( n + 1 ) + ': ' + unescapeHTML( attributes.data[n].text ) }
												</MenuItem>
											);
										}) }
									</MenuGroup>
								) }
							/>
						</BaseControl>
					</PanelBody>

					{ wait ?
						<Placeholder className="wp-themeisle-block-spinner">
							<Spinner/>
						</Placeholder> :
						<Fragment>
							<PanelBody
								title={ __( 'Link' ) }
							>
								<LinkControl
									label={ 'Link' }
									placeholder={ __( 'https://…' ) }
									value={ attributes.data[selectedButton].link }
									onChange={ e => updateButton({ link: e }, selectedButton ) }
								>
									<ToggleControl
										label={ 'Open in New Tab?' }
										checked={ attributes.data[selectedButton].newTab }
										onChange={ () => updateButton({ newTab: ! attributes.data[selectedButton].newTab }, selectedButton ) }
									/>
								</LinkControl>
							</PanelBody>

							<PanelBody
								title={ __( 'Color & Border' ) }
								initialOpen={ false }
							>
								<ButtonGroup>
									<Button
										isSmall
										isSecondary={ hover }
										isPrimary={ ! hover }
										onClick={ () => setHover( false ) }
									>
										{ __( 'Normal' ) }
									</Button>
									<Button
										isSmall
										isSecondary={ ! hover }
										isPrimary={ hover }
										onClick={ () => setHover( true ) }
									>
										{ __( 'Hover' ) }
									</Button>
								</ButtonGroup>

								{ hover ? (
									<Fragment>
										<ColorBaseControl
											label={ 'Hover Color' }
											colorValue={ attributes.data[selectedButton].hoverColor }
										>
											<ColorPalette
												label={ 'Hover Color' }
												value={ attributes.data[selectedButton].hoverColor }
												onChange={ e => updateButton({ hoverColor: e }, selectedButton ) }
											/>
										</ColorBaseControl>

										<ColorBaseControl
											label={ 'Hover Background' }
											colorValue={ attributes.data[selectedButton].hoverBackground }
										>
											<ColorPalette
												label={ 'Hover Background' }
												value={ attributes.data[selectedButton].hoverBackground }
												onChange={ e => updateButton({ hoverBackground: e }, selectedButton ) }
											/>
										</ColorBaseControl>

										<ColorBaseControl
											label={ 'Hover Border' }
											colorValue={ attributes.data[selectedButton].hoverBorder }
										>
											<ColorPalette
												label={ 'Hover Border' }
												value={ attributes.data[selectedButton].hoverBorder }
												onChange={ e => updateButton({ hoverBorder: e }, selectedButton ) }
											/>
										</ColorBaseControl>
									</Fragment>
								) : (
									<Fragment>
										<ColorBaseControl
											label={ 'Color' }
											colorValue={ attributes.data[selectedButton].color }
										>
											<ColorPalette
												label={ 'Color' }
												value={ attributes.data[selectedButton].color }
												onChange={ e => updateButton({ color: e }, selectedButton ) }
											/>
										</ColorBaseControl>

										<ColorBaseControl
											label={ 'Background' }
											colorValue={ attributes.data[selectedButton].background }
										>
											<ColorPalette
												label={ 'Background' }
												value={ attributes.data[selectedButton].background }
												onChange={ e => updateButton({ background: e }, selectedButton ) }
											/>
										</ColorBaseControl>

										<ColorBaseControl
											label={ 'Border' }
											colorValue={ attributes.data[selectedButton].border }
										>
											<ColorPalette
												label={ 'Border' }
												value={ attributes.data[selectedButton].border }
												onChange={ e => updateButton({ border: e }, selectedButton ) }
											/>
										</ColorBaseControl>
									</Fragment>
								) }

								<RangeControl
									label={ __( 'Border Width' ) }
									className="border-width"
									value={ attributes.data[selectedButton].borderSize }
									onChange={ e => updateButton({ borderSize: e }, selectedButton ) }
									min={ 0 }
									max={ 10 }
								/>

								<RangeControl
									label={ __( 'Border Radius' ) }
									value={ attributes.data[selectedButton].borderRadius }
									onChange={ e => updateButton({ borderRadius: e }, selectedButton ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>

							<PanelBody
								title={ __( 'Box Shadow' ) }
								initialOpen={ false }
							>
								<ToggleControl
									label={ 'Box Shadow' }
									checked={ attributes.data[selectedButton].boxShadow }
									onChange={ () => updateButton({ boxShadow: ! attributes.data[selectedButton].boxShadow }, selectedButton ) }
								/>

								{ attributes.data[selectedButton].boxShadow && (
									<Fragment>
										<ButtonGroup>
											<Button
												isSmall
												isSecondary={ hover }
												isPrimary={ ! hover }
												onClick={ () => setHover( false ) }
											>
												{ __( 'Normal' ) }
											</Button>
											<Button
												isSmall
												isSecondary={ ! hover }
												isPrimary={ hover }
												onClick={ () => setHover( true ) }
											>
												{ __( 'Hover' ) }
											</Button>
										</ButtonGroup>

										{ ! hover && (
											<Fragment>
												<ColorBaseControl
													label={ 'Shadow Color' }
													colorValue={ attributes.data[selectedButton].boxShadowColor }
												>
													<ColorPalette
														label={ 'Shadow Color' }
														value={ attributes.data[selectedButton].boxShadowColor }
														onChange={ e => updateButton({ boxShadowColor: e }, selectedButton ) }
													/>
												</ColorBaseControl>

												<ControlPanelControl
													label={ 'Shadow Properties' }
												>

													<RangeControl
														label={ __( 'Opacity' ) }
														value={ attributes.data[selectedButton].boxShadowColorOpacity }
														onChange={ e => updateButton({ boxShadowColorOpacity: e }, selectedButton ) }
														min={ 0 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Blur' ) }
														value={ attributes.data[selectedButton].boxShadowBlur }
														onChange={ e => updateButton({ boxShadowBlur: e }, selectedButton ) }
														min={ 0 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Spread' ) }
														value={ attributes.data[selectedButton].boxShadowSpread }
														onChange={ e => updateButton({ boxShadowSpread: e }, selectedButton ) }
														min={ -100 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Horizontal' ) }
														value={ attributes.data[selectedButton].boxShadowHorizontal }
														onChange={ e => updateButton({ boxShadowHorizontal: e }, selectedButton ) }
														min={ -100 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Vertical' ) }
														value={ attributes.data[selectedButton].boxShadowVertical }
														onChange={ e => updateButton({ boxShadowVertical: e }, selectedButton ) }
														min={ -100 }
														max={ 100 }
													/>

												</ControlPanelControl>
											</Fragment>
										) || hover && (
											<Fragment>
												<ColorBaseControl
													label={ 'Hover Shadow Color' }
													colorValue={ attributes.data[selectedButton].hoverBoxShadowColor }
												>
													<ColorPalette
														label={ 'Hover Shadow Color' }
														value={ attributes.data[selectedButton].hoverBoxShadowColor }
														onChange={ e => updateButton({ hoverBoxShadowColor: e }, selectedButton ) }
													/>
												</ColorBaseControl>


												<ControlPanelControl
													label={ 'Hover Shadow Properties' }
												>

													<RangeControl
														label={ __( 'Opacity' ) }
														value={ attributes.data[selectedButton].hoverBoxShadowColorOpacity }
														onChange={ e => updateButton({ hoverBoxShadowColorOpacity: e }, selectedButton ) }
														min={ 0 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Blur' ) }
														value={ attributes.data[selectedButton].hoverBoxShadowBlur }
														onChange={ e => updateButton({ hoverBoxShadowBlur: e }, selectedButton ) }
														min={ 0 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Spread' ) }
														value={ attributes.data[selectedButton].hoverBoxShadowSpread }
														onChange={ e => updateButton({ hoverBoxShadowSpread: e }, selectedButton ) }
														min={ -100 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Horizontal' ) }
														value={ attributes.data[selectedButton].hoverBoxShadowHorizontal }
														onChange={ e => updateButton({ hoverBoxShadowHorizontal: e }, selectedButton ) }
														min={ -100 }
														max={ 100 }
													/>

													<RangeControl
														label={ __( 'Vertical' ) }
														value={ attributes.data[selectedButton].hoverBoxShadowVertical }
														onChange={ e => updateButton({ hoverBoxShadowVertical: e }, selectedButton ) }
														min={ -100 }
														max={ 100 }
													/>

												</ControlPanelControl>
											</Fragment>
										) }
									</Fragment>
								) }
							</PanelBody>

							<PanelBody
								title={ __( 'Icon Settings' ) }
								initialOpen={ false }
							>
								<SelectControl
									label={ __( 'Icon Position' ) }
									value={ attributes.data[selectedButton].iconType }
									options={ [
										{ label: 'No Icon', value: 'none' },
										{ label: 'Left', value: 'left' },
										{ label: 'Right', value: 'right' },
										{ label: 'Icon Only', value: 'only' }
									] }
									onChange={ e => updateButton({ iconType: e }, selectedButton ) }
								/>

								{ 'none' !== attributes.data[selectedButton].iconType && (
									<Fragment>
										<React.Suspense fallback={<Placeholder className="wp-themeisle-block-spinner"><Spinner/></Placeholder>}>
											<IconPickerControl
												label={ __( 'Icon Picker' ) }
												prefix={ attributes.data[selectedButton].prefix }
												icon={ attributes.data[selectedButton].icon }
												onChange={ e => {
													if ( 'object' === typeof e ) {
														updateButton({
															icon: e.name,
															prefix: e.prefix
														}, selectedButton );
													} else {
														updateButton({ icon: e }, selectedButton );
													}
												}}
											/>
										</React.Suspense>
									</Fragment>
								) }
							</PanelBody>

							<PanelBody
								title={ __( 'Spacing' ) }
								initialOpen={ false }
							>
								<SizingControl
									label={ __( 'Padding' ) }
									min={ 0 }
									max={ 100 }
									onChange={ ( type, value ) => changePadding( type, value, selectedButton ) }
									options={ [
										{
											label: __( 'Top' ),
											type: 'top',
											value: attributes.data[selectedButton].paddingTopBottom
										},
										{
											label: __( 'Right' ),
											type: 'right',
											value: attributes.data[selectedButton].paddingLeftRight
										},
										{
											label: __( 'Bottom' ),
											type: 'bottom',
											value: attributes.data[selectedButton].paddingTopBottom
										},
										{
											label: __( 'Left' ),
											type: 'left',
											value: attributes.data[selectedButton].paddingLeftRight
										}
									] }
								/>
							</PanelBody>
						</Fragment>
					}
				</Fragment>

			) || 'group' === tab && (
				<Fragment>
					<PanelBody
						title={ __( 'Spacing' ) }
					>
						<RangeControl
							label={ __( 'Spacing' ) }
							value={ attributes.spacing }
							onChange={ changeSpacing }
							min={ 0 }
							max={ 50 }
						/>

						<SelectControl
							label={ __( 'Collapse On' ) }
							value={ attributes.collapse }
							options={ [
								{ label: 'None', value: 'collapse-none' },
								{ label: 'Desktop', value: 'collapse-desktop' },
								{ label: 'Tablet', value: 'collapse-tablet' },
								{ label: 'Mobile', value: 'collapse-mobile' }
							] }
							onChange={ changeCollapse }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Typography Settings' ) }
						initialOpen={ false }
					>
						<RangeControl
							label={ __( 'Font Size' ) }
							value={ attributes.fontSize }
							onChange={ changeFontSize }
							min={ 0 }
							max={ 50 }
						/>

						<GoogleFontsControl
							label={ __( 'Font Family' ) }
							value={ attributes.fontFamily }
							onChangeFontFamily={ changeFontFamily }
							valueVariant={ attributes.fontVariant }
							onChangeFontVariant={ changeFontVariant }
							valueStyle={ attributes.fontStyle }
							onChangeFontStyle={ changeFontStyle }
							valueTransform={ attributes.textTransform }
							onChangeTextTransform={ changeTextTransform }
						/>

						<RangeControl
							label={ __( 'Line Height' ) }
							value={ attributes.lineHeight }
							onChange={ changeLineHeight }
							min={ 0 }
							max={ 200 }
						/>
					</PanelBody>
				</Fragment>
			) }
		</InspectorControls>
	);
};

export default Inspector;
