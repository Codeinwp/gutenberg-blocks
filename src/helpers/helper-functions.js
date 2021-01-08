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
		'January', 'February', 'March',
		'April', 'May', 'June', 'July',
		'August', 'September', 'October',
		'November', 'December'
	];

	date = new Date( date );
	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	return day + ' ' + monthNames[monthIndex] + ', ' + year;
};

// Create a list with numbers from interval [start, end]
export const range = ( start, end, step ) => {
	const range = [];
	const typeofStart = typeof start;
	const typeofEnd = typeof end;

	if ( 0 === step ) {
		throw TypeError( 'Step cannot be zero.' );
	}

	if ( undefined === typeofStart || undefined === typeofEnd ) {
		throw TypeError( 'Must pass start and end arguments.' );
	} else if ( typeofStart !== typeofEnd ) {
		throw TypeError( 'Start and end arguments must be of same type.' );
	}

	undefined === typeof step && ( step = 1 );

	if ( end < start ) {
		step = -step;
	}

	if ( 'number' === typeofStart ) {
		while ( 0 < step ? end >= start : end <= start ) {
			range.push( start );
			start += step;
		}
	} else if ( 'string' === typeofStart ) {
		if ( 1 != start.length || 1 != end.length ) {
			throw TypeError( 'Only strings with one character are supported.' );
		}

		start = start.charCodeAt( 0 );
		end = end.charCodeAt( 0 );

		while ( 0 < step ? end >= start : end <= start ) {
			range.push( String.fromCharCode( start ) );
			start += step;
		}
	} else {
		throw TypeError( 'Only string and number types are supported' );
	}

	return range;
};

// Easing functions for animation
export const linear = ( x ) => {
	return x;
};

export const easeInSine = ( x ) => {
	return 1 - Math.cos( ( x * Math.PI ) / 2 );
};

export const easeOutSine = ( x ) => {
	return Math.sin( ( x * Math.PI ) / 2 );
};

export const easeInOutSine = ( x ) => {
	return -( Math.cos( Math.PI * x ) - 1 ) / 2;
};
