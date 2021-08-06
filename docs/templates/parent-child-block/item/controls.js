/* eslint-disable no-unused-vars */
/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	Button,
	Dropdown,
	DropdownMenu,
	RangeControl,
	SVG,
	Toolbar
} = wp.components;

const { BlockControls } = wp.blockEditor;

const { Fragment } = wp.element;

/**
 * Internal dependencies
 */

const Controls = ({
	attributes,
	setAttributes
}) => {


	return (
		<BlockControls>

			<Toolbar>

			</Toolbar>
		</BlockControls>
	);
};

export default Controls;
