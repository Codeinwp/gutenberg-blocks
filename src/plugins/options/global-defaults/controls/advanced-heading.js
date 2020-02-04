/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	AlignmentToolbar,
	ColorPalette
} = wp.blockEditor;

const {
	BaseControl,
	HorizontalRule,
	PanelBody,
	RangeControl,
	SelectControl
} = wp.components;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import GoogleFontsControl from '../../../../components/google-fonts-control/index.js';
import ResponsiveControl from '../../../../components/responsive-control/index.js';
import SizingControl from '../../../../components/sizing-control/index.js';

const AdvancedHeading = ({
	blockName,
	defaults,
	changeConfig
}) => {
	const [ fontSizeViewType, setFontSizeViewType ] = useState( 'desktop' );
	const [ paddingViewType, setPaddingViewType ] = useState( 'desktop' );
	const [ marginViewType, setMarginViewType ] = useState( 'desktop' );

	let getFontSize = () => {
		let value;

		if ( 'desktop' === fontSizeViewType ) {
			value = defaults.fontSize;
		}

		if ( 'tablet' === fontSizeViewType ) {
			value = defaults.fontSizeTablet;
		}

		if ( 'mobile' === fontSizeViewType ) {
			value = defaults.fontSizeMobile;
		}

		return value;
	};

	getFontSize = getFontSize();

	const changeFontSize = value => {
		if ( 'desktop' === fontSizeViewType ) {
			changeConfig( blockName, {
				fontSize: value
			});
		}

		if ( 'tablet' === fontSizeViewType ) {
			changeConfig( blockName, {
				fontSizeTablet: value
			});
		}

		if ( 'mobile' === fontSizeViewType ) {
			changeConfig( blockName, {
				fontSizeMobile: value
			});
		}
	};

	const changeFontFamily = value => {
		if ( ! value ) {
			changeConfig( blockName, {
				fontFamily: value,
				fontVariant: value
			});
		} else {
			changeConfig( blockName, {
				fontFamily: value,
				fontVariant: 'normal',
				fontStyle: 'normal'
			});
		}
	};

	let getPaddingType = () => {
		let value;

		if ( 'desktop' === paddingViewType ) {
			value = defaults.paddingType;
		}
		if ( 'tablet' === paddingViewType ) {
			value = defaults.paddingTypeTablet;
		}
		if ( 'mobile' === paddingViewType ) {
			value = defaults.paddingTypeMobile;
		}

		return value;
	};

	getPaddingType = getPaddingType();

	const changePaddingType = value => {
		if ( 'desktop' === paddingViewType ) {
			changeConfig( blockName, {
				paddingType: value
			});
		}
		if ( 'tablet' === paddingViewType ) {
			changeConfig( blockName, {
				paddingTypeTablet: value
			});
		}
		if ( 'mobile' === paddingViewType ) {
			changeConfig( blockName, {
				paddingTypeMobile: value
			});
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
			if ( 'linked' === defaults.paddingType ) {
				changeConfig( blockName, {
					padding: value
				});
			} else {
				changeConfig( blockName, {
					[desktopPaddingType[type]]: value
				});
			}
		}

		if ( 'tablet' === paddingViewType ) {
			if ( 'linked' === defaults.paddingTypeTablet ) {
				changeConfig( blockName, {
					paddingTablet: value
				});
			} else {
				changeConfig( blockName, {
					[tabletPaddingType[type]]: value
				});
			}
		}

		if ( 'mobile' === paddingViewType ) {
			if ( 'linked' === defaults.paddingTypeMobile ) {
				changeConfig( blockName, {
					paddingMobile: value
				});
			} else {
				changeConfig( blockName, {
					[mobilePaddingType[type]]: value
				});
			}
		}
	};

	const getPadding = type => {
		let value;

		if ( 'top' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingTop;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingTopTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingTopMobile;
			}
		}

		if ( 'right' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingRight;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingRightTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingRightMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingBottom;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingBottomTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingBottomMobile;
			}
		}

		if ( 'left' == type ) {
			if ( 'desktop' === paddingViewType ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingLeft;
			}

			if ( 'tablet' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingLeftTablet;
			}

			if ( 'mobile' === paddingViewType ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingLeftMobile;
			}
		}

		return value;
	};

	let getMarginType = () => {
		let value;

		if ( 'desktop' === marginViewType ) {
			value = defaults.marginType;
		}
		if ( 'tablet' === marginViewType ) {
			value = defaults.marginTypeTablet;
		}
		if ( 'mobile' === marginViewType ) {
			value = defaults.marginTypeMobile;
		}

		return value;
	};

	getMarginType = getMarginType();

	const changeMarginType = value => {
		if ( 'desktop' === marginViewType ) {
			changeConfig( blockName, {
				marginType: value
			});
		}
		if ( 'tablet' === marginViewType ) {
			changeConfig( blockName, {
				marginTypeTablet: value
			});
		}
		if ( 'mobile' === marginViewType ) {
			changeConfig( blockName, {
				marginTypeMobile: value
			});
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
			if ( 'linked' === defaults.marginType ) {
				changeConfig( blockName, {
					margin: value
				});
			} else {
				changeConfig( blockName, {
					[desktopMarginType[type]]: value
				});
			}
		}

		if ( 'tablet' === marginViewType ) {
			if ( 'linked' === defaults.marginTypeTablet ) {
				changeConfig( blockName, {
					marginTablet: value
				});
			} else {
				changeConfig( blockName, {
					[tabletMarginType[type]]: value
				});
			}
		}

		if ( 'mobile' === marginViewType ) {
			if ( 'linked' === defaults.marginTypeMobile ) {
				changeConfig( blockName, {
					marginMobile: value
				});
			} else {
				changeConfig( blockName, {
					[mobileMarginType[type]]: value
				});
			}
		}
	};

	const getMargin = type => {
		let value;

		if ( 'top' == type ) {
			if ( 'desktop' === marginViewType ) {
				value = 'linked' === defaults.marginType ? defaults.margin : defaults.marginTop;
			}

			if ( 'tablet' === marginViewType ) {
				value = 'linked' === defaults.marginTypeTablet ? defaults.marginTablet : defaults.marginTopTablet;
			}

			if ( 'mobile' === marginViewType ) {
				value = 'linked' === defaults.marginTypeMobile ? defaults.marginMobile : defaults.marginTopMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'desktop' === marginViewType ) {
				value = 'linked' === defaults.marginType ? defaults.margin : defaults.marginBottom;
			}

			if ( 'tablet' === marginViewType ) {
				value = 'linked' === defaults.marginTypeTablet ? defaults.marginTablet : defaults.marginBottomTablet;
			}

			if ( 'mobile' === marginViewType ) {
				value = 'linked' === defaults.marginTypeMobile ? defaults.marginMobile : defaults.marginBottomMobile;
			}
		}

		return value;
	};

	return (
		<Fragment>
			<PanelBody
				title={ __( 'General Settings' ) }
			>
				<SelectControl
					label={ __( 'HTML Tag' ) }
					value={ defaults.tag }
					options={ [
						{ label: __( 'Heading 1' ), value: 'h1' },
						{ label: __( 'Heading 2' ), value: 'h2' },
						{ label: __( 'Heading 3' ), value: 'h3' },
						{ label: __( 'Heading 4' ), value: 'h4' },
						{ label: __( 'Heading 5' ), value: 'h5' },
						{ label: __( 'Heading 6' ), value: 'h6' },
						{ label: __( 'Division' ), value: 'div' },
						{ label: __( 'Paragraph' ), value: 'p' },
						{ label: __( 'Span' ), value: 'span' }
					] }
					onChange={ value => changeConfig( blockName, { tag: value }) }
				/>

				<BaseControl
					label={ 'Heading Color' }
				>
					<ColorPalette
						value={ defaults.headingColor }
						onChange={ value => changeConfig( blockName, { headingColor: value }) }
					/>
				</BaseControl>

				<HorizontalRule/>

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
			</PanelBody>

			<PanelBody
				title={ __( 'Typography Settings' ) }
				initialOpen={ false }
			>
				<GoogleFontsControl
					label={ __( 'Font Family' ) }
					value={ defaults.fontFamily }
					onChangeFontFamily={ changeFontFamily }
					valueVariant={ defaults.fontVariant }
					onChangeFontVariant={ value => changeConfig( blockName, { fontVariant: value }) }
					valueStyle={ defaults.fontStyle }
					onChangeFontStyle={ value => changeConfig( blockName, { fontStyle: value }) }
					valueTransform={ defaults.textTransform }
					onChangeTextTransform={ value => changeConfig( blockName, { textTransform: value }) }
				/>

				<HorizontalRule/>

				<RangeControl
					label={ __( 'Line Height' ) }
					value={ defaults.lineHeight || '' }
					onChange={ value => changeConfig( blockName, { lineHeight: value }) }
					min={ 0 }
					max={ 200 }
				/>

				<HorizontalRule/>

				<RangeControl
					label={ __( 'Letter Spacing' ) }
					value={ defaults.letterSpacing || '' }
					onChange={ value => changeConfig( blockName, { letterSpacing: value }) }
					min={ -50 }
					max={ 100 }
				/>
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

				<HorizontalRule/>

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
	);
};

export default AdvancedHeading;
