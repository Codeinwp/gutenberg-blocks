import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	Dropdown,
	Button,
	DateTimePicker
} from '@wordpress/components';

import {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import moment from 'moment';

import { useSelect } from '@wordpress/data';

import ResponsiveControl from '../../components/responsive-control';

const Inspector = ({
	attributes,
	setAttributes,
	className
}) => {

	const getView = useSelect( ( select ) => {
		const { getView } = select( 'themeisle-gutenberg/data' );
		const { __experimentalGetPreviewDeviceType } = select( 'core/edit-post' );

		return __experimentalGetPreviewDeviceType ? __experimentalGetPreviewDeviceType() : getView();
	}, []);

	const excludeComponent = ( value, componentName ) => {
		if ( value ) {
			setAttributes({
				exclude: attributes?.exclude?.filter( name => name !== componentName )
			});
		} else {
			setAttributes({
				exclude: attributes?.exclude ? [ ...attributes?.exclude, componentName ] : [ componentName ]
			});
		}
	};

	const onBackgroundColorChange = value => {
		setAttributes({ backgroundColor: value});
	};

	const onLabelColorChange = value => {
		setAttributes({ labelColor: value});
	};

	const onValueColorChange = value => {
		setAttributes({ valueColor: value});
	};

	const onGapChange = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ gap: Number( value )});
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ gapTablet: Number( value )});
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ gapMobile: Number( value )});
		}
	};

	const onWidthChange = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ width: Number( value )});
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ widthTablet: Number( value )});
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ widthMobile: Number( value )});
		}
	};

	const onHeightChange = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ height: Number( value )});
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ heightTablet: Number( value )});
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ heightMobile: Number( value )});
		}
	};

	const onBorderRadiusChange = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ borderRadius: Number( value )});
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ borderRadiusTablet: Number( value )});
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ borderRadiusMobile: Number( value )});
		}
	};

	const onValueFontSizeChange = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ valueFontSize: Number( value ) });
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ valueFontSizeTablet: Number( value )});
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ valueFontSizeMobile: Number( value )});
		}
	};

	const onLabelFontSizeChange = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ labelFontSize: Number( value ) });
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ labelFontSizeTablet: Number( value )});
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ labelFontSizeMobile: Number( value )});
		}
	};

	const onBorderWidthChange = value => {
		if ( 'Desktop' === getView ) {
			setAttributes({ borderWidth: Number( value ) });
		}
		if ( 'Tablet' === getView ) {
			setAttributes({ borderWidthTablet: Number( value )});
		}
		if ( 'Mobile' === getView ) {
			setAttributes({ borderWidthMobile: Number( value )});
		}
	};

	const onBorderColorChange = value => {
		setAttributes({ borderColor: value });
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Time', 'otter-blocks' ) }
				initialOpen={ true }
			>
				<Dropdown
					position="bottom left"
					headerTitle={ __( 'Select the date for the deadline', 'otter-blocks' ) }
					renderToggle={ ({ onToggle, isOpen }) => (
						<>
							<Button
								onClick={ onToggle }
								isSecondary
								aria-expanded={ isOpen }
							>
								{ attributes.date ? attributes.date : __( 'Select Date', 'otter-blocks' ) }
							</Button>
						</>
					) }
					renderContent={ () => (
						<DateTimePicker
							currentDate={ attributes.date }
							onChange={ value => setAttributes({ date: moment( value ).utc().format() }) }
						/>
					) }
				/>
			</PanelBody>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
				initialOpen={ true }
			>

				<ToggleControl
					label={ __( 'Display Days', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'day' ) }
					onChange={ value => excludeComponent( value, 'day' ) }
				/>
				<ToggleControl
					label={ __( 'Display Hours', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'hour' ) }
					onChange={ value => excludeComponent( value, 'hour' ) }
				/>
				<ToggleControl
					label={ __( 'Display Minutes', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'minute' ) }
					onChange={ value => excludeComponent( value, 'minute' ) }
				/>
				<ToggleControl
					label={ __( 'Display Seconds', 'otter-blocks' ) }
					checked={ ! attributes?.exclude?.includes( 'second' ) }
					onChange={ value => excludeComponent( value, 'second' ) }
				/>

				{
					! className.includes( 'is-style-modern' ) && (
						<ToggleControl
							label={ __( 'Display Separators', 'otter-blocks' ) }
							checked={ attributes?.hasSeparators }
							onChange={ hasSeparators => setAttributes({ hasSeparators }) }
						/>
					)
				}

				<ResponsiveControl
					label={ __( 'Box Spacing', 'otter-blocks' ) }
				>
					<RangeControl
						value={ 'Mobile' === getView ? attributes.gapMobile : 'Tablet' === getView ? attributes.gapTablet : attributes.gap }
						onChange={ onGapChange }
						min={ 0 }
						max={ 100 }
					/>
				</ResponsiveControl>


				<ResponsiveControl
					label={ __( 'Box Height', 'otter-blocks' ) }
				>
					<RangeControl
						value={ 'Mobile' === getView ? attributes.heightMobile : 'Tablet' === getView ? attributes.heightTablet : attributes.height }
						onChange={ onHeightChange }
						min={ 40 }
						max={ 300 }
					/>
				</ResponsiveControl>

				<ResponsiveControl
					label={ __( 'Box Width', 'otter-blocks' ) }
				>
					<RangeControl
						value={ 'Mobile' === getView ? attributes.widthMobile : 'Tablet' === getView ? attributes.widthTablet : attributes.width }
						onChange={ onWidthChange }
						min={ 40 }
						max={ 300 }
					/>
				</ResponsiveControl>


				{
					className.includes( 'is-style-custom' ) && (
						<ResponsiveControl
							label={ __( 'Border Radius', 'otter-blocks' ) }
						>
							<RangeControl

								value={ 'Mobile' === getView ? attributes.borderRadiusMobile : 'Tablet' === getView ? attributes.borderRadiusTablet : attributes.borderRadius }
								onChange={ onBorderRadiusChange }
								min={ 0 }
								max={ 100 }
							/>
						</ResponsiveControl>

					)
				}

				<ResponsiveControl
					label={ __( 'Border Width', 'otter-blocks' ) }
				>
					<RangeControl

						value={ 'Mobile' === getView ? attributes.borderWidthMobile : 'Tablet' === getView ? attributes.borderWidthTablet : attributes.borderWidth }
						onChange={ onBorderWidthChange }
						min={ 0 }
						max={ 50 }
					/>
				</ResponsiveControl>

				<ResponsiveControl
					label={ __( 'Time Value Font Size', 'otter-blocks' ) }
				>
					<RangeControl
						value={ 'Mobile' === getView ? attributes.valueFontSizeMobile : 'Tablet' === getView ? attributes.valueFontSizeTablet : attributes.valueFontSize }
						onChange={ onValueFontSizeChange }
						min={ 0 }
						max={ 64 }
					/>
				</ResponsiveControl>

				<ResponsiveControl
					label={ __( 'Label Font Size', 'otter-blocks' ) }
				>
					<RangeControl
						value={ 'Mobile' === getView ? attributes.labelFontSizeMobile : 'Tablet' === getView ? attributes.labelFontSizeTablet : attributes.labelFontSize }
						onChange={ onLabelFontSizeChange }
						min={ 0 }
						max={ 64 }
					/>
				</ResponsiveControl>


			</PanelBody>

			<PanelColorSettings
				title={ __( 'Color', 'otter-blocks' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: attributes.backgroundColor,
						onChange: onBackgroundColorChange,
						label: __( 'Background', 'otter-blocks' )
					},
					{
						value: attributes.labelColor,
						onChange: onLabelColorChange,
						label: __( 'Label', 'otter-blocks' )
					},
					{
						value: attributes.valueColor,
						onChange: onValueColorChange,
						label: __( 'Value', 'otter-blocks' )
					},
					{
						value: attributes.borderColor,
						onChange: onBorderColorChange,
						label: __( 'Border', 'otter-blocks' )
					}
				] }
			>
				<ContrastChecker
					{ ...{
						textColor: attributes.backgroundColor,
						backgroundColor: attributes.valueColor
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default Inspector;
