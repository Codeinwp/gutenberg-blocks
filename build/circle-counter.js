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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/frontend/circle-counter/index.js":
/*!**********************************************!*\
  !*** ./src/frontend/circle-counter/index.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../helpers/helper-functions.js */ \"./src/helpers/helper-functions.js\");\n/**\n * WordPress dependencies\n */\nvar domReady = wp.domReady;\n/**\n * Internal dependencies\n */\n\n\ndomReady(function () {\n  var progressBars = document.querySelectorAll('.wp-block-themeisle-blocks-circle-counter');\n  Array.from(progressBars).forEach(function (progressBar) {\n    /*\n    \tDataset\n    */\n    var duration = progressBar.dataset.duration * 1000;\n    var percentage = progressBar.dataset.percentage;\n    var size = progressBar.dataset.height;\n    var strokeWidth = progressBar.dataset.strokeWidth;\n    var fontSize = progressBar.dataset.fontSizePercent;\n    var backgroundStroke = progressBar.dataset.backgroundStroke;\n    var progressStroke = progressBar.dataset.progressStroke;\n    var center = size / 2;\n    var radius = center - strokeWidth / 2;\n    var circumference = 2 * Math.PI * radius;\n\n    if (0 > radius) {\n      return;\n    }\n    /*\n    \tCreate SVG\n    */\n\n\n    var parent = progressBar.querySelector('.wp-block-themeisle-blocks-circle-counter__bar');\n    parent.style.height = size + 'px';\n    parent.style.width = size + 'px';\n    var container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n    container.classList.add('wp-block-themeisle-blocks-circle-counter-container');\n    container.setAttribute('height', size);\n    container.setAttribute('width', size);\n    var backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');\n    backgroundCircle.classList.add('wp-block-themeisle-blocks-circle-counter-bg');\n    backgroundCircle.setAttribute('cx', center);\n    backgroundCircle.setAttribute('cy', center);\n    backgroundCircle.setAttribute('r', radius);\n    backgroundCircle.style.stroke = backgroundStroke;\n    backgroundCircle.style.strokeWidth = strokeWidth;\n    var progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');\n    progressCircle.classList.add('wp-block-themeisle-blocks-circle-counter-progress');\n    progressCircle.setAttribute('cx', center);\n    progressCircle.setAttribute('cy', center);\n    progressCircle.setAttribute('r', radius);\n    progressCircle.style.stroke = progressStroke;\n    progressCircle.style.strokeWidth = strokeWidth;\n    progressCircle.style.strokeDasharray = circumference;\n    var value = document.createElementNS('http://www.w3.org/2000/svg', 'text');\n    value.classList.add('wp-block-themeisle-blocks-circle-counter-text');\n    value.setAttribute('x', '50%');\n    value.setAttribute('y', '50%');\n    value.style.fill = progressStroke;\n    value.style.fontSize = fontSize + 'px';\n    /*\n    \tAdd to page\n    */\n\n    container.appendChild(backgroundCircle);\n    container.appendChild(progressCircle);\n    container.appendChild(value);\n    parent.appendChild(container);\n    /*\n    \tAdd animation\n    */\n\n    if (!duration) {\n      progressCircle.style.strokeDashoffset = (100 - percentage) / 100 * circumference;\n      value.innerHTML = percentage + '%';\n    } else {\n      progressCircle.style.strokeDashoffset = circumference;\n      value.innerText = '0%';\n      var options = {\n        root: null,\n        rootMargin: '0px',\n        threshold: [0.6]\n      };\n      var interval;\n      var observer = new IntersectionObserver(function (entries) {\n        entries.forEach(function (entry) {\n          if (entry.isIntersecting) {\n            if (0 >= entry.intersectionRect.height) {\n              progressCircle.style.strokeDashoffset = (100 - percentage) / 100 * circumference;\n              value.innerHTML = percentage + '%';\n              observer.unobserve(bar);\n              return;\n            }\n\n            if (interval) {\n              clearInterval(interval);\n            }\n\n            var step = 20; // for a more smother animation, decrease the value\n\n            var totalPercent = parseInt(percentage);\n            var percentPerTime = Object(_helpers_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__[\"range\"])(0, duration, step).map(function (x) {\n              return Object(_helpers_helper_functions_js__WEBPACK_IMPORTED_MODULE_0__[\"linear\"])(x / duration) * totalPercent;\n            }).reverse();\n            interval = setInterval(function () {\n              var valuePercent = Math.round(percentPerTime.pop());\n              progressCircle.style.strokeDashoffset = (100 - valuePercent) / 100 * circumference;\n              value.innerHTML = valuePercent + '%';\n\n              if (!percentPerTime.length) {\n                observer.unobserve(progressBar);\n                clearInterval(interval);\n              }\n            }, step);\n          }\n        });\n      }, options);\n      setTimeout(function () {\n        return observer.observe(progressBar);\n      }, 100);\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/circle-counter/index.js?");

