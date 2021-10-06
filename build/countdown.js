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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/frontend/countdown/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/frontend/countdown/index.js":
/*!*****************************************!*\
  !*** ./src/frontend/countdown/index.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ \"@wordpress/dom-ready\");\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _helpers_helper_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers/helper-functions.js */ \"./src/helpers/helper-functions.js\");\n/**\n * WordPress dependencies\n */\n\n\n/**\n * Internal dependencies\n */\n\n\n/**\n * Get an object with the update function for every component\n * @param {HTMLDivElement} root\n * @returns {Object.<string, Function>}\n */\n\nvar getComponentsUpdate = function getComponentsUpdate(root) {\n  return ['second', 'minute', 'hour', 'day'].reduce(function (acc, componentName) {\n    var elem = root.querySelector(\"div[name=\".concat(componentName, \"]\"));\n\n    if (elem) {\n      var labelElem = elem.querySelector('.wp-block-themeisle-blocks-countdown__display-area__label');\n      var valueElem = elem.querySelector('.wp-block-themeisle-blocks-countdown__display-area__value');\n\n      acc[componentName] = function (labelName, value) {\n        if (parseInt(valueElem.innerHTML) !== value) {\n          valueElem.innerHTML = value;\n        }\n\n        labelElem.innerHTML = labelName;\n      };\n    }\n\n    return acc;\n  }, {});\n};\n/**\n *\n * @param {*} date The deadline of the countdown\n * @param {*} updateComponents The object with the update functions\n * @returns {Function} Function that update the countdown every time it is called. You can send a callback to be triggered when is finised.\n */\n\n\nvar updateTime = function updateTime(date, updateComponents) {\n  var _date = date + Object(_helpers_helper_functions_js__WEBPACK_IMPORTED_MODULE_2__[\"getTimezone\"])();\n\n  _date = moment__WEBPACK_IMPORTED_MODULE_1___default()(_date).unix() * 1000;\n  return function (onFinishCb) {\n    var time = Object(_helpers_helper_functions_js__WEBPACK_IMPORTED_MODULE_2__[\"getIntervalFromUnix\"])(_date - Date.now());\n    time.forEach(function (_ref) {\n      var _updateComponents$tag;\n\n      var tag = _ref.tag,\n          value = _ref.value,\n          name = _ref.name;\n      (_updateComponents$tag = updateComponents[tag]) === null || _updateComponents$tag === void 0 ? void 0 : _updateComponents$tag.call(updateComponents, name, value);\n    });\n\n    if (0 >= time) {\n      onFinishCb();\n    }\n  };\n};\n\n_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(function () {\n  var countdowns = document.querySelectorAll('.wp-block-themeisle-blocks-countdown');\n  countdowns.forEach(function (countdown) {\n    var date = countdown.dataset.date;\n\n    if (date) {\n      var update = updateTime(date, getComponentsUpdate(countdown));\n      var interval = setInterval(function () {\n        update(function () {\n          return clearInterval(interval);\n        });\n      }, 500);\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/countdown/index.js?");

/***/ }),

/***/ "./src/helpers/helper-functions.js":
/*!*****************************************!*\
  !*** ./src/helpers/helper-functions.js ***!
  \*****************************************/
