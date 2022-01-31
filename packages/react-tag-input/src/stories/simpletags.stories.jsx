import '@wordpress/components/build-style/style.css';

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
