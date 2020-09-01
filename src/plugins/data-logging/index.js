/**
 * WordPress dependencies
 */
const { debounce } = lodash;

const {
	select,
	subscribe
} = wp.data;

window.themeisleGutenberg.dataLogging = {};

const settings = new wp.api.models.Settings();

settings.fetch().then( response => {
	if ( response.otter_blocks_logger_data && Boolean( window.themeisleGutenberg.canTrack ) ) {
		window.themeisleGutenberg.dataLogging = response.otter_blocks_logger_data;
	}
});

const saveTrackingData = debounce( async() => {
	const model = new wp.api.models.Settings({
		// eslint-disable-next-line camelcase
		otter_blocks_logger_data: window.themeisleGutenberg.dataLogging
	});

	await model.save();
}, 1000 );

subscribe( () => {
	const {
		isCurrentPostPublished,
		isSavingPost,
		isPublishingPost,
		isAutosavingPost
	} = select( 'core/editor' );

	const isAutoSaving = isAutosavingPost();
	const isPublishing = isPublishingPost();
	const isSaving = isSavingPost();
	const postPublished = isCurrentPostPublished();

	if ( ( isPublishing || ( postPublished && isSaving ) ) && ! isAutoSaving && Boolean( window.themeisleGutenberg.canTrack ) ) {
		saveTrackingData();
	}
});