/*! exports provided: unescapeHTML, formatDate, range, linear, easeInSine, easeOutSine, easeInOutSine, getCustomPostTypeSlugs, convertToTitleCase, insertBetweenItems, getIntervalFromUnix, getTimezone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"unescapeHTML\", function() { return unescapeHTML; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatDate\", function() { return formatDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"range\", function() { return range; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInSine\", function() { return easeInSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOutSine\", function() { return easeOutSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOutSine\", function() { return easeInOutSine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCustomPostTypeSlugs\", function() { return getCustomPostTypeSlugs; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"convertToTitleCase\", function() { return convertToTitleCase; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertBetweenItems\", function() { return insertBetweenItems; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getIntervalFromUnix\", function() { return getIntervalFromUnix; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTimezone\", function() { return getTimezone; });\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/date */ \"@wordpress/date\");\n/* harmony import */ var _wordpress_date__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_date__WEBPACK_IMPORTED_MODULE_2__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n\n\n // HTML to Plaintext\n\nvar unescapeHTML = function unescapeHTML(value) {\n  var htmlNode = document.createElement('div');\n  htmlNode.innerHTML = value;\n\n  if (htmlNode.innerText !== undefined) {\n    return htmlNode.innerText;\n  }\n\n  return htmlNode.textContent;\n}; // Format Date\n\nvar formatDate = function formatDate(date) {\n  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];\n  date = new Date(date);\n  var day = date.getDate();\n  var monthIndex = date.getMonth();\n  var year = date.getFullYear();\n  return day + ' ' + monthNames[monthIndex] + ', ' + year;\n}; // Create a list with numbers from interval [start, end]\n\nvar range = function range(start, end, step) {\n  var range = [];\n\n  var typeofStart = _typeof(start);\n\n  var typeofEnd = _typeof(end);\n\n  if (0 === step) {\n    throw TypeError('Step cannot be zero.');\n  }\n\n  if (undefined === typeofStart || undefined === typeofEnd) {\n    throw TypeError('Must pass start and end arguments.');\n  } else if (typeofStart !== typeofEnd) {\n    throw TypeError('Start and end arguments must be of same type.');\n  }\n\n  undefined === _typeof(step) && (step = 1);\n\n  if (end < start) {\n    step = -step;\n  }\n\n  if ('number' === typeofStart) {\n    while (0 < step ? end >= start : end <= start) {\n      range.push(start);\n      start += step;\n    }\n  } else if ('string' === typeofStart) {\n    if (1 != start.length || 1 != end.length) {\n      throw TypeError('Only strings with one character are supported.');\n    }\n\n    start = start.charCodeAt(0);\n    end = end.charCodeAt(0);\n\n    while (0 < step ? end >= start : end <= start) {\n      range.push(String.fromCharCode(start));\n      start += step;\n    }\n  } else {\n    throw TypeError('Only string and number types are supported');\n  }\n\n  return range;\n}; // Easing functions for animation\n\nvar linear = function linear(x) {\n  return x;\n};\nvar easeInSine = function easeInSine(x) {\n  return 1 - Math.cos(x * Math.PI / 2);\n};\nvar easeOutSine = function easeOutSine(x) {\n  return Math.sin(x * Math.PI / 2);\n};\nvar easeInOutSine = function easeInOutSine(x) {\n  return -(Math.cos(Math.PI * x) - 1) / 2;\n};\nvar getCustomPostTypeSlugs = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    var dataTypes, allExistingSlugs;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return new wp.api.collections.Types().fetch();\n\n          case 2:\n            dataTypes = _context.sent;\n\n            if (!dataTypes) {\n              _context.next = 6;\n              break;\n            }\n\n            allExistingSlugs = Object.keys(dataTypes).filter(function (type) {\n              var _dataTypes$type;\n\n              return (_dataTypes$type = dataTypes[type]) === null || _dataTypes$type === void 0 ? void 0 : _dataTypes$type.slug;\n            }).map(function (type) {\n              return dataTypes[type].slug;\n            });\n            return _context.abrupt(\"return\", Object(lodash__WEBPACK_IMPORTED_MODULE_0__[\"without\"])(allExistingSlugs, 'attachment', 'wp_block'));\n\n          case 6:\n            return _context.abrupt(\"return\", undefined);\n\n          case 7:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function getCustomPostTypeSlugs() {\n    return _ref.apply(this, arguments);\n  };\n}();\nvar convertToTitleCase = function convertToTitleCase(word) {\n  if ('string' === typeof word || word instanceof String) {\n    return word[0].toUpperCase() + word.slice(1);\n  }\n\n  throw 'The parameter must be a string.';\n};\n/**\n * Insert an item between the element of the array\n * @param {Array} arr\n * @param {any} item\n * @returns An array with the given item inserted between initial elements\n */\n\nvar insertBetweenItems = function insertBetweenItems(arr, item) {\n  var _arr = [];\n  arr === null || arr === void 0 ? void 0 : arr.forEach(function (listItem, index) {\n    _arr.push(listItem); // Omit to add for the last list item\n\n\n    if (index < arr.length - 1) {\n      _arr.push(item);\n    }\n  });\n  return _arr;\n}; // Time constants\n\nvar _MS_PER_SECONDS = 1000;\n\nvar _MS_PER_MINUTES = _MS_PER_SECONDS * 60;\n\nvar _MS_PER_HOURS = _MS_PER_MINUTES * 60;\n\nvar _MS_PER_DAY = _MS_PER_HOURS * 24;\n/**\n * Get the time interval from the unix time\n * @param {number} unixTime Time as UNIX\n * @param {object} settings Options to keep a components or/and allow negative time\n * @returns An object with the values for days, hours, minutes, seconds\n */\n\n\nvar getIntervalFromUnix = function getIntervalFromUnix(unixTime, settings) {\n  unixTime = unixTime ? unixTime : 0; // Check for null/undefined\n\n  var days = Math.floor(unixTime / _MS_PER_DAY);\n  var hours = Math.floor(unixTime / _MS_PER_HOURS % 24);\n  var minutes = Math.floor(unixTime / _MS_PER_MINUTES % 60);\n  var seconds = Math.floor(unixTime / _MS_PER_SECONDS % 60);\n  var time = [{\n    tag: 'day',\n    name: 1 < days ? 'Days' : 'Day',\n    value: days\n  }, {\n    tag: 'hour',\n    name: 1 < hours ? 'Hours' : 'Hour',\n    value: hours\n  }, {\n    tag: 'minute',\n    name: 1 < minutes ? 'Minutes' : 'Minute',\n    value: minutes\n  }, {\n    tag: 'second',\n    name: 1 < seconds ? 'Seconds' : 'Second',\n    value: seconds\n  }].filter(function (_ref2) {\n    var _settings$exclude;\n\n    var tag = _ref2.tag;\n    return !(settings !== null && settings !== void 0 && (_settings$exclude = settings.exclude) !== null && _settings$exclude !== void 0 && _settings$exclude.includes(tag));\n  }).map(function (obj) {\n    if (!(settings !== null && settings !== void 0 && settings.keepNeg)) {\n      obj.value = Math.max(0, obj.value);\n    }\n\n    return obj;\n  });\n  return time;\n}; // Get site's timezone.\n\nvar getTimezone = function getTimezone() {\n  var settings = Object(_wordpress_date__WEBPACK_IMPORTED_MODULE_2__[\"__experimentalGetSettings\"])();\n\n  var offset = 60 * settings.timezone.offset;\n  var sign = 0 > offset ? '-' : '+';\n  var absmin = Math.abs(offset);\n  var timezone = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__[\"sprintf\"])('%s%02d:%02d', sign, absmin / 60, absmin % 60);\n  return timezone;\n};\n\n//# sourceURL=webpack:///./src/helpers/helper-functions.js?");

/***/ }),

/***/ "@wordpress/date":
/*!**************************!*\
  !*** external "wp.date" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.date;\n\n//# sourceURL=webpack:///external_%22wp.date%22?");

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

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = lodash;\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = moment;\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ })

/******/ });