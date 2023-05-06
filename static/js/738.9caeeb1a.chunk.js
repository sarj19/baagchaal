!function(){"use strict";var e={8137:function(e,t,r){r.d(t,{G:function(){return l}});var n=r(3433),o=r(9439),u=r(1413),i=r(2387),a=r(2568),c=r(9720),s=r(3920);function l(e,t){switch(t.type){case"selected_without_turn":return(0,u.Z)((0,u.Z)({},e),{},{message:"Waiting on other player to move"});case"bot_thinking":return(0,u.Z)((0,u.Z)({},e),{},{message:"Thinking next move..."});case"gameover":return(0,u.Z)((0,u.Z)({},e),{},{message:"goat"===t.value?"Goat trapped tigers":"Tiger ate all goats"});case"select":return f(e,t.value);case"move":if(null!==e.selectedPiece){var r=(0,c.Du)(e,"goat")?g(e,e.selectedPiece,t.value):v(e,e.selectedPiece,t.value);return r!=e?r:f(e,t.value)}return e;case"move_directly":return(0,c.Du)(e,"goat")?g(e,t.from,t.to):v(e,t.from,t.to);case"server":if(e.moves.length>=t.value.length)return e;var n=e;n.moves.forEach((function(r,n){if(r[0]!==t.value[n][0]||r[1]!==t.value[n][1])return console.error("server data does not add up with local data"),e}));for(var i=n.moves.length;i<t.value.length;i++){var a=(0,o.Z)(t.value[i],2),s=a[0],l=a[1];if((n=(0,c.Du)(n,"goat")?g(n,s,l):v(n,s,l)).moves.length!==i+1)return console.error("move from server was not valid"),e}return n}}function f(e,t){return(0,c.Du)(e,"goat")?function(e,t){var r=(0,a.f)(e);if(null===t||e.goats.includes(t)&&r||(0,s.W)(t,e.goats,e.tigers)&&!r)return(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:t,message:null});return e}(e,t):function(e,t){if(null===t||e.tigers.includes(t))return(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:t,message:null});return e}(e,t)}function v(e,t,r){if(null===t)return(0,u.Z)((0,u.Z)({},e),{},{message:"Select a tiger to move first"});if(e.tigers.includes(r))return e;if(!e.tigers.includes(t))return(0,u.Z)((0,u.Z)({},e),{},{message:"Select a tiger to move first"});if(e.goats.includes(r)){var o=(0,i.V)(e.tigers,e.goats,t,r);if(null===o)return(0,u.Z)((0,u.Z)({},e),{},{message:"The tiger cannot eat the goat"});var a=e.goats.filter((function(e){return e!==r})),c=e.tigers.filter((function(e){return e!==t}));return c.push(o),(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:null,moves:[].concat((0,n.Z)(e.moves),[[t,o]]),tigers:c,goats:a,message:null})}if((0,s.b1)(t,r)){var l=e.tigers.filter((function(e){return e!==t}));return l.push(r),(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:null,moves:[].concat((0,n.Z)(e.moves),[[t,r]]),tigers:l,message:null})}var f=r+(t-r)/2;if(!0===(0,s.b1)(r,f)&&!0===(0,s.b1)(t,f)&&e.goats.includes(f)){var v=e.goats.filter((function(e){return e!==f})),g=e.tigers.filter((function(e){return e!==t}));return g.push(r),(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:null,moves:[].concat((0,n.Z)(e.moves),[[t,r]]),tigers:g,goats:v,message:null})}return e}function g(e,t,r){if((0,a.f)(e)){if(null===t)return(0,u.Z)((0,u.Z)({},e),{},{message:"Select a goat to move."});if(!e.goats.includes(t))return(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:null,message:"It's goat's turn to mvoe."});if(e.tigers.includes(r))return(0,u.Z)((0,u.Z)({},e),{},{message:"Move the goat to empty space."});if((0,s.b1)(t,r)&&!e.goats.includes(r)){var o=e.goats.filter((function(e){return e!==t}));return o.push(r),(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:null,moves:[].concat((0,n.Z)(e.moves),[[t,r]]),goats:o,message:null})}}else if(t==r)return e.goats.includes(r)||e.tigers.includes(r)?(0,u.Z)((0,u.Z)({},e),{},{message:"Select empty space to place new goat."}):(0,u.Z)((0,u.Z)({},e),{},{selectedPiece:null,moves:[].concat((0,n.Z)(e.moves),[[t,r]]),goats:[].concat((0,n.Z)(e.goats),[r]),message:null});return e}},2387:function(e,t,r){r.d(t,{V:function(){return o}});var n=r(3920);function o(e,t,r,o){if(!(0,n.b1)(r,o))return null;var u=o+(o-r);return u<0||u>24||1!=(0,n.b1)(u,o)||e.includes(u)||t.includes(u)?null:u}},2568:function(e,t,r){r.d(t,{V:function(){return o},f:function(){return u}});var n=r(4974);function o(e){return Math.min(Math.ceil(e.moves.length/2),n.b)}function u(e){return e.moves.length>=2*n.b}},4867:function(e,t,r){r.d(t,{YR:function(){return s},ci:function(){return a},hI:function(){return c}});var n=r(3433),o=r(2387),u=r(2568),i=r(3920);function a(e){var t=e.tigers,r=e.goats,o=[];return t.forEach((function(e){o.push.apply(o,(0,n.Z)(c(e,t,r)))})),o}function c(e,t,r){var n=[];return i.AU[e].forEach((function(u){t.includes(u)||((0,i.W)(u,r,t)||null!=(0,o.V)(t,r,e,u))&&n.push([e,u])})),n}function s(e){if((0,u.f)(e)){var t=[];return e.goats.forEach((function(r){t.push.apply(t,(0,n.Z)(function(e,t){var r=[];return i.AU[e].forEach((function(n){(0,i.W)(n,t.goats,t.tigers)&&r.push([e,n])})),r}(r,e)))})),t}return(0,i.A)(e.tigers,e.goats).map((function(e){return[e,e]}))}},9720:function(e,t,r){function n(e){return e.moves.length%2===0?"goat":"tiger"}function o(e,t){return n(e)==t}r.d(t,{Du:function(){return o},yf:function(){return n}})},3920:function(e,t,r){r.d(t,{A:function(){return i},AU:function(){return a},W:function(){return u},b1:function(){return o}});var n=Array.from(Array(25).keys());function o(e,t){return!(e>24||t>24||e<0||t<0||parseInt("".concat(e),10)!==e||parseInt("".concat(t),10)!==t)&&a[e].has(t)}function u(e,t,r){return!(t.includes(e)||r.includes(e))}function i(e,t){return n.filter((function(r){return u(r,t,e)}))}var a=[[1,5,6],[0,2,6],[1,3,6,7,8],[2,4,8],[3,8,9],[0,6,10],[0,1,2,5,7,10,11,12],[2,6,8,12],[2,3,4,7,9,12,13,14],[4,8,14],[5,6,11,15,16],[6,10,12,16],[6,7,8,11,13,16,17,18],[8,12,14,18],[8,9,13,18,19],[10,16,20],[10,11,12,15,17,20,21,22],[12,16,18,22],[12,13,14,17,19,22,23,24],[14,18,24],[15,16,21],[16,20,22],[16,17,18,21,23],[18,22,24],[18,19,23]].map((function(e){return new Set(e)}))},4974:function(e,t,r){r.d(t,{b:function(){return n}});var n=20},907:function(e,t,r){function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,{Z:function(){return n}})},3878:function(e,t,r){function n(e){if(Array.isArray(e))return e}r.d(t,{Z:function(){return n}})},4942:function(e,t,r){r.d(t,{Z:function(){return o}});var n=r(9142);function o(e,t,r){return(t=(0,n.Z)(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},9199:function(e,t,r){function n(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}r.d(t,{Z:function(){return n}})},5267:function(e,t,r){function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(t,{Z:function(){return n}})},1413:function(e,t,r){r.d(t,{Z:function(){return u}});var n=r(4942);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},9439:function(e,t,r){r.d(t,{Z:function(){return i}});var n=r(3878);var o=r(181),u=r(5267);function i(e,t){return(0,n.Z)(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,u,i,a=[],c=!0,s=!1;try{if(u=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=u.call(r)).done)&&(a.push(n.value),a.length!==t);c=!0);}catch(l){s=!0,o=l}finally{try{if(!c&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw o}}return a}}(e,t)||(0,o.Z)(e,t)||(0,u.Z)()}},3433:function(e,t,r){r.d(t,{Z:function(){return i}});var n=r(907);var o=r(9199),u=r(181);function i(e){return function(e){if(Array.isArray(e))return(0,n.Z)(e)}(e)||(0,o.Z)(e)||(0,u.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},9142:function(e,t,r){r.d(t,{Z:function(){return o}});var n=r(1002);function o(e){var t=function(e,t){if("object"!==(0,n.Z)(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,t||"default");if("object"!==(0,n.Z)(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===(0,n.Z)(t)?t:String(t)}},1002:function(e,t,r){function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}r.d(t,{Z:function(){return n}})},181:function(e,t,r){r.d(t,{Z:function(){return o}});var n=r(907);function o(e,t){if(e){if("string"===typeof e)return(0,n.Z)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?(0,n.Z)(e,t):void 0}}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return e[n](u,u.exports,r),u.exports}r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e=r(9439),t=r(4974),n=r(8137),o=r(2568),u=r(4867),i=r(9720);function a(e,r){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-20,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:20,l=(0,i.yf)(e),f=function(e){var r=(0,o.f)(e),n=r?t.b-e.goats.length:(0,o.V)(e)-e.goats.length,i=e.tigers.map((function(t){return(0,u.hI)(t,e.tigers,e.goats).length})).filter((function(e){return 0==e})).length;return n-5*i}(e);if(0==r||-20==f||20==f)return f;if("goat"==l){var v=20,g=(0,u.YR)(e);for(var m in g){var d=(0,n.G)(e,{type:"move_directly",from:g[m][0],to:g[m][1]});if((v=Math.min(v,a(d,r-1,c,s)))<c)break;s=Math.min(s,v)}return v}var p=-20,y=(0,u.ci)(e);for(var b in y){var Z=(0,n.G)(e,{type:"move_directly",from:y[b][0],to:y[b][1]});if((p=Math.max(p,a(Z,r-1,c,s)))>s)break;c=Math.max(c,p)}return p}self.onmessage=function(t){var r;if("best_bot_move"==(null===(r=t.data)||void 0===r?void 0:r.type)){var o=t.data,c=o.state,s=o.level;if(null!=s){var l,f=(0,i.yf)(c);if(0==(l="tiger"==f?(0,u.ci)(c):(0,u.YR)(c)).length)return self.postMessage(null),null;for(var v=l.map((function(t){var r=(0,e.Z)(t,2),o=r[0],u=r[1];return a((0,n.G)(c,{type:"move_directly",from:o,to:u}),s)})),g=v[0],m=l[0],d=1;d<v.length;d++)(v[d]>g&&"tiger"==f||v[d]<g&&"goat"==f)&&(m=l[d],g=v[d]);self.postMessage(m)}else console.error("bot smartness level missing")}}}()}();
//# sourceMappingURL=738.9caeeb1a.chunk.js.map