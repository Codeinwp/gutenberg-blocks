/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const {
	PanelBody,
	RangeControl,
} = wp.components;

const { useState } = wp.element;

const Inspector = ({ attributes, setAttributes }) => {

    const setValue = value => {
        setAttributes({ value: value });
    }

    const setProgressColor = value => {
        setAttributes({ progressColor: value });
    }

    const setBackgroundColor = value => {
        setAttributes({ backgroundColor: value });
    }

    return (
        <InspectorControls>
            <PanelBody
				title={ __( 'Settings' ) }
				initialOpen={ true }
			>

                <RangeControl 
                    label={ __( 'Value' ) }
					value={ attributes.value }
					onChange={ setValue }
					min={ 0 }
					max={ 100 }
                />

                <ColorGradientControl
					label={ 'Progress Color' }
					colorValue={ attributes.progressColor }
					onColorChange={ setProgressColor }
				/>

                <ColorGradientControl
					label={ 'Background Color' }
					colorValue={ attributes.backgroundColor }
					onColorChange={ setBackgroundColor }
				/>

            </PanelBody>
        </InspectorControls>
    );
}

export default Inspector;