import { useId } from './customHooks.js';
import defaults from '../plugins/options/global-defaults/defaults.js';

const {
	useState,
	useEffect
} = wp.element;

const {
	isEqual
} = lodash;

/**
 * Utiliy function for creating a function that add the gobal defaults values to the block's attribute value.
 * @param {*} attributes The block's attributes provided by WordPress
 * @param {*} setAttributes The block's attributes update function provided by WordPress
 * @param {*} name The block's name provided by WordPress
 * @param {*} defaultAttributes The default attributes of the block.
 * @returns {function} Function that can be called to add the global defaults value to the block's attribute value.
 */
export const addGlobalDefaults = ( attributes, setAttributes, name, defaultAttributes ) => () => {

	// Check if the globals default are available and its values are different from the base values.
	if ( undefined !== window.themeisleGutenberg.globalDefaults && ! isEqual( defaults[name], window.themeisleGutenberg.globalDefaults[name]) ) {
		const defaultGlobalAttrs = { ...window.themeisleGutenberg.globalDefaults[name] };

		const attrs = Object.keys( defaultGlobalAttrs )
			.filter( attr => attributes[ attr ] === defaultAttributes[ attr ]?.default ) // Keep only the properties with the default value.
			// Build an attribute object with the properties that are gone take the Global Defaults values.
			.reduce( ( attrs, attr ) => {
				attrs[ attr ] = defaultGlobalAttrs[ attr ];
				return attrs;
			}, {});

		setAttributes({ ...attrs });
	}
};

/**
 * Utiliy function for creating the block's id and applying the Global Defaults on initialization.
 * @param {*} attributes The block's attributes provided by WordPress
 * @param {function} setAttributes The block's attributes update function provided by WordPress
 * @param {string} clientId The client's id provided by WordPres
 * @param {string} idPrefix The block's uniq prefix for identification.
 * @param {string} name The block's name provided by WordPress
 * @param {*} defaultAttributes The default attributes of the block.
 */
export const initBlock = ( attributes, setAttributes, clientId, idPrefix, name, defaultAttributes ) => {

	const [ watchId, setWatchId ] = useState([ ]);
	const [ id, setId ] = useId( idPrefix, clientId, attributes.id, addGlobalDefaults( attributes, setAttributes, name, defaultAttributes ) );

	const updateId = ( newId ) => {
		if ( newId && ! watchId.includes( newId ) ) {
			setWatchId([ ...watchId, newId ]);
		}
	};

	useEffect( () => {
		if ( ! id ) {
			return;
		}

		// console.log( id, watchId, window.themeisleGutenberg.blockIDs );
		if ( 0 === watchId.length ) {
			updateId( id );
		} else if ( watchId[ watchId.length - 1 ] !== id )  {

			// console.info( `UPDATE: Update internal id with ${watchId[ watchId.length - 1 ]}. Old value was: ${id}`, watchId, window.themeisleGutenberg.blockIDs );

			// For some fk unknow reasons, the value in the global scope is also upated before the id, and so it triggers again because the id got surprised to know that its value is already in the global scope
			// I can not understand how in the global scope, the old id value is already replaced before the id hook.
			window.themeisleGutenberg.blockIDs = window.themeisleGutenberg.blockIDs.filter( usedId => usedId !== watchId[ watchId.length - 1 ]) || [];
			setId( watchId[ watchId.length - 1 ]);
		} else if ( watchId[ watchId.length - 1 ] === id ) {

			// console.info( `INIT: Set new id to ${id}. Old id was ${attributes.id} for the block with the 'clientId' equal to ${clientId}. Global scope is: `, window.themeisleGutenberg.blockIDs );
			setAttributes({
				id: id
			});
		}
	}, [ id, watchId ]);

	return [ id, updateId ];
};
