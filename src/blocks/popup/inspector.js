/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	__experimentalColorGradientControl as ColorGradientControl,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl
} from '@wordpress/components';

const Inspector = ({
	attributes,
	setAttributes
}) => {
	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Settings', 'otter-blocks' ) }
			>
				<SelectControl
					label={ __( 'Open Trigger', 'otter-blocks' ) }
					options={ [
						{
							label: __( 'On Load', 'otter-blocks' ),
							value: 'onLoad'
						},
						{
							label: __( 'On Anchor Click', 'otter-blocks' ),
							value: 'onClick'
						},
						{
							label: __( 'On Scroll', 'otter-blocks' ),
							value: 'onScroll'
						},
						{
							label: __( 'On Exit', 'otter-blocks' ),
							value: 'onExit'
						}
					] }
					value={ attributes.trigger }
					onChange={ trigger => setAttributes({ trigger }) }
				/>

				{ ( undefined === attributes.trigger || 'onLoad' === attributes.trigger ) && (
					<RangeControl
						label={ __( 'Wait Time', 'otter-blocks' ) }
						help={ __( 'How much time to wait before showing the popup. Leave it empty to open instantly', 'otter-blocks' ) }
						min={ 0 }
						max={ 100 }
						value={ attributes.wait }
						onChange={ value => setAttributes({ wait: Number( value ) }) }
					/>
				) }

				{ 'onClick' === attributes.trigger && (
					<TextControl
						label={ __( 'Anchor', 'otter-blocks' ) }
						help={ __( 'You can use this anchor as an anchor link anywhere on the page to open the popup.', 'otter-blocks' ) }
						value={ attributes.anchor }
						onChange={ value => setAttributes({ anchor: value.replace( /[^a-zA-Z]/g, '' ) }) }
					/>
				) }

				{ 'onScroll' === attributes.trigger && (
					<RangeControl
						label={ __( 'Scroll Distance', 'otter-blocks' ) }
						help={ __( 'Show the modal when this percentage of the page has been scrolled.', 'otter-blocks' ) }
						min={ 0 }
						max={ 100 }
						value={ attributes.scroll }
						onChange={ value => setAttributes({ scroll: Number( value ) }) }
					/>
				) }

				{ 'onExit' === attributes.trigger && (
					<p>{ __( 'Shows the modal when the user moves the mouse outside of the top of the window.', 'otter-blocks' ) }</p>
				) }

				<ToggleControl
					label={ __( 'Show Close Button', 'otter-blocks' ) }
					checked={ attributes.showClose }
					onChange={ () => setAttributes({ showClose: ! attributes.showClose }) }
				/>

				<ToggleControl
					label={ __( 'Close on Click Outside', 'otter-blocks' ) }
					checked={ attributes.outsideClose }
					onChange={ () => setAttributes({ outsideClose: ! attributes.outsideClose }) }
				/>

				<ToggleControl
					label={ __( 'Close On Anchor Click', 'otter-blocks' ) }
					checked={ attributes.anchorClose }
					onChange={ () => setAttributes({ anchorClose: ! attributes.anchorClose }) }
				/>

				{ attributes.anchorClose && (
					<TextControl
						label={ __( 'Close Anchor', 'otter-blocks' ) }
						help={ __( 'You can use this anchor as an anchor link anywhere on the page to close the popup.', 'otter-blocks' ) }
						value={ attributes.closeAnchor }
						onChange={ value => setAttributes({ closeAnchor: value.replace( /[^a-zA-Z]/g, '' ) }) }
					/>
				) }

				<ToggleControl
					label={ __( 'Dismiss for Recurring Visitors', 'otter-blocks' ) }
					checked={ attributes.recurringClose }
					onChange={ () => setAttributes({ recurringClose: ! attributes.recurringClose }) }
				/>

				{ attributes.recurringClose && (
					<RangeControl
						label={ __( 'Display Interval', 'otter-blocks' ) }
						help={ __( 'Number of days until the popup is shown again.', 'otter-blocks' ) }
						min={ 0 }
						max={ 100 }
						value={ attributes.recurringTime }
						onChange={ value => setAttributes({ recurringTime: Number( value ) }) }
					/>
				) }
			</PanelBody>

			<PanelBody
				title={ __( 'Style', 'otter-blocks' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Minimum Width', 'otter-blocks' ) }
					min={ 100 }
					max={ 1000 }
					value={ attributes.minWidth }
					onChange={ value => setAttributes({ minWidth: Number( value ) }) }
				/>

				<ColorGradientControl
					label={ __( 'Background', 'otter-blocks' ) }
					colorValue={ attributes.backgroundColor }
					onColorChange={ backgroundColor => setAttributes({ backgroundColor }) }
				/>

				{ attributes.showClose && (
					<ColorGradientControl
						label={ __( 'Close Button', 'otter-blocks' ) }
						colorValue={ attributes.closeColor }
						onColorChange={ closeColor => setAttributes({ closeColor }) }
					/>
				) }

				<ColorGradientControl
					label={ __( 'Overlay', 'otter-blocks' ) }
					colorValue={ attributes.overlayColor }
					onColorChange={ overlayColor => setAttributes({ overlayColor }) }
				/>

				<RangeControl
					label={ __( 'Overlay Opacity', 'otter-blocks' ) }
					value={ attributes.overlayOpacity }
					onChange={ value => setAttributes({ overlayOpacity: Number( value ) }) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;

