!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=167)}({0:function(e,t){e.exports=wp.i18n},167:function(e,t,n){"use strict";n.r(t);var o=n(0),l=n(18),r=n.n(l),i=n(23),c=n.n(i),s=function(e){var t,n,o;if(window.hasOwnProperty("grecaptcha")){var l=e.id,r=document.createElement("div"),i=e.querySelector(".wp-block-themeisle-blocks-form__container");null==i||i.insertBefore(r,i.lastChild);var c=null===(t=window.grecaptcha)||void 0===t?void 0:t.render(r,{sitekey:null===(n=window)||void 0===n||null===(o=n.themeisleGutenbergForm)||void 0===o?void 0:o.reRecaptchaSitekey,callback:function(e){var t;null!==(t=window.themeisleGutenberg)&&void 0!==t&&t.tokens||(window.themeisleGutenberg={},window.themeisleGutenberg.tokens={}),window.themeisleGutenberg.tokens[l]={token:e,reset:function(){var e;return null===(e=window.grecaptcha)||void 0===e?void 0:e.reset(c)}}},"expired-callback":function(){var e;null!==(e=window.themeisleGutenberg)&&void 0!==e&&e.tokens||(window.themeisleGutenberg={},window.themeisleGutenberg.tokens={}),window.themeisleGutenberg.tokens[l]={token:null,reset:function(){return null}}}});return c}};function a(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}r()((function(){var e=document.querySelectorAll(".wp-block-themeisle-blocks-form");!function(e){var t,n;if(!window.hasOwnProperty("grecaptcha")&&null!==(t=window)&&void 0!==t&&null!==(n=t.themeisleGutenbergForm)&&void 0!==n&&n.reRecaptchaSitekey){var o=document.createElement("script");o.id="recaptcha",document.body.appendChild(o),o.addEventListener("load",(function(){var t=setInterval((function(){window.hasOwnProperty("grecaptcha")&&grecaptcha.hasOwnProperty("render")&&(e.forEach((function(e){var t;null!=e&&null!==(t=e.classList)&&void 0!==t&&t.contains("has-captcha")&&s(e)})),clearInterval(t))}),200)})),o.src="https://www.google.com/recaptcha/api.js"}}(e),e.forEach((function(e){e.classList.contains("can-submit-and-subscribe")&&d(e);var t=e.querySelector("button");null==t||t.addEventListener("click",(function(n){t.disabled||(n.preventDefault(),t.disabled=!0,function(e,t){var n,l,r,i,s=null==e?void 0:e.id,u={},d=[],b=[{label:Object(o.__)("Form submission from","otter-blocks"),value:window.location.href}],m=null==e?void 0:e.querySelectorAll(".wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-input"),v=null==e?void 0:e.querySelectorAll(".wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-textarea");null===(n=[].concat(a(m),a(v)))||void 0===n||n.forEach((function(e){var t,n,o=null===(t=e.querySelector(".wp-block-themeisle-blocks-form-input-label__label, .wp-block-themeisle-blocks-form-textarea-label__label"))||void 0===t?void 0:t.innerHTML,l=e.querySelector(".wp-block-themeisle-blocks-form-input-input, .wp-block-themeisle-blocks-form-textarea-input"),r=null===(n=e.querySelector('.wp-block-themeisle-blocks-form-input-input[type="checkbox"]'))||void 0===n?void 0:n.checked;null==l||!l.hasAttribute("required")||null!=l&&l.checkValidity()||d.push(l),o&&null!=l&&l.value&&b.push({label:o,value:null==l?void 0:l.value,type:null==l?void 0:l.type,checked:r})}));var h=".protection #".concat(e.id||"","_nonce_field"),p=null===(l=e.querySelector(h))||void 0===l?void 0:l.value,f=e.querySelector(".wp-block-button");null==f||f.classList.add("has-submit-msg");var w=function(e){f.querySelectorAll(".wp-block-themeisle-blocks-form-server-msg").forEach((function(e){return f.removeChild(e)})),f.appendChild(e),setTimeout((function(){e&&f===e.parentNode&&f.removeChild(e)}),1e4)};if(0<d.length||null!=e&&null!==(r=e.classList)&&void 0!==r&&r.contains("has-captcha")&&s&&(null===(i=window.themeisleGutenberg)||void 0===i||!i.tokens[s].token)){var k,g;if(d.forEach((function(e){null==e||e.reportValidity()})),null!=e&&null!==(k=e.classList)&&void 0!==k&&k.contains("has-captcha")&&s&&(null===(g=window.themeisleGutenberg)||void 0===g||!g.tokens[s].token)){var y=document.createElement("div");y.classList.add("wp-block-themeisle-blocks-form-server-msg"),window.hasOwnProperty("grecaptcha")?y.innerHTML=Object(o.__)("⚠ Please check the captcha.","otter-blocks"):y.innerHTML=Object(o.__)("⚠ Captcha is not loaded. Please check your browser plugins to allow the Google reCaptcha.","otter-blocks"),y.classList.add("warning"),w(y)}t.disabled=!1}else{var _,L,S,O,j,T,E,G,q,M,x;if(u.data=b,""!==(null==e||null===(_=e.dataset)||void 0===_?void 0:_.emailSubject))u.emailSubject=null==e||null===(E=e.dataset)||void 0===E?void 0:E.emailSubject;if(null!=e&&null!==(L=e.dataset)&&void 0!==L&&L.optionName)u.formOption=null==e||null===(G=e.dataset)||void 0===G?void 0:G.optionName;if(null!=e&&null!==(S=e.classList)&&void 0!==S&&S.contains("has-captcha")&&s&&null!==(O=window.themeisleGutenberg)&&void 0!==O&&null!==(j=O.tokens)&&void 0!==j&&j[s].token)u.token=null===(q=window.themeisleGutenberg)||void 0===q||null===(M=q.tokens)||void 0===M?void 0:M[s].token;if(null!=e&&e.id&&(u.formId=null==e?void 0:e.id),p&&(u.nonceValue=p),u.postUrl=window.location.href,null==f||f.classList.add("loading"),null!=e&&e.id&&(u.formId=null==e?void 0:e.id),e.classList.contains("is-subscription")&&(u.action="subscribe"),e.classList.contains("can-submit-and-subscribe"))u.action="submit-subscribe",u.consent=(null===(x=e.querySelector(".wp-block-themeisle-blocks-form-consent input"))||void 0===x?void 0:x.checked)||!1;u.postUrl=window.location.href,null==f||f.classList.add("loading"),null===(T=c()({path:"themeisle-gutenberg-blocks/v1/forms",method:"POST",data:u}).then((function(e){var n,l;null==f||f.classList.remove("loading");var r,i,c=document.createElement("div");(c.classList.add("wp-block-themeisle-blocks-form-server-msg"),null!=e&&e.success?(c.innerHTML=Object(o.__)("Success","otter-blocks"),c.classList.add("success")):(c.classList.add("error"),"provider"===(null==e?void 0:e.error_source)?null!=e&&e.error.includes("invalid")||null!=e&&e.error.includes("fake")?(c.classList.add("warning"),c.innerHTML=Object(o.__)("⚠ The email address does not look correct!","otter-blocks")):null!=e&&e.error.includes("duplicate")||null!=e&&e.error.includes("already")?(c.classList.add("info"),c.innerHTML=Object(o.__)("🛈 The email was already registered!","otter-blocks")):c.innerHTML=Object(o.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"):c.innerHTML=Object(o.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"),console.error(null==e?void 0:e.error,null==e?void 0:e.reasons)),w(c),null!==(n=window.themeisleGutenberg)&&void 0!==n&&null!==(l=n.tokens)&&void 0!==l&&l[s].reset)&&(null===(r=window.themeisleGutenberg)||void 0===r||null===(i=r.tokens)||void 0===i||i[s].reset());t.disabled=!1})))||void 0===T||T.catch((function(e){var n,l;null==f||f.classList.remove("loading"),console.error(e);var r,i,c=document.createElement("div");(c.classList.add("wp-block-themeisle-blocks-form-server-msg"),c.innerHTML=Object(o.__)("Error. Something is wrong with the server! Try again later.","otter-blocks"),c.classList.add("error"),w(c),null!==(n=window.themeisleGutenberg)&&void 0!==n&&null!==(l=n.tokens)&&void 0!==l&&l[s].reset)&&(null===(r=window.themeisleGutenberg)||void 0===r||null===(i=r.tokens)||void 0===i||i[s].reset());t.disabled=!1}))}}(e,t))}))}))}));var d=function(e){var t=e.querySelector(".wp-block-themeisle-blocks-form__container"),n=e.querySelector(".wp-block-button"),l=document.createElement("div");l.classList.add("wp-block-themeisle-blocks-form-consent"),t.insertBefore(l,n);var r=document.createElement("input");r.type="checkbox",r.name="consent",r.id="consent";var i=document.createElement("label");i.innerHTML=Object(o.__)("I consent to my name and email to be collected.","otter-blocks"),i.htmlFor="consent",l.appendChild(r),l.appendChild(i)}},18:function(e,t){e.exports=wp.domReady},23:function(e,t){e.exports=wp.apiFetch}});