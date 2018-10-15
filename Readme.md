ThemeIsle Gutenberg Blocks
--------------------------

General structure of this module should be as the following:

* Load the transpiled code from the `build` dir, aka the "dist" folder.
* The functionality for each block should be isolated in it's own folder inside the `blocks` dir.
* If a block needs server side rendering than it should have an extension class of the `Base_Block` class.
* Any server side data handling should happen in the `store`.

You can add like this:

```
if ( class_exists( '\ThemeIsle\GutenbergBlocks' ) ) {
	\ThemeIsle\GutenbergBlocks::instance( __( 'Orbit Fox', 'themeisle' ) );
}
```

You also need to enqueue Font Awesome 5 for this module to work. Font Awesome 4 shims are recommended to avoid conflict with plugins, but not required.