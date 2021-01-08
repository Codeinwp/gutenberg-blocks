/**
 * WordPress dependencies
 */
const { debounce } = lodash;

const apiFetch = wp.apiFetch;

const { select, subscribe } = wp.data;

const savePostMeta = debounce(async () => {
	const { getCurrentPostId } = select('core/editor');
	const postId = getCurrentPostId();

	await apiFetch({ path: `themeisle-gutenberg-blocks/v1/save_post_meta/${postId}`, method: 'POST' });
}, 1000);

let reusableBlocks = {};

subscribe(() => {
	const {
		isCurrentPostPublished,
		isSavingPost,
		isPublishingPost,
		isAutosavingPost,
		__experimentalIsSavingReusableBlock,
	} = select('core/editor');

	const { __experimentalReusableBlocks } = select('core/block-editor').getSettings();

	const { isSavingEntityRecord } = select('core');

	let isSavingReusableBlock;

	if (__experimentalIsSavingReusableBlock) {
		isSavingReusableBlock = (id) => __experimentalIsSavingReusableBlock(id);
	} else {
		isSavingReusableBlock = (id) => isSavingEntityRecord('postType', 'wp_block', id);
	}

	const isAutoSaving = isAutosavingPost();
	const isPublishing = isPublishingPost();
	const isSaving = isSavingPost();
	const getReusableBlocks = __experimentalReusableBlocks || [];
	const postPublished = isCurrentPostPublished();

	getReusableBlocks.map((block) => {
		if (block) {
			const isBlockSaving = isSavingReusableBlock(block.id);

			if (isBlockSaving && !block.isTemporary) {
				reusableBlocks[block.id] = {
					id: block.id,
					isSaving: true,
				};
			}

			if (!isBlockSaving && !block.isTemporary && !!reusableBlocks[block.id]) {
				if (block.id === reusableBlocks[block.id].id && !isBlockSaving && reusableBlocks[block.id].isSaving) {
					reusableBlocks[block.id].isSaving = false;
					apiFetch({ path: `themeisle-gutenberg-blocks/v1/save_block_meta/${block.id}`, method: 'POST' });
				}
			}
		}
	});

	if ((isPublishing || (postPublished && isSaving)) && !isAutoSaving) {
		savePostMeta();
	}
});
