!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=138)}({0:function(e,t){e.exports=wp.i18n},138:function(e,t,r){"use strict";r.r(t);var o=r(0),n=r(19),l=r.n(n),i=r(23),c=r.n(i);function u(e){return function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}var s=[];l()((function(){document.querySelectorAll(".wp-block-themeisle-blocks-form").forEach((function(e){var t=e.querySelector("button");null==t||t.addEventListener("click",(function(t){t.preventDefault(),function(e){var t,r=[{label:Object(o.__)("Form submission from","otter-blocks"),value:window.location.href}],n=null==e?void 0:e.querySelectorAll(".wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-input"),l=null==e?void 0:e.querySelectorAll(".wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-textarea"),i=[],a={};if(null===(t=[].concat(u(n),u(l)))||void 0===t||t.forEach((function(e){var t,o,n=null===(t=e.querySelector(".wp-block-themeisle-blocks-form-input-label__label, .wp-block-themeisle-blocks-form-textarea-label__label"))||void 0===t?void 0:t.innerHTML,l=e.querySelector(".wp-block-themeisle-blocks-form-input-input, .wp-block-themeisle-blocks-form-textarea-input"),c=null===(o=e.querySelector('.wp-block-themeisle-blocks-form-input-input[type="checkbox"]'))||void 0===o?void 0:o.checked;null==l||!l.hasAttribute("required")||null!=l&&l.checkValidity()||i.push(l),n&&null!=l&&l.value&&r.push({label:n,value:null==l?void 0:l.value,checked:c})})),0<i.length)i.forEach((function(e){null==e||e.reportValidity()}));else{var d,f,b,m,p;if(a.data=r,""!==(null==e||null===(d=e.dataset)||void 0===d?void 0:d.emailSubject))a.emailSubject=null==e||null===(m=e.dataset)||void 0===m?void 0:m.emailSubject;if(null!=e&&null!==(f=e.dataset)&&void 0!==f&&f.optionName)a.formOption=null==e||null===(p=e.dataset)||void 0===p?void 0:p.optionName;var v=e.querySelector(".wp-block-button");null==v||v.classList.add("has-submit-msg"),null==v||v.classList.add("loading");var h=function(e){for(var t=s.pop();t;)v===t.parentNode&&v.removeChild(t),t=s.pop();s.push(e),v.appendChild(e),setTimeout((function(){e&&v===e.parentNode&&v.removeChild(e)}),1e4)};null===(b=c()({path:"themeisle-gutenberg-blocks/v1/forms",method:"POST",data:a}).then((function(e){null==v||v.classList.remove("loading");var t=document.createElement("div");t.classList.add("wp-block-themeisle-blocks-form-server-msg"),null!=e&&e.success?(t.innerHTML=Object(o.__)("Success","otter-blocks"),t.classList.add("success")):(t.innerHTML=Object(o.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"),t.classList.add("error")),h(t)})))||void 0===b||b.catch((function(e){null==v||v.classList.remove("loading"),console.error(e);var t=document.createElement("div");t.classList.add("wp-block-themeisle-blocks-form-server-msg"),t.innerHTML=Object(o.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"),t.classList.add("error"),h(t)}))}}(e)}))}))}))},19:function(e,t){e.exports=wp.domReady},23:function(e,t){e.exports=wp.apiFetch}});