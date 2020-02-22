/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	Button,
	Dashicon,
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl
} = wp.components;

const {
	AlignmentToolbar,
	ColorPalette,
	InspectorAdvancedControls,
	InspectorControls
} = wp.blockEditor;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import GoogleFontsControl from '../../components/google-fonts-control/index.js';
import ControlPanelControl from '../../components/control-panel-control/index.js';
import ResponsiveControl from '../../components/responsive-control/index.js';
import SizingControl from '../../components/sizing-control/index.js';

const Inspector = ({
	attributes,
	setAttributes,
	changeFontFamily,
	changeFontVariant,
	changeFontStyle,
	changeTextTransform,
	changeLineHeight,
	changeLetterSpacing
}) => {
	const [ tab, setTab ] = useState( 'style' );
	const [ fontSizeViewType, setFontSizeViewType ] = useState( 'desktop' );
	const [ alignmentViewType, setAlignmentViewType ] = useState( 'desktop' );
	const [ paddingViewType, setPaddingViewType ] = useState( 'desktop' );
	const [ marginViewType, setMarginViewType ] = useState( 'desktop' );

	const changeHeadingColor = value => {
		setAttributes({ headingColor: value });
	};

	let getFontSize = () => {
		let value;

		if ( 'desktop' === fontSizeViewType ) {
			value = attributes.fontSize;
		}

		if ( 'tablet' === fontSizeViewType ) {
			value = attributes.fontSizeTablet;
		}

		if ( 'mobile' === fontSizeViewType ) {
			value = attributes.fontSizeMobile;
		}

		return value;
	};

	getFontSize = getFontSize();

	const changeFontSize = value => {
		if ( 'desktop' === fontSizeViewType ) {
			setAttributes({ fontSize: value });
		}

		if ( 'tablet' === fontSizeViewType ) {
			setAttributes({ fontSizeTablet: value });
		}

		if ( 'mobile' === fontSizeViewType ) {
			setAttributes({ fontSizeMobile: value });
		}
	};

	let getAlignment = () => {
		let value;

		if ( 'desktop' === alignmentViewType ) {
			value = attributes.align;
		}

		if ( 'tablet' === alignmentViewType ) {
			value = attributes.alignTablet;
		}

		if ( 'mobile' === alignmentViewType ) {
			value = attributes.alignMobile;
		}

		return value;
	};

	getAlignment = getAlignment();

	const changeAlignment = value => {
		if ( 'desktop' === alignmentViewType ) {
			setAttributes({ align: value });
		}

		if ( 'tablet' === alignmentViewType ) {
			setAttributes({ alignTablet: value });
		}

		if ( 'mobile' === alignmentViewType ) {
			setAttributes({ alignMobile: value });
		}
	};

	const changeTextShadowColor = value => {
		setAttributes({ textShadowColor: value });
	};

	const changeTextShadow = value => {
		setAttributes({ textShadow: value });
	};

	const changeTextShadowColorOpacity = value => {
		setAttributes({ textShadowColorOpacity: value });
	};

	const changeTextShadowBlur = value => {
		setAttributes({ textShadowBlur: value });
	};

	const changeTextShadowHorizontal = value => {
		setAttributes({ textShadowHorizontal: value });
	};

	const changeTextShadowVertical = value => {
		setAttributes({ textShadowVertical: value });
	};

	const changeHighlightColor = value => {
		setAttributes({ highlightColor: value });
	};

	const changeHighlightBackground = value => {
		setAttributes({ highlightBackground: value });
	};

	let getPaddingType = () => {
		let value;

		if ( 'desktop' === paddingViewType ) {
			value = attributes.paddingType;
		}
		if ( 'tablet' === paddingViewType ) {
			value = attributes.paddingTypeTablet;
		}
		if ( 'mobile' === paddingViewType ) {
			value = attributes.paddingTypeMobile;
		}

		return value;
	};

	getPaddingType = getPaddingType();

	const changePaddingType = value => {
		if ( 'desktop' === paddingViewType ) {
			setAttributes({ paddingType: value });
		}
		if ( 'tablet' === paddingViewType ) {
			setAttributes({ paddingTypeTablet: value });
		}
		if ( 'mobile' === paddingViewType ) {
			setAttributes({ paddingTypeMobile: value });
		}
	};

	const desktopPaddingType = {
		top: 'paddingTop',
		right: 'paddingRight',
		bottom: 'paddingBottom',
		left: 'paddingLeft'
	};

	const tabletPaddingType = {
		top: 'paddingTopTablet',
		right: 'paddingRightTablet',
		bottom: 'paddingBottomTablet',
		left: 'paddingLeftTablet'
	};

	const mobilePaddingType = {
		top: 'paddingTopMobile',
		right: 'paddingRightMobile',
		bottom: 'paddingBottomMobile',
		left: 'paddingLeftMobile'
	};

	const changePadding = ( type, value ) => {
		if ( 'desktop' === paddingViewType ) {
			if ( 'linked' === attributes.paddingType ) {
				setAttributes({ padding: value });
			} else {
				setAttributes({ [desktopPaddingType[type]]: value });
			}
		}

		if ( 'tablet' === paddingViewType ) {
			if ( 'linked' === attributes.paddingTypeTablet ) {
				setAttributes({ paddingTablet: value });
			} else {
				setAttributes({ [tabletPaddingType[type]]: value });
			}
		}

		if ( 'mobile' === paddingViewType ) {
			if ( 'linked' === attributes.paddingTypeMobile ) {
				setAttributes({ paddingMobile: value });
			} else {
				setAttributes({ [mobilePaddingType[type]]: value });
			}
		}
	};

	const getPadding = type => {
		let value;

		if ( 'top' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingTop;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingTopTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingTopMobile;
			}
		}

		if ( 'right' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingRight;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingRightTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingRightMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingBottom;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingBottomTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingBottomMobile;
			}
		}

		if ( 'left' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingLeft;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingLeftTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingLeftMobile;
			}
		}

		return value;
	};

	let getMarginType = () => {
		let value;

		if ( 'desktop' === marginViewType ) {
			value = attributes.marginType;
		}
		if ( 'tablet' === marginViewType ) {
			value = attributes.marginTypeTablet;
		}
		if ( 'mobile' === marginViewType ) {
			value = attributes.marginTypeMobile;
		}

		return value;
	};

	getMarginType = getMarginType();

	const changeMarginType = value => {
		if ( 'desktop' === marginViewType ) {
			setAttributes({ marginType: value });
		}
		if ( 'tablet' === marginViewType ) {
			setAttributes({ marginTypeTablet: value });
		}
		if ( 'mobile' === marginViewType ) {
			setAttributes({ marginTypeMobile: value });
		}
	};

	const desktopMarginType = {
		top: 'marginTop',
		bottom: 'marginBottom'
	};

	const tabletMarginType = {
		top: 'marginTopTablet',
		bottom: 'marginBottomTablet'
	};

	const mobileMarginType = {
		top: 'marginTopMobile',
		bottom: 'marginBottomMobile'
	};

	const changeMargin = ( type, value ) => {
		if ( 'desktop' === marginViewType ) {
			if ( 'linked' === attributes.marginType ) {
				setAttributes({ margin: value });
			} else {
				setAttributes({ [desktopMarginType[type]]: value });
			}
		}

		if ( 'tablet' === marginViewType ) {
			if ( 'linked' === attributes.marginTypeTablet ) {
				setAttributes({ marginTablet: value });
			} else {
				setAttributes({ [tabletMarginType[type]]: value });
			}
		}

		if ( 'mobile' === marginViewType ) {
			if ( 'linked' === attributes.marginTypeMobile ) {
				setAttributes({ marginMobile: value });
			} else {
				setAttributes({ [mobileMarginType[type]]: value });
			}
		}
	};

	const getMargin = type => {
		let value;

		if ( 'top' == type ) {
			if ( 'desktop' === marginViewType ) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginTop;
			}

			if ( 'tablet' === marginViewType ) {
				value = 'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginTopTablet;
			}

			if ( 'mobile' === marginViewType ) {
				value = 'linked' === attributes.marginTypeMobile ? attributes.marginMobile : attributes.marginTopMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'desktop' === marginViewType ) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginBottom;
			}

			if ( 'tablet' === marginViewType ) {
				value = 'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginBottomTablet;
			}

			if ( 'mobile' === marginViewType ) {
				value = 'linked' === attributes.marginTypeMobile ? attributes.marginMobile : attributes.marginBottomMobile;
			}
		}

		return value;
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody className="wp-block-themeisle-blocks-advanced-heading-header-panel">
					<Button
						className={ classnames(
							'header-tab',
							{ 'is-selected': 'style' === tab }
						) }
						onClick={ () => setTab( 'style' ) }
					>
						<span
						>
							<Dashicon icon="admin-customizer"/>
							{ __( 'Style' ) }
						</span>
					</Button>

					<Button
						className={ classnames(
							'header-tab',
							{ 'is-selected': 'advanced' === tab }
						) }
						onClick={ () => setTab( 'advanced' ) }
					>
						<span
						>
							<Dashicon icon="admin-generic"/>
							{ __( 'Advanced' ) }
						</span>
					</Button>
				</PanelBody>

				{ 'style' === tab && (

					<Fragment>
						<PanelBody
							title={ __( 'General Settings' ) }
						>
							<Fragment>
								<p>{ __( 'Heading Color' ) }</p>

								<ColorPalette
									label={ 'Heading Color' }
									value={ attributes.headingColor }
									onChange={ changeHeadingColor }
								/>
							</Fragment>

							<ResponsiveControl
								label={ 'Font Size' }
								view={ fontSizeViewType }
								changeViewType={ setFontSizeViewType }
							>
								<RangeControl
									value={ getFontSize || '' }
									onChange={ changeFontSize }
									min={ 1 }
									max={ 500 }
								/>
							</ResponsiveControl>

							<ResponsiveControl
								label={ 'Alignment' }
								view={ alignmentViewType }
								changeViewType={ setAlignmentViewType }
							>
								<AlignmentToolbar
									value={ getAlignment }
									onChange={ changeAlignment }
									isCollapsed={ false }
								/>
							</ResponsiveControl>
						</PanelBody>

						<PanelBody
							title={ __( 'Typography Settings' ) }
							initialOpen={ false }
						>
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

							<RangeControl
								label={ __( 'Letter Spacing' ) }
								value={ attributes.letterSpacing }
								onChange={ changeLetterSpacing }
								min={ -50 }
								max={ 100 }
							/>

							<ToggleControl
								label={ 'Shadow Properties' }
								checked={ attributes.textShadow }
								onChange={ changeTextShadow }
							/>

							{ attributes.textShadow && (
								<Fragment>

									<Fragment>
										<p>{ __( 'Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											value={ attributes.textShadowColor }
											onChange={ changeTextShadowColor }
										/>
									</Fragment>

									<ControlPanelControl
										label={ 'Shadow Properties' }
									>
										<RangeControl
											label={ __( 'Opacity' ) }
											value={ attributes.textShadowColorOpacity }
											onChange={ changeTextShadowColorOpacity }
											min={ 0 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Blur' ) }
											value={ attributes.textShadowBlur }
											onChange={ changeTextShadowBlur }
											min={ 0 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Horizontal' ) }
											value={ attributes.textShadowHorizontal }
											onChange={ changeTextShadowHorizontal }
											min={ -100 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Vertical' ) }
											value={ attributes.textShadowVertical }
											onChange={ changeTextShadowVertical }
											min={ -100 }
											max={ 100 }
										/>
									</ControlPanelControl>

								</Fragment>
							) }
						</PanelBody>
					</Fragment>

				) || 'advanced' === tab && (

					<Fragment>
						<PanelBody
							title={ __( 'Highlight Color' ) }
						>
							<Fragment>
								<p>{ __( 'Highlight Color' ) }</p>

								<ColorPalette
									label={ 'Highlight Color' }
									value={ attributes.highlightColor }
									onChange={ changeHighlightColor }
								/>
							</Fragment>

							<Fragment>
								<p>{ __( 'Highlight Background' ) }</p>

								<ColorPalette
									label={ 'Highlight Background' }
									value={ attributes.highlightBackground }
									onChange={ changeHighlightBackground }
								/>
							</Fragment>
						</PanelBody>

						<PanelBody
							title={ __( 'Spacing' ) }
							initialOpen={ false }
						>
							<ResponsiveControl
								label={ 'Padding' }
								view={ paddingViewType }
								changeViewType={ setPaddingViewType }
							>
								<SizingControl
									type={ getPaddingType }
									min={ 0 }
									max={ 500 }
									changeType={ changePaddingType }
									onChange={ changePadding }
									options={ [
										{
											label: __( 'Top' ),
											type: 'top',
											value: getPadding( 'top' )
										},
										{
											label: __( 'Right' ),
											type: 'right',
											value: getPadding( 'right' )
										},
										{
											label: __( 'Bottom' ),
											type: 'bottom',
											value: getPadding( 'bottom' )
										},
										{
											label: __( 'Left' ),
											type: 'left',
											value: getPadding( 'left' )
										}
									] }
								/>
							</ResponsiveControl>

							<ResponsiveControl
								label={ 'Margin' }
								view={ marginViewType }
								changeViewType={ setMarginViewType }
							>
								<SizingControl
									type={ getMarginType }
									min={ -500 }
									max={ 500 }
									changeType={ changeMarginType }
									onChange={ changeMargin }
									options={ [
										{
											label: __( 'Top' ),
											type: 'top',
											value: getMargin( 'top' )
										},
										{
											label: __( 'Right' ),
											disabled: true
										},
										{
											label: __( 'Bottom' ),
											type: 'bottom',
											value: getMargin( 'bottom' )
										},
										{
											label: __( 'Left' ),
											disabled: true
										}
									] }
								/>
							</ResponsiveControl>
						</PanelBody>
					</Fragment>
				) }
			</InspectorControls>

			<InspectorAdvancedControls>
				<TextControl
					label={ __( 'HTML Anchor' ) }
					help={ __( 'Anchors lets you link directly to a section on a page.' ) }
					value={ attributes.id }
					readonly="readonly"
					onClick={ e => e.target.select() }
				/>
			</InspectorAdvancedControls>
		</Fragment>
	);
};

export default Inspector;