/***/ }),

/***/ "./src/helpers/helper-functions.js":
/*!*****************************************!*\
  !*** ./src/helpers/helper-functions.js ***!
  \*****************************************/
/*! exports provided: unescapeHTML, formatDate, range, linear, easeInSine, easeOutSine, easeInOutSine, getCustomPostTypeSlugs, convertToTitleCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unescapeHTML\", function() { return unescapeHTML; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatDate\", function() { return formatDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"range\", function() { return range; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInSine\", function() { return easeInSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutSine\", function() { return easeOutSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutSine\", function() { return easeInOutSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCustomPostTypeSlugs\", function() { return getCustomPostTypeSlugs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"convertToTitleCase\", function() { return convertToTitleCase; });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar _lodash = lodash,\n    without = _lodash.without; // HTML to Plaintext\n\nvar unescapeHTML = function unescapeHTML(value) {\n  var htmlNode = document.createElement('div');\n  htmlNode.innerHTML = value;\n\n  if (htmlNode.innerText !== undefined) {\n    return htmlNode.innerText;\n  }\n\n  return htmlNode.textContent;\n}; // Format Date\n\nvar formatDate = function formatDate(date) {\n  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\n  date = new Date(date);\n  var day = date.getDate();\n  var monthIndex = date.getMonth();\n  var year = date.getFullYear();\n  return day + ' ' + monthNames[monthIndex] + ', ' + year;\n}; // Create a list with numbers from interval [start, end]\n\nvar range = function range(start, end, step) {\n  var range = [];\n\n  var typeofStart = _typeof(start);\n\n  var typeofEnd = _typeof(end);\n\n  if (0 === step) {\n    throw TypeError('Step cannot be zero.');\n  }\n\n  if (undefined === typeofStart || undefined === typeofEnd) {\n    throw TypeError('Must pass start and end arguments.');\n  } else if (typeofStart !== typeofEnd) {\n    throw TypeError('Start and end arguments must be of same type.');\n  }\n\n  undefined === _typeof(step) && (step = 1);\n\n  if (end < start) {\n    step = -step;\n  }\n\n  if ('number' === typeofStart) {\n    while (0 < step ? end >= start : end <= start) {\n      range.push(start);\n      start += step;\n    }\n  } else if ('string' === typeofStart) {\n    if (1 != start.length || 1 != end.length) {\n      throw TypeError('Only strings with one character are supported.');\n    }\n\n    start = start.charCodeAt(0);\n    end = end.charCodeAt(0);\n\n    while (0 < step ? end >= start : end <= start) {\n      range.push(String.fromCharCode(start));\n      start += step;\n    }\n  } else {\n    throw TypeError('Only string and number types are supported');\n  }\n\n  return range;\n}; // Easing functions for animation\n\nvar linear = function linear(x) {\n  return x;\n};\nvar easeInSine = function easeInSine(x) {\n  return 1 - Math.cos(x * Math.PI / 2);\n};\nvar easeOutSine = function easeOutSine(x) {\n  return Math.sin(x * Math.PI / 2);\n};\nvar easeInOutSine = function easeInOutSine(x) {\n  return -(Math.cos(Math.PI * x) - 1) / 2;\n};\nvar getCustomPostTypeSlugs = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var dataTypes, allExistingSlugs;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return new wp.api.collections.Types().fetch();\n\n          case 2:\n            dataTypes = _context.sent;\n\n            if (!dataTypes) {\n              _context.next = 6;\n              break;\n            }\n\n            allExistingSlugs = Object.keys(dataTypes).filter(function (type) {\n              var _dataTypes$type;\n\n              return (_dataTypes$type = dataTypes[type]) === null || _dataTypes$type === void 0 ? void 0 : _dataTypes$type.slug;\n            }).map(function (type) {\n              return dataTypes[type].slug;\n            });\n            return _context.abrupt(\"return\", without(allExistingSlugs, 'attachment', 'wp_block'));\n\n          case 6:\n            return _context.abrupt(\"return\", undefined);\n\n          case 7:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function getCustomPostTypeSlugs() {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar convertToTitleCase = function convertToTitleCase(word) {\n  if ('string' === typeof word || word instanceof String) {\n    return word[0].toUpperCase() + word.slice(1);\n  }\n\n  throw 'The parameter must be a string.';\n};\n\n//# sourceURL=webpack:///./src/helpers/helper-functions.js?");

/***/ }),

/***/ 5:
/*!****************************************************!*\
  !*** multi ./src/frontend/circle-counter/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/frontend/circle-counter/index.js */\"./src/frontend/circle-counter/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/frontend/circle-counter/index.js?");

/***/ })

/******/ });