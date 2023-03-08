import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import Input from '@/components/atoms/Input';
import RadioGroup from '@/components/atoms/Input/Radio';

export default {
  title: 'components/atoms/Input',
  component: Input,
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '500px', padding: '30px' }}>
    <Input>{children}</Input>
  </div>
);
export const TextInput = Template.bind({});
TextInput.args = {
  children: <Input.Text name="name" value="value" onChange={() => console.log('change')} placeholder="placeholder" />,
};

export const TextLeftIconInput = Template.bind({});
TextLeftIconInput.args = {
  children: (
    <Input.Text
      iconLeft="Zoomin"
      name="name"
      value="value"
      onChange={() => console.log('change')}
      placeholder="placeholder"
    />
  ),
};

export const TextRightIconInput = Template.bind({});
TextRightIconInput.args = {
  children: (
    <Input.Text
      iconRight="Zoomin"
      name="name"
      value="value"
      onChange={() => console.log('change')}
      placeholder="placeholder"
    />
  ),
};

export const RadioInput = Template.bind({});
RadioInput.args = {
  children: (
    <Input.RadioGroup>
      <RadioGroup.Radio name="radio" value="RAD1" defaultChecked>
        radio-01
      </RadioGroup.Radio>
      <RadioGroup.Radio name="radio" value="RAD2">
        radio-02
      </RadioGroup.Radio>
      <RadioGroup.Radio name="radio" value="RAD3">
        radio-03
      </RadioGroup.Radio>
    </Input.RadioGroup>
  ),
};

export const TextAreaInput = () => {
  const [value, setValue] = useState<string>('');
  return (
    <div>
      <Template>
        <Input.TextArea
          name="textarea"
          value={value}
          placeholder="placeholder"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <br />
        <h5>values</h5>
        <br />
        <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-all' }}>{value}</div>
      </Template>
    </div>
  );
};
