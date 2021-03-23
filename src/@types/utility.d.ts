import { BlockEditProps } from '@wordpress/blocks';
import { DefaultsAttrs } from '../plugins/options/global-defaults/defaults';


export type Inspector<T extends Record<string, unknown>> = Pick<BlockEditProps<T>, 'attributes' | 'setAttributes'>

/**
 * Gutenber CSS types
 */
type GutenbersCSS = {
    hasCustomCSS?: boolean,
    customCSS?: string
}

export interface OtterEditProps<T extends Record<string, unknown>> extends BlockEditProps<T> {
    readonly attributes: Readonly<T & GutenbersCSS>
    readonly setAttributes: ( attrs: Partial<T & GutenbersCSS> ) => void;
}

export type OtterInspector<T extends Record<string, unknown>> = Pick<OtterEditProps<T>, 'attributes' | 'setAttributes' | 'hasCustomCSS' | 'customCSS'>

/**
 * Extend window interface
 */


export {};
declare global {
    interface Window {
        themeisleGutenberg?: {
            blockIDs?: string[]
			globalDefaults?: DefaultsAttrs
        }
    }
}
