import { SortableContainer } from 'react-sortable-hoc';
import { SortableTab } from './components/sortableTabs';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings
} = wp.blockEditor;

const { PanelBody, Button, RangeControl } = wp.components;

const Inspector = ({
	attributes,
	setAttributes,
	deleteTab,
	selectTab,
	addTab,
	moveTab
}) => {

	const TabsList = SortableContainer( ({ items }) => {
		return (
			<div>
				{
					items.map( ( tab, index ) => {
						return (
							<SortableTab key={tab.id} tab={tab} index={index} deleteTab={deleteTab} selectTab={selectTab}/>
						);
					})
				}
			</div>
		);
	});

	const onSortEnd = ({ oldIndex, newIndex }) => {
		moveTab( attributes.headers[oldIndex].id, newIndex );
	};

	const onTabColorChange = ( value ) => {
		setAttributes({
			tabColor: value
		});
	};

	const onBorderColorChange = ( value ) => {
		setAttributes({
			borderColor: value
		});
	};

	const onBorderWidthChange = ( value ) => {
		setAttributes({
			borderWidth: value
		});
	};

	const onActiveTitleColorChange = ( value ) => {
		setAttributes({
			activeTitleColor: value
		});
	};

	return (
		<InspectorControls>
			<PanelBody title={__( 'Tabs Management' )} initialOpen={true}>
				<p>{ __( 'Press and hold to use drag and drop to sort the tabs' ) }</p>
				{
					0 < attributes.headers?.length && (
						<TabsList
							items={ attributes.headers }
							onSortEnd={onSortEnd}
							useDragHandle
							axis="y"
							lockAxis="y"
						/>
					)
				}
				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-tabs-inspector-add-tab" onClick={ addTab }
				>
					{ __( 'Add Tab' ) }
				</Button>
			</PanelBody>
			<PanelBody title={__( 'Settings' )} initialOpen={true}>
				<RangeControl
					label={ __( 'Border Width' ) }
					value={ attributes.borderWidth }
					onChange={ onBorderWidthChange }
					min={ 0 }
					max={ 5 }
				/>
			</PanelBody>
			<PanelColorSettings
				title={ __( 'Color' ) }
				initialOpen={ false }
				colorSettings={ [
					{
						value: attributes.activeTitleColor,
						onChange: onActiveTitleColorChange,
						label: __( 'Active Title Color' )
					},
					{
						value: attributes.tabColor,
						onChange: onTabColorChange,
						label: __( 'Background' )
					},
					{
						value: attributes.borderColor,
						onChange: onBorderColorChange,
						label: __( 'Border Color' )
					}
				] }
			>

				<ContrastChecker
					{ ...{
						textColor: attributes.activeTitleColor,
						backgroundColor: attributes.tabColor
					} }
				/>
			</PanelColorSettings>
		</InspectorControls>
	);
};

export default Inspector;
