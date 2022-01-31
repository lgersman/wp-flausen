var u=Object.defineProperty,g=Object.defineProperties;var y=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var n=(e,t,a)=>t in e?u(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,i=(e,t)=>{for(var a in t||(t={}))f.call(t,a)&&n(e,a,t[a]);if(s)for(var a of s(t))S.call(t,a)&&n(e,a,t[a]);return e},c=(e,t)=>g(e,y(t));import{T as d}from"./index.3eecd25f.js";import{r as b}from"./index.29ed96a1.js";import{a as o,j as l,F as v}from"./jsx-runtime.ff0583dd.js";import"./vendor.0f91f8b7.js";import"./index.d92b8f65.js";var C={parameters:{storySource:{source:`import '@wordpress/components/build-style/style.css';

import React, {useState} from 'react';
import TagInput from './../index.jsx';

export default {
  title: 'react-tag-input',
  component: TagInput,
  argTypes: {
    className: {control: 'text'},
    style: {control: 'object'},
    isEnum: {control: 'boolean'},
    disabled: {control: 'boolean'},
    readonly: {control: 'boolean'},
  },
  args: {
    style: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      fontSize: '13px',
      backgroundColor: 'lightgray',
    },
    className: '',
    isEnum: true,
    disabled: false,
    readonly: false,
  },
  decorators: [
    (Story) => (
      <div>
        <h3>react-tag-editor</h3>
        <em>
          Please note that the story uses just a minimum of CSS for clarity
        </em>
        <Story />
      </div>
    ),
  ],
};

const PREDEFINED_ITEMS = [
  {value: 'alpha'},
  {value: 'beta'},
  {label: 'Label of Gamma value', value: 'gamma', category: 'Other'},
  {value: 'kappa'},
  {value: 'delta', category: 'Other'},
  {label: 'Sternzeichen Omega', value: 'omega', category: 'Other'},
  {label: 'Epsilon', value: 'epsilon', category: 'Completely different'},
  {label: 'Zeta', value: 'zeta', category: 'Completely different'},
  {label: 'Iota', value: 'iota', category: 'Completely different'},
];

export const SimpleTagInput = (args) => {
  const [selected, setSelected] = useState(PREDEFINED_ITEMS.slice(0, 3));

  return (
    <>
      <TagInput
        {...args}
        items={PREDEFINED_ITEMS}
        selected={PREDEFINED_ITEMS.slice(0, 3)}
        onChange={setSelected}
      ></TagInput>
      <div style={{paddingTop: '8px'}}>
        items =<pre>{JSON.stringify(selected, null, '  ')}</pre>
      </div>
      <div style={{paddingTop: '8px', color: '#888888'}}>
        addableItems =
        <pre>
          {JSON.stringify(
            PREDEFINED_ITEMS.filter((_) => !selected.includes(_)),
            null,
            '  '
          )}
        </pre>
      </div>
    </>
  );
};

SimpleTagInput.args = {
  // className: '',
  // style: {backgroundColor: '#eeeeee'},
  // isEnum: true,
};

SimpleTagInput.decorators = [
  (Story) => (
    <div>
      <p>
        Simple use case of the component. Drag and drop tags or play with the
        component controls.
      </p>
      <Story />
    </div>
  ),
];
/*
SimpleTagInput.parameters = {
  backgrounds: {
    values: [
      { name: 'red', value: '#f00' },
      { name: 'green', value: '#0f0' },
      { name: 'blue', value: '#00f' },
    ],
  },
};
*/

/*
const Template = (args) => (<div>{ JSON.stringify(args) }</div>);

export const TestTagInput = Template.bind({});
TestTagInput.args = {
  className: '',
  style: {backgroundColor: '#eeeeee'},
  isEnum: true,
};
*/
`,locationsMap:{"simple-tag-input":{startLoc:{col:30,line:53},endLoc:{col:1,line:79},startBody:{col:30,line:53},endBody:{col:1,line:79}}}}},title:"react-tag-input",component:d,argTypes:{className:{control:"text"},style:{control:"object"},isEnum:{control:"boolean"},disabled:{control:"boolean"},readonly:{control:"boolean"}},args:{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',fontSize:"13px",backgroundColor:"lightgray"},className:"",isEnum:!0,disabled:!1,readonly:!1},decorators:[e=>o("div",{children:[l("h3",{children:"react-tag-editor"}),l("em",{children:"Please note that the story uses just a minimum of CSS for clarity"}),l(e,{})]})]};const r=[{value:"alpha"},{value:"beta"},{label:"Label of Gamma value",value:"gamma",category:"Other"},{value:"kappa"},{value:"delta",category:"Other"},{label:"Sternzeichen Omega",value:"omega",category:"Other"},{label:"Epsilon",value:"epsilon",category:"Completely different"},{label:"Zeta",value:"zeta",category:"Completely different"},{label:"Iota",value:"iota",category:"Completely different"}],p=e=>{const[t,a]=b.exports.useState(r.slice(0,3));return o(v,{children:[l(d,c(i({},e),{items:r,selected:r.slice(0,3),onChange:a})),o("div",{style:{paddingTop:"8px"},children:["items =",l("pre",{children:JSON.stringify(t,null,"  ")})]}),o("div",{style:{paddingTop:"8px",color:"#888888"},children:["addableItems =",l("pre",{children:JSON.stringify(r.filter(m=>!t.includes(m)),null,"  ")})]})]})};p.args={};p.decorators=[e=>o("div",{children:[l("p",{children:"Simple use case of the component. Drag and drop tags or play with the component controls."}),l(e,{})]})];const O=["SimpleTagInput"];export{p as SimpleTagInput,O as __namedExportsOrder,C as default};
//# sourceMappingURL=simpletags.stories.d9fd53b6.js.map
