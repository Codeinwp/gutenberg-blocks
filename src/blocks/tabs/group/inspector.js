/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const { PanelBody, Button, RangeControl, SelectControl, TextControl } = wp.components;

const { clamp } = lodash;

const Inspector = ({
	attributes,
	setAttributes,
	tabs,
	deleteTab
}) => {

	const renderTabs = ( tabs ) => {
		return tabs.map( tab => {
			return (
				<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option">
					<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option__name">
						<p>{ tab.attributes.title }</p>
					</div>
					<div className="wp-block-themeisle-blocks-tabs-inspector-tab-option__actions">
						<Button isLink isTertiary onClick={() => deleteTab( tab.clientId )}>
							Delete
						</Button>
					</div>
				</div>
			);
		});
	};


	return (
		<InspectorControls>
			<PanelBody title={__( 'Tabs' )} initialOpen={true}>
				{renderTabs( tabs )}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
