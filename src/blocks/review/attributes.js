/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const attributes = {
	id: {
		type: 'string'
	},
	title: {
		type: 'string'
	},
	currency: {
		type: 'string',
		default: 'USD'
	},
	price: {
		type: 'number',
	},
	discounted: {
		type: 'number'
	},
	image: {
		type: 'object'
	},
	description: {
		type: 'string'
	},
	features: {
		type: 'array',
		default: [
			{
				title: __( 'Stability' ),
				rating: 9
			},
			{
				title: __( 'Ease of Use' ),
				rating: 4
			},
			{
				title: __( 'Look & Feel' ),
				rating: 9
			},
			{
				title: __( 'Price' ),
				rating: 7
			}
		]
	},
	pros: {
		type: 'array',
		default: [
			__( 'Easy to use' ),
			__( 'Good price' ),
			__( 'Sturdy build and ergonomics' )
		]
	},
	cons: {
		type: 'array',
		default: [
			__( 'Incompatible with old versions' ),
			__( 'Hard to assemble' ),
			__( 'Bad color combination' )
		]
	},
	links: {
		type: 'array',
		default: [
			{
				label: __( 'Buy on Amazon' ),
				href: ''
			},
			{
				label: __( 'Buy on eBay' ),
				href: ''
			}
		]
	},
	primaryColor: {
		type: 'string'
	},
	backgroundColor: {
		type: 'string'
	},
	textColor: {
		type: 'string'
	},
	buttonTextColor: {
		type: 'string'
	}
};

export default attributes;
