/**
 * WordPress dependencies
 */

const { __ } = wp.i18n;

const {
	Dashicon,
	Button,
	Toolbar,
	Tooltip
} = wp.components;

const { BlockControls } = wp.blockEditor;

const Controls = ({ setShowEdit }) => {
	return (
		<BlockControls>
			<Toolbar>
				<Tooltip text={ __( 'Edit' ) }>
					<Button
						className="components-icon-button components-toolbar__control wp-block-themeisle-blocks-plugin-cards-edit-plugin-card"
						onClick={ () => setShowEdit( true ) }
					>
						<Dashicon icon="edit" />
					</Button>
				</Tooltip>
			</Toolbar>
		</BlockControls>
	);
};

export default Controls;
