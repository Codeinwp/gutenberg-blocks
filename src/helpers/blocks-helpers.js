import { useId } from './customHooks.js';
import defaults from '../plugins/options/global-defaults/defaults.js';

const {
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

	const id = useId( idPrefix, clientId, attributes.id, addGlobalDefaults( attributes, setAttributes, name, defaultAttributes ) );

	useEffect( () => {
		if ( id !== attributes.id ) {
			console.info( `Set new id to ${id}. Old id was ${attributes.id} for the block with the 'clientId' equal to ${clientId}. Global scope is: `, window.themeisleGutenberg.blockIDs );
			setAttributes({
				id: id
			});
		}
	}, [ id ]);
};
