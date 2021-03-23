import { BlockEditProps } from '@wordpress/blocks';
import { isEqual } from 'lodash';
import defaults, { DefaultsAttrs } from '../plugins/options/global-defaults/defaults';

/**
 * Utiliy function for creating a function that add the gobal defaults values to the block's attribute value.
 * @param {*} attributes The block's attributes provided by WordPress
 * @param {*} setAttributes The block's attributes update function provided by WordPress
 * @param {*} name The block's name provided by WordPress
 * @param {*} defaultAttributes The default attributes of the block.
 * @returns {function} Function that can be called to add the global defaults value to the block's attribute value.
 */
type AddGlobalDefaults = (
	attributes: Record<string, any>,
	setAttributes: ( attrs: Record<string, any> ) => void,
	name: string,
	defaultAttributes: DefaultsAttrs
) => () => void;
export const addGlobalDefaults: AddGlobalDefaults = ( attributes, setAttributes, name, defaultAttributes ) => () => {

	// Check if the globals default are available and its values are different from the base values.
	if ( undefined !== window.themeisleGutenberg?.globalDefaults && ! isEqual( defaults[name], window.themeisleGutenberg.globalDefaults[name]) ) {
		const defaultGlobalAttrs = { ...window.themeisleGutenberg.globalDefaults[name] };

		const attrs = Object.keys( defaultGlobalAttrs )
			.filter( attr => attributes[ attr ] === defaultAttributes[ attr ]?.default ) // Keep only the properties with the default value.
			// Build an attribute object with the properties that are gone take the Global Defaults values.
			.reduce( ( attrs: Record<string, any>, attr ) => {
				attrs[ attr ] = defaultGlobalAttrs[ attr ];
				return attrs;
			}, {});

		setAttributes({ ...attrs });
	}
};
