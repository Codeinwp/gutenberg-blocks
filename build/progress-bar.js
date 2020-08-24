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
/*! exports provided: BarType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BarType\", function() { return BarType; });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar domReady = wp.domReady;\n/*\n\tSettings\n*/\n\nvar INTERSECTION_THRESHOLD = [0.6];\nvar BarType = {\n  BAR: 'BAR',\n  CIRCLE: 'CIRCLE',\n  SEMICIRCLE: 'SEMICIRCLE'\n};\n\nvar extractSettings = function extractSettings(attributes) {\n  return {\n    color: attributes.progresscolor,\n    strokeWidth: parseFloat(attributes.strokewidth),\n    trailColor: attributes.trailcolor,\n    trailWidth: parseFloat(attributes.trailwidth),\n    svgStyle: {\n      display: 'block',\n      width: '100%',\n      height: \"\".concat(attributes.height, \"px\")\n    },\n    warnings: 'true' === attributes.warnings\n  };\n};\n\nvar extractAnimation = function extractAnimation(attributes) {\n  var from, to;\n\n  if ('true' === attributes.coloredprogress) {\n    from = _objectSpread(_objectSpread({}, from), {}, {\n      color: attributes.startcolor\n    });\n    to = _objectSpread(_objectSpread({}, to), {}, {\n      color: attributes.endcolor\n    });\n  }\n\n  if ('true' === attributes.strokeanimation) {\n    from = _objectSpread(_objectSpread({}, from), {}, {\n      width: 0\n    });\n    to = _objectSpread(_objectSpread({}, to), {}, {\n      width: parseFloat(attributes.strokewidth)\n    });\n  }\n\n  return {\n    coloredProgress: 'true' === attributes.coloredprogress,\n    percentage: parseFloat(attributes.percentage),\n    isAnimated: 'true' === attributes.animated,\n    strokeAnimation: 'true' === attributes.strokeanimation,\n    hideValue: 'true' === attributes.hidevalue,\n    options: {\n      duration: attributes.duration * 1000,\n      easing: attributes.easing,\n      to: to,\n      from: from\n    }\n  };\n};\n\ndomReady(function () {\n  var bars = document.querySelectorAll('.wp-themeisle-block-progress-bar');\n  console.log(bars);\n  Array.from(bars).forEach(function (element) {\n    var container = element.querySelector('#container');\n    var value = element.querySelector('#value');\n    var attributes = {};\n    Array.from(element.attributes).forEach(function (x) {\n      return attributes[x.nodeName] = x.nodeValue;\n    });\n    console.log(element.attributes); //console.log( container );\n    //console.log( value );\n\n    var settings = extractSettings(attributes);\n    var animation = extractAnimation(attributes);\n    console.log(settings);\n    console.log(animation);\n\n    var step = function step(state, bar) {\n      if (animation.coloredProgress) {\n        bar.path.setAttribute('stroke', state.color);\n      }\n\n      if (animation.strokeAnimation) {\n        bar.path.setAttribute('stroke-width', state.width);\n      }\n\n      var percentage = Math.round(bar.value() * 100);\n\n      if (value) {\n        value.innerText = \"Testing: \".concat(percentage, \"%\");\n      }\n\n      if (!animation.hideValue) {\n        if (0 === percentage) {\n          bar.setText('');\n        } else {\n          bar.setText(\"\".concat(percentage, \"%\"));\n        }\n      }\n    };\n\n    var bar;\n\n    switch (attributes.type) {\n      case BarType.BAR:\n        bar = new ProgressBar.Line(container, _objectSpread(_objectSpread({}, settings), {}, {\n          step: step,\n          text: {\n            style: {\n              color: attributes.textcolor,\n              position: 'absolute',\n              padding: 0,\n              margin: 0,\n              transform: null,\n              fontSize: \"\".concat(attributes.height * 0.8, \"px\")\n            },\n            autoStyleContainer: false,\n            alignToBottom: false\n          }\n        }));\n        break;\n\n      case BarType.CIRCLE:\n        bar = new ProgressBar.Circle(container, _objectSpread(_objectSpread({}, settings), {}, {\n          step: step,\n          text: {\n            value: '',\n            autoStyleContainer: false\n          }\n        }));\n        bar.text.style.fontFamily = '\"Raleway\", Helvetica, sans-serif';\n        bar.text.style.fontSize = \"\".concat(attributes.height / 4, \"px\");\n        break;\n\n      case BarType.SEMICIRCLE:\n        bar = new ProgressBar.SemiCircle(container, _objectSpread(_objectSpread({}, settings), {}, {\n          step: step,\n          text: {\n            value: '',\n            alignToBottom: false\n          }\n        }));\n        bar.text.style.fontFamily = '\"Raleway\", Helvetica, sans-serif';\n        bar.text.style.fontSize = \"\".concat(attributes.height / 4, \"px\");\n        bar.text.style.bottom = '12%';\n        break;\n    }\n\n    bar.set(0);\n    setTimeout(function () {\n      var options = {\n        root: null,\n        rootMargin: '0px',\n        threshold: INTERSECTION_THRESHOLD\n      };\n\n      if (value) {\n        value.innerText = \"Testing: \".concat(percentage, \"%\");\n      }\n\n      var observer = new IntersectionObserver(function (entries) {\n        entries.forEach(function (entrie) {\n          if (entrie.isIntersecting && 0 === Math.round(bar.value() * 100)) {\n            if (animation.isAnimated) {\n              bar.animate((animation.percentage / 100).toFixed(2), animation.options, function () {// value.innerText = `${ animation.percentage }%`;\n                // bar.setText( `${ animation.percentage }%` );\n              });\n            } else {\n              bar.set((animation.percentage / 100).toFixed(2));\n            }\n          }\n        });\n      }, options);\n      observer.observe(container);\n    }, 1000);\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/progress-bar/index.js?");

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