/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	__experimentalBlockNavigationList,
	BlockControls
} = wp.blockEditor || wp.editor;

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
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import { navigatorIcon } from '../../helpers/icons.js';

class BlockNavigatorControl extends Component {
	constructor() {
		super( ...arguments );
		this.toggleNavigator = this.toggleNavigator.bind( this );

		this.state = {
			isNavigationListOpen: false
		};
	}

	toggleNavigator( e ) {
		this.setState({ isNavigationListOpen: e });
	}

	render() {
		return (
			<Fragment>
				<BlockControls>
					<Toolbar
						className="wp-themesiel-blocks-block-navigator-components-toolbar"
					>
						<IconButton
							className="components-toolbar__control"
							label={ __( 'Open block navigator' ) }
							onClick={ () => this.toggleNavigator( true ) }
							icon={ navigatorIcon }
						/>
					</Toolbar>
				</BlockControls>

				{ this.state.isNavigationListOpen && (
					<Modal
						title={ __( 'Block Navigator' ) }
						closeLabel={ __( 'Close' ) }
						onRequestClose={ () => {
							this.toggleNavigator( false );
						} }
					>
						<__experimentalBlockNavigationList
							blocks={ [ this.props.block ] }
							selectedBlockClientId={ this.props.selectedBlockClientId }
							selectBlock={ this.props.selectBlock }
							showNestedBlocks
						/>
					</Modal>
				) }
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, { clientId }) => {
		const {
			getSelectedBlockClientId,
			getBlock
		} = select( 'core/block-editor' ) || select( 'core/editor' );

		return {
			block: getBlock( clientId ),
			selectedBlockClientId: getSelectedBlockClientId()
		};
	}),

	withDispatch( ( dispatch, { block }) => {
		const { selectBlock } = dispatch( 'core/block-editor' ) || dispatch( 'core/editor' );
		return {
			selectBlock
		};
	})
)( BlockNavigatorControl );
