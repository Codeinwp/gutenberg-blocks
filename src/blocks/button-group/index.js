/**
 * External dependencies
 */
import classnames from 'classnames';
import hexToRgba from 'hex-rgba';
import GoogleFontLoader from 'react-google-font-loader';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { times } = lodash;

const { registerBlockType } = wp.blocks;

const {
	BaseControl,
	Button,
	ButtonGroup,
	Dashicon,
	Dropdown,
	MenuGroup,
	MenuItem,
	Icon,
	IconButton,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	ToggleControl,
	Toolbar
} = wp.components;

const {
	compose,
	withState
} = wp.compose;

const { withSelect } = wp.data;

const {
	AlignmentToolbar,
	BlockControls,
	ColorPalette,
	InspectorControls,
	RichText
} = wp.editor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

import { buttonsIcon } from '../../helpers/icons.js';

import { unescapeHTML } from '../../helpers/helper-functions.js';

import GoogleFontsControl from '../../components/google-fonts-control/index.js';

import ControlPanelControl from '../../components/control-panel-control/index.js';

import IconPickerControl from '../../components/icon-picker-control/index.js';

import LinkControl from '../../components/link-control/index.js';

import SizingControl from '../../components/sizing-control/index.js';

import deprecated from './deprecated.js';

registerBlockType( 'themeisle-blocks/button-group', {
	title: __( 'Button Group' ),
	description: __( 'Prompt visitors to take action with a button group.' ),
	icon: buttonsIcon,
	category: 'themeisle-blocks',
	keywords: [
		__( 'buttons' ),
		__( 'button group' ),
		__( 'advanced buttons' )
	],
	attributes: {
		id: {
			type: 'string'
		},
		buttons: {
			type: 'number',
			default: 2
		},
		align: {
			type: 'string'
		},
		spacing: {
			type: 'number',
			default: 20
		},
		collapse: {
			type: 'string',
			default: 'collapse-none'
		},
		fontSize: {
			type: 'number',
			default: 18
		},
		fontFamily: {
			type: 'string'
		},
		fontVariant: {
			type: 'string'
		},
		textTransform: {
			type: 'string'
		},
		fontStyle: {
			type: 'string',
			default: 'normal'
		},
		lineHeight: {
			type: 'number'
		},
		data: {
			type: 'array',
			default: [
				{
					text: '',
					link: '',
					newTab: false,
					color: '#ffffff',
					background: '#32373c',
					border: '',
					hoverColor: '',
					hoverBackground: '',
					hoverBorder: '',
					borderSize: 0,
					borderRadius: 0,
					boxShadow: false,
					boxShadowColor: '',
					boxShadowColorOpacity: 50,
					boxShadowBlur: 5,
					boxShadowSpread: 1,
					boxShadowHorizontal: 0,
					boxShadowVertical: 0,
					hoverBoxShadowColor: '',
					hoverBoxShadowColorOpacity: 50,
					hoverBoxShadowBlur: 5,
					hoverBoxShadowSpread: 1,
					hoverBoxShadowHorizontal: 0,
					hoverBoxShadowVertical: 0,
					iconType: 'none',
					prefix: '',
					icon: '',
					paddingTopBottom: 12,
					paddingLeftRight: 24
				},
				{
					text: '',
					link: '',
					newTab: false,
					color: '#ffffff',
					background: '#32373c',
					border: '',
					hoverColor: '',
					hoverBackground: '',
					hoverBorder: '',
					borderSize: 0,
					borderRadius: 0,
					boxShadow: false,
					boxShadowColor: '',
					boxShadowColorOpacity: 50,
					boxShadowBlur: 5,
					boxShadowSpread: 1,
					boxShadowHorizontal: 0,
					boxShadowVertical: 0,
					hoverBoxShadowColor: '',
					hoverBoxShadowColorOpacity: 50,
					hoverBoxShadowBlur: 5,
					hoverBoxShadowSpread: 1,
					hoverBoxShadowHorizontal: 0,
					hoverBoxShadowVertical: 0,
					iconType: 'none',
					prefix: '',
					icon: '',
					paddingTopBottom: 12,
					paddingLeftRight: 24
				}
			]
		}
	},

	deprecated: deprecated,

	edit: compose([

		withSelect( ( select, props ) => {
			return {
				props
			};
		}),

		withState({
			tab: 'buttons',
			selectedButton: 0,
			hover: false,
			wait: false
		})

	])( ({
		tab,
		selectedButton,
		hover,
		wait,
		setState,
		props
	}) => {

		const {
			id,
			buttons,
			align,
			spacing,
			collapse,
			fontSize,
			fontFamily,
			fontStyle,
			fontVariant,
			textTransform,
			lineHeight,
			data
		} = props.attributes;

		if ( id === undefined || id.substr( id.length - 8 ) !== props.clientId.substr( 0, 8 ) ) {
			const instanceId = `wp-block-themeisle-blocks-button-group-${ props.clientId.substr( 0, 8 ) }`;
			props.setAttributes({ id: instanceId });
		}

		const changeButton = value => {
			setState({
				selectedButton: value,
				wait: true
			});

			setTimeout( () => {
				setState({ wait: false  });
			}, 500 );
		};

		const changeButtons = value => {
			if ( 1 <= value && 5 >= value ) {
				if ( data.length < value ) {
					times( value - data.length, i => {
						data.push({
							text: data[0].text,
							link: data[0].link,
							newTab: data[0].newTab,
							color: data[0].color,
							border: data[0].border,
							background: data[0].background,
							hoverColor: data[0].hoverColor,
							hoverBackground: data[0].hoverBackground,
							hoverBorder: data[0].hoverBorder,
							borderSize: data[0].borderSize,
							borderRadius: data[0].borderRadius,
							boxShadow: data[0].boxShadow,
							boxShadowColor: data[0].boxShadowColor,
							boxShadowColorOpacity: data[0].boxShadowColorOpacity,
							boxShadowBlur: data[0].boxShadowBlur,
							boxShadowSpread: data[0].boxShadowSpread,
							boxShadowHorizontal: data[0].boxShadowHorizontal,
							boxShadowVertical: data[0].boxShadowVertical,
							hoverBoxShadowColor: data[0].hoverBoxShadowColor,
							hoverBoxShadowColorOpacity: data[0].hoverBoxShadowColorOpacity,
							hoverBoxShadowBlur: data[0].hoverBoxShadowBlur,
							hoverBoxShadowSpread: data[0].hoverBoxShadowSpread,
							hoverBoxShadowHorizontal: data[0].hoverBoxShadowHorizontal,
							hoverBoxShadowVertical: data[0].hoverBoxShadowVertical,
							iconType: data[0].iconType,
							prefix: data[0].prefix,
							icon: data[0].icon,
							paddingTopBottom: data[0].paddingTopBottom,
							paddingLeftRight: data[0].paddingLeftRight
						});
					});

					props.setAttributes({ data: data });
				}
				props.setAttributes({ buttons: value });
				setState({ selectedButton: 0 });
			}
		};

		const changeAlignment = value => {
			props.setAttributes({ align: value });
		};

		const changeSpacing = value => {
			props.setAttributes({ spacing: value });
		};

		const changeCollapse = value => {
			props.setAttributes({ collapse: value });
		};

		const changeFontSize = value => {
			props.setAttributes({ fontSize: value });
		};

		const changeFontFamily = value => {
			props.setAttributes({
				fontFamily: value,
				fontVariant: 'normal',
				fontStyle: 'normal'
			});
		};

		const changeFontVariant = value => {
			props.setAttributes({ fontVariant: value });
		};

		const changeFontStyle = value => {
			props.setAttributes({ fontStyle: value });
		};

		const changeTextTransform = value => {
			props.setAttributes({ textTransform: value });
		};

		const changeLineHeight = value => {
			props.setAttributes({ lineHeight: value });
		};

		const changePadding = ( type, value, index ) => {
			if ( 'top' === type || 'bottom' === type ) {
				updateButton({ paddingTopBottom: value }, index );
			}

			if ( 'left' === type || 'right' === type ) {
				updateButton({ paddingLeftRight: value }, index );
			}
		};

		const updateButton = ( value, index ) => {
			const updatedData = data.map( ( item, i ) => {
				if ( index === i ) {
					item = { ...item, ...value };
				}
				return item;
			});

			props.setAttributes({
				data: updatedData
			});
		};

		const style = {
			fontSize: `${ fontSize }px`,
			fontFamily: fontFamily,
			fontWeight: fontVariant,
			fontStyle: fontStyle,
			textTransform: textTransform,
			lineHeight: lineHeight && `${ lineHeight }px`
		};

		const button = i => {
			let boxShadowStyle = {};

			if ( data[i].boxShadow ) {
				boxShadowStyle = {
					boxShadow: `${ data[i].boxShadowHorizontal }px ${ data[i].boxShadowVertical }px ${ data[i].boxShadowBlur }px ${ data[i].boxShadowSpread }px ${  hexToRgba( ( data[i].boxShadowColor ? data[i].boxShadowColor : '#000000' ), data[i].boxShadowColorOpacity ) }`
				};
			}
			const buttonStyle = {
				...style,
				color: data[i].color,
				background: data[i].background,
				border: `${ data[i].borderSize }px solid ${ data[i].border }`,
				borderRadius: `${ data[i].borderRadius }px`,
				...boxShadowStyle,
				padding: `${ data[i].paddingTopBottom }px ${ data[i].paddingLeftRight }px `,
				marginLeft: 0 === i ? '0px' : `${ spacing / 2 }px`,
				marginRight: buttons === i + 1 ? '0px' : `${ spacing / 2 }px`
			};

			return (
				<Fragment>
					<style>
						{ `#${ id } .wp-block-themeisle-blocks-button-${ i }:hover {
							color: ${ data[i].hoverColor ? data[i].hoverColor : data[i].color } !important;
							background: ${ data[i].hoverBackground ? data[i].hoverBackground : data[i].background } !important;
							border: ${ data[i].borderSize }px solid ${ data[i].hoverBorder ? data[i].hoverBorder : data[i].border } !important;
							${ data[i].boxShadow && ( `box-shadow: ${ data[i].hoverBoxShadowHorizontal }px ${ data[i].hoverBoxShadowVertical }px ${ data[i].hoverBoxShadowBlur }px ${ data[i].hoverBoxShadowSpread }px ${  hexToRgba( ( data[i].hoverBoxShadowColor ? data[i].hoverBoxShadowColor : '#000000' ), data[i].hoverBoxShadowColorOpacity ) } !important;` ) }
						}` }
					</style>
					<div
						style={ buttonStyle }
						className={ classnames(
							'wp-block-themeisle-blocks-button',
							`wp-block-themeisle-blocks-button-${ i }`
						) }
						onClick={ () => changeButton( i ) }
					>
						{ ( 'left' === data[i].iconType || 'only' === data[i].iconType ) && (
							<i className={ classnames(
								data[i].prefix,
								'fa-fw',
								`fa-${ data[i].icon }`,
								{ 'margin-right': 'left' === data[i].iconType }
							) }>
							</i>
						) }

						{ 'only' !== data[i].iconType && (
							<RichText
								placeholder={ __( 'Add text…' ) }
								value={ data[i].text }
								aria-label={ unescapeHTML( data[i].text ) }
								onChange={ e => updateButton({ text: e }, i ) }
								formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
								tagName="span"
								keepPlaceholderOnFocus
							/>
						) }

						{ 'right' === data[i].iconType && (
							<i className={ `${ data[i].prefix } fa-fw fa-${ data[i].icon } margin-left` }></i>
						) }
					</div>
				</Fragment>
			);
		};

		const collapseClass = 'collapse-none' !== collapse ? collapse : '';

		return (
			<Fragment>
				{ fontFamily && (
					<GoogleFontLoader fonts={ [ {
						font: fontFamily,
						weights: fontVariant && [ `${fontVariant + ( 'italic' === fontStyle ? ':i' : '' ) }` ]
					} ] } />
				) }

				<BlockControls>
					<AlignmentToolbar
						value={ align }
						onChange={ changeAlignment }
						alignmentControls={ [
							{
								icon: 'editor-alignleft',
								title: __( 'Align left' ),
								align: 'flex-start'
							},
							{
								icon: 'editor-aligncenter',
								title: __( 'Align center' ),
								align: 'center'
							},
							{
								icon: 'editor-alignright',
								title: __( 'Align right' ),
								align: 'flex-end'
							}
						] }
					/>

					<Toolbar
						className="wp-themesiel-blocks-button-group-components-toolbar"
					>
						<Dropdown
							contentClassName="wp-themesiel-blocks-button-group-popover-content"
							position="bottom center"
							renderToggle={ ({ isOpen, onToggle }) => (
								<IconButton
									className="components-dropdown-menu__toggle"
									icon={ 'editor-textcolor' }
									onClick={ onToggle }
									aria-haspopup="true"
									aria-expanded={ isOpen }
									label={ __( 'Typography Settings' ) }
									tooltip={ __( 'Typography Settings' ) }
								>
									<span className="components-dropdown-menu__indicator" />
								</IconButton>
							) }
							renderContent={ () => (
								<Fragment>
									<RangeControl
										label={ __( 'Font Size' ) }
										value={ fontSize }
										onChange={ changeFontSize }
										min={ 0 }
										max={ 50 }
									/>

									<GoogleFontsControl
										label={ __( 'Font Family' ) }
										value={ fontFamily }
										onChangeFontFamily={ changeFontFamily }
										isSelect={ true }
										valueVariant={ fontVariant }
										onChangeFontVariant={ changeFontVariant }
										valueStyle={ fontStyle }
										onChangeFontStyle={ changeFontStyle }
										valueStyle={ fontStyle }
										onChangeFontStyle={ changeFontStyle }
										valueTransform={ textTransform }
										onChangeTextTransform={ changeTextTransform }
									/>

									<RangeControl
										label={ __( 'Line Height' ) }
										value={ lineHeight }
										onChange={ changeLineHeight }
										min={ 0 }
										max={ 200 }
									/>
								</Fragment>
							) }
						/>
					</Toolbar>
				</BlockControls>

				<InspectorControls>
					<PanelBody className="wp-block-themeisle-blocks-button-group-header-panel">
						<Button
							className={ classnames(
								'header-tab',
								{ 'is-selected': 'buttons' === tab }
							) }
							onClick={ () => setState({ tab: 'buttons' }) }
						>
							<span
							>
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
							onClick={ () => setState({ tab: 'group' }) }
						>
							<span
							>
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
									value={ buttons }
									onChange={ changeButtons }
									min={ 1 }
									max={ 5 }
								/>

								<BaseControl
									label={ __( 'Edit Button' ) }
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
												{ __( 'Button' ) + ' ' + ( selectedButton + 1 ) + ': ' + unescapeHTML( data[selectedButton].text ) }
											</Button>
										) }
										renderContent={ ({ onToggle }) => (
											<MenuGroup>
												{ times( buttons, n => {
													return (
														<MenuItem
															onClick={ () => {
																changeButton( n );
																onToggle();
															}}
														>
															{ __( 'Button' ) + ' ' + ( n + 1 ) + ': ' + unescapeHTML( data[n].text ) }
														</MenuItem>
													);
												}) }
											</MenuGroup>
										) }
									/>
								</BaseControl>
							</PanelBody>

							{ wait ?
								<Placeholder>
									<Spinner/>
								</Placeholder> :
								<Fragment>
									<PanelBody
										title={ __( 'Link' ) }
									>
										<LinkControl
											label={ 'Link' }
											placeholder={ __( 'https://…' ) }
											value={ data[selectedButton].link }
											onChange={ e => updateButton({ link: e }, selectedButton ) }
										>
											<ToggleControl
												label={ 'Open in New Tab?' }
												checked={ data[selectedButton].newTab }
												onChange={ () => updateButton({ newTab: ! data[selectedButton].newTab }, selectedButton ) }
											/>
										</LinkControl>
									</PanelBody>

									<PanelBody
										title={ __( 'Color & Border' ) }
										initialOpen={ false }
									>
										<ButtonGroup className="wp-block-themeisle-blocks-button-group-hover-control">
											<Button
												isDefault
												isLarge
												isPrimary={ ! hover }
												onClick={ () => setState({ hover: false }) }
											>
												{ __( 'Normal' ) }
											</Button>
											<Button
												isDefault
												isLarge
												isPrimary={ hover }
												onClick={ () => setState({ hover: true }) }
											>
												{ __( 'Hover' ) }
											</Button>
										</ButtonGroup>

										{ hover ? (
											<Fragment>
												<BaseControl
													label={ 'Hover Color' }
												>
													<ColorPalette
														label={ 'Hover Color' }
														value={ data[selectedButton].hoverColor }
														onChange={ e => updateButton({ hoverColor: e }, selectedButton ) }
													/>
												</BaseControl>

												<BaseControl
													label={ 'Hover Background' }
												>
													<ColorPalette
														label={ 'Hover Background' }
														value={ data[selectedButton].hoverBackground }
														onChange={ e => updateButton({ hoverBackground: e }, selectedButton ) }
													/>
												</BaseControl>

												<BaseControl
													label={ 'Hover Border' }
												>
													<ColorPalette
														label={ 'Hover Border' }
														value={ data[selectedButton].hoverBorder }
														onChange={ e => updateButton({ hoverBorder: e }, selectedButton ) }
													/>
												</BaseControl>
											</Fragment>
										) : (
											<Fragment>
												<BaseControl
													label={ 'Color' }
												>
													<ColorPalette
														label={ 'Color' }
														value={ data[selectedButton].color }
														onChange={ e => updateButton({ color: e }, selectedButton ) }
													/>
												</BaseControl>

												<BaseControl
													label={ 'Background' }
												>
													<ColorPalette
														label={ 'Background' }
														value={ data[selectedButton].background }
														onChange={ e => updateButton({ background: e }, selectedButton ) }
													/>
												</BaseControl>

												<BaseControl
													label={ 'Border' }
												>
													<ColorPalette
														label={ 'Border' }
														value={ data[selectedButton].border }
														onChange={ e => updateButton({ border: e }, selectedButton ) }
													/>
												</BaseControl>
											</Fragment>
										) }

										<RangeControl
											label={ __( 'Border Width' ) }
											className="border-width"
											beforeIcon="move"
											value={ data[selectedButton].borderSize }
											onChange={ e => updateButton({ borderSize: e }, selectedButton ) }
											min={ 0 }
											max={ 10 }
										/>

										<RangeControl
											label={ __( 'Border Radius' ) }
											beforeIcon="move"
											value={ data[selectedButton].borderRadius }
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
											checked={ data[selectedButton].boxShadow }
											onChange={ e => updateButton({ boxShadow: ! data[selectedButton].boxShadow }, selectedButton ) }
										/>

										{ data[selectedButton].boxShadow && (
											<Fragment>
												<ButtonGroup className="wp-block-themeisle-blocks-button-group-hover-control" >
													<Button
														isDefault
														isLarge
														isPrimary={ ! hover }
														onClick={ () => setState({ hover: false }) }
													>
														{ __( 'Normal' ) }
													</Button>
													<Button
														isDefault
														isLarge
														isPrimary={ hover }
														onClick={ () => setState({ hover: true }) }
													>
														{ __( 'Hover' ) }
													</Button>
												</ButtonGroup>

												{ ! hover && (
													<Fragment>
														<BaseControl
															label={ 'Shadow Color' }
														>
															<ColorPalette
																label={ 'Shadow Color' }
																value={ data[selectedButton].boxShadowColor }
																onChange={ e => updateButton({ boxShadowColor: e }, selectedButton ) }
															/>
														</BaseControl>

														<ControlPanelControl
															label={ 'Shadow Properties' }
														>

															<RangeControl
																label={ __( 'Opacity' ) }
																value={ data[selectedButton].boxShadowColorOpacity }
																onChange={ e => updateButton({ boxShadowColorOpacity: e }, selectedButton ) }
																min={ 0 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Blur' ) }
																value={ data[selectedButton].boxShadowBlur }
																onChange={ e => updateButton({ boxShadowBlur: e }, selectedButton ) }
																min={ 0 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Spread' ) }
																value={ data[selectedButton].boxShadowSpread }
																onChange={ e => updateButton({ boxShadowSpread: e }, selectedButton ) }
																min={ -100 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Horizontal' ) }
																value={ data[selectedButton].boxShadowHorizontal }
																onChange={ e => updateButton({ boxShadowHorizontal: e }, selectedButton ) }
																min={ -100 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Vertical' ) }
																value={ data[selectedButton].boxShadowVertical }
																onChange={ e => updateButton({ boxShadowVertical: e }, selectedButton ) }
																min={ -100 }
																max={ 100 }
															/>

														</ControlPanelControl>
													</Fragment>
												) || hover && (
													<Fragment>
														<BaseControl
															label={ 'Hover Shadow Color' }
														>
															<ColorPalette
																label={ 'Hover Shadow Color' }
																value={ data[selectedButton].hoverBoxShadowColor }
																onChange={ e => updateButton({ hoverBoxShadowColor: e }, selectedButton ) }
															/>
														</BaseControl>


														<ControlPanelControl
															label={ 'Hover Shadow Properties' }
														>

															<RangeControl
																label={ __( 'Opacity' ) }
																value={ data[selectedButton].hoverBoxShadowColorOpacity }
																onChange={ e => updateButton({ hoverBoxShadowColorOpacity: e }, selectedButton ) }
																min={ 0 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Blur' ) }
																value={ data[selectedButton].hoverBoxShadowBlur }
																onChange={ e => updateButton({ hoverBoxShadowBlur: e }, selectedButton ) }
																min={ 0 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Spread' ) }
																value={ data[selectedButton].hoverBoxShadowSpread }
																onChange={ e => updateButton({ hoverBoxShadowSpread: e }, selectedButton ) }
																min={ -100 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Horizontal' ) }
																value={ data[selectedButton].hoverBoxShadowHorizontal }
																onChange={ e => updateButton({ hoverBoxShadowHorizontal: e }, selectedButton ) }
																min={ -100 }
																max={ 100 }
															/>

															<RangeControl
																label={ __( 'Vertical' ) }
																value={ data[selectedButton].hoverBoxShadowVertical }
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
											value={ data[selectedButton].iconType }
											options={ [
												{ label: 'No Icon', value: 'none' },
												{ label: 'Left', value: 'left' },
												{ label: 'Right', value: 'right' },
												{ label: 'Icon Only', value: 'only' }
											] }
											onChange={ e => updateButton({ iconType: e }, selectedButton ) }
										/>

										{ 'none' !== data[selectedButton].iconType && (
											<Fragment>
												<IconPickerControl
													label={ __( 'Icon Picker' ) }
													prefix={ data[selectedButton].prefix }
													icon={ data[selectedButton].icon }
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
											</Fragment>
										) }
									</PanelBody>

									<PanelBody
										title={ __( 'Padding' ) }
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
													value: data[selectedButton].paddingTopBottom
												},
												{
													label: __( 'Right' ),
													type: 'right',
													value: data[selectedButton].paddingLeftRight
												},
												{
													label: __( 'Bottom' ),
													type: 'bottom',
													value: data[selectedButton].paddingTopBottom
												},
												{
													label: __( 'Left' ),
													type: 'left',
													value: data[selectedButton].paddingLeftRight
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
									value={ spacing }
									onChange={ changeSpacing }
									min={ 0 }
									max={ 50 }
								/>

								<SelectControl
									label={ __( 'Collapse On' ) }
									value={ collapse }
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
									value={ fontSize }
									onChange={ changeFontSize }
									min={ 0 }
									max={ 50 }
								/>

								<GoogleFontsControl
									label={ __( 'Font Family' ) }
									value={ fontFamily }
									onChangeFontFamily={ changeFontFamily }
									valueVariant={ fontVariant }
									onChangeFontVariant={ changeFontVariant }
									valueStyle={ fontStyle }
									onChangeFontStyle={ changeFontStyle }
									valueStyle={ fontStyle }
									onChangeFontStyle={ changeFontStyle }
									valueTransform={ textTransform }
									onChangeTextTransform={ changeTextTransform }
								/>

								<RangeControl
									label={ __( 'Line Height' ) }
									value={ lineHeight }
									onChange={ changeLineHeight }
									min={ 0 }
									max={ 200 }
								/>
							</PanelBody>
						</Fragment>
					) }
				</InspectorControls>

				<div
					id={ id }
					className={ classnames(
						props.className,
						collapseClass
					) }
					style={ {
						justifyContent: align,
						alignItems: align ? align : 'flex-start'
					} }
				>
					{ times( buttons, i => button( i ) ) }
				</div>
			</Fragment>
		);
	}),

	save: props => {
		const {
			id,
			buttons,
			align,
			collapse,
			fontSize,
			fontFamily,
			fontStyle,
			fontVariant,
			textTransform,
			lineHeight,
			data
		} = props.attributes;

		const style = {
			fontSize: `${ fontSize }px`,
			fontFamily: fontFamily,
			fontWeight: fontVariant,
			fontStyle: fontStyle,
			textTransform: textTransform,
			lineHeight: lineHeight && `${ lineHeight }px`
		};

		const button = i => {
			const buttonStyle = {
				...style,
				borderWidth: `${ data[i].borderSize }px`,
				borderRadius: `${ data[i].borderRadius }px`,
				padding: `${ data[i].paddingTopBottom }px ${ data[i].paddingLeftRight }px `
			};

			return (
				<Fragment>
					<a
						href={ data[i].link }
						target={ data[i].newTab ? '_blank' : '_self' }
						className={ classnames(
							'wp-block-themeisle-blocks-button',
							`wp-block-themeisle-blocks-button-${ i }`
						) }
						style={ buttonStyle }
						rel="noopener noreferrer"
					>
						{ ( 'left' === data[i].iconType || 'only' === data[i].iconType ) && (
							<i className={ classnames(
								data[i].prefix,
								'fa-fw',
								`fa-${ data[i].icon }`,
								{ 'margin-right': 'left' === data[i].iconType }
							) }>
							</i>
						) }

						{ 'only' !== data[i].iconType && (
							<RichText.Content
								tagName="span"
								value={ data[i].text }
							/>
						) }

						{ 'right' === data[i].iconType && (
							<i className={ `${ data[i].prefix } fa-fw fa-${ data[i].icon } margin-left` }></i>
						) }
					</a>
				</Fragment>
			);
		};

		const collapseClass = 'collapse-none' !== collapse ? collapse : '';

		return (
			<div
				id={ id }
				className={ classnames(
					props.className,
					collapseClass
				) }
				style={ {
					justifyContent: align,
					alignItems: align ? align : 'flex-start'
				} }
			>
				{ times( buttons, i => button( i ) ) }
			</div>
		);
	}
});
