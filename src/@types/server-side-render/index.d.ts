type ServerSideRender = ( props: {
    attributes?: Record<string, unknown>,
    block: string
    className?: string
    httpMethod?: string
    urlQueryArgs?: Record<string, unknown>
    EmptyResponsePlaceholder?: WPElement
    ErrorResponsePlaceholder?: WPElement
    LoadingResponsePlaceholder?: WPElement
}) => JSX.Element

declare module '@wordpress/server-side-render' {
	export const serverSideRender: ServerSideRender;
	export default serverSideRender
}
