import { ComponentMeta, ComponentStory } from '@storybook/react';

import Modal, { ModalProps } from '@/components/molcules/Modal';

export default {
  title: 'components/molcules/Modal',
  component: Modal,
  parameters: {
    componentSubtitle: '모달 다이얼로그',
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

const Template: ComponentStory<typeof Modal> = (args: ModalProps) => (
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
