import { useId } from './customHooks.js';
import defaults from '../plugins/options/global-defaults/defaults.js';

const {
	useEffect
} = wp.element;

const {
	isEqual
} = lodash;

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

	const addGlobalDefaultOnInitialize = () => {

		// Check if the global default are available.
		if ( undefined !== window.themeisleGutenberg.globalDefaults && ! isEqual( defaults[name], window.themeisleGutenberg.globalDefaults[name]) ) {
			const defaultGlobalAttrs = { ...window.themeisleGutenberg.globalDefaults[name] };

			const attrs = Object.keys( defaultGlobalAttrs )
				.filter( attr => attributes[ attr ] === defaultAttributes[ attr ]?.default ) // Keep only the properties with the default value.
				.reduce( ( attrs, attr ) => {
					attrs[ attr ] = defaultGlobalAttrs[ attr ];
					return attrs;
				}, {});

			setAttributes({ ...attrs });
		}
	};

	const id = useId( idPrefix, clientId, attributes.id, addGlobalDefaultOnInitialize );

	useEffect( () => {
		if ( id !== attributes.id ) {
			console.info( `Set new id to ${id}. Old id was ${attributes.id} for the block with the 'clientId' equal to ${clientId}. Global scope is: ${window.themeisleGutenberg.blockIDs}` );
			setAttributes({
				id: id
			});
		}
	}, [ id ]);
};
