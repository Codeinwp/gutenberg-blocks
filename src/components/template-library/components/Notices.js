/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Notice } = wp.components;

const {
	Component,
	Fragment
} = wp.element;

class Notices extends Component {
	render() {
		return (
			<Fragment>
				{ ! Boolean( themeisleGutenberg.isCompatible ) && (
					<div className="library-modal-error">
						<Notice
							status="warning"
							isDismissible={ false }
							className="version-warning"
							actions={ [
								{
									label: __( 'Update Now' ),
									url: themeisleGutenberg.updatePath
								}
							] }
						>
							{ __( 'You are using an older version of Otter. Use the latest version of Otter to have maximum compatibility with Template Library.' ) }
						</Notice>
					</div>
				) }

				{ this.props.isError && (
					<div className="library-modal-error">
						<Notice
							status="error"
							onRemove={ this.props.removeError }
						>
							{ __( 'There seems to be an error. Please try again.' ) }
						</Notice>
					</div>
				) }

				{ this.props.isMissing && (
					<div className="library-modal-error">
						<Notice
							status="warning"
							className="library-modal-missing"
							onRemove={ this.props.removeMissing }
						>
							{ __( 'You seem to be missing some blocks that are required by your selected template.' ) }
							<details>
								<summary>{ __( 'View Missing Blocks' ) }</summary>

								<ul>
									{ this.props.missingBlocks.map( i => <li>{ i }</li> ) }
								</ul>
							</details>
						</Notice>
					</div>
				) }
			</Fragment>
		);
	}
}

export default Notices;
