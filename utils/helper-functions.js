/**
 * Helper Functions
 */
const { __ } = wp.i18n;

// HTML to Plaintext
export const unescapeHTML = value => {
	const htmlNode = document.createElement( 'div' );
	htmlNode.innerHTML = value;
	if ( htmlNode.innerText !== undefined ) {
		return htmlNode.innerText;
	}
	return htmlNode.textContent;
};

// Format Date
export const formatDate = date => {
	const monthNames = [
		__( 'January' ), __( 'February' ), __( 'March' ),
		__( 'April' ), __( 'May' ), __( 'June' ), __( 'July' ),
		__( 'August' ), __( 'September' ), __( 'October' ),
		__( 'November' ), __( 'December' )
	];
	date = new Date( date );
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	return day + ' ' + monthNames[monthIndex] + ', ' + year;
};
