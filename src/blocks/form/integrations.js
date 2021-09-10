export const getListIdOptionFrom = ( provider, apiKey, callback ) => {

	switch ( provider ) {
	case 'mailchimp':
		return getListIdOptionFromMailschimp( apiKey, callback );
	case 'sendinblue':

		// TODO: Add Sendinblue integration
		return [];
	}
	return [];
};

/**
 *
 * @param {string} apiKey
 * @param {Function} callback
 * @returns
 *
 * @see https://mailchimp.com/developer/marketing/api/list-members/
 */
const getListIdOptionFromMailschimp = ( apiKey, callback ) => {
	const serverName = apiKey?.split( '-' )?.[1];
	if ( serverName ) {

		// BUG: Try to find why this request is rejected
		const url = `https://${ serverName }.api.mailchimp.com/3.0/lists`;
		fetch( url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + Buffer.from( 'key:' + apiKey ).toString( 'base64' )
			}
		}).then(
			res => {
				const result = res?.links?.map( item => {
					return {
						label: item.name,
						value: item.id
					};
				}) || [];
				callback( result );
			}
		).catch( err => {
			console.log( err );
		});
	}
	return [];
};

