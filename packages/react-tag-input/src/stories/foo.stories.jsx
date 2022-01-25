import React from 'react';

// eslint-disable-next-line react/prop-types
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
