/**
 * WordPress dependencies
 */
const { Notice } = wp.components;

const { useDispatch, useSelect } = wp.data;

const Notices = () => {
	const notices = useSelect((select) =>
		select('core/notices').getNotices('themeisle-blocks/notices/template-library')
	);

	const { removeNotice } = useDispatch('core/notices');

	return (
		<div className="library-modal-error">
			{notices.map((notice) => (
				<Notice
					status={notice.status}
					isDismissible={notice.isDismissible}
					onRemove={() => removeNotice(notice.id, 'themeisle-blocks/notices/template-library')}
					actions={notice.actions}
				>
					{notice.content}
				</Notice>
			))}
		</div>
	);
};

export default Notices;
