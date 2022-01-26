var c=Object.defineProperty;var e=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var a=(n,o,t)=>o in n?c(n,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[o]=t,l=(n,o)=>{for(var t in o||(o={}))i.call(o,t)&&a(n,t,o[t]);if(e)for(var t of e(o))d.call(o,t)&&a(n,t,o[t]);return n};import"./index.29ed96a1.js";import{B as s}from"./Button.b214cf4e.js";import{j as p}from"./jsx-runtime.ff0583dd.js";import"./index.4726147c.js";var j={parameters:{storySource:{source:`import React from 'react';

import {Button} from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: 'color'},
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
`,locationsMap:{primary:{startLoc:{col:17,line:16},endLoc:{col:47,line:16},startBody:{col:17,line:16},endBody:{col:47,line:16}},secondary:{startLoc:{col:17,line:16},endLoc:{col:47,line:16},startBody:{col:17,line:16},endBody:{col:47,line:16}},large:{startLoc:{col:17,line:16},endLoc:{col:47,line:16},startBody:{col:17,line:16},endBody:{col:47,line:16}},small:{startLoc:{col:17,line:16},endLoc:{col:47,line:16},startBody:{col:17,line:16},endBody:{col:47,line:16}}}}},title:"Example/Button",component:s,argTypes:{backgroundColor:{control:"color"}}};const r=n=>p(s,l({},n)),m=r.bind({});m.args={primary:!0,label:"Button"};const g=r.bind({});g.args={label:"Button"};const u=r.bind({});u.args={size:"large",label:"Button"};const y=r.bind({});y.args={size:"small",label:"Button"};const S=["Primary","Secondary","Large","Small"];export{u as Large,m as Primary,g as Secondary,y as Small,S as __namedExportsOrder,j as default};
//# sourceMappingURL=Button.stories.b643751e.js.map
