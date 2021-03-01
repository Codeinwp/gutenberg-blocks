export type PluginsCardData = {
    icons: {
        svg?: string
        '1x'?: string
        '2x'?: string
        default?: string
    },
    name: string
    slug: string
}

export type PluginCardSearchResponse = {
    success: true,
    data: {
        info: {
            page: number
            pages: number
            results: number
        },
        plugins: PluginsCardData[]
        errors?: string
    }
};
