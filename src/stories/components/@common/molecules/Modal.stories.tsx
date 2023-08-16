import { ComponentMeta, ComponentStory } from '@storybook/react';

import Modal from '@/components/@common/molecules/Modal';

export default {
  title: 'components/@common/molecules/Modal',
  component: Modal,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
      iframeWidth: 500,
    },
    controls: {
      exclude: ['children'],
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>
    <Modal.Title>TITLE</Modal.Title>
    <Modal.Body>
      <p>body body</p>
      <span>bodybodybodybodybodybody</span>
    </Modal.Body>
    <Modal.CloseButton onClick={() => console.log('CLOSE')}>취소</Modal.CloseButton>
    <Modal.ConfirmButton onClick={() => console.log('HI')}>제출하기</Modal.ConfirmButton>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  visible: true,
};
