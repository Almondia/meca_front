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
  <div style={{ width: '100%', padding: '30px', maxWidth: '500px' }}>
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
      <RadioGroup.Radio onChange={() => console.log('HI')} name="radio" value="RAD1" defaultChecked>
        radio-01
      </RadioGroup.Radio>
      <RadioGroup.Radio onChange={() => console.log('HI')} name="radio" value="RAD2">
        radio-02
      </RadioGroup.Radio>
      <RadioGroup.Radio onChange={() => console.log('HI')} name="radio" value="RAD3">
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

export const TitleInput = () => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  return (
    <Template>
      <Input.Title
        name="title-input"
        value={value}
        onChange={(e) => {
          setIsValid(e.target.value.length <= 20);
          setValue(e.target.value);
        }}
        placeholder="20글자를 넘으면 안됩니다"
        isValid={isValid}
      />
    </Template>
  );
};

export const RangeInput = () => {
  const [value, setValue] = useState<string>('3');
  return (
    <Template>
      <Input.Range value={value} min={0} max={20} name="range-input" onChange={(e) => setValue(e.target.value)} />
      <br />
      {`current value is: ${value}`}
    </Template>
  );
};
