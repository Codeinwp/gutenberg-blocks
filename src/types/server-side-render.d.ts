import React, { ReactNode } from 'react';

export interface IServerSideRender {
	attributes?: Record<string, unknown>,
	block: string
	className?: string
	httpMethod?: string
	urlQueryArgs?: Record<string, unknown>
	children: ReactNode
}

// TODO: Find what cause this module to not me see by the compiler.
declare module '@wordpress/server-side-render' {

	export default function ExportedServerSideRender(
		props: IServerSideRender
	): React.FunctionComponent<IServerSideRender>;
}
