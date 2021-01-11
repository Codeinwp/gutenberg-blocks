/**
 * External dependencies
 */

/**
 * WordPress dependencies
*/

const {
	useEffect,
	useRef
} = wp.element;

/**
 * Internal dependencies
 */

const Edit = (
	attributes,
	setAttributes,
	className
) => {

	const mapRef = useRef( null );

	useEffect( () => {
		console.log( L );

		if ( ! mapRef.current ) {
			return ;
		}

		const map = L.map( mapRef.current ).setView([ 51.505, -0.09 ], 13 );

		console.log( map );

	}, []);

	return (
		<div ref={mapRef} className={className}>

		</div>
	);
};

export default Edit;
