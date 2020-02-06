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
import ButtonGroup from './controls/button-group.js';
import FontAwesomeIcons from './controls/font-awesome-icons.js';
import SectionColumns from './controls/section-columns.js';
import SectionColumn from './controls/section-column.js';

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
		},
		{
			name: 'themeisle-blocks/button-group',
			control: ButtonGroup
		},
		{
			name: 'themeisle-blocks/font-awesome-icons',
			control: FontAwesomeIcons
		},
		{
			name: 'themeisle-blocks/advanced-columns',
			control: SectionColumns
		},
		{
			name: 'themeisle-blocks/advanced-column',
			control: SectionColumn
		}
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
