!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=168)}({168:function(e,t,n){"use strict";n.r(t);var r=n(17),o=n.n(r);function i(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.happened=!1,this.storageKey="wp-block-themeisle-blocks-popup-dismiss";var n=t.dataset,r=n.dismiss,o=n.anchor;if(this.isItemDismissed()&&r&&!o&&!Boolean(window.themeisleGutenberg.isPreview))return!1;this.init()}var t,n,r;return t=e,(n=[{key:"init",value:function(){this.bindOpen(),this.bindClose()}},{key:"openModal",value:function(){this.element.classList.add("active"),this.happened=!0}},{key:"closeModal",value:function(){this.element.classList.remove("active"),this.dismissModal()}},{key:"dismissModal",value:function(){var e=this.element.dataset,t=e.dismiss,n=e.anchor,r=this.element.id;if(!t||!r||n)return!1;var o=new Date,a=JSON.parse(localStorage.getItem(this.storageKey))||[];if(a.some((function(e){return e.modalID===r})))return!1;var l=864e5*t,s={expiry:o.getTime()+l,modalID:r};localStorage.setItem(this.storageKey,JSON.stringify([].concat(i(a),[s])))}},{key:"isItemDismissed",value:function(){var e=this.element.id,t=JSON.parse(localStorage.getItem(this.storageKey))||[],n=t.filter((function(t){return t.modalID===e}));if(0===n.length)return!1;var r=n[0],o=new Date;if(r.expiry>o.getTime())return!0;var i=t.filter((function(e){return e!==n[0]}));return localStorage.setItem(this.storageKey,JSON.stringify(i)),!1}},{key:"bindOpen",value:function(){switch(this.element.dataset.open){case"onClick":this.bindAnchors();break;case"onScroll":this.bindOpenAfterScroll();break;case"onExit":this.bindExitIntent();break;default:case"onLoad":this.bindOnLoad()}}},{key:"bindAnchors",value:function(){var e=this,t=this.element.dataset.anchor;if(!t)return!1;document.querySelectorAll("a[href='#".concat(t,"']")).forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault(),e.openModal()}))}))}},{key:"bindOpenAfterScroll",value:function(){var e=this;window.document.addEventListener("scroll",(function(){if(e.happened)return!1;var t=e.element.dataset.offset;if(parseInt(t)>=parseInt(e.getScrolledPercent()))return!1;e.openModal()}))}},{key:"bindOnLoad",value:function(){var e=this,t=this.element.dataset.time;setTimeout((function(){e.openModal()}),1e3*t)}},{key:"bindExitIntent",value:function(){var e=this;document.body.addEventListener("mouseleave",(function(t){if(e.happened)return!1;0>t.clientY&&e.openModal()}))}},{key:"getScrolledPercent",value:function(){var e=document.documentElement,t=document.body,n="scrollTop",r="scrollHeight";return(e[n]||t[n])/((e[r]||t[r])-e.clientHeight)*100}},{key:"bindClose",value:function(){this.bindCloseButtons(),this.bindAnchorClose(),this.bindOverlayClosing()}},{key:"bindAnchorClose",value:function(){var e=this,t=this.element.dataset.anchorclose;if(!t)return!1;document.querySelectorAll("a[href='#".concat(t,"']")).forEach((function(t){t.addEventListener("click",(function(t){t.preventDefault(),e.closeModal()}))}))}},{key:"bindCloseButtons",value:function(){var e=this;this.element.querySelectorAll(".wp-block-themeisle-blocks-popup__modal_header .components-button").forEach((function(t){t.addEventListener("click",(function(){e.closeModal()}))}))}},{key:"bindOverlayClosing",value:function(){var e=this;if(!this.element.dataset.outside)return!1;this.element.querySelector(".wp-block-themeisle-blocks-popup__modal_wrap_overlay").addEventListener("click",(function(){e.closeModal()}))}}])&&l(t.prototype,n),r&&l(t,r),e}();o()((function(){var e=document.querySelectorAll(".wp-block-themeisle-blocks-popup");e.length&&e.forEach((function(e){return new s(e)}))}))},17:function(e,t){e.exports=wp.domReady}});