import { BlockEditProps } from "@wordpress/blocks";


export interface Inspector<T extends Record<string, any>> extends Pick<BlockEditProps<T>, "attributes" | "setAttributes"> {}

/**
 * Gutenber CSS types
 */
type GutenbersCSS = {
    hasCustomCSS?: boolean,
    customCSS?: string
}

export interface OtterEditProps<T extends Record<string, any>> extends BlockEditProps<T> {
    readonly attributes: Readonly<T & GutenbersCSS>
    readonly setAttributes: (attrs: Partial<T & GutenbersCSS>) => void;
}

export interface OtterInspector<T extends Record<string, any>> extends Pick<OtterEditProps<T>, "attributes" | "setAttributes"> {}