!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=110)}({110:function(e,t,o){e.exports=o(111)},111:function(e,t){var o=wp.i18n.__,n=wp.domReady,r=function(e){var t=L.marker([e.latitude,e.longitude]);return t.bindTooltip(e.title,{direction:"auto"}),t.bindPopup(function(e){var t=document.createElement("div"),o=document.createElement("h6"),n=document.createElement("div"),r=document.createElement("p");return o.innerHTML=e.title,r.innerHTML=e.description,t.classList.add("wp-block-themeisle-blocks-leaflet-map-overview"),n.classList.add("wp-block-themeisle-blocks-leaflet-map-overview-content"),o.classList.add("wp-block-themeisle-blocks-leaflet-map-overview-title"),t.appendChild(o),t.appendChild(n),n.appendChild(r),t}(e)),t};n((function(){window.themeisleLeafletMaps?L?window.themeisleLeafletMaps.forEach((function(e){!function(e,t){var n=document.querySelector("#".concat(e));if(n){n.style.height=t.height+"px",n.classList.add("wp-block-themeisle-leaflet-blocks-map");var a=L.map(n,{zoomControl:t.zoomControl,dragging:t.draggable,gestureHandling:!0,gestureHandlingOptions:{text:{touch:o("Use two fingers to move the map"),scroll:o("Use ctrl + scroll to zoom the map"),scrollMac:o("Use ⌘ + scroll to zoom the map")}}});L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',subdomains:["a","b","c"]}).addTo(a),a.setView([t.latitude,t.longitude],t.zoom||13),t.markers.map((function(e){return r(e)})).forEach((function(e){a.addLayer(e)}))}else console.warn("The placeholer for the leaflet map block with id: ".concat(e," does not exist!"))}(e.container,e.attributes)})):console.warn("The leaflet script did not load on the page!"):console.warn("The leaflet map attributes did not load on the page!")}))}});