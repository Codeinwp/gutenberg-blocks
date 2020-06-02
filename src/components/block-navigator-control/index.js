/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalBlockNavigationList,
	__experimentalBlockNavigationTree,
	BlockControls
} = wp.blockEditor;

const {
	Button,
	Modal,
	Toolbar
} = wp.components;

const {
	useSelect,
	useDispatch
} = wp.data;

const {
	Fragment,
	useState
} = wp.element;

/**
 * Internal dependencies
 */
import { navigatorIcon } from '../../helpers/icons.js';

const BlockNavigatorControl = ({ clientId }) => {
	const {
		block,
		selectedBlockClientId
	} = useSelect( select => {
		const {
			getSelectedBlockClientId,
			getBlock
		} = select( 'core/block-editor' );

		return {
			block: getBlock( clientId ),
			selectedBlockClientId: getSelectedBlockClientId()
		};
	}, []);

	const { selectBlock } = useDispatch( 'core/block-editor' );

	const [ isOpen, setOpen ] = useState( false );

	const BlockNavigation = __experimentalBlockNavigationList || __experimentalBlockNavigationTree;

	return (
		<Fragment>
			<BlockControls>
				<Toolbar>
					<Button
						className="components-toolbar__control"
						label={ __( 'Open block navigator' ) }
						showTooltip={ true }
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
					<BlockNavigation
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

export default BlockNavigatorControl;
