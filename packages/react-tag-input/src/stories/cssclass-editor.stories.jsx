import '@wordpress/components/build-style/style.css';

import React, {useState} from 'react';
import TagInput from '../index.jsx';

export default {
  title: 'react-tag-input',
  component: TagInput,
  argTypes: {
    className: {control: 'text'},
    style: {control: 'object'},
    isEnum: {control: 'boolean'},
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

import data from './cssclass-editor.json';

const preSelected = [
  '.border-blue-400',
  '.translate-y-16',
  '.-m40',
  '.stroke-1',
  '.container',
  '.box-content',
];

const PREDEFINED_ITEMS = [];
const PRESELECTED_ITEMS = [];

for (const section of data) {
  if (section) {
    const SECTION = section.name;
    for (const topic of section.topics) {
      const TOPIC = {
        text: topic.text,
        description: topic.description,
      };
      for (const item of topic.items) {
        if (item.name) {
          const modelItem = {
            label: `(${topic.text}) ${item.name}`,
            category: `${section.name} / ${topic.text}`,
            value: item.name,
            raw: {
              section: SECTION,
              topic: TOPIC,
              item,
            },
          };

          PREDEFINED_ITEMS.push(modelItem);
          if (preSelected.includes(item.name)) {
            PRESELECTED_ITEMS.push(modelItem);
          }
        }
      }
    }
  }
}

export const CustomRenderer = (args) => {
  const [selected, setSelected] = useState(PRESELECTED_ITEMS);

  const sectionStyles = {
    Layout: {
      backgroundColor: '#0074D9',
      color: 'hsla(208, 100%, 85%, 1.0)',
    },
    Flexbox: {
      backgroundColor: '#7FDBFF',
      color: 'hsla(197, 100%, 20%, 1.0)',
    },
    Grid: {
      backgroundColor: '#39CCCC',
      color: '#000000',
    },
    Spacing: {
      backgroundColor: '#3D9970',
      color: 'hsla(153, 43%, 15%, 1.0)',
    },
    Sizing: {
      backgroundColor: '#01FF70',
      color: 'hsla(146, 100%, 20%, 1.0)',
    },
    Typography: {
      backgroundColor: '#FFDC00',
      color: 'hsla(52, 100%, 20%, 1.0)',
    },
    Backgrounds: {
      backgroundColor: '#FF851B',
      color: 'hsla(28, 100%, 20%, 1.0)',
    },
    Borders: {
      backgroundColor: '#85144B',
      color: 'hsla(331, 74%, 70%, 1.0)',
    },
    Tables: {
      backgroundColor: '#B10DC9',
      color: 'hsla(292, 88%, 82%, 1.0)',
    },
    Transitions: {
      backgroundColor: '#111',
      color: '#ddd',
    },
    Transforms: {
      backgroundColor: '#FF4136',
      color: 'hsla(3, 100%, 25%, 1.0)',
    },
    Interactivity: {
      backgroundColor: '#2ECC40',
      color: 'hsla(127, 63%, 15%, 1.0)',
    },
    Miscellaneous: {
      backgroundColor: '#001F3F',
      color: 'hsla(210, 100%, 75%, 1.0)',
    },
  };
  const renderTag = ({item, children}) => {
    const {
      raw = {
        topic: {
          text: 'purpose',
          description:
            'this css class was manually entered and is unknown to the system',
        },
        section: 'general',
        item: {
          prop: 'we dont know the concrete css rules since this css class in unmanaged',
          name: item,
        },
      },
    } = item;

    const FALLBACK_STYLE = {backgroundColor: 'grey', color: 'white'};

    return (
      <div
        style={{
          padding: '2px',
          borderRadius: '4px',
          ...(raw.section
            ? sectionStyles[raw.section] || FALLBACK_STYLE
            : FALLBACK_STYLE),
        }}
        title={`${raw.section} / ${raw.topic.text}\n${raw.topic.description}\n\n${raw.item.prop}`}
      >
        <span style={{padding: '0 6px 0 6px'}}>{raw.item.name}</span>
        {children}
      </div>
    );
  };

  return (
    <>
      <label
        className="components-input-control__label"
        style={{display: 'inline-block', marginBottom: '8px'}}
        htmlFor="cssclass_editor"
      >
        Additional CSS class(es)
      </label>
      <TagInput
        {...args}
        items={PREDEFINED_ITEMS}
        selected={PRESELECTED_ITEMS}
        onChange={setSelected}
        renderTag={renderTag}
      ></TagInput>
      <pre style={{paddingTop: '8px'}}>
        <span style={{color: 'grey'}}>resulting class = &quot;</span>
        {selected.map((_) => _.value || _).join(' ')}
        <span style={{color: 'grey'}}>&quot;</span>
      </pre>
      <pre style={{paddingTop: '8px', color: 'grey'}}>
        <pre>
          <span>addable css classes = &quot;</span>
          {JSON.stringify(
            PREDEFINED_ITEMS.filter((_) => !selected.includes(_)).map(
              (_) => _.value || _
            ),
            null,
            '  '
          )}
          <span>&quot;</span>
        </pre>
      </pre>
    </>
  );
};

CustomRenderer.args = {
  // className: '',
  // style: {backgroundColor: '#eeeeee'},
  // isEnum: true,
};

CustomRenderer.decorators = [
  (Story) => (
    <div>
      <p>
        CSS Class Editor use case of the component. Drag and drop css class
        items or play with the component controls.
      </p>
      <Story />
    </div>
  ),
];
