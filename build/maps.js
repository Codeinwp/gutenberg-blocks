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

/***/ "./src/frontend/google-map/index.js":
/*!******************************************!*\
  !*** ./src/frontend/google-map/index.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.js */ \"./src/frontend/google-map/styles.js\");\n/**\n * Internal dependencies\n */\n\n\nvar initMapScript = function initMapScript() {\n  var maps = [];\n  maps = window.themeisleGoogleMaps;\n  maps.forEach(function (map) {\n    var mapContainer = document.getElementById(map.container);\n    mapContainer.style.height = \"\".concat(map.attributes.height, \"px\");\n    var googleMap = new google.maps.Map(mapContainer, {\n      center: {\n        lat: Number(map.attributes.latitude),\n        lng: Number(map.attributes.longitude)\n      },\n      gestureHandling: 'cooperative',\n      zoom: map.attributes.zoom,\n      mapTypeId: map.attributes.type,\n      draggable: map.attributes.draggable,\n      mapTypeControl: map.attributes.mapTypeControl,\n      zoomControl: map.attributes.zoomControl,\n      fullscreenControl: map.attributes.fullscreenControl,\n      streetViewControl: map.attributes.streetViewControl,\n      styles: _styles_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"][map.attributes.style || 'standard']\n    });\n\n    if (!map.attributes.id && map.attributes.location) {\n      var request = {\n        query: map.attributes.location,\n        fields: ['name', 'geometry']\n      };\n      var service = new google.maps.places.PlacesService(googleMap);\n      service.findPlaceFromQuery(request, function (results, status) {\n        if (status === google.maps.places.PlacesServiceStatus.OK) {\n          if (0 < results.length) {\n            googleMap.setCenter(results[0].geometry.location);\n          }\n        }\n      });\n    }\n\n    if (map.attributes.markers && 0 < map.attributes.markers.length) {\n      map.attributes.markers.forEach(function (marker) {\n        var position = new google.maps.LatLng(marker.latitude, marker.longitude);\n        var mark = new google.maps.Marker({\n          position: position,\n          map: googleMap,\n          title: marker.title,\n          icon: marker.icon || 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'\n        });\n\n        if (marker.title || marker.description) {\n          var contentString = \"<div class=\\\"wp-block-themeisle-blocks-map-overview\\\"><h6 class=\\\"wp-block-themeisle-blocks-map-overview-title\\\">\".concat(marker.title, \"</h6><div class=\\\"wp-block-themeisle-blocks-map-overview-content\\\">\").concat(marker.description ? \"<p>\".concat(marker.description, \"</p>\") : '', \"</div></div>\");\n          var infowindow = new google.maps.InfoWindow({\n            content: contentString\n          });\n          mark.addListener('click', function () {\n            infowindow.open(googleMap, mark);\n          });\n        }\n      });\n    }\n  });\n};\n\nwindow.initMapScript = initMapScript;\n\n//# sourceURL=webpack:///./src/frontend/google-map/index.js?");

/***/ }),

/***/ "./src/frontend/google-map/styles.js":
/*!*******************************************!*\
  !*** ./src/frontend/google-map/styles.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar styles = {\n  standard: [],\n  silver: [{\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#f5f5f5'\n    }]\n  }, {\n    'elementType': 'labels.icon',\n    'stylers': [{\n      'visibility': 'off'\n    }]\n  }, {\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#616161'\n    }]\n  }, {\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#f5f5f5'\n    }]\n  }, {\n    'featureType': 'administrative.land_parcel',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#bdbdbd'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#eeeeee'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#757575'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#e5e5e5'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#9e9e9e'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#ffffff'\n    }]\n  }, {\n    'featureType': 'road.arterial',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#757575'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#dadada'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#616161'\n    }]\n  }, {\n    'featureType': 'road.local',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#9e9e9e'\n    }]\n  }, {\n    'featureType': 'transit.line',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#e5e5e5'\n    }]\n  }, {\n    'featureType': 'transit.station',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#eeeeee'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#c9c9c9'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#9e9e9e'\n    }]\n  }],\n  retro: [{\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#ebe3cd'\n    }]\n  }, {\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#523735'\n    }]\n  }, {\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#f5f1e6'\n    }]\n  }, {\n    'featureType': 'administrative',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#c9b2a6'\n    }]\n  }, {\n    'featureType': 'administrative.land_parcel',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#dcd2be'\n    }]\n  }, {\n    'featureType': 'administrative.land_parcel',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#ae9e90'\n    }]\n  }, {\n    'featureType': 'landscape.natural',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#dfd2ae'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#dfd2ae'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#93817c'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'geometry.fill',\n    'stylers': [{\n      'color': '#a5b076'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#447530'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#f5f1e6'\n    }]\n  }, {\n    'featureType': 'road.arterial',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#fdfcf8'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#f8c967'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#e9bc62'\n    }]\n  }, {\n    'featureType': 'road.highway.controlled_access',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#e98d58'\n    }]\n  }, {\n    'featureType': 'road.highway.controlled_access',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#db8555'\n    }]\n  }, {\n    'featureType': 'road.local',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#806b63'\n    }]\n  }, {\n    'featureType': 'transit.line',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#dfd2ae'\n    }]\n  }, {\n    'featureType': 'transit.line',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#8f7d77'\n    }]\n  }, {\n    'featureType': 'transit.line',\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#ebe3cd'\n    }]\n  }, {\n    'featureType': 'transit.station',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#dfd2ae'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'geometry.fill',\n    'stylers': [{\n      'color': '#b9d3c2'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#92998d'\n    }]\n  }],\n  dark: [{\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#212121'\n    }]\n  }, {\n    'elementType': 'labels.icon',\n    'stylers': [{\n      'visibility': 'off'\n    }]\n  }, {\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#757575'\n    }]\n  }, {\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#212121'\n    }]\n  }, {\n    'featureType': 'administrative',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#757575'\n    }]\n  }, {\n    'featureType': 'administrative.country',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#9e9e9e'\n    }]\n  }, {\n    'featureType': 'administrative.land_parcel',\n    'stylers': [{\n      'visibility': 'off'\n    }]\n  }, {\n    'featureType': 'administrative.locality',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#bdbdbd'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#757575'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#181818'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#616161'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#1b1b1b'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'geometry.fill',\n    'stylers': [{\n      'color': '#2c2c2c'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#8a8a8a'\n    }]\n  }, {\n    'featureType': 'road.arterial',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#373737'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#3c3c3c'\n    }]\n  }, {\n    'featureType': 'road.highway.controlled_access',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#4e4e4e'\n    }]\n  }, {\n    'featureType': 'road.local',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#616161'\n    }]\n  }, {\n    'featureType': 'transit',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#757575'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#000000'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#3d3d3d'\n    }]\n  }],\n  night: [{\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#242f3e'\n    }]\n  }, {\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#746855'\n    }]\n  }, {\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#242f3e'\n    }]\n  }, {\n    'featureType': 'administrative.locality',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#d59563'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#d59563'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#263c3f'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#6b9a76'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#38414e'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#212a37'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#9ca5b3'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#746855'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#1f2835'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#f3d19c'\n    }]\n  }, {\n    'featureType': 'transit',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#2f3948'\n    }]\n  }, {\n    'featureType': 'transit.station',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#d59563'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#17263c'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#515c6d'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#17263c'\n    }]\n  }],\n  aubergine: [{\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#1d2c4d'\n    }]\n  }, {\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#8ec3b9'\n    }]\n  }, {\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#1a3646'\n    }]\n  }, {\n    'featureType': 'administrative.country',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#4b6878'\n    }]\n  }, {\n    'featureType': 'administrative.land_parcel',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#64779e'\n    }]\n  }, {\n    'featureType': 'administrative.province',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#4b6878'\n    }]\n  }, {\n    'featureType': 'landscape.man_made',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#334e87'\n    }]\n  }, {\n    'featureType': 'landscape.natural',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#023e58'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#283d6a'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#6f9ba5'\n    }]\n  }, {\n    'featureType': 'poi',\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#1d2c4d'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'geometry.fill',\n    'stylers': [{\n      'color': '#023e58'\n    }]\n  }, {\n    'featureType': 'poi.park',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#3C7680'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#304a7d'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#98a5be'\n    }]\n  }, {\n    'featureType': 'road',\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#1d2c4d'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#2c6675'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'geometry.stroke',\n    'stylers': [{\n      'color': '#255763'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#b0d5ce'\n    }]\n  }, {\n    'featureType': 'road.highway',\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#023e58'\n    }]\n  }, {\n    'featureType': 'transit',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#98a5be'\n    }]\n  }, {\n    'featureType': 'transit',\n    'elementType': 'labels.text.stroke',\n    'stylers': [{\n      'color': '#1d2c4d'\n    }]\n  }, {\n    'featureType': 'transit.line',\n    'elementType': 'geometry.fill',\n    'stylers': [{\n      'color': '#283d6a'\n    }]\n  }, {\n    'featureType': 'transit.station',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#3a4762'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'geometry',\n    'stylers': [{\n      'color': '#0e1626'\n    }]\n  }, {\n    'featureType': 'water',\n    'elementType': 'labels.text.fill',\n    'stylers': [{\n      'color': '#4e6d70'\n    }]\n  }]\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (styles);\n\n//# sourceURL=webpack:///./src/frontend/google-map/styles.js?");

/***/ }),

/***/ 1:
/*!************************************************!*\
  !*** multi ./src/frontend/google-map/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/frontend/google-map/index.js */\"./src/frontend/google-map/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/frontend/google-map/index.js?");

/***/ })

/******/ });