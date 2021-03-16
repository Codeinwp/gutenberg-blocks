
import { WordPressGlobal } from './@wordpress';


export {};
declare global {
    interface Window {
        wp: {
			serverSideRender: WordPressGlobal.ServerSideRender
		}
    }
}
