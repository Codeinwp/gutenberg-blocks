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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/frontend/leaflet-map/index.js":
/*!*******************************************!*\
  !*** ./src/frontend/leaflet-map/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * WordPress dependencies\n */\nvar domReady = wp.domReady;\n\nvar createPopupContent = function createPopupContent(markerProps) {\n  /**\n      * The Popup can take a string or a HTMLElement\n      * For simple use, a string is enough.\n      * But we need interaction, in our case, to remove the marker.\n      * So, creating an HTMLElement will allow us to bind function very easily.\n      */\n  var container = document.createElement('div');\n  var title = document.createElement('h6');\n  var content = document.createElement('div');\n  var description = document.createElement('p');\n  title.innerHTML = markerProps.title;\n  description.innerHTML = markerProps.description;\n  container.classList.add('wp-block-themeisle-blocks-leaflet-map-overview');\n  content.classList.add('wp-block-themeisle-blocks-leaflet-map-overview-content');\n  title.classList.add('wp-block-themeisle-blocks-leaflet-map-overview-title');\n  container.appendChild(title);\n  container.appendChild(content);\n  content.appendChild(description);\n  return container;\n};\n\nvar createMarker = function createMarker(markerProps) {\n  var markerMap = L.marker([markerProps.latitude, markerProps.longitude]);\n  markerMap.bindTooltip(markerProps.title, {\n    direction: 'auto'\n  });\n  markerMap.bindPopup(createPopupContent(markerProps));\n  return markerMap;\n};\n\nvar createLeafletMap = function createLeafletMap(containerId, attributes) {\n  // console.log( containerId, attributes );\n  var container = document.querySelector(\"#\".concat(containerId));\n\n  if (!container) {\n    console.warn(\"The placeholer for the leaflet map block with id: \".concat(containerId, \" does not exist!\"));\n    return;\n  } // Add the height of the map first\n\n\n  container.style.height = attributes.height + 'px';\n  container.classList.add('wp-block-themeisle-leaflet-blocks-map'); // Create the map\n\n  var map = L.map(container, {\n    zoomControl: attributes.zoomControl,\n    dragging: attributes.draggable\n  });\n  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n    attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>',\n    subdomains: ['a', 'b', 'c']\n  }).addTo(map); // Set the view\n\n  map.setView([attributes.latitude, attributes.longitude], attributes.zoom || 13); // Add the markers\n\n  attributes.markers.map(function (markerProps) {\n    return createMarker(markerProps);\n  }).forEach(function (marker) {\n    map.addLayer(marker);\n  });\n};\n\ndomReady(function () {\n  if (!window.themeisleLeafletMaps) {\n    console.warn('The leaflet map attributes did not load on the page!');\n    return;\n  }\n\n  if (!L) {\n    console.warn('The leaflet script did not load on the page!');\n    return;\n  }\n\n  window.themeisleLeafletMaps.forEach(function (block) {\n    createLeafletMap(block.container, block.attributes);\n  });\n});\n\n//# sourceURL=webpack:///./src/frontend/leaflet-map/index.js?");

/***/ }),

/***/ 1:
/*!*************************************************!*\
  !*** multi ./src/frontend/leaflet-map/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/frontend/leaflet-map/index.js */\"./src/frontend/leaflet-map/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/frontend/leaflet-map/index.js?");

/***/ })

/******/ });