/* eslint-disable no-unused-vars */
import { chevronLeft, chevronRight } from '@wordpress/icons';
import arrayMove from 'array-move';

const { __ } = wp.i18n;
const { ToolbarGroup, ToolbarButton } = wp.components;
const { BlockControls } = wp.blockEditor;

const ToolbarComp = ({attributes, setAttributes, selectedTab, moveTab}) => {

	/**
	 * @type {(number|undefined)} The position of the selected tab
	 */
	const index = attributes.headers?.findIndex( ({id}) => id === selectedTab );

	/**
	 * Move the tab to a given direction
	 * @param {('left'|'right')} direction
	 */
	const moveTabTo = ( direction ) => {
		if ( index === undefined ) {
			console.warn( 'Tab Index is undefined' );
			return;
		}
		switch ( direction ) {
		case 'left':

			// setAttributes({
			// 	headers: arrayMove( attributes.headers, index, index - 1 )
			// });
			moveTab( selectedTab, index - 1 );
			break;
		case 'right':

			// setAttributes({
			// 	headers: arrayMove( attributes.headers, index, index + 1 )
			// });
			moveTab( selectedTab, index + 1 );
			break;
		}
	};

	return (
		<BlockControls>
			<ToolbarGroup label={ __( 'Movement' ) }>
				<ToolbarButton className={'wp-block-themeisle-blocks-tabs-toolbar-mover'} icon={ chevronLeft } iconSize={ 24 } disabled={ 0 === index } label={ __( 'Move tab left' )} onClick={ () => moveTabTo( 'left' ) } />
				<ToolbarButton className={'wp-block-themeisle-blocks-tabs-toolbar-mover'} icon={ chevronRight } iconSize={ 24 } disabled={ attributes.headers?.length - 1 == index} label={ __( 'Move tab right' )} onClick={ () => moveTabTo( 'right' ) } />
			</ToolbarGroup>
		</BlockControls>
	);
};

export default ToolbarComp;
