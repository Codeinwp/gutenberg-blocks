/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	PanelBody,
	SelectControl
} = wp.components;

const { compose } = wp.compose;

const { withSelect } = wp.data;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import ResponsiveControl from '../../../../components/responsive-control/index.js';
import SizingControl from '../../../../components/sizing-control/index.js';

const SectionColumn = ({
	blockName,
	defaults,
	changeConfig,
	view
}) => {
	let getPaddingType = () => {
		let value;

		if ( 'Desktop' === view ) {
			value = defaults.paddingType;
		}
		if ( 'Tablet' === view ) {
			value = defaults.paddingTypeTablet;
		}
		if ( 'Mobile' === view ) {
			value = defaults.paddingTypeMobile;
		}

		return value;
	};

	getPaddingType = getPaddingType();

	const changePaddingType = value => {
		if ( 'Desktop' === view ) {
			changeConfig( blockName, {
				paddingType: value
			});
		}
		if ( 'Tablet' === view ) {
			changeConfig( blockName, {
				paddingTypeTablet: value
			});
		}
		if ( 'Mobile' === view ) {
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
		if ( 'Desktop' === view ) {
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

		if ( 'Tablet' === view ) {
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

		if ( 'Mobile' === view ) {
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
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingTop;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingTopTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingTopMobile;
			}
		}

		if ( 'right' == type ) {
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingRight;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingRightTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingRightMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingBottom;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingBottomTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingBottomMobile;
			}
		}

		if ( 'left' == type ) {
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.paddingType ? defaults.padding : defaults.paddingLeft;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.paddingTypeTablet ? defaults.paddingTablet : defaults.paddingLeftTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.paddingTypeMobile ? defaults.paddingMobile : defaults.paddingLeftMobile;
			}
		}

		return value;
	};

	let getMarginType = () => {
		let value;

		if ( 'Desktop' === view ) {
			value = defaults.marginType;
		}
		if ( 'Tablet' === view ) {
			value = defaults.marginTypeTablet;
		}
		if ( 'Mobile' === view ) {
			value = defaults.marginTypeMobile;
		}

		return value;
	};

	getMarginType = getMarginType();

	const changeMarginType = value => {
		if ( 'Desktop' === view ) {
			changeConfig( blockName, {
				marginType: value
			});
		}
		if ( 'Tablet' === view ) {
			changeConfig( blockName, {
				marginTypeTablet: value
			});
		}
		if ( 'Mobile' === view ) {
			changeConfig( blockName, {
				marginTypeMobile: value
			});
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
		if ( 'Desktop' === view ) {
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

		if ( 'Tablet' === view ) {
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

		if ( 'Mobile' === view ) {
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
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.marginType ? defaults.margin : defaults.marginTop;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.marginTypeTablet ? defaults.marginTablet : defaults.marginTopTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.marginTypeMobile ? defaults.marginMobile : defaults.marginTopMobile;
			}
		}

		if ( 'right' == type ) {
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.marginType ? defaults.margin : defaults.marginRight;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.marginTypeTablet ? defaults.marginTablet : defaults.marginRightTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.marginTypeMobile ? defaults.marginMobile : defaults.marginRightMobile;
			}
		}

		if ( 'bottom' == type ) {
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.marginType ? defaults.margin : defaults.marginBottom;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.marginTypeTablet ? defaults.marginTablet : defaults.marginBottomTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.marginTypeMobile ? defaults.marginMobile : defaults.marginBottomMobile;
			}
		}

		if ( 'left' == type ) {
			if ( 'Desktop' === view ) {
				value = 'linked' === defaults.marginType ? defaults.margin : defaults.marginLeft;
			}

			if ( 'Tablet' === view ) {
				value = 'linked' === defaults.marginTypeTablet ? defaults.marginTablet : defaults.marginLeftTablet;
			}

			if ( 'Mobile' === view ) {
				value = 'linked' === defaults.marginTypeMobile ? defaults.marginMobile : defaults.marginLeftMobile;
			}
		}

		return value;
	};

	return (
		<Fragment>
			<PanelBody
				title={ __( 'Sizing' ) }
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

				<hr/>

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

			<PanelBody
				title={ __( 'Section Settings' ) }
				initialOpen={ false }
			>
				<SelectControl
					label={ __( 'HTML Tag' ) }
					value={ defaults.columnsHTMLTag }
					options={ [
						{ label: 'Default (div)', value: 'div' },
						{ label: 'section', value: 'section' },
						{ label: 'header', value: 'header' },
						{ label: 'footer', value: 'footer' },
						{ label: 'article', value: 'article' },
						{ label: 'main', value: 'main' }
					] }
					onChange={ value => changeConfig( blockName, { columnsHTMLTag: value }) }
				/>
			</PanelBody>
		</Fragment>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getView } = select( 'themeisle-gutenberg/data' );
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return {
			view: __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : getView()
		};
	})
)( SectionColumn );
