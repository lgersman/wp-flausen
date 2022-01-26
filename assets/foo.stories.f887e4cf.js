var s=Object.defineProperty,d=Object.defineProperties;var p=Object.getOwnPropertyDescriptors;var e=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var t=(n,o,l)=>o in n?s(n,o,{enumerable:!0,configurable:!0,writable:!0,value:l}):n[o]=l,r=(n,o)=>{for(var l in o||(o={}))u.call(o,l)&&t(n,l,o[l]);if(e)for(var l of e(o))m.call(o,l)&&t(n,l,o[l]);return n},a=(n,o)=>d(n,p(o));import"./index.29ed96a1.js";import{j as c}from"./jsx-runtime.ff0583dd.js";function i({label:n,onClick:o}){return c("div",{onClick:o,children:n})}var k={parameters:{storySource:{source:`import React from 'react';


function Foo({label, onClick}) {
  return <div onClick={onClick}>{label}</div>;
}

export default {
  title: 'Foo/Bar',
  component: Foo,
  argTypes: {
    label: {control: 'text'},
    onClick: {action: 'clicked'},
  },
  args: {
    label: 'hello world',
  },
};

const Template = (args) => (
  <Foo {...args} onClick={() => console.log('huhu')} />
);

export const Foo1 = Template.bind({});
Foo1.args = {
  label: 'hello default world',
};
`,locationsMap:{"foo-1":{startLoc:{col:17,line:20},endLoc:{col:1,line:22},startBody:{col:17,line:20},endBody:{col:1,line:22}}}}},title:"Foo/Bar",component:i,argTypes:{label:{control:"text"},onClick:{action:"clicked"}},args:{label:"hello world"}};const f=n=>c(i,a(r({},n),{onClick:()=>console.log("huhu")})),b=f.bind({});b.args={label:"hello default world"};const x=["Foo1"];export{b as Foo1,x as __namedExportsOrder,k as default};
//# sourceMappingURL=foo.stories.f887e4cf.js.map
