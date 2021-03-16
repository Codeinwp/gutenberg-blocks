const {
	useState,
	useEffect,
	useRef
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
			fallbackInCondition?.( internalState );
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
	const condition = x => x === undefined;

	const [ id, setId ] = useStateWithInitCondition( attrsId, condition, generateUniqId, initFallback );
	const idRef = useRef( attrsId );

	/**
	 * Check if the block's id is already used by looking in the global scope `window.themeisleGutenberg.blockIDs`.
	 * If true, set a new id.
	 * If false, add the id in the global scope to that we can prevent duplicate id from copying, pasting, duplicating a block.
	 */
	useEffect( () => {
		const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];

		if ( blockIDs.includes( id ) ) {
			setId( generateUniqId() );
		} else if ( id ) {
			blockIDs.push( id );
			window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
		}

		idRef.current = id;
	}, [ id ]);

	/**
	 * When a block is removed from view/page, delete its id from the global scope.
	 */
	useEffect( () => {
		return () => {
			window.themeisleGutenberg.blockIDs = window.themeisleGutenberg.blockIDs.filter( usedId => usedId !== idRef.current ) || [];
			console.info( `The block with the id: ${idRef.current} has been deleted from view. The global scope is now:`, window.themeisleGutenberg.blockIDs );
		};
	}, []);

	return id;
};
