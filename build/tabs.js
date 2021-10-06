/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/frontend/tabs/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/frontend/tabs/index.js":
/*!************************************!*\
  !*** ./src/frontend/tabs/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ \"@wordpress/dom-ready\");\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);\n/**\n * WordPress dependencies\n */\n\n\n_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {\n  var tabs = document.querySelectorAll('.wp-block-themeisle-blocks-tabs');\n  tabs.forEach(function (tab) {\n    var items = Array.from(tab.querySelectorAll(':scope > .wp-block-themeisle-blocks-tabs__content > .wp-block-themeisle-blocks-tabs-item'));\n    var header = document.createElement('div');\n    header.classList.add('wp-block-themeisle-blocks-tabs__header');\n    tab.prepend(header);\n    items.forEach(function (item, index) {\n      var headerItem = document.createElement('div');\n      headerItem.classList.add('wp-block-themeisle-blocks-tabs__header_item');\n      var content = item.querySelector('.wp-block-themeisle-blocks-tabs-item__content');\n\n      if (0 === index) {\n        headerItem.classList.add('active');\n        content.classList.add('active');\n      }\n\n      headerItem.innerHTML = item.dataset.title || Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('Untitled Tab');\n      headerItem.tabIndex = 0;\n      var headerMobile = item.querySelector('.wp-block-themeisle-blocks-tabs-item__header');\n\n      var toggleTabs = function toggleTabs(i, o) {\n        var content = i.querySelector('.wp-block-themeisle-blocks-tabs-item__content');\n        var headerMobile = i.querySelector('.wp-block-themeisle-blocks-tabs-item__header');\n        content.classList.toggle('active', o === index);\n        content.classList.toggle('hidden', o !== index);\n        headerMobile.classList.toggle('active', o === index);\n        headerMobile.classList.toggle('hidden', o !== index);\n        var headerItems = Array.from(header.childNodes);\n        headerItems.forEach(function (h, o) {\n          h.classList.toggle('active', o === index);\n          h.classList.toggle('hidden', o !== index);\n        });\n      };\n\n      headerItem.addEventListener('click', function () {\n        return items.forEach(toggleTabs);\n      });\n      headerItem.addEventListener('keyup', function (event) {\n        if ('Enter' === event.code) {\n          event.preventDefault();\n          items.forEach(toggleTabs);\n        }\n      });\n      headerMobile.addEventListener('click', function () {\n        return items.forEach(toggleTabs);\n      });\n      headerMobile.addEventListener('keyup', function (event) {\n        if ('Enter' === event.code) {\n          event.preventDefault();\n          items.forEach(toggleTabs);\n        }\n      });\n      header.appendChild(headerItem);\n    });\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/tabs/index.js?");

/***/ }),

/***/ "@wordpress/dom-ready":
/*!******************************!*\
  !*** external "wp.domReady" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.domReady;\n\n//# sourceURL=webpack:///external_%22wp.domReady%22?");

/***/ }),

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.i18n;\n\n//# sourceURL=webpack:///external_%22wp.i18n%22?");

/***/ })

/******/ });