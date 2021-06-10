/* eslint-disable no-unused-vars */

import arrayMove from 'array-move';
import { SortableContainer } from 'react-sortable-hoc';
import { SortableTab } from './components/sortableTabs';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalColorGradientControl: ColorGradientControl,
	InspectorControls
} = wp.blockEditor;

const { PanelBody, Button } = wp.components;

const Inspector = ({
	attributes,
	setAttributes,
	deleteTab,
	selectTab,
	addTab
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
		setAttributes({
			headers: arrayMove( attributes.headers, oldIndex, newIndex )
		});
	};


	return (
		<InspectorControls>
			<PanelBody title={__( 'Tabs Management' )} initialOpen={true}>
				{
					0 < attributes.headers?.length && ( <TabsList pressDelay={200} items={ attributes.headers } onSortEnd={onSortEnd} axis={'y'} /> )
				}
				<Button
					isSecondary
					isLarge
					className="wp-block-themeisle-blocks-tabs-inspector-add-tab" onClick={ addTab }
				>
					{ __( 'Add Tab' ) }
				</Button>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
