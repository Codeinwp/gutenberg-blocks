/**
 * WordPress dependencies
 */
const domReady = wp.domReady;

/**
 * Active or deactivate a tab
 * @param {HTMLElement} tab
 * @param {boolean} isActive
 */
const setTabStatus = ( tab, isActive = false ) => {
	if ( ! tab ) {
		return;
	}
	if ( isActive ) {
		tab.classList.add( 'active' );
	} else {
		tab.classList.remove( 'active' );
	}
};


/**
 * Active the first tab
 * @param {NodeListOf<Element>} headers List of headers
 * @param {NodeListOf<Element>} tabs List of the tab
 */
const activateFirstTab = ( headers, tabs ) => {
	console.log( 'Active first tabs' );
	if ( 0 < headers.length ) {
		headers[0].classList.add( 'active' );
	}

	if ( 0 < tabs.length ) {
		const firstTab = tabs[0];
		setTabStatus( firstTab.querySelector( '.wp-block-themeisle-blocks-tabs-item-header' ), true );
		setTabStatus( firstTab.querySelector( '.wp-block-themeisle-blocks-tabs-item-content' ), true );
	}
};

domReady( () => {
	const tabsBlocks = document.querySelectorAll( '.wp-block-themeisle-blocks-tabs' );

	/**
	 * Used for desktop
	 * Set activation function for the headers of the parent component
	 */
	tabsBlocks.forEach( tabsBlock => {
		const headers = tabsBlock.querySelectorAll( '.wp-block-themeisle-blocks-tabs-header' );
		const setHeadersInactive = () => {
			headers.forEach( header => {
				const target = tabsBlock.querySelector( `#${header.dataset.tabId} .wp-block-themeisle-blocks-tabs-item-content` );
				setTabStatus( target );
				setTabStatus( header );
			});
		};

		headers.forEach( header => {
			header.addEventListener( 'click', () => {
				setHeadersInactive();

				// Active the tab
				const target = tabsBlock.querySelector( `#${header.dataset.tabId} .wp-block-themeisle-blocks-tabs-item-content` );
				setTabStatus( target, true );
				setTabStatus( header, true );
			});
		});

		const tabs = tabsBlock.querySelectorAll( '.wp-block-themeisle-blocks-tabs-item' );

		/**
		 * Used for mobile
		 * Set activation function for each tab
		 */
		tabs.forEach( tab => {
			const header = tab.querySelector( '.wp-block-themeisle-blocks-tabs-item-header' );
			const content = tab.querySelector( '.wp-block-themeisle-blocks-tabs-item-content' );

			header.addEventListener( 'click', () => {
				tabs.forEach( other => {
					const otherHeader = other.querySelector( '.wp-block-themeisle-blocks-tabs-item-header' );
					const otherContent = other.querySelector( '.wp-block-themeisle-blocks-tabs-item-content' );
					setTabStatus( otherContent );
					setTabStatus( otherHeader );
				});
				setTabStatus( content, true );
				setTabStatus( header, true );
			});
		});

		activateFirstTab( headers, tabs );
	});
});
