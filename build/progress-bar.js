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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/frontend/progress-bar/index.js":
/*!********************************************!*\
  !*** ./src/frontend/progress-bar/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/frontend/progress-bar/utils.js\");\n/**\n * WordPress dependencies\n */\nvar domReady = wp.domReady;\n/**\n * Internal dependencies\n */\n\n\ndomReady(function () {\n  var progressBars = document.querySelectorAll('.wp-block-themeisle-blocks-progress-bar');\n  Array.from(progressBars).forEach(function (progressBar) {\n    var duration = progressBar.dataset.duration * 1000;\n    var bar = progressBar.querySelector('.wp-block-themeisle-blocks-progress-bar__area__bar');\n    var borderRadius = window.getComputedStyle(bar).borderTopLeftRadius.replace('px', '') || 0;\n    var number = progressBar.querySelector('.wp-block-themeisle-blocks-progress-bar__number');\n    var tooltip = progressBar.querySelector('.wp-block-themeisle-blocks-progress-bar__area__tooltip');\n    var append = progressBar.querySelector('.wp-block-themeisle-blocks-progress-bar__progress__append');\n    var outerTitle = progressBar.querySelector('.wp-block-themeisle-blocks-progress-bar__outer__title');\n    var innerTitle = progressBar.querySelector('.wp-block-themeisle-blocks-progress-bar__area__title');\n    var titleWidth;\n\n    if (outerTitle) {\n      titleWidth = outerTitle.getBoundingClientRect().width;\n    } else if (innerTitle) {\n      titleWidth = innerTitle.getBoundingClientRect().width;\n    }\n\n    var numberWidth = window.getComputedStyle(bar).height.replace('px', '') * 0.5;\n\n    if (tooltip && !outerTitle) {\n      tooltip.style.opacity = 1;\n    }\n\n    if (0 === duration) {\n      bar.style.width = \"\".concat(parseInt(progressBar.dataset.percent), \"%\");\n\n      if (tooltip) {\n        tooltip.style.opacity = 1;\n      }\n\n      if (append) {\n        append.style.opacity = 1;\n      }\n    } else {\n      if (number) {\n        number.innerText = '0%';\n      }\n\n      if (innerTitle && innerTitle.classList.contains('highlight')) {\n        borderRadius *= 2;\n      }\n\n      var options = {\n        root: null,\n        rootMargin: '0px',\n        threshold: [0.6]\n      };\n      var observer = new IntersectionObserver(function (entries) {\n        entries.forEach(function (entry) {\n          if (entry.isIntersecting) {\n            var interval;\n\n            if (interval) {\n              clearInterval(interval);\n            }\n\n            var step = 20; // for a more smother animation, decrease the value\n\n            var totalPercent = parseInt(progressBar.dataset.percent);\n            var percentPerTime = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"range\"])(0, duration, step).map(function (x) {\n              return Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__[\"linear\"])(x / duration) * totalPercent;\n            }).reverse();\n            interval = setInterval(function () {\n              var value = percentPerTime.pop();\n              bar.style.width = \"\".concat(value, \"%\");\n\n              if (number) {\n                number.innerText = \"\".concat(Math.ceil(value), \"%\");\n                var currentWidth = bar.getBoundingClientRect().width;\n\n                if (currentWidth > borderRadius) {\n                  bar.style.opacity = 1;\n                }\n\n                if (tooltip && outerTitle) {\n                  if (currentWidth > titleWidth + 10) {\n                    tooltip.style.opacity = 1;\n                  }\n                }\n\n                if (append) {\n                  if (innerTitle) {\n                    if (currentWidth > titleWidth + numberWidth * 1.5) {\n                      append.style.opacity = 1;\n                    }\n                  } else {\n                    if (currentWidth > numberWidth * 1.8) {\n                      append.style.opacity = 1;\n                    }\n                  }\n                }\n              }\n\n              if (!percentPerTime.length) {\n                observer.unobserve(bar);\n                clearInterval(interval);\n              }\n            }, step);\n          }\n        });\n      }, options);\n      setTimeout(function () {\n        return observer.observe(bar);\n      }, 100);\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/progress-bar/index.js?");

/***/ }),

/***/ "./src/frontend/progress-bar/utils.js":
/*!********************************************!*\
  !*** ./src/frontend/progress-bar/utils.js ***!
  \********************************************/
/*! exports provided: range, linear, easeInSine, easeOutSine, easeInOutSine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"range\", function() { return range; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInSine\", function() { return easeInSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutSine\", function() { return easeOutSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutSine\", function() { return easeInOutSine; });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar range = function range(start, end, step) {\n  var range = [];\n\n  var typeofStart = _typeof(start);\n\n  var typeofEnd = _typeof(end);\n\n  if (0 === step) {\n    throw TypeError('Step cannot be zero.');\n  }\n\n  if (undefined === typeofStart || undefined === typeofEnd) {\n    throw TypeError('Must pass start and end arguments.');\n  } else if (typeofStart !== typeofEnd) {\n    throw TypeError('Start and end arguments must be of same type.');\n  }\n\n  undefined === _typeof(step) && (step = 1);\n\n  if (end < start) {\n    step = -step;\n  }\n\n  if ('number' === typeofStart) {\n    while (0 < step ? end >= start : end <= start) {\n      range.push(start);\n      start += step;\n    }\n  } else if ('string' === typeofStart) {\n    if (1 != start.length || 1 != end.length) {\n      throw TypeError('Only strings with one character are supported.');\n    }\n\n    start = start.charCodeAt(0);\n    end = end.charCodeAt(0);\n\n    while (0 < step ? end >= start : end <= start) {\n      range.push(String.fromCharCode(start));\n      start += step;\n    }\n  } else {\n    throw TypeError('Only string and number types are supported');\n  }\n\n  return range;\n};\nvar linear = function linear(x) {\n  return x;\n};\nvar easeInSine = function easeInSine(x) {\n  return 1 - Math.cos(x * Math.PI / 2);\n};\nvar easeOutSine = function easeOutSine(x) {\n  return Math.sin(x * Math.PI / 2);\n};\nvar easeInOutSine = function easeInOutSine(x) {\n  return -(Math.cos(Math.PI * x) - 1) / 2;\n};\n\n//# sourceURL=webpack:///./src/frontend/progress-bar/utils.js?");

/***/ }),

/***/ 3:
/*!**************************************************!*\
  !*** multi ./src/frontend/progress-bar/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/frontend/progress-bar/index.js */\"./src/frontend/progress-bar/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/frontend/progress-bar/index.js?");

/***/ })

/******/ });