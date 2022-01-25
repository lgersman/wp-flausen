var M=Object.defineProperty;var b=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var g=(r,e,t)=>e in r?M(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,y=(r,e)=>{for(var t in e||(e={}))P.call(e,t)&&g(r,t,e[t]);if(b)for(var t of b(e))j.call(e,t)&&g(r,t,e[t]);return r};import{w as D}from"./vendor.e2a88fab.js";import{r as m}from"./index.29ed96a1.js";import{R as O}from"./index.d92b8f65.js";import{j as p}from"./jsx-runtime.ff0583dd.js";function l(r){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?l=function(t){return typeof t}:l=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(r)}function T(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function E(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function F(r,e,t){return e&&E(r.prototype,e),t&&E(r,t),r}function k(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&d(r,e)}function d(r,e){return d=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},d(r,e)}function C(r){var e=B();return function(){var n=h(r),o;if(e){var a=h(this).constructor;o=Reflect.construct(n,arguments,a)}else o=n.apply(this,arguments);return N(this,o)}}function N(r,e){return e&&(l(e)==="object"||typeof e=="function")?e:A(r)}function A(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function B(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function h(r){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},h(r)}function R(r,e,t,n,o,a,i){try{var c=r[a](i),u=c.value}catch(f){t(f);return}c.done?e(u):Promise.resolve(u).then(n,o)}function x(r){return function(){var e=this,t=arguments;return new Promise(function(n,o){var a=r.apply(e,t);function i(u){R(a,n,o,i,c,"next",u)}function c(u){R(a,n,o,i,c,"throw",u)}i(void 0)})}}var v=D.FRAMEWORK_OPTIONS,H=function(e,t){var n=t.id,o=t.component;if(!o)throw new Error("Unable to render story ".concat(n," as the component annotation is missing from the default export"));return p(o,y({},e))},I=function(){var r=x(regeneratorRuntime.mark(function e(t,n){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.abrupt("return",new Promise(function(i){O.render(t,n,function(){return i(null)})}));case 1:case"end":return a.stop()}},e)}));return function(t,n){return r.apply(this,arguments)}}(),W=function(r){k(t,r);var e=C(t);function t(){var n;T(this,t);for(var o=arguments.length,a=new Array(o),i=0;i<o;i++)a[i]=arguments[i];return n=e.call.apply(e,[this].concat(a)),n.state={hasError:!1},n}return F(t,[{key:"componentDidMount",value:function(){var o=this.state.hasError,a=this.props.showMain;o||a()}},{key:"componentDidCatch",value:function(o){var a=this.props.showException;a(o)}},{key:"render",value:function(){var o=this.state.hasError,a=this.props.children;return o?null:a}}],[{key:"getDerivedStateFromError",value:function(){return{hasError:!0}}}]),t}(m.exports.Component),S=v!=null&&v.strictMode?m.exports.StrictMode:m.exports.Fragment;function J(r,e){return w.apply(this,arguments)}function w(){return w=x(regeneratorRuntime.mark(function r(e,t){var n,o,a,i,c,u,f,_;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return n=e.storyContext,o=e.unboundStoryFn,a=e.showMain,i=e.showException,c=e.forceRemount,u=o,f=p(W,{showMain:a,showException:i,children:p(u,y({},n))}),_=S?p(S,{children:f}):f,c&&O.unmountComponentAtNode(t),s.next=7,I(_,t);case 7:case"end":return s.stop()}},r)})),w.apply(this,arguments)}var L={framework:"react"};export{L as parameters,H as render,J as renderToDOM};
//# sourceMappingURL=config.4ef0e92b.js.map
