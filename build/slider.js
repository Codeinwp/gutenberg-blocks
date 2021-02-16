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

/***/ "./src/frontend/slider/index.js":
/*!**************************************!*\
  !*** ./src/frontend/slider/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * WordPress dependencies\n */\nvar _lodash = lodash,\n    omit = _lodash.omit;\nvar domReady = wp.domReady;\nvar SliderArrows = '<div class=\"glide__arrows\" data-glide-el=\"controls\"><button class=\"glide__arrow glide__arrow--left\" data-glide-dir=\"<\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewbox=\"0 0 100 100\" role=\"img\" aria-hidden=\"true\"><path d=\"M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z\"></path></svg></button><button class=\"glide__arrow glide__arrow--right\" data-glide-dir=\"&gt;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewbox=\"0 0 100 100\" role=\"img\" aria-hidden=\"true\"><path d=\"M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z\"></path></svg></button></div>';\ndomReady(function () {\n  var sliders = document.querySelectorAll('.wp-block-themeisle-blocks-slider');\n  sliders.forEach(function (slider) {\n    var track = slider.querySelector('.glide__slides');\n    var options = omit(_objectSpread({}, slider.dataset), ['autoplay', 'height', 'hideArrows']);\n    var autoplay = 'false' === slider.dataset.autoplay ? false : 'true' === slider.dataset.autoplay ? 2000 : slider.dataset.autoplay;\n    var hideArrows = 'true' === slider.dataset.hideArrows ? true : false;\n\n    if (!hideArrows) {\n      var el = document.createElement('div');\n      el.innerHTML = SliderArrows;\n      slider.appendChild(el.firstElementChild);\n    }\n\n    Object.keys(options).map(function (option) {\n      return options[option] = Number(options[option]);\n    });\n    new Glide(\"#\".concat(slider.id), _objectSpread(_objectSpread({\n      type: 'carousel',\n      keyboard: true,\n      autoplay: autoplay,\n      hoverpause: true\n    }, options), {}, {\n      breakpoints: {\n        800: {\n          perView: 1,\n          peek: 0,\n          gap: 0\n        }\n      }\n    })).mount();\n\n    if (track) {\n      track.style.height = slider.dataset.height;\n    }\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/slider/index.js?");

/***/ }),

/***/ 3:
/*!********************************************!*\
  !*** multi ./src/frontend/slider/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/frontend/slider/index.js */\"./src/frontend/slider/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/frontend/slider/index.js?");

/***/ })

/******/ });