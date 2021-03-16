
// Reference: https://www.npmjs.com/package/dom-scroll-into-view
declare module 'dom-scroll-into-view' {
    function scrollIntoView(
        source: HTMLElement,
        container: HTMLElement,
        config: {
            alignWithLeft?: boolean,
            alignWithTop?: boolean,
            offsetTop?: number,
            offsetLeft?: number,
            offsetBottom?: number,
            offsetRight?: number,
            allowHorizontalScroll?: boolean,
            onlyScrollIfNeeded?: boolean,
        }
    ): void

    export = scrollIntoView
}
