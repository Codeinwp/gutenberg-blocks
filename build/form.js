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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/frontend/form/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/frontend/form/captcha.js":
/*!**************************************!*\
  !*** ./src/frontend/form/captcha.js ***!
  \**************************************/
/*! exports provided: addCaptchaOnPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addCaptchaOnPage\", function() { return addCaptchaOnPage; });\nvar addCaptchaOnPage = function addCaptchaOnPage(forms) {\n  var _window, _window$themeisleGute;\n\n  if (!window.hasOwnProperty('grecaptcha') && (_window = window) !== null && _window !== void 0 && (_window$themeisleGute = _window.themeisleGutenbergForm) !== null && _window$themeisleGute !== void 0 && _window$themeisleGute.reRecaptchaSitekey) {\n    var script = document.createElement('script');\n    script.id = 'recaptcha';\n    document.body.appendChild(script);\n    script.addEventListener('load', function () {\n      var tryRenderCaptcha = setInterval(function () {\n        if (window.hasOwnProperty('grecaptcha') && grecaptcha.hasOwnProperty('render')) {\n          forms.forEach(function (form) {\n            var _form$classList;\n\n            if (form !== null && form !== void 0 && (_form$classList = form.classList) !== null && _form$classList !== void 0 && _form$classList.contains('has-captcha')) {\n              renderCapthcaOn(form);\n            }\n          });\n          clearInterval(tryRenderCaptcha);\n        }\n      }, 200);\n    });\n    script.src = 'https://www.google.com/recaptcha/api.js';\n  }\n};\n/**\n * Render the captcha component on form\n * @param {HTMLDivElement} form The form container\n */\n\nvar renderCapthcaOn = function renderCapthcaOn(form) {\n  var _window$grecaptcha, _window2, _window2$themeisleGut;\n\n  if (!window.hasOwnProperty('grecaptcha')) {\n    return;\n  }\n\n  var id = form.id;\n  var captchaNode = document.createElement('div');\n  var container = form.querySelector('.wp-block-themeisle-blocks-form__container');\n  container === null || container === void 0 ? void 0 : container.insertBefore(captchaNode, container.lastChild);\n  var captcha = (_window$grecaptcha = window.grecaptcha) === null || _window$grecaptcha === void 0 ? void 0 : _window$grecaptcha.render(captchaNode, {\n    sitekey: (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$themeisleGut = _window2.themeisleGutenbergForm) === null || _window2$themeisleGut === void 0 ? void 0 : _window2$themeisleGut.reRecaptchaSitekey,\n    callback: function callback(token) {\n      var _window$themeisleGute2;\n\n      if (!((_window$themeisleGute2 = window.themeisleGutenberg) !== null && _window$themeisleGute2 !== void 0 && _window$themeisleGute2.tokens)) {\n        window.themeisleGutenberg = {};\n        window.themeisleGutenberg.tokens = {};\n      }\n\n      window.themeisleGutenberg.tokens[id] = {\n        token: token,\n        reset: function reset() {\n          var _window$grecaptcha2;\n\n          return (_window$grecaptcha2 = window.grecaptcha) === null || _window$grecaptcha2 === void 0 ? void 0 : _window$grecaptcha2.reset(captcha);\n        }\n      };\n    },\n    'expired-callback': function expiredCallback() {\n      var _window$themeisleGute3;\n\n      if (!((_window$themeisleGute3 = window.themeisleGutenberg) !== null && _window$themeisleGute3 !== void 0 && _window$themeisleGute3.tokens)) {\n        window.themeisleGutenberg = {};\n        window.themeisleGutenberg.tokens = {};\n      }\n\n      window.themeisleGutenberg.tokens[id] = {\n        token: null,\n        reset: function reset() {\n          return null;\n        }\n      };\n    }\n  });\n  return captcha;\n};\n\n//# sourceURL=webpack:///./src/frontend/form/captcha.js?");

/***/ }),

