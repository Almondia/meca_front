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
    <div style={{ padding: '60px' }}>
      <InputGroup>
        <InputGroup.Label>Value를 입력하세요</InputGroup.Label>
        <InputGroup.Validation visible={!isValid}>1557을 입력했다</InputGroup.Validation>
        <InputGroup.Input>
          <InputGroup.Input.Text
            name="name"
            value={value}
            onChange={(e) => {
              e.target.value === '1557' ? setIsValid(false) : setIsValid(true);
              setValue(e.target.value);
            }}
            placeholder="placeholder"
          />
        </InputGroup.Input>
        <InputGroup.Description descLists={['1557을 입력하면 안됩니다', '안녕하세요']} />
      </InputGroup>
    </div>
  );
};
export const Default = Template.bind({});
