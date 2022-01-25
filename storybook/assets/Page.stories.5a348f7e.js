var p=Object.defineProperty;var d=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var c=(r,o,n)=>o in r?p(r,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[o]=n,a=(r,o)=>{for(var n in o||(o={}))h.call(o,n)&&c(r,n,o[n]);if(d)for(var n of d(o))m.call(o,n)&&c(r,n,o[n]);return r};import"./index.29ed96a1.js";import{P as s}from"./index.4726147c.js";import{H as u,L as f,a as b}from"./Header.stories.9668f31d.js";import{a as t,j as e}from"./jsx-runtime.ff0583dd.js";import"./Button.b214cf4e.js";const i=({user:r,onLogin:o,onLogout:n,onCreateAccount:l})=>t("article",{children:[e(u,{user:r,onLogin:o,onLogout:n,onCreateAccount:l}),t("section",{children:[e("h2",{children:"Pages in Storybook"}),t("p",{children:["We recommend building UIs with a"," ",e("a",{href:"https://componentdriven.org",target:"_blank",rel:"noopener noreferrer",children:e("strong",{children:"component-driven"})})," ","process starting with atomic components and ending with pages."]}),e("p",{children:"Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:"}),t("ul",{children:[e("li",{children:'Use a higher-level connected component. Storybook helps you compose such data from the "args" of child component stories'}),e("li",{children:"Assemble data in the page component from your services. You can mock these services out using Storybook."})]}),t("p",{children:["Get a guided tutorial on component-driven development at"," ",e("a",{href:"https://storybook.js.org/tutorials/",target:"_blank",rel:"noopener noreferrer",children:"Storybook tutorials"}),". Read more in the"," ",e("a",{href:"https://storybook.js.org/docs",target:"_blank",rel:"noopener noreferrer",children:"docs"}),"."]}),t("div",{className:"tip-wrapper",children:[e("span",{className:"tip",children:"Tip"})," Adjust the width of the canvas with the"," ",e("svg",{width:"10",height:"10",viewBox:"0 0 12 12",xmlns:"http://www.w3.org/2000/svg",children:e("g",{fill:"none",fillRule:"evenodd",children:e("path",{d:"M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z",id:"a",fill:"#999"})})}),"Viewports addon in the toolbar"]})]})]});i.propTypes={user:s.shape({}),onLogin:s.func.isRequired,onLogout:s.func.isRequired,onCreateAccount:s.func.isRequired};i.defaultProps={user:null};var P={parameters:{storySource:{source:`import React from 'react';

import {Page} from './Page';
import * as HeaderStories from './Header.stories';

export default {
  title: 'Example/Page',
  component: Page,
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  // More on composing args: https://storybook.js.org/docs/react/writing-stories/args#args-composition
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
`,locationsMap:{"logged-in":{startLoc:{col:17,line:11},endLoc:{col:45,line:11},startBody:{col:17,line:11},endBody:{col:45,line:11}},"logged-out":{startLoc:{col:17,line:11},endLoc:{col:45,line:11},startBody:{col:17,line:11},endBody:{col:45,line:11}}}}},title:"Example/Page",component:i};const g=r=>e(i,a({},r)),v=g.bind({});v.args=a({},f.args);const y=g.bind({});y.args=a({},b.args);const S=["LoggedIn","LoggedOut"];export{v as LoggedIn,y as LoggedOut,S as __namedExportsOrder,P as default};
//# sourceMappingURL=Page.stories.5a348f7e.js.map
