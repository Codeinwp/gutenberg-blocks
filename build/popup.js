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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/frontend/popup/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/frontend/popup/index.js":
/*!*************************************!*\
  !*** ./src/frontend/popup/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ \"@wordpress/dom-ready\");\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup.js */ \"./src/frontend/popup/popup.js\");\n/**\n * WordPress dependencies\n */\n\n/**\n * Internal dependencies\n */\n\n\n_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {\n  var popups = document.querySelectorAll('.wp-block-themeisle-blocks-popup');\n\n  if (!popups.length) {\n    return;\n  }\n\n  popups.forEach(function (block) {\n    return new _popup_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](block);\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/popup/index.js?");

/***/ }),

/***/ "./src/frontend/popup/popup.js":
/*!*************************************!*\
  !*** ./src/frontend/popup/popup.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PopupBlock = /*#__PURE__*/function () {\n  function PopupBlock(element) {\n    _classCallCheck(this, PopupBlock);\n\n    this.element = element;\n    this.happened = false;\n    this.storageKey = 'wp-block-themeisle-blocks-popup-dismiss';\n    var _element$dataset = element.dataset,\n        dismiss = _element$dataset.dismiss,\n        anchor = _element$dataset.anchor;\n\n    if (this.isItemDismissed() && dismiss && !anchor && !Boolean(window.themeisleGutenberg.isPreview)) {\n      return false;\n    }\n\n    this.init();\n  }\n\n  _createClass(PopupBlock, [{\n    key: \"init\",\n    value: function init() {\n      this.bindOpen();\n      this.bindClose();\n    }\n  }, {\n    key: \"openModal\",\n    value: function openModal() {\n      this.element.classList.add('active');\n      this.happened = true;\n    }\n  }, {\n    key: \"closeModal\",\n    value: function closeModal() {\n      this.element.classList.remove('active');\n      this.dismissModal();\n    }\n  }, {\n    key: \"dismissModal\",\n    value: function dismissModal() {\n      var _this$element$dataset = this.element.dataset,\n          dismiss = _this$element$dataset.dismiss,\n          anchor = _this$element$dataset.anchor;\n      var id = this.element.id;\n\n      if (!dismiss || !id || anchor) {\n        return false;\n      }\n\n      var now = new Date();\n      var cache = JSON.parse(localStorage.getItem(this.storageKey)) || [];\n      var exists = cache.some(function (entry) {\n        return entry.modalID === id;\n      });\n\n      if (exists) {\n        return false;\n      }\n\n      var ttl = 1000 * 60 * 60 * 24 * dismiss;\n      var item = {\n        expiry: now.getTime() + ttl,\n        modalID: id\n      };\n      localStorage.setItem(this.storageKey, JSON.stringify([].concat(_toConsumableArray(cache), [item])));\n    }\n  }, {\n    key: \"isItemDismissed\",\n    value: function isItemDismissed() {\n      var id = this.element.id;\n      var cache = JSON.parse(localStorage.getItem(this.storageKey)) || [];\n      var inCache = cache.filter(function (entry) {\n        return entry.modalID === id;\n      });\n\n      if (0 === inCache.length) {\n        return false;\n      }\n\n      var item = inCache[0];\n      var now = new Date();\n\n      if (item.expiry > now.getTime()) {\n        return true;\n      }\n\n      var newCache = cache.filter(function (i) {\n        return i !== inCache[0];\n      });\n      localStorage.setItem(this.storageKey, JSON.stringify(newCache));\n      return false;\n    }\n  }, {\n    key: \"bindOpen\",\n    value: function bindOpen() {\n      var open = this.element.dataset.open;\n\n      switch (open) {\n        case 'onClick':\n          this.bindAnchors();\n          break;\n\n        case 'onScroll':\n          this.bindOpenAfterScroll();\n          break;\n\n        case 'onExit':\n          this.bindExitIntent();\n          break;\n\n        default:\n        case 'onLoad':\n          this.bindOnLoad();\n          break;\n      }\n    }\n  }, {\n    key: \"bindAnchors\",\n    value: function bindAnchors() {\n      var _this = this;\n\n      var anchor = this.element.dataset.anchor;\n\n      if (!anchor) {\n        return false;\n      }\n\n      var buttons = document.querySelectorAll(\"a[href='#\".concat(anchor, \"']\"));\n      buttons.forEach(function (button) {\n        button.addEventListener('click', function (e) {\n          e.preventDefault();\n\n          _this.openModal();\n        });\n      });\n    }\n  }, {\n    key: \"bindOpenAfterScroll\",\n    value: function bindOpenAfterScroll() {\n      var _this2 = this;\n\n      window.document.addEventListener('scroll', function () {\n        if (_this2.happened) {\n          return false;\n        }\n\n        var offset = _this2.element.dataset.offset;\n\n        if (parseInt(offset) >= parseInt(_this2.getScrolledPercent())) {\n          return false;\n        }\n\n        _this2.openModal();\n      });\n    }\n  }, {\n    key: \"bindOnLoad\",\n    value: function bindOnLoad() {\n      var _this3 = this;\n\n      var time = this.element.dataset.time;\n      setTimeout(function () {\n        _this3.openModal();\n      }, time * 1000);\n    }\n  }, {\n    key: \"bindExitIntent\",\n    value: function bindExitIntent() {\n      var _this4 = this;\n\n      document.body.addEventListener('mouseleave', function (e) {\n        if (_this4.happened) {\n          return false;\n        }\n\n        if (0 > e.clientY) {\n          _this4.openModal();\n        }\n      });\n    }\n  }, {\n    key: \"getScrolledPercent\",\n    value: function getScrolledPercent() {\n      var height = document.documentElement;\n      var body = document.body;\n      var st = 'scrollTop';\n      var sh = 'scrollHeight';\n      return (height[st] || body[st]) / ((height[sh] || body[sh]) - height.clientHeight) * 100;\n    }\n  }, {\n    key: \"bindClose\",\n    value: function bindClose() {\n      this.bindCloseButtons();\n      this.bindAnchorClose();\n      this.bindOverlayClosing();\n    }\n  }, {\n    key: \"bindAnchorClose\",\n    value: function bindAnchorClose() {\n      var _this5 = this;\n\n      var anchorclose = this.element.dataset.anchorclose;\n\n      if (!anchorclose) {\n        return false;\n      }\n\n      var buttons = document.querySelectorAll(\"a[href='#\".concat(anchorclose, \"']\"));\n      buttons.forEach(function (button) {\n        button.addEventListener('click', function (e) {\n          e.preventDefault();\n\n          _this5.closeModal();\n        });\n      });\n    }\n  }, {\n    key: \"bindCloseButtons\",\n    value: function bindCloseButtons() {\n      var _this6 = this;\n\n      var modal = this.element;\n      var closes = modal.querySelectorAll('.wp-block-themeisle-blocks-popup__modal_header .components-button');\n      closes.forEach(function (close) {\n        close.addEventListener('click', function () {\n          _this6.closeModal();\n        });\n      });\n    }\n  }, {\n    key: \"bindOverlayClosing\",\n    value: function bindOverlayClosing() {\n      var _this7 = this;\n\n      var outside = this.element.dataset.outside;\n\n      if (!outside) {\n        return false;\n      }\n\n      var overlay = this.element.querySelector('.wp-block-themeisle-blocks-popup__modal_wrap_overlay');\n      overlay.addEventListener('click', function () {\n        _this7.closeModal();\n      });\n    }\n  }]);\n\n  return PopupBlock;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (PopupBlock);\n\n//# sourceURL=webpack:///./src/frontend/popup/popup.js?");

/***/ }),

/***/ "@wordpress/dom-ready":
/*!******************************!*\
  !*** external "wp.domReady" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.domReady;\n\n//# sourceURL=webpack:///external_%22wp.domReady%22?");

/***/ })

/******/ });