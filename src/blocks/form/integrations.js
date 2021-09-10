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
 */
const getListIdOptionFromMailschimp = ( apiKey, callback ) => {
	const serverName = apiKey?.split( '-' )?.[1];
	if ( serverName ) {

		// TODO: Try to find why this request is rejected
		const url = `https://${ serverName }.api.mailchimp.com/3.0/lists`;
		fetch( url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic ' + ( 'key:' + apiKey ).toString( 'base64' )
			}
		}).then(
			res => {

				// TODO: Parse data into an array of options
				callback( res );
			}
		).catch( err => {
			console.log( err );
		});
	}
	return [];
};

