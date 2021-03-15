import React from 'react';
import { IServerSideRender } from './server-side-render';

export {};
declare global {
    interface Window {
        wp: {
			serverSideRender: ( props: IServerSideRender ) => React.FunctionComponent<IServerSideRender>
		}
    }
}
