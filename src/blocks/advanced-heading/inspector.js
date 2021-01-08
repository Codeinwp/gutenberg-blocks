/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const { AlignmentToolbar, ColorPalette, InspectorControls } = wp.blockEditor;

const { Button, Dashicon, PanelBody, RangeControl, ToggleControl } = wp.components;

const { useSelect } = wp.data;

const { Fragment, useState } = wp.element;

/**
 * Internal dependencies
 */
import ColorBaseControl from '../../components/color-base-control/index.js';
import GoogleFontsControl from '../../components/google-fonts-control/index.js';
import ControlPanelControl from '../../components/control-panel-control/index.js';
import ResponsiveControl from '../../components/responsive-control/index.js';
import SizingControl from '../../components/sizing-control/index.js';
import HTMLAnchorControl from '../../components/html-anchor-control/index.js';

const Inspector = ({
	attributes,
	setAttributes,
	changeFontFamily,
	changeFontVariant,
	changeFontStyle,
	changeTextTransform,
	changeLineHeight,
	changeLetterSpacing,
}) => {
	const getView = useSelect((select) => {
		const { getView } = select('themeisle-gutenberg/data');
		const { __experimentalGetPreviewDeviceType } = select('core/edit-post');

		return __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : getView();
	}, []);

	const [tab, setTab] = useState('style');

	const changeHeadingColor = (value) => {
		setAttributes({ headingColor: value });
	};

	let getFontSize = () => {
		let value;

		if ('Desktop' === getView) {
			value = attributes.fontSize;
		}

		if ('Tablet' === getView) {
			value = attributes.fontSizeTablet;
		}

		if ('Mobile' === getView) {
			value = attributes.fontSizeMobile;
		}

		return value;
	};

	getFontSize = getFontSize();

	const changeFontSize = (value) => {
		if ('Desktop' === getView) {
			setAttributes({ fontSize: value });
		}

		if ('Tablet' === getView) {
			setAttributes({ fontSizeTablet: value });
		}

		if ('Mobile' === getView) {
			setAttributes({ fontSizeMobile: value });
		}
	};

	let getAlignment = () => {
		let value;

		if ('Desktop' === getView) {
			value = attributes.align;
		}

		if ('Tablet' === getView) {
			value = attributes.alignTablet;
		}

		if ('Mobile' === getView) {
			value = attributes.alignMobile;
		}

		return value;
	};

	getAlignment = getAlignment();

	const changeAlignment = (value) => {
		if ('Desktop' === getView) {
			setAttributes({ align: value });
		}

		if ('Tablet' === getView) {
			setAttributes({ alignTablet: value });
		}

		if ('Mobile' === getView) {
			setAttributes({ alignMobile: value });
		}
	};

	const changeTextShadowColor = (value) => {
		setAttributes({ textShadowColor: value });
	};

	const changeTextShadow = (value) => {
		setAttributes({ textShadow: value });
	};

	const changeTextShadowColorOpacity = (value) => {
		setAttributes({ textShadowColorOpacity: value });
	};

	const changeTextShadowBlur = (value) => {
		setAttributes({ textShadowBlur: value });
	};

	const changeTextShadowHorizontal = (value) => {
		setAttributes({ textShadowHorizontal: value });
	};

	const changeTextShadowVertical = (value) => {
		setAttributes({ textShadowVertical: value });
	};

	const changeHighlightColor = (value) => {
		setAttributes({ highlightColor: value });
	};

	const changeHighlightBackground = (value) => {
		setAttributes({ highlightBackground: value });
	};

	let getPaddingType = () => {
		let value;

		if ('Desktop' === getView) {
			value = attributes.paddingType;
		}
		if ('Tablet' === getView) {
			value = attributes.paddingTypeTablet;
		}
		if ('Mobile' === getView) {
			value = attributes.paddingTypeMobile;
		}

		return value;
	};

	getPaddingType = getPaddingType();

	const changePaddingType = (value) => {
		if ('Desktop' === getView) {
			setAttributes({ paddingType: value });
		}
		if ('Tablet' === getView) {
			setAttributes({ paddingTypeTablet: value });
		}
		if ('Mobile' === getView) {
			setAttributes({ paddingTypeMobile: value });
		}
	};

	const desktopPaddingType = {
		top: 'paddingTop',
		right: 'paddingRight',
		bottom: 'paddingBottom',
		left: 'paddingLeft',
	};

	const tabletPaddingType = {
		top: 'paddingTopTablet',
		right: 'paddingRightTablet',
		bottom: 'paddingBottomTablet',
		left: 'paddingLeftTablet',
	};

	const mobilePaddingType = {
		top: 'paddingTopMobile',
		right: 'paddingRightMobile',
		bottom: 'paddingBottomMobile',
		left: 'paddingLeftMobile',
	};

	const changePadding = (type, value) => {
		if ('Desktop' === getView) {
			if ('linked' === attributes.paddingType) {
				setAttributes({ padding: value });
			} else {
				setAttributes({ [desktopPaddingType[type]]: value });
			}
		}

		if ('Tablet' === getView) {
			if ('linked' === attributes.paddingTypeTablet) {
				setAttributes({ paddingTablet: value });
			} else {
				setAttributes({ [tabletPaddingType[type]]: value });
			}
		}

		if ('Mobile' === getView) {
			if ('linked' === attributes.paddingTypeMobile) {
				setAttributes({ paddingMobile: value });
			} else {
				setAttributes({ [mobilePaddingType[type]]: value });
			}
		}
	};

	const getPadding = (type) => {
		let value;

		if ('top' == type) {
			if ('Desktop' === getView) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingTop;
			}

			if ('Tablet' === getView) {
				value =
					'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingTopTablet;
			}

			if ('Mobile' === getView) {
				value =
					'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingTopMobile;
			}
		}

		if ('right' == type) {
			if ('Desktop' === getView) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingRight;
			}

			if ('Tablet' === getView) {
				value =
					'linked' === attributes.paddingTypeTablet
						? attributes.paddingTablet
						: attributes.paddingRightTablet;
			}

			if ('Mobile' === getView) {
				value =
					'linked' === attributes.paddingTypeMobile
						? attributes.paddingMobile
						: attributes.paddingRightMobile;
			}
		}

		if ('bottom' == type) {
			if ('Desktop' === getView) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingBottom;
			}

			if ('Tablet' === getView) {
				value =
					'linked' === attributes.paddingTypeTablet
						? attributes.paddingTablet
						: attributes.paddingBottomTablet;
			}

			if ('Mobile' === getView) {
				value =
					'linked' === attributes.paddingTypeMobile
						? attributes.paddingMobile
						: attributes.paddingBottomMobile;
			}
		}

		if ('left' == type) {
			if ('Desktop' === getView) {
				value = 'linked' === attributes.paddingType ? attributes.padding : attributes.paddingLeft;
			}

			if ('Tablet' === getView) {
				value =
					'linked' === attributes.paddingTypeTablet ? attributes.paddingTablet : attributes.paddingLeftTablet;
			}

			if ('Mobile' === getView) {
				value =
					'linked' === attributes.paddingTypeMobile ? attributes.paddingMobile : attributes.paddingLeftMobile;
			}
		}

		return value;
	};

	let getMarginType = () => {
		let value;

		if ('Desktop' === getView) {
			value = attributes.marginType;
		}
		if ('Tablet' === getView) {
			value = attributes.marginTypeTablet;
		}
		if ('Mobile' === getView) {
			value = attributes.marginTypeMobile;
		}

		return value;
	};

	getMarginType = getMarginType();

	const changeMarginType = (value) => {
		if ('Desktop' === getView) {
			setAttributes({ marginType: value });
		}
		if ('Tablet' === getView) {
			setAttributes({ marginTypeTablet: value });
		}
		if ('Mobile' === getView) {
			setAttributes({ marginTypeMobile: value });
		}
	};

	const desktopMarginType = {
		top: 'marginTop',
		bottom: 'marginBottom',
	};

	const tabletMarginType = {
		top: 'marginTopTablet',
		bottom: 'marginBottomTablet',
	};

	const mobileMarginType = {
		top: 'marginTopMobile',
		bottom: 'marginBottomMobile',
	};

	const changeMargin = (type, value) => {
		if ('Desktop' === getView) {
			if ('linked' === attributes.marginType) {
				setAttributes({ margin: value });
			} else {
				setAttributes({ [desktopMarginType[type]]: value });
			}
		}

		if ('Tablet' === getView) {
			if ('linked' === attributes.marginTypeTablet) {
				setAttributes({ marginTablet: value });
			} else {
				setAttributes({ [tabletMarginType[type]]: value });
			}
		}

		if ('Mobile' === getView) {
			if ('linked' === attributes.marginTypeMobile) {
				setAttributes({ marginMobile: value });
			} else {
				setAttributes({ [mobileMarginType[type]]: value });
			}
		}
	};

	const getMargin = (type) => {
		let value;

		if ('top' == type) {
			if ('Desktop' === getView) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginTop;
			}

			if ('Tablet' === getView) {
				value = 'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginTopTablet;
			}

			if ('Mobile' === getView) {
				value = 'linked' === attributes.marginTypeMobile ? attributes.marginMobile : attributes.marginTopMobile;
			}
		}

		if ('bottom' == type) {
			if ('Desktop' === getView) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginBottom;
			}

			if ('Tablet' === getView) {
				value =
					'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginBottomTablet;
			}

			if ('Mobile' === getView) {
				value =
					'linked' === attributes.marginTypeMobile ? attributes.marginMobile : attributes.marginBottomMobile;
			}
		}

		return value;
	};

	const changeID = (value) => {
		setAttributes({ id: value });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody className="wp-block-themeisle-blocks-advanced-heading-header-panel">
					<Button
						className={classnames('header-tab', { 'is-selected': 'style' === tab })}
						onClick={() => setTab('style')}
					>
						<span>
							<Dashicon icon="admin-customizer" />
							{__('Style')}
						</span>
					</Button>

					<Button
						className={classnames('header-tab', { 'is-selected': 'advanced' === tab })}
						onClick={() => setTab('advanced')}
					>
						<span>
							<Dashicon icon="admin-generic" />
							{__('Advanced')}
						</span>
					</Button>
				</PanelBody>

				{('style' === tab && (
					<Fragment>
						<PanelBody title={__('General Settings')}>
							<ColorBaseControl label={__('Heading Color')} colorValue={attributes.headingColor}>
								<ColorPalette
									label={'Heading Color'}
									value={attributes.headingColor}
									onChange={changeHeadingColor}
								/>
							</ColorBaseControl>

							<ResponsiveControl label={'Font Size'}>
								<RangeControl value={getFontSize || ''} onChange={changeFontSize} min={1} max={500} />
							</ResponsiveControl>

							<ResponsiveControl label={'Alignment'}>
								<AlignmentToolbar value={getAlignment} onChange={changeAlignment} isCollapsed={false} />
							</ResponsiveControl>
						</PanelBody>

						<PanelBody title={__('Typography Settings')} initialOpen={false}>
							<GoogleFontsControl
								label={__('Font Family')}
								value={attributes.fontFamily}
								onChangeFontFamily={changeFontFamily}
								valueVariant={attributes.fontVariant}
								onChangeFontVariant={changeFontVariant}
								valueStyle={attributes.fontStyle}
								onChangeFontStyle={changeFontStyle}
								valueTransform={attributes.textTransform}
								onChangeTextTransform={changeTextTransform}
							/>

							<RangeControl
								label={__('Line Height')}
								value={attributes.lineHeight}
								onChange={changeLineHeight}
								min={0}
								max={200}
							/>

							<RangeControl
								label={__('Letter Spacing')}
								value={attributes.letterSpacing}
								onChange={changeLetterSpacing}
								min={-50}
								max={100}
							/>

							<ToggleControl
								label={'Shadow Properties'}
								checked={attributes.textShadow}
								onChange={changeTextShadow}
							/>

							{attributes.textShadow && (
								<Fragment>
									<ColorBaseControl label={__('Color')} colorValue={attributes.textShadowColor}>
										<ColorPalette
											label={__('Color')}
											value={attributes.textShadowColor}
											onChange={changeTextShadowColor}
										/>
									</ColorBaseControl>

									<ControlPanelControl label={'Shadow Properties'}>
										<RangeControl
											label={__('Opacity')}
											value={attributes.textShadowColorOpacity}
											onChange={changeTextShadowColorOpacity}
											min={0}
											max={100}
										/>

										<RangeControl
											label={__('Blur')}
											value={attributes.textShadowBlur}
											onChange={changeTextShadowBlur}
											min={0}
											max={100}
										/>

										<RangeControl
											label={__('Horizontal')}
											value={attributes.textShadowHorizontal}
											onChange={changeTextShadowHorizontal}
											min={-100}
											max={100}
										/>

										<RangeControl
											label={__('Vertical')}
											value={attributes.textShadowVertical}
											onChange={changeTextShadowVertical}
											min={-100}
											max={100}
										/>
									</ControlPanelControl>
								</Fragment>
							)}
						</PanelBody>
					</Fragment>
				)) ||
					('advanced' === tab && (
						<Fragment>
							<PanelBody title={__('Highlight Color')}>
								<ColorBaseControl label={__('Highlight Color')} colorValue={attributes.highlightColor}>
									<ColorPalette
										label={'Highlight Color'}
										value={attributes.highlightColor}
										onChange={changeHighlightColor}
									/>
								</ColorBaseControl>

								<ColorBaseControl
									label={__('Highlight Background')}
									colorValue={attributes.highlightBackground}
								>
									<ColorPalette
										label={'Highlight Background'}
										value={attributes.highlightBackground}
										onChange={changeHighlightBackground}
									/>
								</ColorBaseControl>
							</PanelBody>

							<PanelBody title={__('Spacing')} initialOpen={false}>
								<ResponsiveControl label={'Padding'}>
									<SizingControl
										type={getPaddingType}
										min={0}
										max={500}
										changeType={changePaddingType}
										onChange={changePadding}
										options={[
											{
												label: __('Top'),
												type: 'top',
												value: getPadding('top'),
											},
											{
												label: __('Right'),
												type: 'right',
												value: getPadding('right'),
											},
											{
												label: __('Bottom'),
												type: 'bottom',
												value: getPadding('bottom'),
											},
											{
												label: __('Left'),
												type: 'left',
												value: getPadding('left'),
											},
										]}
									/>
								</ResponsiveControl>

								<ResponsiveControl label={'Margin'}>
									<SizingControl
										type={getMarginType}
										min={-500}
										max={500}
										changeType={changeMarginType}
										onChange={changeMargin}
										options={[
											{
												label: __('Top'),
												type: 'top',
												value: getMargin('top'),
											},
											{
												label: __('Right'),
												disabled: true,
											},
											{
												label: __('Bottom'),
												type: 'bottom',
												value: getMargin('bottom'),
											},
											{
												label: __('Left'),
												disabled: true,
											},
										]}
									/>
								</ResponsiveControl>
							</PanelBody>
						</Fragment>
					))}
			</InspectorControls>

			<HTMLAnchorControl value={attributes.id} onChange={changeID} />
		</Fragment>
	);
};

export default Inspector;
