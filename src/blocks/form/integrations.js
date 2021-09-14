export const getListIdOptionFrom = ( provider, apiKey, onSuccess, onError ) => {

	switch ( provider ) {
	case 'mailchimp':
		return getListIdOptionFromMailschimp( apiKey, onSuccess, onError );
	case 'sendinblue':
		return getListIdOptionFromSendinblue( apiKey, onSuccess, onError );
	}
	return [];
};

/**
 *
 * @param {string} apiKey
 * @param {Function} onSucces
 * @returns
 *
 * @see https://mailchimp.com/developer/marketing/api/list-members/
 */
const getListIdOptionFromMailschimp = ( apiKey, onSucces, onError ) => {

	// NOTE: Mailchimp does not allow CORS -> We can not make request from the browser, so we need to use the server via REST
	wp.apiFetch({ path: 'themeisle-gutenberg-blocks/v1/mailchimp', method: 'POST', data: { apiKey }}).then(
		res => {
			if ( res?.success ) {
				const result = res?.list_id?.map( item => {
					return {
						label: item.name,
						value: item.id
					};
				}) || [];
				onSucces( result );
			} else {
				onError( res );
			}
		}
	).catch( err => {
		console.log( err );
	});
};

/**
 *
 * @param {string} apiKey
 * @param {Function} onSucces
 * @returns
 *
 * @see https://mailchimp.com/developer/marketing/api/list-members/
 */
const getListIdOptionFromSendinblue = ( apiKey, onSucces, onError ) => {

	// NOTE: Mailchimp does not allow CORS -> We can not make request from the browser, so we need to use the server via REST
	wp.apiFetch({ path: 'themeisle-gutenberg-blocks/v1/sendinblue', method: 'POST', data: { apiKey }}).then(
		res => {
			if ( res?.success ) {
				const result = res?.list_id?.map( item => {
					return {
						label: item.name,
						value: item.id
					};
				}) || [];
				onSucces( result );
			} else {
				onError( res );
			}
		}
	).catch( err => {
		console.log( err );
	});
};
