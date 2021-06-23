import { chevronLeft, chevronRight, edit } from '@wordpress/icons';

const { __ } = wp.i18n;
const { ToolbarGroup, ToolbarButton } = wp.components;
const { BlockControls } = wp.blockEditor;

const ToolbarComp = ({attributes, selectedTab, moveTab, selectTab}) => {

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
			moveTab( selectedTab, index - 1 );
			break;
		case 'right':
			moveTab( selectedTab, index + 1 );
			break;
		}
	};

	return (
		<BlockControls>
			<ToolbarGroup label={ __( 'Edit' ) }>
				<ToolbarButton className={'wp-block-themeisle-blocks-tabs-toolbar-edit'} icon={ edit } iconSize={ 24 } label={ __( 'Edit tab' )} onClick={ () => selectTab( selectedTab ) } />
			</ToolbarGroup>
			<ToolbarGroup label={ __( 'Movement' ) }>
				<ToolbarButton className={'wp-block-themeisle-blocks-tabs-toolbar-mover'} icon={ chevronLeft } iconSize={ 24 } disabled={ 0 === index } label={ __( 'Move tab left' )} onClick={ () => moveTabTo( 'left' ) } />
				<ToolbarButton className={'wp-block-themeisle-blocks-tabs-toolbar-mover'} icon={ chevronRight } iconSize={ 24 } disabled={ attributes.headers?.length - 1 == index} label={ __( 'Move tab right' )} onClick={ () => moveTabTo( 'right' ) } />
			</ToolbarGroup>
		</BlockControls>
	);
};

export default ToolbarComp;
