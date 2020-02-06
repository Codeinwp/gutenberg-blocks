/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalBlockNavigationList,
	BlockControls
} = wp.blockEditor;

const {
	IconButton,
	Modal,
	Toolbar
} = wp.components;

const { compose } = wp.compose;

const {
	withSelect,
	withDispatch
} = wp.data;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import { navigatorIcon } from '../../helpers/icons.js';

const BlockNavigatorControl = ({
	block,
	selectedBlockClientId,
	selectBlock
}) => {
	const [ isOpen, setOpen ] = useState( false );

	return (
		<Fragment>
			<BlockControls>
				<Toolbar
					className="wp-themesiel-blocks-block-navigator-components-toolbar"
				>
					<IconButton
						className="components-toolbar__control"
						label={ __( 'Open block navigator' ) }
						onClick={ () => setOpen( true ) }
						icon={ navigatorIcon }
					/>
				</Toolbar>
			</BlockControls>

			{ isOpen && (
				<Modal
					title={ __( 'Block Navigator' ) }
					closeLabel={ __( 'Close' ) }
					onRequestClose={ () => setOpen( false ) }
				>
					<__experimentalBlockNavigationList
						blocks={ [ block ] }
						selectedBlockClientId={ selectedBlockClientId }
						selectBlock={ selectBlock }
						showNestedBlocks
					/>
				</Modal>
			) }
		</Fragment>
	);
};

export default compose(
	withSelect( ( select, { clientId }) => {
		const {
			getSelectedBlockClientId,
			getBlock
		} = select( 'core/block-editor' );

		return {
			block: getBlock( clientId ),
			selectedBlockClientId: getSelectedBlockClientId()
		};
	}),

	withDispatch( dispatch => {
		const { selectBlock } = dispatch( 'core/block-editor' );
		return {
			selectBlock
		};
	})
)( BlockNavigatorControl );
