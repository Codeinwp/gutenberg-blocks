!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=109)}({109:function(e,t,r){e.exports=r(110)},110:function(e,t,r){"use strict";r.r(t);var n=r(13);(0,wp.domReady)((function(){var e=document.querySelectorAll(".wp-block-themeisle-blocks-progress-bar");Array.from(e).forEach((function(e){var t,r=1e3*e.dataset.duration,o=e.querySelector(".wp-block-themeisle-blocks-progress-bar__area__bar"),i=window.getComputedStyle(o).borderTopLeftRadius.replace("px","")||0,c=e.querySelector(".wp-block-themeisle-blocks-progress-bar__number"),a=e.querySelector(".wp-block-themeisle-blocks-progress-bar__area__tooltip"),u=e.querySelector(".wp-block-themeisle-blocks-progress-bar__progress__append"),s=e.querySelector(".wp-block-themeisle-blocks-progress-bar__outer__title"),l=e.querySelector(".wp-block-themeisle-blocks-progress-bar__area__title");s?t=s.getBoundingClientRect().width:l&&(t=l.getBoundingClientRect().width);var p=.5*window.getComputedStyle(o).height.replace("px","");if(a&&!s&&(a.style.opacity=1),0===r)o.style.width="".concat(parseInt(e.dataset.percent),"%"),c.innerHTML="".concat(parseInt(e.dataset.percent),"%"),o.style.opacity=1,a&&(a.style.opacity=1),u&&(u.style.opacity=1);else{c&&(c.innerText="0%"),l&&l.classList.contains("highlight")&&(i*=2);var y=new IntersectionObserver((function(f){f.forEach((function(f){if(f.isIntersecting){if(0>=f.intersectionRect.height)return o.style.width="".concat(parseInt(e.dataset.percent),"%"),c.innerHTML="".concat(parseInt(e.dataset.percent),"%"),o.style.opacity=1,a&&(a.style.opacity=1),u&&(u.style.opacity=1),void y.unobserve(o);var d;d&&clearInterval(d);var b=parseInt(e.dataset.percent),h=Object(n.c)(0,r,20).map((function(e){return Object(n.b)(e/r)*b})).reverse();d=setInterval((function(){var e=h.pop();o.style.width="".concat(e,"%"),c&&(c.innerText="".concat(Math.ceil(e),"%"));var r=o.getBoundingClientRect().width;r>i&&(o.style.opacity=1),a&&s&&r>t+10&&(a.style.opacity=1),u&&(l?r>t+1.5*p&&(u.style.opacity=1):r>1.8*p&&(u.style.opacity=1)),h.length||(y.unobserve(o),clearInterval(d))}),20)}}))}),{root:null,rootMargin:"0px",threshold:[.6]});setTimeout((function(){return y.observe(o)}),100)}}))}))},13:function(e,t,r){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}r.d(t,"d",(function(){return o})),r.d(t,"a",(function(){return i})),r.d(t,"c",(function(){return c})),r.d(t,"b",(function(){return a}));var o=function(e){var t=document.createElement("div");return t.innerHTML=e,void 0!==t.innerText?t.innerText:t.textContent},i=function(e){var t=(e=new Date(e)).getDate(),r=e.getMonth(),n=e.getFullYear();return t+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][r]+", "+n},c=function(e,t,r){var o=[],i=n(e),c=n(t);if(0===r)throw TypeError("Step cannot be zero.");if(void 0===i||void 0===c)throw TypeError("Must pass start and end arguments.");if(i!==c)throw TypeError("Start and end arguments must be of same type.");if(void 0===n(r)&&(r=1),t<e&&(r=-r),"number"===i)for(;0<r?t>=e:t<=e;)o.push(e),e+=r;else{if("string"!==i)throw TypeError("Only string and number types are supported");if(1!=e.length||1!=t.length)throw TypeError("Only strings with one character are supported.");for(e=e.charCodeAt(0),t=t.charCodeAt(0);0<r?t>=e:t<=e;)o.push(String.fromCharCode(e)),e+=r}return o},a=function(e){return e}}});