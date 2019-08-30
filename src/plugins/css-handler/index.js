/**
 * WordPress dependencies
 */
const { debounce } = lodash;

const { apiFetch } = wp;

const {
	select,
	subscribe
} = wp.data;

const publish = debounce( async() => {
	const { getCurrentPostId } = select( 'core/editor' );
	const postId = getCurrentPostId();

	await apiFetch({ path: `themeisle-gutenberg-blocks/v1/save_metabox?id=${ postId }` });
}, 1000 );

subscribe( () => {
	const {
		isCurrentPostPublished,
		isSavingPost,
		isPublishingPost,
		isAutosavingPost
	} = select( 'core/editor' );

	const postPublished = isCurrentPostPublished();
	const isSaving = isSavingPost();
	const isAutoSaving = isAutosavingPost();
	const isPublishing = isPublishingPost();

	if ( ( isPublishing || ( postPublished && isSaving ) ) && ! isAutoSaving && ! status ) {
		publish();
	}
});
