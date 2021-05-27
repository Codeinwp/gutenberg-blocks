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

const { PanelBody, Button, RangeControl, SelectControl, TextControl } = wp.components;

const { clamp } = lodash;


const Inspector = ({
	attributes,
	setAttributes,
	deleteTab
}) => {

	const TabsList = SortableContainer( ({ items }) => {
		return (
			<div>
				{
					items.map( ( tab, index ) => {
						return (
							<SortableTab key={tab.id} tab={tab} index={index} deleteTab={deleteTab}/>
						);
					})
				}
			</div>
		);
	});

	const onSortEnd = ({ oldIndex, newIndex }) => {
		console.log( oldIndex, newIndex );
		setAttributes({
			headers: arrayMove( attributes.headers, oldIndex, newIndex )
		});
	};


	return (
		<InspectorControls>
			<PanelBody title={__( 'Tabs' )} initialOpen={true}>
				{
					0 < attributes.headers.length && ( <TabsList items={ attributes.headers } onSortEnd={onSortEnd} axis={'y'} /> )
				}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
