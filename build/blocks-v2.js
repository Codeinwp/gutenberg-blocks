/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"blocks-v2": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["tiOtterWebpackJsonp"] = window["tiOtterWebpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/brand-new-world/attributes.ts":
/*!**************************************************!*\
  !*** ./src/blocks/brand-new-world/attributes.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst attributes = {\n    id: {\n        type: 'string'\n    },\n    text: {\n        type: 'string',\n        default: 'Hallo'\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (attributes);\n\n\n//# sourceURL=webpack:///./src/blocks/brand-new-world/attributes.ts?");

/***/ }),

/***/ "./src/blocks/brand-new-world/edit.tsx":
/*!*********************************************!*\
  !*** ./src/blocks/brand-new-world/edit.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _inspector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inspector */ \"./src/blocks/brand-new-world/inspector.tsx\");\n\n\n\nconst edit = ({ attributes, setAttributes, }) => {\n    console.log(attributes);\n    return (react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", null,\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_inspector__WEBPACK_IMPORTED_MODULE_2__[\"default\"], { attributes: attributes, setAttributes: setAttributes }),\n        react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__[\"RichText\"], { value: attributes.text, onChange: (value) => setAttributes({ text: value }) })));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (edit);\n\n\n//# sourceURL=webpack:///./src/blocks/brand-new-world/edit.tsx?");

/***/ }),

/***/ "./src/blocks/brand-new-world/index.tsx":
/*!**********************************************!*\
  !*** ./src/blocks/brand-new-world/index.tsx ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ \"@wordpress/blocks\");\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ \"./node_modules/@wordpress/i18n/build-module/index.js\");\n/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ \"./src/blocks/brand-new-world/edit.tsx\");\n/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ \"./src/blocks/brand-new-world/save.tsx\");\n/* harmony import */ var _attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attributes */ \"./src/blocks/brand-new-world/attributes.ts\");\n\n\n/**\n * Internal dependencies\n */\n\n\n\nconst result = Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__[\"registerBlockType\"])('themeisle-blocks/typescript-text', {\n    title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__[\"__\"])('Test Typescript'),\n    description: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__[\"__\"])('Put the logo maker on the site.'),\n    category: 'widgets',\n    icon: 'smiley',\n    attributes: _attributes__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    edit: _edit__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    save: _save__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n});\nconsole.log(result);\n\n\n//# sourceURL=webpack:///./src/blocks/brand-new-world/index.tsx?");

/***/ }),

/***/ "./src/blocks/brand-new-world/inspector.tsx":
/*!**************************************************!*\
  !*** ./src/blocks/brand-new-world/inspector.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst inspector = ({ attributes, setAttributes, }) => {\n    return (react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](\"div\", null,\n        react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__[\"InspectorControls\"], null,\n            react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](_wordpress_components__WEBPACK_IMPORTED_MODULE_1__[\"PanelBody\"], null,\n                react__WEBPACK_IMPORTED_MODULE_2__[\"createElement\"](_wordpress_components__WEBPACK_IMPORTED_MODULE_1__[\"TextControl\"], { value: attributes.text, onChange: (value) => setAttributes({ text: value }) })))));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (inspector);\n\n\n//# sourceURL=webpack:///./src/blocks/brand-new-world/inspector.tsx?");

/***/ }),

/***/ "./src/blocks/brand-new-world/save.tsx":
/*!*********************************************!*\
  !*** ./src/blocks/brand-new-world/save.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst save = ({ attributes }) => {\n    return (react__WEBPACK_IMPORTED_MODULE_1__[\"createElement\"](_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__[\"RichText\"].Content, { value: attributes.text }));\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (save);\n\n\n//# sourceURL=webpack:///./src/blocks/brand-new-world/save.tsx?");

/***/ }),

/***/ 1:
/*!****************************************************!*\
  !*** multi ./src/blocks/brand-new-world/index.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/blocks/brand-new-world/index.tsx */\"./src/blocks/brand-new-world/index.tsx\");\n\n\n//# sourceURL=webpack:///multi_./src/blocks/brand-new-world/index.tsx?");

/***/ }),

/***/ "@wordpress/block-editor":
/*!****************************!*\
  !*** external "wp.editor" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.editor;\n\n//# sourceURL=webpack:///external_%22wp.editor%22?");

/***/ }),

/***/ "@wordpress/blocks":
/*!****************************!*\
  !*** external "wp.blocks" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.blocks;\n\n//# sourceURL=webpack:///external_%22wp.blocks%22?");

/***/ }),

/***/ "@wordpress/components":
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.components;\n\n//# sourceURL=webpack:///external_%22wp.components%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ })

/******/ });