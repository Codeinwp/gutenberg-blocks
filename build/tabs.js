!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=126)}({0:function(e,t){e.exports=wp.i18n},126:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(19);n.n(o)()((function(){document.querySelectorAll(".wp-block-themeisle-blocks-tabs").forEach((function(e){var t=Array.from(e.querySelectorAll(":scope > .wp-block-themeisle-blocks-tabs__content > .wp-block-themeisle-blocks-tabs-item")),n=document.createElement("div");n.classList.add("wp-block-themeisle-blocks-tabs__header"),e.prepend(n),t.forEach((function(e,o){var c=document.createElement("div");c.classList.add("wp-block-themeisle-blocks-tabs__header_item");var l=e.querySelector(".wp-block-themeisle-blocks-tabs-item__content");0===o&&(c.classList.add("active"),l.classList.add("active")),c.innerHTML=e.dataset.title||Object(r.__)("Untitled Tab"),c.tabIndex=0;var i=e.querySelector(".wp-block-themeisle-blocks-tabs-item__header"),a=function(e,t){var r=e.querySelector(".wp-block-themeisle-blocks-tabs-item__content"),c=e.querySelector(".wp-block-themeisle-blocks-tabs-item__header");r.classList.toggle("active",t===o),r.classList.toggle("hidden",t!==o),c.classList.toggle("active",t===o),c.classList.toggle("hidden",t!==o),Array.from(n.childNodes).forEach((function(e,t){e.classList.toggle("active",t===o),e.classList.toggle("hidden",t!==o)}))};c.addEventListener("click",(function(){return t.forEach(a)})),c.addEventListener("keyup",(function(e){"Enter"===e.code&&(e.preventDefault(),t.forEach(a))})),i.addEventListener("click",(function(){return t.forEach(a)})),i.addEventListener("keyup",(function(e){"Enter"===e.code&&(e.preventDefault(),t.forEach(a))})),n.appendChild(c)}))}))}))},19:function(e,t){e.exports=wp.domReady}});