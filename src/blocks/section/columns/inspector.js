/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	ColorPalette,
	InspectorControls,
	MediaPlaceholder
} = wp.blockEditor;

const {
	BaseControl,
	Button,
	ButtonGroup,
	Dashicon,
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl
} = wp.components;

const { useSelect } = wp.data;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import ColorBaseControl from '../../../components/color-base-control/index.js';
import LayoutControl from './../components/layout-control/index.js';
import SizingControl from '../../../components/sizing-control/index.js';
import ResponsiveControl from '../../../components/responsive-control/index.js';
import BackgroundControl from '../components/background-control/index.js';
import ControlPanelControl from '../../../components/control-panel-control/index.js';
import HTMLAnchorControl from '../../../components/html-anchor-control/index.js';

const Inspector = ({
	attributes,
	setAttributes,
	updateColumnsWidth,
	dividerViewType,
	setDividerViewType
}) => {
	const getView = useSelect( ( select ) => {
		const { getView } = select( 'themeisle-gutenberg/data' );
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : getView();
	}, []);

	const [ tab, setTab ] = useState( 'layout' );

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
		if ( 'Desktop' === getView ) {
			setAttributes({ layout: value });
			updateColumnsWidth( attributes.columns, value );
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ layoutTablet: value });
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ layoutMobile: value });
		}
	};

	const changeColumnsGap = value => {
		setAttributes({ columnsGap: value });
	};


	let getPaddingType = () => {
		let value;

		if ( 'Desktop' === getView ) {
			value = attributes.paddingType;
		}
		if ( 'Tablet' === getView ) {
			value = attributes.paddingTypeTablet;
		}
		if ( 'Mobile' === getView ) {
			value = attributes.paddingTypeMobile;
		}

		return value;
	};

	getPaddingType = getPaddingType();


	const changePaddingType = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ paddingType: value });
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ paddingTypeTablet: value });
		}
		if ( 'Mobile' === getView ) {
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
		if ( 'Desktop' === getView ) {
			if ( 'linked' === attributes.paddingType ) {
				setAttributes({ padding: value });
			} else {
				setAttributes({ [desktopPaddingType[type]]: value });
			}
		}

		if ( 'Tablet' === getView ) {
			if ( 'linked' === attributes.paddingTypeTablet ) {
				setAttributes({ paddingTablet: value });
			} else {
				setAttributes({ [tabletPaddingType[type]]: value });
			}
		}

		if ( 'Mobile' === getView ) {
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
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingTop;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingTopTablet;
			}

			if ( 'Mobile' === getView ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingTopMobile;
			}
		}

		if ( 'right' == type ) {
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingRight;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingRightTablet;
			}

			if ( 'Mobile' === getView ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingRightMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingBottom;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingBottomTablet;
			}

			if ( 'Mobile' === getView ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingBottomMobile;
			}
		}

		if ( 'left' == type ) {
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingLeft;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingLeftTablet;
			}

			if ( 'Mobile' === getView ) {
				value = 'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingLeftMobile;
			}
		}

		return value;
	};

	let getMarginType = () => {
		let value;

		if ( 'Desktop' === getView ) {
			value = attributes.marginType;
		}
		if ( 'Tablet' === getView ) {
			value = attributes.marginTypeTablet;
		}
		if ( 'Mobile' === getView ) {
			value = attributes.marginTypeMobile;
		}

		return value;
	};

	getMarginType = getMarginType();

	const changeMarginType = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ marginType: value });
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ marginTypeTablet: value });
		}
		if ( 'Mobile' === getView ) {
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
		if ( 'Desktop' === getView ) {
			if ( 'linked' === attributes.marginType ) {
				setAttributes({ margin: value });
			} else {
				setAttributes({ [desktopMarginType[type]]: value });
			}
		}

		if ( 'Tablet' === getView ) {
			if ( 'linked' === attributes.marginTypeTablet ) {
				setAttributes({ marginTablet: value });
			} else {
				setAttributes({ [tabletMarginType[type]]: value });
			}
		}

		if ( 'Mobile' === getView ) {
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
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginTop;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginTopTablet;
			}

			if ( 'Mobile' === getView ) {
				value = 'linked' === attributes.marginTypeMobile ? attributes.marginMobile : attributes.marginTopMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginBottom;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginBottomTablet;
			}

			if ( 'Mobile' === getView ) {
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

		if ( 'Desktop' === getView ) {
			value = attributes.columnsHeightCustom;
		}

		if ( 'Tablet' === getView ) {
			value = attributes.columnsHeightCustomTablet;
		}

		if ( 'Mobile' === getView ) {
			value = attributes.columnsHeightCustomMobile;
		}

		return value;
	};

	getColumnsHeightCustom = getColumnsHeightCustom();

	const changeColumnsHeightCustom = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ columnsHeightCustom: value });
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ columnsHeightCustomTablet: value });
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ columnsHeightCustomMobile: value });
		}
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

	const changeBackgroundGradient = value => {
		setAttributes({ backgroundGradient: value });
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

	const changeBackgroundOverlayGradient = value => {
		setAttributes({ backgroundOverlayGradient: value });
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
			if ( 'Desktop' == getView ) {
				value = attributes.dividerTopWidth;
			}

			if ( 'Tablet' == getView ) {
				value = attributes.dividerTopWidthTablet;
			}

			if ( 'Mobile' == getView ) {
				value = attributes.dividerTopWidthMobile;
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'Desktop' == getView ) {
				value = attributes.dividerBottomWidth;
			}

			if ( 'Tablet' == getView ) {
				value = attributes.dividerBottomWidthTablet;
			}

			if ( 'Mobile' == getView ) {
				value = attributes.dividerBottomWidthMobile;
			}
		}

		return value;
	};

	getDividerWidth = getDividerWidth();

	const changeDividerWidth = value => {
		if ( 'top' == dividerViewType ) {
			if ( 'Desktop' == getView ) {
				setAttributes({ dividerTopWidth: value });
			}

			if ( 'Tablet' == getView ) {
				setAttributes({ dividerTopWidthTablet: value });
			}

			if ( 'Mobile' == getView ) {
				setAttributes({ dividerTopWidthMobile: value });
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'Desktop' == getView ) {
				setAttributes({ dividerBottomWidth: value });
			}

			if ( 'Tablet' == getView ) {
				setAttributes({ dividerBottomWidthTablet: value });
			}

			if ( 'Mobile' == getView ) {
				setAttributes({ dividerBottomWidthMobile: value });
			}
		}
	};

	let getDividerHeight = () => {
		let value;

		if ( 'top' == dividerViewType ) {
			if ( 'Desktop' == getView ) {
				value = attributes.dividerTopHeight;
			}

			if ( 'Tablet' == getView ) {
				value = attributes.dividerTopHeightTablet;
			}

			if ( 'Mobile' == getView ) {
				value = attributes.dividerTopHeightMobile;
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'Desktop' == getView ) {
				value = attributes.dividerBottomHeight;
			}

			if ( 'Tablet' == getView ) {
				value = attributes.dividerBottomHeightTablet;
			}

			if ( 'Mobile' == getView ) {
				value = attributes.dividerBottomHeightMobile;
			}
		}

		return value;
	};

	getDividerHeight = getDividerHeight();

	const changeDividerHeight = value => {
		if ( 'top' == dividerViewType ) {
			if ( 'Desktop' == getView ) {
				setAttributes({ dividerTopHeight: value });
			}

			if ( 'Tablet' == getView ) {
				setAttributes({ dividerTopHeightTablet: value });
			}

			if ( 'Mobile' == getView ) {
				setAttributes({ dividerTopHeightMobile: value });
			}
		}

		if ( 'bottom' == dividerViewType ) {
			if ( 'Desktop' == getView ) {
				setAttributes({ dividerBottomHeight: value });
			}

			if ( 'Tablet' == getView ) {
				setAttributes({ dividerBottomHeightTablet: value });
			}

			if ( 'Mobile' == getView ) {
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
		if ( 'Desktop' === type ) {
			setAttributes({ hide: value });
		}
		if ( 'Tablet' === type ) {
			setAttributes({ hideTablet: value });
		}
		if ( 'Mobile' === type ) {
			setAttributes({ hideMobile: value });
		}
	};

	const changeReverseColumns = ( value, type ) => {
		if ( 'Tablet' === type ) {
			setAttributes({ reverseColumnsTablet: value });
		}
		if ( 'Mobile' === type ) {
			setAttributes({ reverseColumnsMobile: value });
		}
	};

	const changeColumnsHTMLTag = value => {
		setAttributes({ columnsHTMLTag: value });
	};

	const changeID = value => {
		setAttributes({ id: value });
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
						<span>
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
						<span>
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
						<span>
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
									<ButtonGroup className="wp-block-themeisle-icon-buttom-group">
										<Button
											icon="editor-alignleft"
											label={ __( 'Left' ) }
											showTooltip={ true }
											isLarge
											isPrimary={ 'flex-start' === attributes.horizontalAlign }
											onClick={ () => changeHorizontalAlign( 'flex-start' ) }
										/>

										<Button
											icon="editor-aligncenter"
											label={ __( 'Center' ) }
											showTooltip={ true }
											isLarge
											isPrimary={ 'center' === attributes.horizontalAlign }
											onClick={ () => changeHorizontalAlign( 'center' ) }
										/>

										<Button
											icon="editor-alignright"
											label={ __( 'Right' ) }
											showTooltip={ true }
											isLarge
											isPrimary={ 'flex-end' === attributes.horizontalAlign }
											onClick={ () => changeHorizontalAlign( 'flex-end' ) }
										/>
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
								>
									<RangeControl
										value={ getColumnsHeightCustom || '' }
										onChange={ changeColumnsHeightCustom }
										min={ 0 }
										max={ 1000 }
									/>
								</ResponsiveControl>
							) }
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

								<ColorBaseControl
									label={ __( 'Background Color' ) }
									colorValue={ attributes.backgroundColor }
								>
									<ColorPalette
										label={ 'Background Color' }
										value={ attributes.backgroundColor }
										onChange={ changeBackgroundColor }
									/>
								</ColorBaseControl>

							) || 'image' === attributes.backgroundType && (
								attributes.backgroundImageURL ?

									<Fragment>
										<div className="wp-block-themeisle-image-container-body">
											<div className="wp-block-themeisle-image-container-area">
												<div
													className="wp-block-themeisle-image-container-holder"
													style={ {
														backgroundImage: `url('${ attributes.backgroundImageURL }')`
													} }
												></div>

												<div
													className="wp-block-themeisle-image-container-delete"
													onClick={ removeBackgroundImage }
												>
													<Dashicon icon="trash" />
													<span>{ __( 'Remove Image' ) }</span>
												</div>
											</div>
										</div>

										<Button
											isSecondary
											className="wp-block-themeisle-image-container-delete-button"
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
								<ColorGradientControl
									label={ 'Background Gradient' }
									gradientValue={ attributes.backgroundGradient }
									disableCustomColors={ true }
									onGradientChange={ changeBackgroundGradient }
									clearable={ false }
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

								<ColorBaseControl
									label={ __( 'Overlay Color' ) }
									colorValue={ attributes.backgroundOverlayColor }
								>
									<ColorPalette
										label={ 'Overlay Color' }
										value={ attributes.backgroundOverlayColor }
										onChange={ changeBackgroundOverlayColor }
									/>
								</ColorBaseControl>

							) || 'image' === attributes.backgroundOverlayType && (
								attributes.backgroundOverlayImageURL ?

									<Fragment>
										<div className="wp-block-themeisle-image-container-body">
											<div className="wp-block-themeisle-image-container-area">
												<div
													className="wp-block-themeisle-image-container-holder"
													style={ {
														backgroundImage: `url('${ attributes.backgroundOverlayImageURL }')`
													} }
												></div>

												<div
													className="wp-block-themeisle-image-container-delete"
													onClick={ removeBackgroundOverlayImage }
												>
													<Dashicon icon="trash" />
													<span>{ __( 'Remove Image' ) }</span>
												</div>
											</div>
										</div>

										<Button
											isSecondary
											className="wp-block-themeisle-image-container-delete-button"
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
								<ColorGradientControl
									label={ 'Background Gradient' }
									gradientValue={ attributes.backgroundOverlayGradient }
									disableCustomColors={ true }
									onGradientChange={ changeBackgroundOverlayGradient }
									clearable={ false }
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

							<ColorBaseControl
								label={ __( 'Border Color' ) }
								colorValue={ attributes.borderColor }
							>
								<ColorPalette
									label={ 'Border Color' }
									value={ attributes.borderColor }
									onChange={ changeBorderColor }
								/>
							</ColorBaseControl>

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

									<ColorBaseControl
										label={ __( 'Shadow Color' ) }
										colorValue={ attributes.boxShadowColor }
									>
										<ColorPalette
											label={ 'Shadow Color' }
											value={ attributes.boxShadowColor }
											onChange={ changeBoxShadowColor }
										/>
									</ColorBaseControl>

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
									isSmall
									isSecondary={ 'top' !== dividerViewType }
									isPrimary={ 'top' === dividerViewType }
									onClick={ () => setDividerViewType( 'top' ) }
								>
									{ __( 'Top' ) }
								</Button>

								<Button
									isSmall
									isSecondary={ 'bottom' !== dividerViewType }
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
									<ColorBaseControl
										label={ __( 'Color' ) }
										colorValue={ getDividerColor }
									>
										<ColorPalette
											label={ __( 'Color' ) }
											value={ getDividerColor }
											onChange={ changeDividerColor }
										/>
									</ColorBaseControl>

									<ResponsiveControl
										label={ 'Width' }
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
								onChange={ e => changeHideStatus( e, 'Desktop' ) }
							/>

							<ToggleControl
								label={ 'Hide this section in Tablet devices?' }
								checked={ attributes.hideTablet }
								onChange={ e => changeHideStatus( e, 'Tablet' ) }
							/>

							<ToggleControl
								label={ 'Hide this section in Mobile devices?' }
								checked={ attributes.hideMobile }
								onChange={ e => changeHideStatus( e, 'Mobile' ) }
							/>

							<hr/>

							{ ( ! attributes.hideTablet && 'collapsedRows' === attributes.layoutTablet ) && (
								<ToggleControl
									label={ 'Reverse Columns in Tablet devices?' }
									checked={ attributes.reverseColumnsTablet }
									onChange={ e => changeReverseColumns( e, 'Tablet' ) }
								/>
							) }

							{ ( ! attributes.hideMobile && 'collapsedRows' === attributes.layoutMobile ) && (
								<ToggleControl
									label={ 'Reverse Columns in Mobile devices?' }
									checked={ attributes.reverseColumnsMobile }
									onChange={ e => changeReverseColumns( e, 'Mobile' ) }
								/>
							) }
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

			<HTMLAnchorControl
				value={ attributes.id }
				onChange={ changeID }
			/>
		</Fragment>
	);
};

export default Inspector;
