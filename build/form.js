!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=169)}({0:function(e,t){e.exports=wp.i18n},169:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(23),l=n.n(o),i=n(18),a=function(e){var t,n,r;if(window.hasOwnProperty("grecaptcha")){var o=e.id,l=document.createElement("div"),i=e.querySelector(".ti-form__container");null==i||i.insertBefore(l,i.lastChild);var a=null===(t=window.grecaptcha)||void 0===t?void 0:t.render(l,{sitekey:null===(n=window)||void 0===n||null===(r=n.themeisleGutenbergForm)||void 0===r?void 0:r.reRecaptchaSitekey,callback:function(e){var t;null!==(t=window.themeisleGutenberg)&&void 0!==t&&t.tokens||(window.themeisleGutenberg={},window.themeisleGutenberg.tokens={}),window.themeisleGutenberg.tokens[o]={token:e,reset:function(){var e;return null===(e=window.grecaptcha)||void 0===e?void 0:e.reset(a)}}},"expired-callback":function(){var e;null!==(e=window.themeisleGutenberg)&&void 0!==e&&e.tokens||(window.themeisleGutenberg={},window.themeisleGutenberg.tokens={}),window.themeisleGutenberg.tokens[o]={token:null,reset:function(){return null}}}});return a}};function c(e){return function(e){if(Array.isArray(e))return s(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return s(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.n(i)()((function(){var e=document.querySelectorAll(".wp-block-themeisle-blocks-form");!function(e){var t,n;if(!window.hasOwnProperty("grecaptcha")&&null!==(t=window)&&void 0!==t&&null!==(n=t.themeisleGutenbergForm)&&void 0!==n&&n.reRecaptchaSitekey){var r=document.createElement("script");r.id="recaptcha",document.body.appendChild(r),r.addEventListener("load",(function(){var t=setInterval((function(){window.hasOwnProperty("grecaptcha")&&grecaptcha.hasOwnProperty("render")&&(e.forEach((function(e){var t;null!=e&&null!==(t=e.classList)&&void 0!==t&&t.contains("has-captcha")&&a(e)})),clearInterval(t))}),200)})),r.src="https://www.google.com/recaptcha/api.js"}}(e),e.forEach((function(e){e.classList.contains("can-submit-and-subscribe")&&u(e);var t=e.querySelector("button");null==t||t.addEventListener("click",(function(n){t.disabled||(n.preventDefault(),t.disabled=!0,function(e,t){var n,o,i,a,s=null==e?void 0:e.id,u={},d=[],v=[{label:Object(r.__)("Form submission from","otter-blocks"),value:window.location.href}],f=null==e?void 0:e.querySelectorAll(".ti-form__container .wp-block-themeisle-blocks-form-input"),m=null==e?void 0:e.querySelectorAll(".ti-form__container .wp-block-themeisle-blocks-form-textarea");null===(n=[].concat(c(f),c(m)))||void 0===n||n.forEach((function(e){var t,n,r=null===(t=e.querySelector(".ti-form-input-label__label, .ti-form-textarea-label__label"))||void 0===t?void 0:t.innerHTML,o=e.querySelector(".ti-form-input, .ti-form-textarea-input"),l=null===(n=e.querySelector('.ti-form-input[type="checkbox"]'))||void 0===n?void 0:n.checked;null==o||!o.hasAttribute("required")||null!=o&&o.checkValidity()||d.push(o),r&&null!=o&&o.value&&v.push({label:r,value:null==o?void 0:o.value,type:null==o?void 0:o.type,checked:l})}));var b=".protection #".concat(e.id||"","_nonce_field"),h=null===(o=e.querySelector(b))||void 0===o?void 0:o.value,p=e.querySelector(".wp-block-button");null==p||p.classList.add("has-submit-msg");var w=function(e){p.querySelectorAll(".ti-form-server-response").forEach((function(e){return p.removeChild(e)})),p.appendChild(e),setTimeout((function(){e&&p===e.parentNode&&p.removeChild(e)}),1e4)};if(0<d.length||null!=e&&null!==(i=e.classList)&&void 0!==i&&i.contains("has-captcha")&&s&&(null===(a=window.themeisleGutenberg)||void 0===a||!a.tokens[s].token)){var y,g;if(d.forEach((function(e){null==e||e.reportValidity()})),null!=e&&null!==(y=e.classList)&&void 0!==y&&y.contains("has-captcha")&&s&&(null===(g=window.themeisleGutenberg)||void 0===g||!g.tokens[s].token)){var k=document.createElement("div");k.classList.add("ti-form-server-response"),window.hasOwnProperty("grecaptcha")?k.innerHTML=Object(r.__)("⚠ Please check the captcha.","otter-blocks"):k.innerHTML=Object(r.__)("⚠ Captcha is not loaded. Please check your browser plugins to allow the Google reCaptcha.","otter-blocks"),k.classList.add("warning"),w(k)}t.disabled=!1}else{var _,L,S,O,j,T,E,G,q,M,x;if(u.data=v,""!==(null==e||null===(_=e.dataset)||void 0===_?void 0:_.emailSubject))u.emailSubject=null==e||null===(E=e.dataset)||void 0===E?void 0:E.emailSubject;if(null!=e&&null!==(L=e.dataset)&&void 0!==L&&L.optionName)u.formOption=null==e||null===(G=e.dataset)||void 0===G?void 0:G.optionName;if(null!=e&&null!==(S=e.classList)&&void 0!==S&&S.contains("has-captcha")&&s&&null!==(O=window.themeisleGutenberg)&&void 0!==O&&null!==(j=O.tokens)&&void 0!==j&&j[s].token)u.token=null===(q=window.themeisleGutenberg)||void 0===q||null===(M=q.tokens)||void 0===M?void 0:M[s].token;if(null!=e&&e.id&&(u.formId=null==e?void 0:e.id),h&&(u.nonceValue=h),u.postUrl=window.location.href,null==p||p.classList.add("loading"),null!=e&&e.id&&(u.formId=null==e?void 0:e.id),e.classList.contains("is-subscription")&&(u.action="subscribe"),e.classList.contains("can-submit-and-subscribe"))u.action="submit-subscribe",u.consent=(null===(x=e.querySelector(".ti-form-consent input"))||void 0===x?void 0:x.checked)||!1;u.postUrl=window.location.href,null==p||p.classList.add("loading"),null===(T=l()({path:"themeisle-gutenberg-blocks/v1/forms",method:"POST",data:u}).then((function(e){var n,o;null==p||p.classList.remove("loading");var l,i,a=document.createElement("div");(a.classList.add("ti-form-server-response"),null!=e&&e.success?(a.innerHTML=Object(r.__)("Success","otter-blocks"),a.classList.add("success")):(a.classList.add("error"),"provider"===(null==e?void 0:e.error_source)?null!=e&&e.error.includes("invalid")||null!=e&&e.error.includes("fake")?(a.classList.add("warning"),a.innerHTML=Object(r.__)("⚠ The email address does not look correct!","otter-blocks")):null!=e&&e.error.includes("duplicate")||null!=e&&e.error.includes("already")?(a.classList.add("info"),a.innerHTML=Object(r.__)("🛈 The email was already registered!","otter-blocks")):a.innerHTML=Object(r.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"):a.innerHTML=Object(r.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"),console.error(null==e?void 0:e.error,null==e?void 0:e.reasons)),w(a),null!==(n=window.themeisleGutenberg)&&void 0!==n&&null!==(o=n.tokens)&&void 0!==o&&o[s].reset)&&(null===(l=window.themeisleGutenberg)||void 0===l||null===(i=l.tokens)||void 0===i||i[s].reset());t.disabled=!1})))||void 0===T||T.catch((function(e){var n,o;null==p||p.classList.remove("loading"),console.error(e);var l,i,a=document.createElement("div");(a.classList.add("ti-form-server-response"),a.innerHTML=Object(r.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"),a.classList.add("error"),w(a),null!==(n=window.themeisleGutenberg)&&void 0!==n&&null!==(o=n.tokens)&&void 0!==o&&o[s].reset)&&(null===(l=window.themeisleGutenberg)||void 0===l||null===(i=l.tokens)||void 0===i||i[s].reset());t.disabled=!1}))}}(e,t))}))}))}));var u=function(e){var t=e.querySelector(".ti-form__container"),n=e.querySelector(".wp-block-button"),o=document.createElement("div");o.classList.add("ti-form-consent"),t.insertBefore(o,n);var l=document.createElement("input");l.type="checkbox",l.name="consent",l.id="consent";var i=document.createElement("label");i.innerHTML=Object(r.__)("I consent to my name and email to be collected.","otter-blocks"),i.htmlFor="consent",o.appendChild(l),o.appendChild(i)}},18:function(e,t){e.exports=wp.domReady},23:function(e,t){e.exports=wp.apiFetch}});