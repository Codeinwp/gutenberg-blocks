/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { Notice } = wp.components;

const { Fragment } = wp.element;

const Notices = ({
	isError,
	removeError,
	isMissing,
	removeMissing,
	missingBlocks
}) => {
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

			{ isError && (
				<div className="library-modal-error">
					<Notice
						status="error"
						onRemove={ removeError }
					>
						{ __( 'There seems to be an error. Please try again.' ) }
					</Notice>
				</div>
			) }

			{ isMissing && (
				<div className="library-modal-error">
					<Notice
						status="warning"
						className="library-modal-missing"
						onRemove={ removeMissing }
					>
						{ __( 'You seem to be missing some blocks that are required by your selected template.' ) }
						<details>
							<summary>{ __( 'View Missing Blocks' ) }</summary>

							<ul>
								{ missingBlocks.map( i => <li>{ i }</li> ) }
							</ul>
						</details>
					</Notice>
				</div>
			) }
		</Fragment>
	);
};

export default Notices;
