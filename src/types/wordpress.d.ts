import { ReactNode } from 'react';

// TODO: Find what cause this module to not me see by the compier.
declare module '@wordpress/server-side-render' {
	function ServerSideRender(
		props: {
			attributes?: Record<string, unknown>,
			block: string
			className?: string
			httpMethod?: string
			urlQueryArgs?: Record<string, unknown>
			children: ReactNode
		}
	): JSX.Element

	export = ServerSideRender
}