/***/ "./src/frontend/form/index.js":
/*!************************************!*\
  !*** ./src/frontend/form/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ \"@wordpress/dom-ready\");\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ \"@wordpress/api-fetch\");\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _captcha__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./captcha */ \"./src/frontend/form/captcha.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n\n\n\nvar TIME_UNTIL_REMOVE = 10000;\n/**\n * Send the date from the form to the server\n * @param {HTMLDivElement} form The element that contains all the inputs\n * @param {HTMLButtonElement} btn The submit button\n */\n\nvar collectAndSendInputFormData = function collectAndSendInputFormData(form, btn) {\n  var _ref, _form$querySelector, _form$classList, _window$themeisleGute;\n\n  var id = form === null || form === void 0 ? void 0 : form.id;\n  var data = {};\n  /** @type {Array.<HTMLDivElement>} */\n\n  var elemsWithError = [];\n  var formFieldsData = [{\n    label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('Form submission from', 'otter-blocks'),\n    value: window.location.href\n  }];\n  var inputs = form === null || form === void 0 ? void 0 : form.querySelectorAll('.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-input');\n  var textarea = form === null || form === void 0 ? void 0 : form.querySelectorAll('.wp-block-themeisle-blocks-form__container .wp-block-themeisle-blocks-form-textarea');\n  (_ref = [].concat(_toConsumableArray(inputs), _toConsumableArray(textarea))) === null || _ref === void 0 ? void 0 : _ref.forEach(function (input) {\n    var _input$querySelector, _input$querySelector2;\n\n    var label = (_input$querySelector = input.querySelector('.wp-block-themeisle-blocks-form-input-label__label, .wp-block-themeisle-blocks-form-textarea-label__label')) === null || _input$querySelector === void 0 ? void 0 : _input$querySelector.innerHTML;\n    var valueElem = input.querySelector('.wp-block-themeisle-blocks-form-input-input, .wp-block-themeisle-blocks-form-textarea-input'); // TODO: use checkbox in the future versions\n\n    var checked = (_input$querySelector2 = input.querySelector('.wp-block-themeisle-blocks-form-input-input[type=\"checkbox\"]')) === null || _input$querySelector2 === void 0 ? void 0 : _input$querySelector2.checked;\n\n    if (valueElem !== null && valueElem !== void 0 && valueElem.hasAttribute('required') && !(valueElem !== null && valueElem !== void 0 && valueElem.checkValidity())) {\n      elemsWithError.push(valueElem);\n    }\n\n    if (label && valueElem !== null && valueElem !== void 0 && valueElem.value) {\n      formFieldsData.push({\n        label: label,\n        value: valueElem === null || valueElem === void 0 ? void 0 : valueElem.value,\n        type: valueElem === null || valueElem === void 0 ? void 0 : valueElem.type,\n        checked: checked\n      });\n    }\n\n    ;\n  });\n  var query = \".protection #\".concat(form.id || '', \"_nonce_field\");\n  var nonceFieldValue = (_form$querySelector = form.querySelector(query)) === null || _form$querySelector === void 0 ? void 0 : _form$querySelector.value;\n  var msgAnchor = form.querySelector('.wp-block-button');\n  msgAnchor === null || msgAnchor === void 0 ? void 0 : msgAnchor.classList.add('has-submit-msg');\n  /**\n  \t * Add the message to the anchor element then removed after a fixed time\n  \t * @param {HTMLDivElement} msg The message container\n  \t */\n\n  var addThenRemoveMsg = function addThenRemoveMsg(msg) {\n    // Remove old messages\n    msgAnchor.querySelectorAll('.wp-block-themeisle-blocks-form-server-msg').forEach(function (_msg) {\n      return msgAnchor.removeChild(_msg);\n    }); // Add the new message to the page\n\n    msgAnchor.appendChild(msg); // Delete it after a fixed time\n\n    setTimeout(function () {\n      if (msg && msgAnchor === msg.parentNode) {\n        msgAnchor.removeChild(msg);\n      }\n    }, TIME_UNTIL_REMOVE);\n  };\n\n  if (0 < elemsWithError.length || form !== null && form !== void 0 && (_form$classList = form.classList) !== null && _form$classList !== void 0 && _form$classList.contains('has-captcha') && id && !((_window$themeisleGute = window.themeisleGutenberg) !== null && _window$themeisleGute !== void 0 && _window$themeisleGute.tokens[id].token)) {\n    var _form$classList2, _window$themeisleGute2;\n\n    elemsWithError.forEach(function (input) {\n      input === null || input === void 0 ? void 0 : input.reportValidity();\n    });\n\n    if (form !== null && form !== void 0 && (_form$classList2 = form.classList) !== null && _form$classList2 !== void 0 && _form$classList2.contains('has-captcha') && id && !((_window$themeisleGute2 = window.themeisleGutenberg) !== null && _window$themeisleGute2 !== void 0 && _window$themeisleGute2.tokens[id].token)) {\n      var msg = document.createElement('div');\n      msg.classList.add('wp-block-themeisle-blocks-form-server-msg');\n\n      if (!window.hasOwnProperty('grecaptcha')) {\n        msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('⚠ Captcha is not loaded. Please check your browser plugins to allow the Google reCaptcha.', 'otter-blocks');\n      } else {\n        msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('⚠ Please check the captcha.', 'otter-blocks');\n      }\n\n      msg.classList.add('warning');\n      addThenRemoveMsg(msg);\n    }\n\n    btn.disabled = false;\n  } else {\n    var _form$dataset, _form$dataset3, _form$classList3, _window$themeisleGute3, _window$themeisleGute4, _apiFetch$then;\n\n    data.data = formFieldsData;\n\n    if ('' !== (form === null || form === void 0 ? void 0 : (_form$dataset = form.dataset) === null || _form$dataset === void 0 ? void 0 : _form$dataset.emailSubject)) {\n      var _form$dataset2;\n\n      data.emailSubject = form === null || form === void 0 ? void 0 : (_form$dataset2 = form.dataset) === null || _form$dataset2 === void 0 ? void 0 : _form$dataset2.emailSubject;\n    }\n\n    if (form !== null && form !== void 0 && (_form$dataset3 = form.dataset) !== null && _form$dataset3 !== void 0 && _form$dataset3.optionName) {\n      var _form$dataset4;\n\n      data.formOption = form === null || form === void 0 ? void 0 : (_form$dataset4 = form.dataset) === null || _form$dataset4 === void 0 ? void 0 : _form$dataset4.optionName;\n    }\n\n    if (form !== null && form !== void 0 && (_form$classList3 = form.classList) !== null && _form$classList3 !== void 0 && _form$classList3.contains('has-captcha') && id && (_window$themeisleGute3 = window.themeisleGutenberg) !== null && _window$themeisleGute3 !== void 0 && (_window$themeisleGute4 = _window$themeisleGute3.tokens) !== null && _window$themeisleGute4 !== void 0 && _window$themeisleGute4[id].token) {\n      var _window$themeisleGute5, _window$themeisleGute6;\n\n      data.token = (_window$themeisleGute5 = window.themeisleGutenberg) === null || _window$themeisleGute5 === void 0 ? void 0 : (_window$themeisleGute6 = _window$themeisleGute5.tokens) === null || _window$themeisleGute6 === void 0 ? void 0 : _window$themeisleGute6[id].token;\n    }\n\n    if (form !== null && form !== void 0 && form.id) {\n      data.formId = form === null || form === void 0 ? void 0 : form.id;\n    }\n\n    if (nonceFieldValue) {\n      data.nonceValue = nonceFieldValue;\n    }\n\n    data.postUrl = window.location.href;\n    msgAnchor === null || msgAnchor === void 0 ? void 0 : msgAnchor.classList.add('loading');\n\n    if (form !== null && form !== void 0 && form.id) {\n      data.formId = form === null || form === void 0 ? void 0 : form.id;\n    }\n\n    if (form.classList.contains('is-subscription')) {\n      data.action = 'subscribe';\n    }\n\n    if (form.classList.contains('can-submit-and-subscribe')) {\n      var _form$querySelector2;\n\n      data.action = 'submit-subscribe';\n      data.consent = ((_form$querySelector2 = form.querySelector('.wp-block-themeisle-blocks-form-consent input')) === null || _form$querySelector2 === void 0 ? void 0 : _form$querySelector2.checked) || false;\n    }\n\n    data.postUrl = window.location.href;\n    msgAnchor === null || msgAnchor === void 0 ? void 0 : msgAnchor.classList.add('loading');\n    (_apiFetch$then = _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({\n      path: 'themeisle-gutenberg-blocks/v1/forms',\n      method: 'POST',\n      data: data\n    }).then(function (res) {\n      var _window$themeisleGute7, _window$themeisleGute8;\n\n      msgAnchor === null || msgAnchor === void 0 ? void 0 : msgAnchor.classList.remove('loading');\n      var msg = document.createElement('div');\n      msg.classList.add('wp-block-themeisle-blocks-form-server-msg');\n\n      if (res !== null && res !== void 0 && res.success) {\n        msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('Success', 'otter-blocks');\n        msg.classList.add('success');\n      } else {\n        msg.classList.add('error');\n\n        if ('provider' === (res === null || res === void 0 ? void 0 : res.error_source)) {\n          if (res !== null && res !== void 0 && res.error.includes('invalid') || res !== null && res !== void 0 && res.error.includes('fake')) {\n            // mailchimp\n            msg.classList.add('warning');\n            msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('⚠ The email address does not look correct!', 'otter-blocks');\n          } else if (res !== null && res !== void 0 && res.error.includes('duplicate') || res !== null && res !== void 0 && res.error.includes('already')) {\n            // sendinblue\n            msg.classList.add('info');\n            msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('🛈 The email was already registered!', 'otter-blocks');\n          } else {\n            msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('Error. Something is wrong with the server! Try again later.', 'otter-blocks');\n          }\n        } else {\n          msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('Error. Something is wrong with the server! Try again later.', 'otter-blocks');\n        }\n\n        console.error(res === null || res === void 0 ? void 0 : res.error, res === null || res === void 0 ? void 0 : res.reasons);\n      }\n\n      addThenRemoveMsg(msg);\n\n      if ((_window$themeisleGute7 = window.themeisleGutenberg) !== null && _window$themeisleGute7 !== void 0 && (_window$themeisleGute8 = _window$themeisleGute7.tokens) !== null && _window$themeisleGute8 !== void 0 && _window$themeisleGute8[id].reset) {\n        var _window$themeisleGute9, _window$themeisleGute10;\n\n        (_window$themeisleGute9 = window.themeisleGutenberg) === null || _window$themeisleGute9 === void 0 ? void 0 : (_window$themeisleGute10 = _window$themeisleGute9.tokens) === null || _window$themeisleGute10 === void 0 ? void 0 : _window$themeisleGute10[id].reset();\n      }\n\n      btn.disabled = false;\n    })) === null || _apiFetch$then === void 0 ? void 0 : _apiFetch$then.catch(function (error) {\n      var _window$themeisleGute11, _window$themeisleGute12;\n\n      msgAnchor === null || msgAnchor === void 0 ? void 0 : msgAnchor.classList.remove('loading');\n      console.error(error);\n      var msg = document.createElement('div');\n      msg.classList.add('wp-block-themeisle-blocks-form-server-msg');\n      msg.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('Error. Something is wrong with the server! Try again later.', 'otter-blocks');\n      msg.classList.add('error');\n      addThenRemoveMsg(msg);\n\n      if ((_window$themeisleGute11 = window.themeisleGutenberg) !== null && _window$themeisleGute11 !== void 0 && (_window$themeisleGute12 = _window$themeisleGute11.tokens) !== null && _window$themeisleGute12 !== void 0 && _window$themeisleGute12[id].reset) {\n        var _window$themeisleGute13, _window$themeisleGute14;\n\n        (_window$themeisleGute13 = window.themeisleGutenberg) === null || _window$themeisleGute13 === void 0 ? void 0 : (_window$themeisleGute14 = _window$themeisleGute13.tokens) === null || _window$themeisleGute14 === void 0 ? void 0 : _window$themeisleGute14[id].reset();\n      }\n\n      btn.disabled = false;\n    });\n  }\n};\n\n_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(function () {\n  var forms = document.querySelectorAll('.wp-block-themeisle-blocks-form');\n  Object(_captcha__WEBPACK_IMPORTED_MODULE_3__[\"addCaptchaOnPage\"])(forms);\n  forms.forEach(function (form) {\n    if (form.classList.contains('can-submit-and-subscribe')) {\n      renderConsentCheckbox(form);\n    }\n\n    var sendBtn = form.querySelector('button');\n    sendBtn === null || sendBtn === void 0 ? void 0 : sendBtn.addEventListener('click', function (event) {\n      if (!sendBtn.disabled) {\n        event.preventDefault();\n        sendBtn.disabled = true;\n        collectAndSendInputFormData(form, sendBtn);\n      }\n    });\n  });\n});\n/**\n * Render a checkbox for consent\n * @param {HTMLDivElement} form\n */\n\nvar renderConsentCheckbox = function renderConsentCheckbox(form) {\n  var container = form.querySelector('.wp-block-themeisle-blocks-form__container');\n  var button = form.querySelector('.wp-block-button');\n  var inputContainer = document.createElement('div');\n  inputContainer.classList.add('wp-block-themeisle-blocks-form-consent');\n  container.insertBefore(inputContainer, button);\n  var input = document.createElement('input');\n  input.type = 'checkbox';\n  input.name = 'consent';\n  input.id = 'consent';\n  var label = document.createElement('label');\n  label.innerHTML = Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__[\"__\"])('I consent to my name and email to be collected.', 'otter-blocks');\n  label.htmlFor = 'consent';\n  inputContainer.appendChild(input);\n  inputContainer.appendChild(label);\n};\n\n//# sourceURL=webpack:///./src/frontend/form/index.js?");

/***/ }),

/***/ "@wordpress/api-fetch":
/*!******************************!*\
  !*** external "wp.apiFetch" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.apiFetch;\n\n//# sourceURL=webpack:///external_%22wp.apiFetch%22?");

/***/ }),

/***/ "@wordpress/dom-ready":
/*!******************************!*\
  !*** external "wp.domReady" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.domReady;\n\n//# sourceURL=webpack:///external_%22wp.domReady%22?");

/***/ }),

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = wp.i18n;\n\n//# sourceURL=webpack:///external_%22wp.i18n%22?");

/***/ })

/******/ });