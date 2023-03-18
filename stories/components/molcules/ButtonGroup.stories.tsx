/* eslint-disable no-alert */
import { ComponentMeta, ComponentStory } from '@storybook/react';

import ButtonGroup, { ButtonGroupProps } from '@/components/molcules/ButtonGroup';

export default {
  title: 'components/molcules/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    componentSubtitle: '확인/취소 버튼 그룹',
  },
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args: ButtonGroupProps) => (
  <div style={{ padding: '30px' }}>
    <ButtonGroup {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  successText: '완료하기',
  onSuccess: () => alert('완료!'),
  onCancel: () => alert('default: 뒤로가기'),
};

export const WithWarningModal = Template.bind({});
WithWarningModal.args = {
  successText: '완료하기',
  onSuccess: () => alert('완료!'),
  onCancel: () => alert('default: 뒤로가기'),
  hasCancelWarning: true,
  cancelWarningText: '정말로 취소할꺼야?',
};
