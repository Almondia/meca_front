import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import InputGroup from '@/components/@common/molecules/InputGroup';

export default {
  title: 'components/@common/molecules/InputGroup',
  component: InputGroup,
} as ComponentMeta<typeof InputGroup>;

const Template: ComponentStory<typeof InputGroup> = () => {
  const [value, setValue] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  return (
    <InputGroup>
      <InputGroup.Label>Value를 입력하세요</InputGroup.Label>
      <InputGroup.Input>
        <InputGroup.Input.Text
          name="name"
          value={value}
          onChange={(e) => {
            e.target.value === '0309' ? setIsValid(false) : setIsValid(true);
            setValue(e.target.value);
          }}
          placeholder="0309를 입력하면 안됩니다."
        />
      </InputGroup.Input>
      <InputGroup.Validation visible={!isValid}>0309를 입력할 수 없습니다</InputGroup.Validation>
    </InputGroup>
  );
};
export const Default = Template.bind({});
