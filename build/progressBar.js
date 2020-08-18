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
/*! exports provided: BarType, barsRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BarType\", function() { return BarType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"barsRef\", function() { return barsRef; });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n//import adaptor from './../../blocks/progress-bar/adaptor.js';\n//import ProgressBar from 'progressbar.js';\nvar domReady = wp.domReady;\n\nvar extractSettings = function extractSettings(attributes) {\n  var from, to;\n\n  if (attributes.coloredprogress) {\n    from = _objectSpread(_objectSpread({}, from), {}, {\n      color: attributes.startcolor\n    });\n    to = _objectSpread(_objectSpread({}, to), {}, {\n      color: attributes.endcolor\n    });\n  }\n\n  if (attributes.strokeanimation) {\n    from = _objectSpread(_objectSpread({}, from), {}, {\n      width: 0\n    });\n    to = _objectSpread(_objectSpread({}, to), {}, {\n      width: attributes.strokewidth\n    });\n  }\n\n  return {\n    color: attributes.progresscolor,\n    strokeWidth: attributes.strokewidth,\n    trailColor: attributes.trailcolor,\n    trailWidth: attributes.trailwidth,\n    duration: attributes.duration * 1000,\n    easing: attributes.easing,\n    to: to,\n    from: from,\n    svgStyle: {\n      display: 'block',\n      width: '100%',\n      height: \"\".concat(attributes.height, \"px\")\n    },\n    warnings: attributes.warnings\n  };\n};\n\nvar BarType = {\n  BAR: 'BAR',\n  CIRCLE: 'CIRCLE',\n  SEMICIRCLE: 'SEMICIRCLE'\n};\nvar barsRef = [];\ndomReady(function () {\n  var bars = document.getElementsByTagName('PROGRESS-BAR');\n  console.log(bars);\n  Array.from(bars).forEach(function (element) {\n    var container = element.querySelector('#container'); //const value = element.querySelector( 'value' );\n\n    var attributes = {};\n    Array.from(element.attributes).forEach(function (x) {\n      return attributes[x.nodeName] = x.nodeValue;\n    });\n    console.log(attributes);\n    console.log(container);\n    var settings = extractSettings(attributes);\n    console.log(settings);\n    var bar;\n\n    switch (attributes.type) {\n      case BarType.BAR:\n        bar = new ProgressBar.Line(container, _objectSpread({}, settings));\n        break;\n\n      case BarType.CIRCLE:\n        bar = new ProgressBar.Circle(container, _objectSpread(_objectSpread({}, settings), {}, {\n          step: step\n        }));\n        break;\n\n      case BarType.SEMICIRCLE:\n        bar = new ProgressBar.SemiCircle(container, _objectSpread(_objectSpread({}, settings), {}, {\n          step: step\n        }));\n        break;\n    }\n\n    barsRef.push(bar);\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/progress-bar/index.js?");

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