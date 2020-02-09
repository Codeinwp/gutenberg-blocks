/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ButtonGroup,
	Dashicon,
	Icon,
	IconButton,
	PanelBody,
	Tooltip,
	ToggleControl,
	RangeControl,
	SelectControl,
	TextControl
} = wp.components;

const {
	ColorPalette,
	InspectorAdvancedControls,
	InspectorControls,
	MediaPlaceholder
} = wp.blockEditor;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import {
	topIcon,
	middleIcon,
	bottomIcon
} from '../../../helpers/icons.js';
import LayoutControl from './../components/layout-control/index.js';
import SizingControl from '../../../components/sizing-control/index.js';
import ResponsiveControl from '../../../components/responsive-control/index.js';
import BackgroundControl from '../components/background-control/index.js';
import GradientPickerControl from '../../../components/gradient-picker-control/index.js';
import ControlPanelControl from '../../../components/control-panel-control/index.js';

const Inspector = ({
	attributes,
	setAttributes,
	updateColumnsWidth,
	dividerViewType,
	setDividerViewType
}) => {
	const [ tab, setTab ] = useState( 'layout' );
	const [ columnsViewType, setColumnsViewType ] = useState( 'desktop' );
	const [ paddingViewType, setPaddingViewType ] = useState( 'desktop' );
	const [ marginViewType, setMarginViewType ] = useState( 'desktop' );
	const [ heightViewType, setHeightViewType ] = useState( 'desktop' );
	const [ dividerWidthViewType, setDividerWidthViewType ] = useState( 'desktop' );
	const [ dividerHeightViewType, setDividerHeightViewType ] = useState( 'desktop' );

	const changeColumns = value => {
		if ( 6 >= value ) {
			setAttributes({
				columns: value,
				layout: 'equal',
				layoutTablet: 'equal',
				layoutMobile: 'collapsedRows'
			});
			updateColumnsWidth( value, 'equal' );
		}

		if ( 6 < value ) {
			setAttributes({
				columns: 6,
				layout: 'equal',
				layoutTablet: 'equal',
				layoutMobile: 'collapsedRows'
			});
			updateColumnsWidth( 6, 'equal' );
		}

		if ( 1 >= value ) {
			setAttributes({
				columns: 1,
				layout: 'equal',
				layoutTablet: 'equal',
				layoutMobile: 'equal'
			});
			updateColumnsWidth( 1, 'equal' );
		}
	};


	const changeLayout = value => {
		if ( 'desktop' === columnsViewType ) {
			setAttributes({ layout: value });
			updateColumnsWidth( attributes.columns, value );
		}
		if ( 'tablet' === columnsViewType ) {
			setAttributes({ layoutTablet: value });
		}
		if ( 'mobile' === columnsViewType ) {
			setAttributes({ layoutMobile: value });
		}
	};

	const changeColumnsGap = value => {
		setAttributes({ columnsGap: value });
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

	const changeColumnsWidth = value => {
		if ( ( 0 <= value && 1200 >= value ) || undefined === value ) {
			setAttributes({ columnsWidth: value });
		}
	};

	const changeHorizontalAlign = value => {
		if ( attributes.horizontalAlign === value ) {
			return setAttributes({ horizontalAlign: 'unset' });
		}

		setAttributes({ horizontalAlign: value });
	};

	const changeColumnsHeight = value => {
		setAttributes({ columnsHeight: value });
	};

	let getColumnsHeightCustom = () => {
		let value;

		if ( 'desktop' === heightViewType ) {
			value = attributes.columnsHeightCustom;
		}

		if ( 'tablet' === heightViewType ) {
			value = attributes.columnsHeightCustomTablet;
		}

		if ( 'mobile' === heightViewType ) {
			value = attributes.columnsHeightCustomMobile;
		}

		return value;
	};

	getColumnsHeightCustom = getColumnsHeightCustom();

	const changeColumnsHeightCustom = value => {
		if ( 'desktop' === heightViewType ) {
			setAttributes({ columnsHeightCustom: value });
		}
		if ( 'tablet' === heightViewType ) {
			setAttributes({ columnsHeightCustomTablet: value });
		}
		if ( 'mobile' === heightViewType ) {
			setAttributes({ columnsHeightCustomMobile: value });
		}
	};

	const changeVerticalAlign = value => {
		if ( attributes.verticalAlign === value ) {
			return setAttributes({ verticalAlign: 'unset' });
		}

		setAttributes({ verticalAlign: value });
	};

	const changeBackgroundType = value => {
		setAttributes({ backgroundType: value });
	};

	const changeBackgroundColor = value => {
		setAttributes({ backgroundColor: value });
	};

	const removeBackgroundImage = () => {
		setAttributes({
			backgroundImageID: '',
			backgroundImageURL: ''
		});
	};

	const changeBackgroundAttachment = value => {
		setAttributes({ backgroundAttachment: value });
	};

	const changeBackgroundPosition = value => {
		setAttributes({ backgroundPosition: value });
	};

	const changeBackgroundRepeat = value => {
		setAttributes({ backgroundRepeat: value });
	};

	const changeBackgroundSize = value => {
		setAttributes({ backgroundSize: value });
	};

	const changeBackgroundImage = value => {
		setAttributes({
			backgroundImageID: value.id,
			backgroundImageURL: value.url
		});
	};

	const changeBackgroundGradient = ( firstColor, firstLocation, secondColor, secondLocation, type, angle, position ) => {
		setAttributes({
			backgroundGradientFirstColor: firstColor,
			backgroundGradientFirstLocation: firstLocation,
			backgroundGradientSecondColor: secondColor,
			backgroundGradientSecondLocation: secondLocation,
			backgroundGradientType: type,
			backgroundGradientAngle: angle,
			backgroundGradientPosition: position
		});
	};

	const changeBackgroundOverlayType = value => {
		setAttributes({ backgroundOverlayType: value });
	};

	const changeBackgroundOverlayOpacity = value => {
		setAttributes({ backgroundOverlayOpacity: value });
	};

	const changeBackgroundOverlayColor = value => {
		setAttributes({ backgroundOverlayColor: value });
	};

	const removeBackgroundOverlayImage = () => {
		setAttributes({
			backgroundOverlayImageID: '',
			backgroundOverlayImageURL: ''
		});
	};

	const changeBackgroundOverlayAttachment = value => {
		setAttributes({ backgroundOverlayAttachment: value });
	};

	const changeBackgroundOverlayPosition = value => {
		setAttributes({ backgroundOverlayPosition: value });
	};

	const changeBackgroundOverlayRepeat = value => {
		setAttributes({ backgroundOverlayRepeat: value });
	};

	const changeBackgroundOverlaySize = value => {
		setAttributes({ backgroundOverlaySize: value });
	};

	const changeBackgroundOverlayImage = value => {
		setAttributes({
			backgroundOverlayImageID: value.id,
			backgroundOverlayImageURL: value.url
		});
	};

	const changeBackgroundOverlayGradient = ( firstColor, firstLocation, secondColor, secondLocation, type, angle, position ) => {
		setAttributes({
			backgroundOverlayGradientFirstColor: firstColor,
			backgroundOverlayGradientFirstLocation: firstLocation,
			backgroundOverlayGradientSecondColor: secondColor,
			backgroundOverlayGradientSecondLocation: secondLocation,
			backgroundOverlayGradientType: type,
			backgroundOverlayGradientAngle: angle,
			backgroundOverlayGradientPosition: position
		});
	};

	const changebackgroundOverlayFilterBlur = value => {
		setAttributes({ backgroundOverlayFilterBlur: value });
	};

	const changebackgroundOverlayFilterBrightness = value => {
		setAttributes({ backgroundOverlayFilterBrightness: value });
	};

	const changebackgroundOverlayFilterContrast = value => {
		setAttributes({ backgroundOverlayFilterContrast: value });
	};

	const changebackgroundOverlayFilterGrayscale = value => {
		setAttributes({ backgroundOverlayFilterGrayscale: value });
	};

	const changebackgroundOverlayFilterHue = value => {
		setAttributes({ backgroundOverlayFilterHue: value });
	};

	const changebackgroundOverlayFilterSaturate = value => {
		setAttributes({ backgroundOverlayFilterSaturate: value });
	};

	const changebackgroundOverlayBlend = value => {
		setAttributes({ backgroundOverlayBlend: value });
	};

	const changeBorderType = value => {
		setAttributes({ borderType: value });
	};

	const borderWidthDirection = {
		top: 'borderTop',
		right: 'borderRight',
		bottom: 'borderBottom',
		left: 'borderLeft'
	};

	const changeBorder = ( type, value ) => {
		if ( 'linked' === attributes.borderType ) {
			setAttributes({ border: value });
		} else {
			setAttributes({ [borderWidthDirection[type]]: value });
		}
	};

	const getBorder = type => {
		let value;

		if ( 'top' == type ) {
			value = 'linked' === attributes.borderType ? attributes.border : attributes.borderTop;
		}

		if ( 'right' == type ) {
			value = 'linked' === attributes.borderType ? attributes.border : attributes.borderRight;
		}

		if ( 'bottom' == type ) {
			value = 'linked' === attributes.borderType ? attributes.border : attributes.borderBottom;
		}

		if ( 'left' == type ) {
			value = 'linked' === attributes.borderType ? attributes.border : attributes.borderLeft;
		}

		return value;
	};

	const changeBorderColor = value => {
		setAttributes({ borderColor: value });
	};

	const changeBorderRadiusType = value => {
		setAttributes({ borderRadiusType: value });
	};

	const borderRadiusDirection = {
		top: 'borderRadiusTop',
		right: 'borderRadiusRight',
		bottom: 'borderRadiusBottom',
		left: 'borderRadiusLeft'
	};

	const changeBorderRadius = ( type, value ) => {
		if ( 'linked' === attributes.borderRadiusType ) {
			setAttributes({ borderRadius: value });
		} else {
			setAttributes({ [borderRadiusDirection[type]]: value });
		}
	};

	const getBorderRadius = type => {
		let value;

		if ( 'top' == type ) {
			value = 'linked' === attributes.borderRadiusType ? attributes.borderRadius : attributes.borderRadiusTop;
		}

		if ( 'right' == type ) {
			value = 'linked' === attributes.borderRadiusType ? attributes.borderRadius : attributes.borderRadiusRight;
		}

		if ( 'bottom' == type ) {
			value = 'linked' === attributes.borderRadiusType ? attributes.borderRadius : attributes.borderRadiusBottom;
		}

		if ( 'left' == type ) {
			value = 'linked' === attributes.borderRadiusType ? attributes.borderRadius : attributes.borderRadiusLeft;
		}

		return value;
	};

	const changeBoxShadow = () => {
		setAttributes({ boxShadow: ! attributes.boxShadow });
	};

	const changeBoxShadowColor = value => {
		setAttributes({ boxShadowColor: value });
	};

	const changeBoxShadowColorOpacity = value => {
		setAttributes({ boxShadowColorOpacity: value });
	};

	const changeBoxShadowBlur = value => {
		setAttributes({ boxShadowBlur: value });
	};

	const changeBoxShadowSpread = value => {
		setAttributes({ boxShadowSpread: value });
	};

	const changeBoxShadowHorizontal = value => {
		setAttributes({ boxShadowHorizontal: value });
	};

	const changeBoxShadowVertical = value => {
		setAttributes({ boxShadowVertical: value });
	};

	let getDividerType = () => {
		let value;

		if ( 'top' == dividerViewType ) {
			value = attributes.dividerTopType;
		}

		if ( 'bottom' == dividerViewType ) {
			value = attributes.dividerBottomType;
		}

		return value;
	};

	getDividerType = getDividerType();

	const changeDividerType = value => {
		if ( 'top' == dividerViewType ) {
			setAttributes({ dividerTopType: value });
		}

		if ( 'bottom' == dividerViewType ) {
			setAttributes({ dividerBottomType: value });
		}
	};

	let getDividerColor = () => {
		let value;

		if ( 'top' == dividerViewType ) {
			value = attributes.dividerTopColor;
		}

		if ( 'bottom' == dividerViewType ) {
			value = attributes.dividerBottomColor;
		}

		return value;
	};

	getDividerColor = getDividerColor();

	const changeDividerColor = value => {
		if ( 'top' == dividerViewType ) {
			setAttributes({ dividerTopColor: value });
		}
		if ( 'bottom' == dividerViewType ) {
			setAttributes({ dividerBottomColor: value });
		}
	};

	let getDividerWidth = () => {
		let value;

		if ( 'top' == dividerViewType ) {
			if ( 'desktop' == dividerWidthViewType ) {
				value = attributes.dividerTopWidth;
			}

			if ( 'tablet' == dividerWidthViewType ) {
				value = attributes.dividerTopWidthTablet;
			}

			if ( 'mobile' == dividerWidthViewType ) {
				value = attributes.dividerTopWidthMobile;
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'desktop' == dividerWidthViewType ) {
				value = attributes.dividerBottomWidth;
			}

			if ( 'tablet' == dividerWidthViewType ) {
				value = attributes.dividerBottomWidthTablet;
			}

			if ( 'mobile' == dividerWidthViewType ) {
				value = attributes.dividerBottomWidthMobile;
			}
		}

		return value;
	};

	getDividerWidth = getDividerWidth();

	const changeDividerWidth = value => {
		if ( 'top' == dividerViewType ) {
			if ( 'desktop' == dividerWidthViewType ) {
				setAttributes({ dividerTopWidth: value });
			}

			if ( 'tablet' == dividerWidthViewType ) {
				setAttributes({ dividerTopWidthTablet: value });
			}

			if ( 'mobile' == dividerWidthViewType ) {
				setAttributes({ dividerTopWidthMobile: value });
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'desktop' == dividerWidthViewType ) {
				setAttributes({ dividerBottomWidth: value });
			}

			if ( 'tablet' == dividerWidthViewType ) {
				setAttributes({ dividerBottomWidthTablet: value });
			}

			if ( 'mobile' == dividerWidthViewType ) {
				setAttributes({ dividerBottomWidthMobile: value });
			}
		}
	};

	let getDividerHeight = () => {
		let value;

		if ( 'top' == dividerViewType ) {
			if ( 'desktop' == dividerHeightViewType ) {
				value = attributes.dividerTopHeight;
			}

			if ( 'tablet' == dividerHeightViewType ) {
				value = attributes.dividerTopHeightTablet;
			}

			if ( 'mobile' == dividerHeightViewType ) {
				value = attributes.dividerTopHeightMobile;
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'desktop' == dividerHeightViewType ) {
				value = attributes.dividerBottomHeight;
			}

			if ( 'tablet' == dividerHeightViewType ) {
				value = attributes.dividerBottomHeightTablet;
			}

			if ( 'mobile' == dividerHeightViewType ) {
				value = attributes.dividerBottomHeightMobile;
			}
		}

		return value;
	};

	getDividerHeight = getDividerHeight();

	const changeDividerHeight = value => {
		if ( 'top' == dividerViewType ) {
			if ( 'desktop' == dividerHeightViewType ) {
				setAttributes({ dividerTopHeight: value });
			}

			if ( 'tablet' == dividerHeightViewType ) {
				setAttributes({ dividerTopHeightTablet: value });
			}

			if ( 'mobile' == dividerHeightViewType ) {
				setAttributes({ dividerTopHeightMobile: value });
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'desktop' == dividerHeightViewType ) {
				setAttributes({ dividerBottomHeight: value });
			}

			if ( 'tablet' == dividerHeightViewType ) {
				setAttributes({ dividerBottomHeightTablet: value });
			}

			if ( 'mobile' == dividerHeightViewType ) {
				setAttributes({ dividerBottomHeightMobile: value });
			}
		}
	};

	let getDividerInvert = () => {
		let value;

		if ( 'top' == dividerViewType ) {
			value = attributes.dividerTopInvert;
		}

		if ( 'bottom' == dividerViewType ) {
			value = attributes.dividerBottomInvert;
		}

		return value;
	};

	getDividerInvert = getDividerInvert();

	const changeDividerInvert = () => {
		if ( 'top' == dividerViewType ) {
			setAttributes({ dividerTopInvert: ! attributes.dividerTopInvert });
		}

		if ( 'bottom' == dividerViewType ) {
			setAttributes({ dividerBottomInvert: ! attributes.dividerBottomInvert });
		}
	};

	const changeHideStatus = ( value, type ) => {
		if ( 'desktop' === type ) {
			setAttributes({ hide: value });
		}
		if ( 'tablet' === type ) {
			setAttributes({ hideTablet: value });
		}
		if ( 'mobile' === type ) {
			setAttributes({ hideMobile: value });
		}
	};

	const changeColumnsHTMLTag = value => {
		setAttributes({ columnsHTMLTag: value });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody className="wp-block-themeisle-blocks-advanced-columns-header-panel">
					<Button
						className={ classnames(
							'header-tab',
							{ 'is-selected': 'layout' === tab }
						) }
						onClick={ () => setTab( 'layout' ) }
					>
						<span
						>
							<Dashicon icon="editor-table"/>
							{ __( 'Layout' ) }
						</span>
					</Button>

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

				{ 'layout' === tab && (

					<Fragment>
						<PanelBody
							title={ __( 'Columns & Layout' ) }
						>
							<RangeControl
								label={ __( 'Columns' ) }
								value={ attributes.columns }
								onChange={ changeColumns }
								min={ 1 }
								max={ 6 }
							/>

							<LayoutControl
								label={ __( 'Layout' ) }
								columns={ attributes.columns }
								layout={ attributes.layout }
								layoutTablet={ attributes.layoutTablet }
								layoutMobile={ attributes.layoutMobile }
								view={ columnsViewType }
								changeViewType={ setColumnsViewType }
								onClick={ changeLayout }
							/>

							<SelectControl
								label={ __( 'Columns Gap' ) }
								value={ attributes.columnsGap }
								options={ [
									{ label: 'Default (10px)', value: 'default' },
									{ label: 'No Gap', value: 'nogap' },
									{ label: 'Narrow (5px)', value: 'narrow' },
									{ label: 'Extended (15px)', value: 'extended' },
									{ label: 'Wide (20px)', value: 'wide' },
									{ label: 'Wider (30px)', value: 'wider' }
								] }
								onChange={ changeColumnsGap }
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

						<PanelBody
							title={ __( 'Section Structure' ) }
							initialOpen={ false }
						>
							<RangeControl
								label={ __( 'Maximum Content Width' ) }
								value={ attributes.columnsWidth || '' }
								onChange={ changeColumnsWidth }
								min={ 0 }
								max={ 1200 }
							/>

							{ attributes.columnsWidth && (
								<BaseControl
									label={ 'Horizontal Align' }
								>
									<ButtonGroup className="icon-buttom-group">
										<Tooltip text={ __( 'Left' ) } >
											<IconButton
												icon="editor-alignleft"
												className="is-button is-large"
												isPrimary={ 'flex-start' === attributes.horizontalAlign }
												onClick={ () => changeHorizontalAlign( 'flex-start' ) }
											/>
										</Tooltip>

										<Tooltip text={ __( 'Center' ) } >
											<IconButton
												icon="editor-aligncenter"
												className="is-button is-large"
												isPrimary={ 'center' === attributes.horizontalAlign }
												onClick={ () => changeHorizontalAlign( 'center' ) }
											/>
										</Tooltip>

										<Tooltip text={ __( 'Right' ) } >
											<IconButton
												icon="editor-alignright"
												className="is-button is-large"
												isPrimary={ 'flex-end' === attributes.horizontalAlign }
												onClick={ () => changeHorizontalAlign( 'flex-end' ) }
											/>
										</Tooltip>
									</ButtonGroup>
								</BaseControl>
							) }

							<SelectControl
								label={ __( 'Minimum Height' ) }
								value={ attributes.columnsHeight }
								options={ [
									{ label: 'Default', value: 'auto' },
									{ label: 'Fit to Screen', value: '100vh' },
									{ label: 'Custom', value: 'custom' }
								] }
								onChange={ changeColumnsHeight }
							/>

							{ 'custom' === attributes.columnsHeight && (
								<ResponsiveControl
									label={ 'Custom Height' }
									view={ heightViewType }
									changeViewType={ setHeightViewType }
								>
									<RangeControl
										value={ getColumnsHeightCustom || '' }
										onChange={ changeColumnsHeightCustom }
										min={ 0 }
										max={ 1000 }
									/>
								</ResponsiveControl>
							) }


							<BaseControl
								label={ 'Vertical Align' }
							>
								<ButtonGroup className="icon-buttom-group">
									<Tooltip text={ __( 'Top' ) } >
										<Button
											className="components-icon-button is-button is-large"
											isPrimary={ 'flex-start' === attributes.verticalAlign }
											onClick={ () => changeVerticalAlign( 'flex-start' ) }
										>
											<Icon
												icon={ topIcon }
												size={ 20 }
											/>
										</Button>
									</Tooltip>

									<Tooltip text={ __( 'Middle' ) } >
										<Button
											className="components-icon-button is-button is-large"
											isPrimary={ 'center' === attributes.verticalAlign }
											onClick={ () => changeVerticalAlign( 'center' ) }
										>
											<Icon
												icon={ middleIcon }
												size={ 20 }
											/>
										</Button>
									</Tooltip>

									<Tooltip text={ __( 'Bottom' ) } >
										<Button
											className="components-icon-button is-button is-large"
											isPrimary={ 'flex-end' === attributes.verticalAlign }
											onClick={ () => changeVerticalAlign( 'flex-end' ) }
										>
											<Icon
												icon={ bottomIcon }
												size={ 20 }
											/>
										</Button>
									</Tooltip>
								</ButtonGroup>
							</BaseControl>
						</PanelBody>
					</Fragment>

				) || 'style' === tab && (

					<Fragment>
						<PanelBody
							title={ __( 'Background Settings' ) }
							className="wp-block-themeisle-image-container"
						>
							<BackgroundControl
								label={ __( 'Background Type' ) }
								backgroundType={ attributes.backgroundType }
								changeBackgroundType={ changeBackgroundType }
							/>

							{ 'color' === attributes.backgroundType && (

								<Fragment>
									<p>{ __( 'Background Color' ) }</p>

									<ColorPalette
										label={ 'Background Color' }
										value={ attributes.backgroundColor }
										onChange={ changeBackgroundColor }
									/>
								</Fragment>

							) || 'image' === attributes.backgroundType && (
								attributes.backgroundImageURL ?

									<Fragment>
										<div className="image-body">
											<div className="image-container">
												<div
													className="image-holder"
													style={ {
														backgroundImage: `url('${ attributes.backgroundImageURL }')`
													} }
												></div>

												<div
													className="image-delete"
													onClick={ removeBackgroundImage }
												>
													<Dashicon icon="trash" />
													<span>{ __( 'Remove Image' ) }</span>
												</div>
											</div>
										</div>

										<Button
											isDefault
											className="image-delete-button"
											onClick={ removeBackgroundImage }
										>
											{ __( 'Change or Remove Image' ) }
										</Button>

										<ControlPanelControl
											label={ 'Background Settings' }
										>

											<SelectControl
												label={ __( 'Background Attachment' ) }
												value={ attributes.backgroundAttachment }
												options={ [
													{ label: 'Scroll', value: 'scroll' },
													{ label: 'Fixed', value: 'fixed' },
													{ label: 'Local', value: 'local' }
												] }
												onChange={ changeBackgroundAttachment }
											/>

											<SelectControl
												label={ __( 'Background Position' ) }
												value={ attributes.backgroundPosition }
												options={ [
													{ label: 'Default', value: 'top left' },
													{ label: 'Top Left', value: 'top left' },
													{ label: 'Top Center', value: 'top center' },
													{ label: 'Top Right', value: 'top right' },
													{ label: 'Center Left', value: 'center left' },
													{ label: 'Center Center', value: 'center center' },
													{ label: 'Center Right', value: 'center right' },
													{ label: 'Bottom Left', value: 'bottom left' },
													{ label: 'Bottom Center', value: 'bottom center' },
													{ label: 'Bottom Right', value: 'bottom right' }
												] }
												onChange={ changeBackgroundPosition }
											/>

											<SelectControl
												label={ __( 'Background Repeat' ) }
												value={ attributes.backgroundRepeat }
												options={ [
													{ label: 'Repeat', value: 'repeat' },
													{ label: 'No-repeat', value: 'no-repeat' }
												] }
												onChange={ changeBackgroundRepeat }
											/>

											<SelectControl
												label={ __( 'Background Size' ) }
												value={ attributes.backgroundSize }
												options={ [
													{ label: 'Auto', value: 'auto' },
													{ label: 'Cover', value: 'cover' },
													{ label: 'Contain', value: 'contain' }
												] }
												onChange={ changeBackgroundSize }
											/>

										</ControlPanelControl>
									</Fragment> :

									<MediaPlaceholder
										icon="format-image"
										labels={ {
											title: __( 'Background Image' ),
											name: __( 'an image' )
										} }
										value={ attributes.backgroundImageID }
										onSelect={ changeBackgroundImage }
										accept="image/*"
										allowedTypes={ [ 'image' ] }
									/>

							) || 'gradient' === attributes.backgroundType && (
								<GradientPickerControl
									label={ 'Background Gradient' }
									value={ {
										firstColor: attributes.backgroundGradientFirstColor,
										firstLocation: attributes.backgroundGradientFirstLocation,
										secondColor: attributes.backgroundGradientSecondColor,
										secondLocation: attributes.backgroundGradientSecondLocation,
										type: attributes.backgroundGradientType,
										angle: attributes.backgroundGradientAngle,
										position: attributes.backgroundGradientPosition
									} }
									onChange={ changeBackgroundGradient }
								/>
							) }
						</PanelBody>

						<PanelBody
							title={ __( 'Background Overlay' ) }
							className="wp-block-themeisle-image-container"
							initialOpen={ false }
						>
							<BackgroundControl
								label={ __( 'Overlay Type' ) }
								backgroundType={ attributes.backgroundOverlayType }
								changeBackgroundType={ changeBackgroundOverlayType }
							/>

							<RangeControl
								label={ __( 'Overlay Opacity' ) }
								value={ attributes.backgroundOverlayOpacity }
								onChange={ changeBackgroundOverlayOpacity }
								min={ 0 }
								max={ 100 }
							/>

							{ 'color' === attributes.backgroundOverlayType && (

								<Fragment>
									<p>{ __( 'Overlay Color' ) }</p>

									<ColorPalette
										label={ 'Overlay Color' }
										value={ attributes.backgroundOverlayColor }
										onChange={ changeBackgroundOverlayColor }
									/>
								</Fragment>

							) || 'image' === attributes.backgroundOverlayType && (
								attributes.backgroundOverlayImageURL ?

									<Fragment>
										<div className="image-body">
											<div className="image-container">
												<div
													className="image-holder"
													style={ {
														backgroundImage: `url('${ attributes.backgroundOverlayImageURL }')`
													} }
												></div>

												<div
													className="image-delete"
													onClick={ removeBackgroundOverlayImage }
												>
													<Dashicon icon="trash" />
													<span>{ __( 'Remove Image' ) }</span>
												</div>
											</div>
										</div>

										<Button
											isDefault
											className="image-delete-button"
											onClick={ removeBackgroundOverlayImage }
										>
											{ __( 'Change or Remove Image' ) }
										</Button>

										<ControlPanelControl
											label={ 'Background Settings' }
										>

											<SelectControl
												label={ __( 'Background Attachment' ) }
												value={ attributes.backgroundOverlayAttachment }
												options={ [
													{ label: 'Scroll', value: 'scroll' },
													{ label: 'Fixed', value: 'fixed' },
													{ label: 'Local', value: 'local' }
												] }
												onChange={ changeBackgroundOverlayAttachment }
											/>

											<SelectControl
												label={ __( 'Background Position' ) }
												value={ attributes.backgroundOverlayPosition }
												options={ [
													{ label: 'Default', value: 'top left' },
													{ label: 'Top Left', value: 'top left' },
													{ label: 'Top Center', value: 'top center' },
													{ label: 'Top Right', value: 'top right' },
													{ label: 'Center Left', value: 'center left' },
													{ label: 'Center Center', value: 'center center' },
													{ label: 'Center Right', value: 'center right' },
													{ label: 'Bottom Left', value: 'bottom left' },
													{ label: 'Bottom Center', value: 'bottom center' },
													{ label: 'Bottom Right', value: 'bottom right' }
												] }
												onChange={ changeBackgroundOverlayPosition }
											/>

											<SelectControl
												label={ __( 'Background Repeat' ) }
												value={ attributes.backgroundOverlayRepeat }
												options={ [
													{ label: 'Repeat', value: 'repeat' },
													{ label: 'No-repeat', value: 'no-repeat' }
												] }
												onChange={ changeBackgroundOverlayRepeat }
											/>

											<SelectControl
												label={ __( 'Background Size' ) }
												value={ attributes.backgroundOverlaySize }
												options={ [
													{ label: 'Auto', value: 'auto' },
													{ label: 'Cover', value: 'cover' },
													{ label: 'Contain', value: 'contain' }
												] }
												onChange={ changeBackgroundOverlaySize }
											/>

										</ControlPanelControl>
									</Fragment> :

									<MediaPlaceholder
										icon="format-image"
										labels={ {
											title: __( 'Background Image' ),
											name: __( 'an image' )
										} }
										value={ attributes.backgroundOverlayImageID }
										onSelect={ changeBackgroundOverlayImage }
										accept="image/*"
										allowedTypes={ [ 'image' ] }
									/>

							) || 'gradient' === attributes.backgroundOverlayType && (
								<GradientPickerControl
									label={ 'Background Gradient' }
									value={ {
										firstColor: attributes.backgroundOverlayGradientFirstColor,
										firstLocation: attributes.backgroundOverlayGradientFirstLocation,
										secondColor: attributes.backgroundOverlayGradientSecondColor,
										secondLocation: attributes.backgroundOverlayGradientSecondLocation,
										type: attributes.backgroundOverlayGradientType,
										angle: attributes.backgroundOverlayGradientAngle,
										position: attributes.backgroundOverlayGradientPosition
									} }
									onChange={ changeBackgroundOverlayGradient }
								/>
							) }

							<ControlPanelControl
								label={ 'CSS Filters' }
							>

								<RangeControl
									label={ __( 'Blur' ) }
									value={ attributes.backgroundOverlayFilterBlur }
									onChange={ changebackgroundOverlayFilterBlur }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Brightness' ) }
									value={ attributes.backgroundOverlayFilterBrightness }
									onChange={ changebackgroundOverlayFilterBrightness }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Contrast' ) }
									value={ attributes.backgroundOverlayFilterContrast }
									onChange={ changebackgroundOverlayFilterContrast }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Grayscale' ) }
									value={ attributes.backgroundOverlayFilterGrayscale }
									onChange={ changebackgroundOverlayFilterGrayscale }
									min={ 0 }
									max={ 100 }
								/>

								<RangeControl
									label={ __( 'Hue' ) }
									value={ attributes.backgroundOverlayFilterHue }
									onChange={ changebackgroundOverlayFilterHue }
									min={ 0 }
									max={ 360 }
								/>

								<RangeControl
									label={ __( 'Saturation' ) }
									value={ attributes.backgroundOverlayFilterSaturate }
									onChange={ changebackgroundOverlayFilterSaturate }
									min={ 0 }
									max={ 100 }
								/>

							</ControlPanelControl>

							<SelectControl
								label={ __( 'Blend Mode' ) }
								value={ attributes.backgroundOverlayBlend }
								options={ [
									{ label: 'Normal', value: 'normal' },
									{ label: 'Multiply', value: 'multiply' },
									{ label: 'Screen', value: 'screen' },
									{ label: 'Overlay', value: 'overlay' },
									{ label: 'Darken', value: 'darken' },
									{ label: 'Lighten', value: 'lighten' },
									{ label: 'Color Dodge', value: 'color-dodge' },
									{ label: 'Color Burn', value: 'color-burn' },
									{ label: 'Hard Light', value: 'hard-light' },
									{ label: 'Soft Light', value: 'soft-light' },
									{ label: 'Difference', value: 'difference' },
									{ label: 'Exclusion', value: 'exclusion' },
									{ label: 'Hue', value: 'hue' },
									{ label: 'Saturation', value: 'saturation' },
									{ label: 'Color', value: 'color' },
									{ label: 'Luminosity', value: 'luminosity' }
								] }
								onChange={ changebackgroundOverlayBlend }
							/>
						</PanelBody>

						<PanelBody
							title={ __( 'Border' ) }
							className="wp-block-themeisle-border-container"
							initialOpen={ false }
						>
							<SizingControl
								label={ __( 'Border Width' ) }
								type={ attributes.borderType }
								min={ 0 }
								max={ 500 }
								changeType={ changeBorderType }
								onChange={ changeBorder }
								options={ [
									{
										label: __( 'Top' ),
										type: 'top',
										value: getBorder( 'top' )
									},
									{
										label: __( 'Right' ),
										type: 'right',
										value: getBorder( 'right' )
									},
									{
										label: __( 'Bottom' ),
										type: 'bottom',
										value: getBorder( 'bottom' )
									},
									{
										label: __( 'Left' ),
										type: 'left',
										value: getBorder( 'left' )
									}
								] }
							/>

							<Fragment>
								<p>{ __( 'Border Color' ) }</p>

								<ColorPalette
									label={ 'Border Color' }
									value={ attributes.borderColor }
									onChange={ changeBorderColor }
								/>
							</Fragment>

							<SizingControl
								label={ __( 'Border Radius' ) }
								type={ attributes.borderRadiusType }
								min={ 0 }
								max={ 500 }
								changeType={ changeBorderRadiusType }
								onChange={ changeBorderRadius }
								options={ [
									{
										label: __( 'Top' ),
										type: 'top',
										value: getBorderRadius( 'top' )
									},
									{
										label: __( 'Right' ),
										type: 'right',
										value: getBorderRadius( 'right' )
									},
									{
										label: __( 'Bottom' ),
										type: 'bottom',
										value: getBorderRadius( 'bottom' )
									},
									{
										label: __( 'Left' ),
										type: 'left',
										value: getBorderRadius( 'left' )
									}
								] }
							/>

							<ToggleControl
								label={ 'Box Shadow' }
								checked={ attributes.boxShadow }
								onChange={ changeBoxShadow }
							/>

							{ attributes.boxShadow && (
								<Fragment>

									<Fragment>
										<p>{ __( 'Shadow Color' ) }</p>

										<ColorPalette
											label={ 'Shadow Color' }
											value={ attributes.boxShadowColor }
											onChange={ changeBoxShadowColor }
										/>
									</Fragment>

									<ControlPanelControl
										label={ 'Border Shadow' }
									>

										<RangeControl
											label={ __( 'Opacity' ) }
											value={ attributes.boxShadowColorOpacity }
											onChange={ changeBoxShadowColorOpacity }
											min={ 0 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Blur' ) }
											value={ attributes.boxShadowBlur }
											onChange={ changeBoxShadowBlur }
											min={ 0 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Spread' ) }
											value={ attributes.boxShadowSpread }
											onChange={ changeBoxShadowSpread }
											min={ -100 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Horizontal' ) }
											value={ attributes.boxShadowHorizontal }
											onChange={ changeBoxShadowHorizontal }
											min={ -100 }
											max={ 100 }
										/>

										<RangeControl
											label={ __( 'Vertical' ) }
											value={ attributes.boxShadowVertical }
											onChange={ changeBoxShadowVertical }
											min={ -100 }
											max={ 100 }
										/>

									</ControlPanelControl>
								</Fragment>
							) }
						</PanelBody>

						<PanelBody
							title={ __( 'Shape Divider' ) }
							initialOpen={ false }
							className="wp-block-themeisle-shape-divider"
						>
							<ButtonGroup>
								<Button
									className="is-button"
									isPrimary={ 'top' === dividerViewType }
									onClick={ () => setDividerViewType( 'top' ) }
								>
									{ __( 'Top' ) }
								</Button>

								<Button
									className="is-button"
									isPrimary={ 'bottom' === dividerViewType }
									onClick={ () => setDividerViewType( 'bottom' ) }
								>
									{ __( 'Bottom' ) }
								</Button>
							</ButtonGroup>

							<SelectControl
								label={ __( 'Type' ) }
								value={ getDividerType }
								options={ [
									{ label: 'None', value: 'none' },
									{ label: 'Triangle', value: 'bigTriangle' },
									{ label: 'Right Curve', value: 'rightCurve' },
									{ label: 'Curve', value: 'curve' },
									{ label: 'Slant', value: 'slant' },
									{ label: 'Cloud', value: 'cloud' }
								] }
								onChange={ changeDividerType }
							/>

							{ 'none' !== getDividerType && (
								<Fragment>
									<Fragment>
										<p>{ __( 'Color' ) }</p>

										<ColorPalette
											label={ __( 'Color' ) }
											value={ getDividerColor }
											onChange={ changeDividerColor }
										/>
									</Fragment>

									<ResponsiveControl
										label={ 'Width' }
										view={ dividerWidthViewType }
										changeViewType={ setDividerWidthViewType }
									>
										<RangeControl
											value={ getDividerWidth }
											onChange={ changeDividerWidth }
											min={ 0 }
											max={ 500 }
										/>
									</ResponsiveControl>

									<ResponsiveControl
										label={ 'Height' }
										view={ dividerHeightViewType }
										changeViewType={ setDividerHeightViewType }
									>
										<RangeControl
											value={ getDividerHeight }
											onChange={ changeDividerHeight }
											min={ 0 }
											max={ 500 }
										/>
									</ResponsiveControl>

									{ ( 'curve' !== getDividerType && 'cloud' !== getDividerType ) && (
										<ToggleControl
											label={ 'Invert Shape Divider' }
											checked={ getDividerInvert }
											onChange={ changeDividerInvert }
										/>
									) }
								</Fragment>
							) }
						</PanelBody>
					</Fragment>

				) || 'advanced' === tab && (

					<Fragment>
						<PanelBody
							title={ __( 'Responsive' ) }
						>
							<ToggleControl
								label={ 'Hide this section in Desktop devices?' }
								checked={ attributes.hide }
								onChange={ e => changeHideStatus( e, 'desktop' ) }
							/>

							<ToggleControl
								label={ 'Hide this section in Tablet devices?' }
								checked={ attributes.hideTablet }
								onChange={ e => changeHideStatus( e, 'tablet' ) }
							/>

							<ToggleControl
								label={ 'Hide this section in Mobile devices?' }
								checked={ attributes.hideMobile }
								onChange={ e => changeHideStatus( e, 'mobile' ) }
							/>
						</PanelBody>

						<PanelBody
							title={ __( 'Section Settings' ) }
							initialOpen={ false }
						>
							<SelectControl
								label={ __( 'HTML Tag' ) }
								value={ attributes.columnsHTMLTag }
								options={ [
									{ label: 'Default (div)', value: 'div' },
									{ label: 'section', value: 'section' },
									{ label: 'header', value: 'header' },
									{ label: 'footer', value: 'footer' },
									{ label: 'article', value: 'article' },
									{ label: 'main', value: 'main' }
								] }
								onChange={ changeColumnsHTMLTag }
							/>
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
