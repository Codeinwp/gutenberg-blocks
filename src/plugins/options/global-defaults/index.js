/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { PanelBody } = wp.components;

/**
 * Internal dependencies
 */
import ButtomItem from './block-item.js';
import AdvancedHeading from './controls/advanced-heading.js';

const GlobalDefaults = ({
	blockDefaults,
	changeConfig,
	resetConfig,
	saveConfig
}) => {
	const blocks = [
		{
			name: 'themeisle-blocks/advanced-heading',
			control: AdvancedHeading
		}

		// {
		// 	name: 'themeisle-blocks/button-group',
		// 	control: AdvancedHeading
		// },
		// {
		// 	name: 'themeisle-blocks/font-awesome-icons',
		// 	control: AdvancedHeading
		// },
		// {
		// 	name: 'themeisle-blocks/advanced-columns',
		// 	control: AdvancedHeading
		// },
		// {
		// 	name: 'themeisle-blocks/advanced-column',
		// 	control: AdvancedHeading
		// }
	];

	return (
		<PanelBody
			title={ 'Global Defaults' }
			className="wp-block-themeisle-blocks-options-global-defaults"
		>
			{ __( 'With Global Defaults, you can set site-wide block defaults for Otter.' ) }

			<div className="wp-block-themeisle-blocks-options-global-defaults-list">
				{ blocks.map( i => {
					const Controls = i.control;

					return (
						<ButtomItem
							blockName={ i.name }
							saveConfig={ saveConfig }
							resetConfig={ resetConfig }
						>
							<Controls
								blockName={ i.name }
								defaults={ blockDefaults[ i.name ] }
								changeConfig={ changeConfig }
							/>
						</ButtomItem>
					);
				}) }
			</div>
		</PanelBody>
	);
};

export default GlobalDefaults;
