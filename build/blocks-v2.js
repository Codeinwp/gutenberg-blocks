!function(t){function e(e){for(var n,u,c=e[0],l=e[1],a=e[2],p=0,f=[];p<c.length;p++)u=c[p],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&f.push(o[u][0]),o[u]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);for(s&&s(e);f.length;)f.shift()();return i.push.apply(i,a||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],n=!0,c=1;c<r.length;c++){var l=r[c];0!==o[l]&&(n=!1)}n&&(i.splice(e--,1),t=u(u.s=r[0]))}return t}var n={},o={3:0},i=[];function u(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,u),r.l=!0,r.exports}u.m=t,u.c=n,u.d=function(t,e,r){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(u.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)u.d(r,n,function(e){return t[e]}.bind(null,n));return r},u.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="";var c=window.tiOtterWebpackJsonp=window.tiOtterWebpackJsonp||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var a=0;a<c.length;a++)e(c[a]);var s=l;i.push([105,0]),r()}({105:function(t,e,r){t.exports=r(128)},128:function(t,e,r){"use strict";r.r(e);var n=r(55),o=r(44),i=r(5),u=r(35);var c=({attributes:t,setAttributes:e})=>(console.log(t),i.createElement("div",null,i.createElement(u.RichText,{value:t.text,onChange:t=>e({text:t})})));var l=({attributes:t})=>i.createElement(u.RichText.Content,{value:t.text});var a={id:{type:"string"},text:{type:"string",default:"Hallo"}};const s=Object(n.registerBlockType)("themeisle-blocks/typescript-text",{title:Object(o.a)("Test Typescript"),description:Object(o.a)("Put the logo maker on the site."),category:"widgets",icon:"smiley",attributes:a,edit:c,save:l});console.log(s)},35:function(t,e){t.exports=wp.editor},5:function(t,e){t.exports=React},55:function(t,e){t.exports=wp.blocks}});