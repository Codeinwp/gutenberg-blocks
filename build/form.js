!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=167)}({0:function(e,t){e.exports=wp.i18n},167:function(e,t,n){"use strict";n.r(t);var o=n(0),l=n(17),r=n.n(l),i=n(23),c=n.n(i),a=function(e){var t,n,o;if(window.hasOwnProperty("grecaptcha")){var l=e.id,r=document.createElement("div"),i=e.querySelector(".wp-block-themeisle-blocks-form__container");null==i||i.insertBefore(r,i.lastChild),null===(t=window.grecaptcha)||void 0===t||t.render(r,{sitekey:null===(n=window)||void 0===n||null===(o=n.themeisleGutenbergForm)||void 0===o?void 0:o.reRecaptchaSitekey,callback:function(e){var t;null!==(t=window.themeisleGutenberg)&&void 0!==t&&t.tokens||(window.themeisleGutenberg={},window.themeisleGutenberg.tokens={}),window.themeisleGutenberg.tokens[l]=e},"expired-callback":function(){var e;null!==(e=window.themeisleGutenberg)&&void 0!==e&&e.tokens||(window.themeisleGutenberg={},window.themeisleGutenberg.tokens={}),window.themeisleGutenberg.tokens[l]=null}})}};function u(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}r()((function(){var e=document.querySelectorAll(".wp-block-themeisle-blocks-form");!function(e){var t,n;if(!window.hasOwnProperty("grecaptcha")&&null!==(t=window)&&void 0!==t&&null!==(n=t.themeisleGutenbergForm)&&void 0!==n&&n.reRecaptchaSitekey){var o=document.createElement("script");o.id="recaptcha",document.body.appendChild(o),o.addEventListener("load",(function(){var t=setInterval((function(){window.hasOwnProperty("grecaptcha")&&grecaptcha.hasOwnProperty("render")&&(e.forEach((function(e){var t;null!=e&&null!==(t=e.classList)&&void 0!==t&&t.contains("has-captcha")&&a(e)})),clearInterval(t))}),200)})),o.src="https://www.google.com/recaptcha/api.js"}}(e),e.forEach((function(e){var t=e.querySelector("button");null==t||t.addEventListener("click",(function(t){t.preventDefault(),function(e){var t,n,l,r,i=null==e?void 0:e.id,a={},s=[],d=[],f=[{label:Object(o.__)("Form submission from","otter-blocks"),value:window.location.href}],p=null==e?void 0:e.querySelectorAll(".wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-input"),m=null==e?void 0:e.querySelectorAll(".wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-textarea");null===(t=[].concat(u(p),u(m)))||void 0===t||t.forEach((function(e){var t,n,o=null===(t=e.querySelector(".wp-block-themeisle-blocks-form-input-label__label, .wp-block-themeisle-blocks-form-textarea-label__label"))||void 0===t?void 0:t.innerHTML,l=e.querySelector(".wp-block-themeisle-blocks-form-input-input, .wp-block-themeisle-blocks-form-textarea-input"),r=null===(n=e.querySelector('.wp-block-themeisle-blocks-form-input-input[type="checkbox"]'))||void 0===n?void 0:n.checked;null==l||!l.hasAttribute("required")||null!=l&&l.checkValidity()||d.push(l),o&&null!=l&&l.value&&f.push({label:o,value:null==l?void 0:l.value,checked:r})}));var v=".protection #".concat(e.id||"","_nonce_field"),b=null===(n=e.querySelector(v))||void 0===n?void 0:n.value;if(0<d.length||null!=e&&null!==(l=e.classList)&&void 0!==l&&l.contains("has-captcha")&&i&&(null===(r=window.themeisleGutenberg)||void 0===r||!r.tokens[i]))d.forEach((function(e){null==e||e.reportValidity()}));else{var h,w,k,y,g,S,_,O,j,L;if(a.data=f,""!==(null==e||null===(h=e.dataset)||void 0===h?void 0:h.emailSubject))a.emailSubject=null==e||null===(_=e.dataset)||void 0===_?void 0:_.emailSubject;if(null!=e&&null!==(w=e.dataset)&&void 0!==w&&w.optionName)a.formOption=null==e||null===(O=e.dataset)||void 0===O?void 0:O.optionName;if(null!=e&&null!==(k=e.classList)&&void 0!==k&&k.contains("has-captcha")&&i&&null!==(y=window.themeisleGutenberg)&&void 0!==y&&null!==(g=y.tokens)&&void 0!==g&&g[i])a.token=null===(j=window.themeisleGutenberg)||void 0===j||null===(L=j.tokens)||void 0===L?void 0:L[i];null!=e&&e.id&&(a.formId=null==e?void 0:e.id),b&&(a.nonceValue=b),a.postUrl=window.location.href;var x=e.querySelector(".wp-block-button");null==x||x.classList.add("has-submit-msg"),null==x||x.classList.add("loading");var G=function(e){for(var t=s.pop();t;)x===t.parentNode&&x.removeChild(t),t=s.pop();s.push(e),x.appendChild(e),setTimeout((function(){e&&x===e.parentNode&&x.removeChild(e)}),1e4)};null===(S=c()({path:"themeisle-gutenberg-blocks/v1/forms",method:"POST",data:a}).then((function(e){null==x||x.classList.remove("loading");var t=document.createElement("div");t.classList.add("wp-block-themeisle-blocks-form-server-msg"),null!=e&&e.success?(t.innerHTML=Object(o.__)("Success","otter-blocks"),t.classList.add("success")):(t.innerHTML=Object(o.__)("Something went wrong! Try again.","otter-blocks"),t.classList.add("error"),console.error(null==e?void 0:e.error,null==e?void 0:e.reasons)),G(t)})))||void 0===S||S.catch((function(e){null==x||x.classList.remove("loading"),console.error(e);var t=document.createElement("div");t.classList.add("wp-block-themeisle-blocks-form-server-msg"),t.innerHTML=Object(o.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"),t.classList.add("error"),G(t)}))}}(e)}))}))}))},17:function(e,t){e.exports=wp.domReady},23:function(e,t){e.exports=wp.apiFetch}});