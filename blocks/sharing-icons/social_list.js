/**
 * WordPress dependencies...
 */
const { __ } = wp.i18n;

const socialList = {
	facebook: {
		label: __( 'Facebook' ),
		icon: 'facebook-f'
	},
	twitter: {
		label: __( 'Twitter' ),
		icon: 'twitter'
	},
	googleplus: {
		label: __( 'Google+' ),
		icon: 'google-plus-g'
	},
	linkedin: {
		label: __( 'Linkedin' ),
		icon: 'linkedin-in'
	},
	pinterest: {
		label: __( 'Pinterest' ),
		icon: 'pinterest-p'
	},
	tumblr: {
		label: __( 'Tumblr' ),
		icon: 'tumblr'
	},
	reddit: {
		label: __( 'Reddit' ),
		icon: 'reddit-alien'
	}
};


export default socialList;
