const {
	useState,
	useEffect
} = wp.element;

/**
 * Utility hook that update the state when the given condition is true. It also can triggers callbacks for side-effects.
 * @param {any} initialState The initial value of the state
 * @param {function} condition Function that triggers the update after evaluating the condition
 * @param {function} generateState Function that generate the new value on update
 * @param {function} fallbackInCondition Function that is called on update. Use it for creating side-effects
 */
export const useStateWithInitCondition = ( initialState, condition, generateState, fallbackInCondition ) => {
	const [ internalState, setInternalState ] = useState( initialState );

	useEffect( () => {
		if ( condition( internalState ) ) {
			if ( fallbackInCondition ) {
				fallbackInCondition( internalState );
			}
			setInternalState( generateState() );
		}
	},  [ internalState ]);

	return [ internalState, setInternalState ];
};

/**
 * Hook used for creating/updating the block's id.
 * @param {string} prefix The block's uniq prefix for identification.
 * @param {string} clientId The client's id provided by WordPress
 * @param {string|undefined} attrsId The value of the id from attributes
 * @param {function} initFallback Function that is called by internal id hook.
 */
export const useId = ( prefix, clientId, attrsId, initFallback ) => {

	const generateUniqId = () => prefix + clientId.substr( 0, 8 );

	const [ id, setId ] = useStateWithInitCondition( attrsId, x => x === undefined, generateUniqId, initFallback );

	useEffect( () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( blockIDs.includes( id ) ) {
			setId( generateUniqId() );
		} else if ( id ) {
			blockIDs.push( id );
			window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
		}
	}, [ id ]);

	return id;
};
