import globalDefaultsBlocksAttrs from '../plugins/options/global-defaults/defaults.js';
const {
	isEqual
} = lodash;
import { v4 as uuidv4 } from 'uuid';

/**
 * Utiliy function for creating a function that add the gobal defaults values to the block's attribute value.
 * @param {Object} attributes The block's attributes provided by WordPress
 * @param {function} setAttributes The block's attributes update function provided by WordPress
 * @param {string} name The block's name provided by WordPress
 * @param {Object} defaultAttributes The default attributes of the block.
 */
export const addGlobalDefaults = ( attributes, setAttributes, name, defaultAttributes ) => {

	// Check if the globals default are available and its values are different from the base values.
	if ( undefined !== window.themeisleGutenberg?.globalDefaults && ! isEqual( globalDefaultsBlocksAttrs[name], window.themeisleGutenberg.globalDefaults[name]) ) {
		const defaultGlobalAttrs = { ...window.themeisleGutenberg.globalDefaults[name] };

		const attrs = Object.keys( defaultGlobalAttrs )
			.filter( attr => attributes[ attr ] === defaultAttributes[ attr ]?.default ) // Keep only the properties with the default value.
			// Build an attribute object with the properties that are gone take the Global Defaults values.
			.reduce( ( attrs, attr ) => {
				attrs[ attr ] = defaultGlobalAttrs[ attr ];
				return attrs;
			}, {});
		console.log( 'GB', attrs );
		setAttributes({ ...attrs });
	}
};

/**
 * An object that keep tracking of the block instances. Is used for preventing id duplication on action like: create, duplicate, copy on editor page.
 * @type {Object.<string, Array.<string>>}
 */
const localIDs = {};

/**
 * Generate an Id based on the client id of the block. If the new id is also already used, create a new one using the `uuid`.
 * This might problem of duplicated new ids can be observed in the `Template Library` of the `Section` block when using Neve
 * Reference: https://github.com/Codeinwp/neve/blob/master/gutenberg/blocks/blog/template.json
 * The created block will share the same client Id at the beggining, after refresh a new will be generated and thus the problem will fix itself
 * by creating new id based on the new uniq `clientId`
 * @param {string} idPrefix The prefix used for generating the block id
 * @param {string} clientId The block's client id provided by WordPress
 * @param {Array.<string>} idsList The ids list for the current type of block
 * @returns An uniq id instance
 */
const generateUniqIdInstance = ( idPrefix, clientId, idsList ) => {
	const instanceId = `${ idPrefix }${ clientId.substr( 0, 8 ) }`;
	if ( idsList.includes( instanceId ) ) {

		console.log( 'Edge case detected', instanceId, idsList );
		let newInstanceId = `${ idPrefix }${ uuidv4().substr( 0, 8 ) }`;
		while ( idsList.includes( newInstanceId ) ) {
			newInstanceId = `${ idPrefix }${ uuidv4().substr( 0, 8 ) }`;
		}
		return newInstanceId;
	}
	return instanceId;
};

/**
 * THe args definition for the block id generator
 * @typedef {Object} AddBlockIdProps
 * @property {Object} attributes The block's attributes provided by WordPress
 * @property {function} setAttributes The block's attributes update function provided by WordPress
 * @property {string} name The block's name provided by WordPress
 * @property {string} clientId The block's client id provided by WordPress
 * @property {Object} defaultAttributes The default attributes of the block.
 * @property {string} idPrefix The prefix used for generating the block id
 */


/**
 * Generate an Id for block so that it will create a conlfict with the others.
 * Prevent the duplicate Id for actions like: duplicate, copy
 * @param {AddBlockIdProps} args
 */
export const addBlockId = ( args ) => {
	const { attributes, setAttributes, clientId, idPrefix, name, defaultAttributes } = args;

	// Initiliazi with an empty array the id list for the given block
	localIDs[name] ??= [];

	const blockIDs = window.themeisleGutenberg.blockIDs ? window.themeisleGutenberg.blockIDs : [];
	const instanceId = generateUniqIdInstance( idPrefix, clientId, localIDs[name]);
	const idIsAlreadyUsed = attributes.id && localIDs[name].includes( attributes.id );

	if ( attributes.id === undefined ) {
		console.log( 'Undefined id', name );

		// If the id is undefined, then the block is newly created, and so we need to apply the Global Defaults
		addGlobalDefaults( attributes, setAttributes, name, defaultAttributes );

		// Save the id in all methods
		setAttributes({ id: instanceId });
		localIDs[name].push( instanceId );
		blockIDs.push( instanceId );
	} else if ( idIsAlreadyUsed ) {
		console.log( 'Already used', instanceId, attributes.id );

		// The block must be a copy and its is already used
		// Generate a new one and save it to `localIDs` to keep track of it in local mode.
		setAttributes({ id: instanceId });
		localIDs[name].push( instanceId );
	} else {

		// No conflicts, save the current id only to keep track of it both in local and global mode.
		localIDs[name].push( attributes.id );
		blockIDs.push( attributes.id );
	}

	window.themeisleGutenberg.blockIDs = [ ...blockIDs ];
	console.log( 'Local', localIDs );

	const deleteBlockIdFromRegister = () => {
		if ( attributes.id !== undefined && ! idIsAlreadyUsed ) {
			localIDs[name] = localIDs[name].filter( id => id !== attributes.id );
			console.log( `Clean attr UP ${attributes.id}`, localIDs[name]);
		} else {
			localIDs[name] = localIDs[name].filter( id => id !== instanceId );
			console.log( `Clean instance UP ${instanceId}`,  localIDs[name]);
		}
	};

	return deleteBlockIdFromRegister;
};
