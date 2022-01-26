var f=Object.defineProperty;var s=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var i=(n,e,o)=>e in n?f(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o,c=(n,e)=>{for(var o in e||(e={}))h.call(e,o)&&i(n,o,e[o]);if(s)for(var o of s(e))L.call(e,o)&&i(n,o,e[o]);return n};import"./index.29ed96a1.js";import{P as l}from"./index.4726147c.js";import{B as d}from"./Button.b214cf4e.js";import{j as r,a as t,F as v}from"./jsx-runtime.ff0583dd.js";const a=({user:n,onLogin:e,onLogout:o,onCreateAccount:u})=>r("header",{children:t("div",{className:"wrapper",children:[t("div",{children:[r("svg",{width:"32",height:"32",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",children:t("g",{fill:"none",fillRule:"evenodd",children:[r("path",{d:"M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z",fill:"#FFF"}),r("path",{d:"M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z",fill:"#555AB9"}),r("path",{d:"M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z",fill:"#91BAF8"})]})}),r("h1",{children:"Acme"})]}),r("div",{children:n?r(d,{size:"small",onClick:o,label:"Log out"}):t(v,{children:[r(d,{size:"small",onClick:e,label:"Log in"}),r(d,{primary:!0,size:"small",onClick:u,label:"Sign up"})]})})]})});a.propTypes={user:l.shape({}),onLogin:l.func.isRequired,onLogout:l.func.isRequired,onCreateAccount:l.func.isRequired};a.defaultProps={user:null};var x={parameters:{storySource:{source:`import React from 'react';

import {Header} from './Header';

export default {
  title: 'Example/Header',
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
`,locationsMap:{"logged-in":{startLoc:{col:17,line:10},endLoc:{col:47,line:10},startBody:{col:17,line:10},endBody:{col:47,line:10}},"logged-out":{startLoc:{col:17,line:10},endLoc:{col:47,line:10},startBody:{col:17,line:10},endBody:{col:47,line:10}}}}},title:"Example/Header",component:a};const g=n=>r(a,c({},n)),p=g.bind({});p.args={user:{}};const m=g.bind({});m.args={};const b=["LoggedIn","LoggedOut"];var z=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:x,LoggedIn:p,LoggedOut:m,__namedExportsOrder:b});export{a as H,p as L,m as a,z as b};
//# sourceMappingURL=Header.stories.9668f31d.js.map
