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
	Button,
	Dashicon,
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl
} = wp.components;


const { useSelect } = wp.data;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import ColorBaseControl from '../../../components/color-base-control/index.js';
import SizingControl from '../../../components/sizing-control/index.js';
import ResponsiveControl from '../../../components/responsive-control/index.js';
import BackgroundControl from '../components/background-control/index.js';
import ControlPanelControl from '../../../components/control-panel-control/index.js';

const Inspector = ({
	attributes,
	setAttributes,
	isSelected,
	clientId,
	adjacentBlock,
	parentBlock,
	updateBlockAttributes,
	adjacentBlockClientId
}) => {
	const getView = useSelect( ( select ) => {
		const { getView } = select( 'themeisle-gutenberg/data' );
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : getView();
	}, []);

	useEffect( () => {
		if ( 1 < parentBlock.innerBlocks.length ) {
			if ( ! adjacentBlockClientId ) {
				const blockId = parentBlock.innerBlocks.findIndex( e => e.clientId === clientId );
				const previousBlock = parentBlock.innerBlocks[ blockId - 1 ];
				nextBlock.current = previousBlock.clientId;
				nextBlockWidth.current = previousBlock.attributes.columnWidth;
			}
		}
	}, []);

	useEffect( () => {
		if ( 1 < parentBlock.innerBlocks.length ) {
			if ( ! adjacentBlockClientId ) {
				const blockId = parentBlock.innerBlocks.findIndex( e => e.clientId === clientId );
				const previousBlock = parentBlock.innerBlocks[ blockId - 1 ];
				nextBlockWidth.current = previousBlock.attributes.columnWidth;
				nextBlock.current = previousBlock.clientId;
				currentBlockWidth.current = attributes.columnWidth;
			} else {
				nextBlockWidth.current = adjacentBlock.attributes.columnWidth;
				nextBlock.current = adjacentBlockClientId;
				currentBlockWidth.current = attributes.columnWidth;
			}
		}
	}, [ isSelected, attributes.columnWidth, parentBlock.innerBlocks.length ]);

	const [ tab, setTab ] = useState( 'layout' );

	const currentBlockWidth = useRef( attributes.columnWidth );
	const nextBlock = useRef( adjacentBlockClientId && adjacentBlockClientId );
	const nextBlockWidth = useRef( adjacentBlock && adjacentBlock.attributes.columnWidth );

	const changeColumnWidth = value => {
		const width = value || 10;
		const nextWidth = ( Number( currentBlockWidth.current ) - width ) + Number( nextBlockWidth.current );
		currentBlockWidth.current = width;
		nextBlockWidth.current = nextWidth;
		setAttributes({ columnWidth: width.toFixed( 2 ) });
		updateBlockAttributes( nextBlock.current, {
			columnWidth: nextWidth.toFixed( 2 )
		});
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
		right: 'marginRight',
		bottom: 'marginBottom',
		left: 'marginLeft'
	};

	const tabletMarginType = {
		top: 'marginTopTablet',
		right: 'marginRightTablet',
		bottom: 'marginBottomTablet',
		left: 'marginLeftTablet'
	};

	const mobileMarginType = {
		top: 'marginTopMobile',
		right: 'marginRightMobile',
		bottom: 'marginBottomMobile',
		left: 'marginLeftMobile'
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

		if ( 'right' == type ) {
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginRight;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginRightTablet;
			}

			if ( 'Mobile' === getView ) {
				value = 'linked' === attributes.marginTypeMobile ? attributes.marginMobile : attributes.marginRightMobile;
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

		if ( 'left' == type ) {
			if ( 'Desktop' === getView ) {
				value = 'linked' === attributes.marginType ? attributes.margin : attributes.marginLeft;
			}

			if ( 'Tablet' === getView ) {
				value = 'linked' === attributes.marginTypeTablet ? attributes.marginTablet : attributes.marginLeftTablet;
			}

			if ( 'Mobile' === getView ) {
				value = 'linked' === attributes.marginTypeMobile ? attributes.marginMobile : attributes.marginLeftMobile;
			}
		}

		return value;
	};

	const changeBackgroundType = value => {
		setAttributes({ backgroundType: value });
	};

	const changeBackgroundColor = value => {
		setAttributes({ backgroundColor: value });
	};

	const changeBackgroundImage = value => {
		setAttributes({
			backgroundImageID: value.id,
			backgroundImageURL: value.url
		});
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

	const changeBackgroundGradient = value => {
		setAttributes({ backgroundGradient: value });
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

	const changeColumnsHTMLTag = value => {
		setAttributes({ columnsHTMLTag: value });
	};

	return (
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
						title={ __( 'Spacing' ) }
					>
						{ ( 1 < parentBlock.innerBlocks.length ) && (
							<RangeControl
								label={ __( 'Column Width' ) }
								value={ Number( attributes.columnWidth ) }
								onChange={ changeColumnWidth }
								min={ 10 }
								max={ ( Number( attributes.columnWidth ) + Number( nextBlockWidth.current ) ) - 10 }
							/>
						) }

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
										type: 'right',
										value: getMargin( 'right' )
									},
									{
										label: __( 'Bottom' ),
										type: 'bottom',
										value: getMargin( 'bottom' )
									},
									{
										label: __( 'Left' ),
										type: 'left',
										value: getMargin( 'left' )
									}
								] }
							/>
						</ResponsiveControl>
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
								colorValue={ attributes.headingColor }
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
							/>
						) }
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
									label={ 'Shadow Properties' }
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
				</Fragment>
			) || 'advanced' === tab && (
				<PanelBody
					title={ __( 'Section Settings' ) }
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
			) }
		</InspectorControls>
	);
};

export default Inspector;
